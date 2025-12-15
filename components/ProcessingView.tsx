import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Cpu, CheckCircle, ScanFace, Database, Wand2, Fingerprint } from 'lucide-react';

interface ProcessingViewProps {
  isActuallyComplete?: boolean;
  onComplete?: () => void;
}

const STEPS = [
  { text: "Scanning Biometric Data...", icon: ScanFace },
  { text: "Analyzing Facial Structure...", icon: Fingerprint },
  { text: "Accessing Career Database...", icon: Database },
  { text: "Synthesizing Professional Attire...", icon: Cpu },
  { text: "Rendering Environment...", icon: Wand2 },
  { text: "Finalizing Quantum Reality...", icon: Loader2 },
];

const ProcessingView: React.FC<ProcessingViewProps> = ({ isActuallyComplete = false, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const hasCalledComplete = useRef(false);

  // When generation is actually complete, show success message briefly then call onComplete
  useEffect(() => {
    if (isActuallyComplete && !hasCalledComplete.current) {
      console.log('🎬 [ProcessingView] Generation complete! Showing success screen...');
      setShowComplete(true);

      // Show "REALITY CONSTRUCTED" for 1.5 seconds, then transition to result
      const timeout = setTimeout(() => {
        console.log('🎬 [ProcessingView] Transitioning to result screen...');
        hasCalledComplete.current = true;
        if (onComplete) {
          onComplete();
        }
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isActuallyComplete, onComplete]);

  useEffect(() => {
    if (showComplete) return;

    // Cycle through steps every 1500ms
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [showComplete]);


  const CurrentIcon = STEPS[currentStepIndex].icon;

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center bg-[#0A192F] text-white relative overflow-hidden">
      {/* Background Matrix Effect (Simulated) */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(100,255,218,.3)_25%,rgba(100,255,218,.3)_26%,transparent_27%,transparent_74%,rgba(100,255,218,.3)_75%,rgba(100,255,218,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(100,255,218,.3)_25%,rgba(100,255,218,.3)_26%,transparent_27%,transparent_74%,rgba(100,255,218,.3)_75%,rgba(100,255,218,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>

      <div className="relative z-10 flex flex-col items-center space-y-8 animate-in fade-in duration-500 w-full max-w-md px-4">

        {showComplete ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 animate-pulse rounded-full"></div>
              <CheckCircle className="w-24 h-24 text-green-400 animate-in zoom-in duration-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 px-4 animate-in slide-in-from-bottom-4 duration-500">
              REALITY CONSTRUCTED
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-mono uppercase tracking-wider animate-in fade-in delay-200">
              Image Ready
            </p>
          </>
        ) : (
          <>
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse rounded-full"></div>
              {/* Rotating outer ring */}
              <div className="absolute inset-0 border-4 border-dashed border-cyan-500/30 rounded-full animate-spin-slow w-32 h-32 -m-4"></div>
              <CurrentIcon className="w-24 h-24 text-cyan-400 animate-pulse duration-1000" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 px-4">
              PROCESSING
            </h2>

            <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/10 mt-4">
              <div className="h-full bg-cyan-500 animate-progress-indeterminate"></div>
            </div>

            <div className="h-8 flex items-center justify-center">
              <p className="text-slate-300 text-sm md:text-base font-mono uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 key={currentStepIndex}">
                {STEPS[currentStepIndex].text}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Custom Styles for animations not in Tailwind default */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes progress-indeterminate {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 70%; margin-left: 30%; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProcessingView;