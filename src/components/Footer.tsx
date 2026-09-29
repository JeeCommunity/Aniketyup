import React from 'react';
import { Layers, Heart, Shield, Zap, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight">PixelCraft Pro</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Professional browser-based image tools suite powered by WebAssembly and browser AI. Fast, secure, and zero server upload required for most operations.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Core Tools</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#background-remover" className="hover:text-white transition-colors">Background Remover</a></li>
            <li><a href="#compressor" className="hover:text-white transition-colors">Image Compressor</a></li>
            <li><a href="#resizer" className="hover:text-white transition-colors">Resizer & Cropper</a></li>
            <li><a href="#converter" className="hover:text-white transition-colors">Format Converter</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Advanced Tools</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#watermarker" className="hover:text-white transition-colors">Watermark Studio</a></li>
            <li><a href="#palette" className="hover:text-white transition-colors">Color Palette Extractor</a></li>
            <li><a href="#ai-enhancer" className="hover:text-white transition-colors">AI Smart Enhancer</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Privacy & Security</h4>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-4 h-4 shrink-0" />
              <span>100% Client-Side Processing</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your images stay on your device. We never store or transmit your personal photos to external servers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© {new Date().getFullYear()} PixelCraft Pro. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>High Performance WebAssembly</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini AI Enabled</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
