import React, { useState } from 'react';
import { TOOLS } from '../data/tools';
import { ToolId, ToolItem } from '../types';
import { 
  Scissors, 
  Minimize2, 
  Maximize, 
  RefreshCw, 
  Shield, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  Search,
  Zap,
  Lock,
  Cpu
} from 'lucide-react';

interface ToolGridProps {
  onSelectTool: (toolId: ToolId) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ onSelectTool }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI', 'Optimize', 'Edit', 'Convert'];

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors': return <Scissors className="w-6 h-6 text-indigo-400" />;
      case 'Minimize2': return <Minimize2 className="w-6 h-6 text-emerald-400" />;
      case 'Maximize': return <Maximize className="w-6 h-6 text-blue-400" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6 text-amber-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-purple-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-pink-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-400" />;
      default: return <Zap className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Web-Scale Image Suite</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Powerful Image Tools, <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Lightning Fast & Private
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Process, remove backgrounds, compress, convert, and enhance your images directly in your browser with enterprise-grade quality.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search image tools (e.g. background remover, compress)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat} {cat === 'All' ? `(${TOOLS.length})` : `(${TOOLS.filter(t => t.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 transition-all duration-300">
                  {getIcon(tool.iconName)}
                </div>
                <div className="flex items-center gap-2">
                  {tool.badge && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      tool.badge === 'Popular' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                      tool.badge === 'New' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {tool.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
                    {tool.category}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {tool.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Launch Tool</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No tools found matching "{searchQuery}".</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Feature Highlight Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-slate-900/80 border border-indigo-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>AI Background Remover Integration</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Remove image backgrounds instantly in one click</h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Experience state-of-the-art client-side background removal using advanced browser models (`@bg0/browser` & `@imgly/background-removal`). Clean transparent PNGs ready for download instantly.
          </p>
        </div>
        <button
          onClick={() => onSelectTool('background-remover')}
          className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-xl whitespace-nowrap cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Launch Background Remover</span>
        </button>
      </div>
    </div>
  );
};
