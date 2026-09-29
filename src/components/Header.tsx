import React from 'react';
import { ToolId } from '../types';
import { Sparkles, Layers, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTool, onSelectTool }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <div className="flex items-center gap-3">
          {currentTool !== 'home' && (
            <button
              onClick={() => onSelectTool('home')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mr-1 cursor-pointer"
              title="Back to Suite"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => onSelectTool('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                PixelCraft Pro
                <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/30">SUITE</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button 
            onClick={() => onSelectTool('home')}
            className={`hover:text-white transition-colors cursor-pointer ${currentTool === 'home' ? 'text-white font-semibold' : ''}`}
          >
            All Tools
          </button>
          <button 
            onClick={() => onSelectTool('background-remover')}
            className={`hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer ${currentTool === 'background-remover' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Background Remover
          </button>
          <button 
            onClick={() => onSelectTool('compressor')}
            className={`hover:text-white transition-colors cursor-pointer ${currentTool === 'compressor' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Compressor
          </button>
          <button 
            onClick={() => onSelectTool('converter')}
            className={`hover:text-white transition-colors cursor-pointer ${currentTool === 'converter' ? 'text-indigo-400 font-semibold' : ''}`}
          >
            Converter
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTool('background-remover')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Remove BG</span>
          </button>
        </div>
      </div>
    </header>
  );
};
