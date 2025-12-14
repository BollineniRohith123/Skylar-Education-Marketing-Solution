import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onBack: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      // Prioritize the environment (rear) camera on mobile for higher quality, 
      // but 'user' (front) is often better for kiosks/selfies.
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1080 }, // Optimize for portrait
          height: { ideal: 1920 }
        }
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCaptureClick = () => {
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
        
        // Flip horizontally for 'user' facing mode (mirror effect)
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
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
          // Resize/Normalize uploaded image via canvas
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Max dimension logic to optimize for mobile upload performance
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
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" // Mirror the preview
      />
      <canvas ref={canvasRef} className="hidden" />
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Guide Overlay - Hidden on very small mobile screens to show more video */}
      <div className="absolute inset-0 pointer-events-none border-[0px] md:border-[20px] border-[#0A192F]/50 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
         <div className="w-[70%] max-w-[300px] aspect-[3/4] border-2 border-dashed border-cyan-400/50 rounded-[40%] opacity-50"></div>
      </div>
      <div className="absolute top-0 w-full pt-safe flex justify-center z-20 pointer-events-none mt-6">
        <div className="bg-black/60 px-6 py-2 rounded-full backdrop-blur-md max-w-[90%] shadow-lg">
          <p className="text-white text-sm md:text-lg font-medium text-center truncate">Position face or upload photo</p>
        </div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <span className="text-[120px] md:text-[180px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-bounce">
            {countdown}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 w-full pb-safe z-30 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="pb-8 pt-12 flex justify-around items-center max-w-lg mx-auto px-6">
          
          {/* Back / Reset */}
          <button 
            onClick={onBack}
            className="flex flex-col items-center space-y-1 text-white/90 active:text-white transition-all group active:scale-95 touch-manipulation"
          >
            <div className="p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 group-active:bg-slate-700 shadow-lg">
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-black drop-shadow-sm">Back</span>
          </button>
          
          {/* Capture Button */}
          <button 
            onClick={handleCaptureClick}
            disabled={countdown !== null}
            className="transform transition-transform active:scale-90 mx-4 touch-manipulation"
          >
            <div className="p-1 rounded-full border-4 border-white/30">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white hover:bg-cyan-50 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </div>
            </div>
          </button>

          {/* Upload Button */}
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