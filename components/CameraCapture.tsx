import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, Upload, FlipHorizontal2, ArrowLeft } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(true); // Default to true on mobile
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Stop the current camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Start camera with specific facing mode
  const startCamera = useCallback(async (facing: 'user' | 'environment') => {
    // Stop any existing stream first
    stopCamera();
    setIsLoading(true);
    setCameraError(null);

    try {
      // Use 'exact' to force the specific camera on mobile devices
      // This is critical for camera switching to work properly
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { exact: facing }
        },
        audio: false
      };

      let mediaStream: MediaStream;

      try {
        // First try with exact constraint
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (exactError) {
        // If exact fails (common on some devices), fall back to ideal
        console.log('Exact facingMode failed, trying ideal...', exactError);
        const fallbackConstraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: facing }
          },
          audio: false
        };
        mediaStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
      }

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      // Check for multiple cameras after getting permission
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasMultipleCameras(videoDevices.length > 1);

      setIsLoading(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Camera access denied. Please allow camera permissions or use upload.");
      setIsLoading(false);
    }
  }, [stopCamera]);

  // Switch camera function
  const switchCamera = useCallback(() => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    console.log('Switching camera to:', newFacingMode);
    setFacingMode(newFacingMode);
  }, [facingMode]);

  // Start camera on mount and when facingMode changes
  useEffect(() => {
    startCamera(facingMode);

    return () => {
      stopCamera();
    };
  }, [facingMode, startCamera, stopCamera]);

  const handleCaptureClick = () => {
    if (isLoading || cameraError) return;

    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          takePhoto();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Only flip horizontally for front camera (user facing mode)
        if (facingMode === 'user') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL('image/jpeg', 0.9);
        stopCamera();
        onCapture(imageSrc);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const maxDim = 1920;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = (height * maxDim) / width;
                width = maxDim;
              } else {
                width = (width * maxDim) / height;
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);

            const normalizedImage = canvas.toDataURL('image/jpeg', 0.9);
            stopCamera();
            onCapture(normalizedImage);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black overflow-hidden touch-none">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <div className="text-white text-lg">Starting camera...</div>
        </div>
      )}

      {/* 
        Using object-contain instead of object-cover:
        - object-cover = fills container, CROPS excess → causes zoom effect
        - object-contain = fits inside container, shows FULL view → no zoom
        The black bars on sides are acceptable and look like a camera viewfinder
      */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-contain ${facingMode === 'user' ? 'transform -scale-x-100' : ''}`}
      />
      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Camera Error Message */}
      {cameraError && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/80">
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-6 rounded-2xl max-w-sm mx-4 text-center">
            <p className="mb-4">{cameraError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black px-6 py-3 rounded-xl font-bold"
            >
              Upload Photo Instead
            </button>
          </div>
        </div>
      )}

      {/* Guide Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[0px] md:border-[20px] border-[#0A192F]/50 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[70%] max-w-[300px] aspect-[3/4] border-2 border-dashed border-cyan-400/50 rounded-[40%] opacity-50"></div>
      </div>

      {/* Top Bar with Back and Camera Switch */}
      <div className="absolute top-0 w-full pt-safe flex justify-between items-center z-20 px-4 mt-4">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 active:bg-white/20 transition-all touch-manipulation"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
          <p className="text-white text-xs md:text-sm font-medium">
            {facingMode === 'user' ? 'Front Camera' : 'Back Camera'}
          </p>
        </div>

        {hasMultipleCameras ? (
          <button
            onClick={switchCamera}
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 active:bg-white/20 transition-all touch-manipulation"
          >
            <FlipHorizontal2 className="w-6 h-6 text-white" />
          </button>
        ) : (
          <div className="w-12"></div>
        )}
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <span className="text-[120px] md:text-[180px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-bounce">
            {countdown}
          </span>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full pb-safe z-30 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="pb-8 pt-12 flex justify-around items-center max-w-lg mx-auto px-6">

          {/* Left Button: Switch Camera (or empty space if single camera) */}
          {hasMultipleCameras ? (
            <button
              onClick={switchCamera}
              className="flex flex-col items-center space-y-1 text-white/90 active:text-white transition-all group active:scale-95 touch-manipulation"
            >
              <div className="p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 group-active:bg-slate-700 shadow-lg">
                <FlipHorizontal2 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-black drop-shadow-sm">Switch</span>
            </button>
          ) : (
            <div className="w-16 md:w-20"></div>
          )}

          {/* Center: Capture Button */}
          <button
            onClick={handleCaptureClick}
            disabled={countdown !== null || !!cameraError || isLoading}
            className="transform transition-transform active:scale-90 mx-4 touch-manipulation disabled:opacity-50"
          >
            <div className="p-1 rounded-full border-4 border-white/30">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white hover:bg-cyan-50 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </div>
            </div>
          </button>

          {/* Right: Upload Button (always visible) */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center space-y-1 text-white/90 active:text-white transition-all group active:scale-95 touch-manipulation"
          >
            <div className="p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 group-active:bg-slate-700 shadow-lg">
              <Upload className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-black drop-shadow-sm">Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;