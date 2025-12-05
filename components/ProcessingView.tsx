import React from 'react';
import { Loader2, Cpu, CheckCircle } from 'lucide-react';

interface ProcessingViewProps {
  isComplete?: boolean;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ isComplete = false }) => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center bg-[#0A192F] text-white relative overflow-hidden">
      {/* Background Matrix Effect (Simulated) */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(100,255,218,.3)_25%,rgba(100,255,218,.3)_26%,transparent_27%,transparent_74%,rgba(100,255,218,.3)_75%,rgba(100,255,218,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(100,255,218,.3)_25%,rgba(100,255,218,.3)_26%,transparent_27%,transparent_74%,rgba(100,255,218,.3)_75%,rgba(100,255,218,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>

      <div className="relative z-10 flex flex-col items-center space-y-8 animate-in fade-in duration-500">
        
        {isComplete ? (
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
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
              <Cpu className="w-24 h-24 text-cyan-400 animate-spin-slow duration-[3s]" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 px-4">
              CONSTRUCTING REALITY
            </h2>
            
            <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-mono uppercase tracking-wider">
                    Aligning Quantum Parameters...
                </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessingView;