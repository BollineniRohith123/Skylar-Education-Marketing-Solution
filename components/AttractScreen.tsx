import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AttractScreenProps {
  onStart: () => void;
}

const AttractScreen: React.FC<AttractScreenProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center overflow-hidden touch-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#020c1b]"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>

      {/* Animated Orb/Mirror Effect */}
      <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 flex flex-col items-center text-center p-8 space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-700 pt-safe">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/20 mb-4 animate-pulse">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
          <span className="text-cyan-300 text-xs md:text-sm font-semibold tracking-wider uppercase">AI Powered Future Self</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 drop-shadow-2xl tracking-tight leading-tight">
          FUTURE<br />FRAME
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light px-4">
          Look into the future. See yourself as a Doctor, Engineer, or Leader today.
        </p>

        <button
          onClick={onStart}
          className="group relative px-8 py-4 md:px-10 md:py-5 bg-cyan-500 hover:bg-cyan-400 text-[#0A192F] font-bold text-lg md:text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(100,255,218,0.4)] flex items-center space-x-3 mt-4 active:scale-95 touch-manipulation"
        >
          <span>TOUCH TO START</span>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Floating Particles */}
      <div className="absolute bottom-6 md:bottom-10 w-full text-center pb-safe">
        <p className="text-slate-500 text-xs md:text-sm tracking-widest uppercase font-semibold">
          Powered by Future Frame
        </p>
      </div>
    </div>
  );
};

export default AttractScreen;