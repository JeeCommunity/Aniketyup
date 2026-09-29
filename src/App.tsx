import React, { useState } from 'react';
import { ToolId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToolGrid } from './components/ToolGrid';
import { BackgroundRemover } from './components/tools/BackgroundRemover';
import { ImageCompressor } from './components/tools/ImageCompressor';
import { FormatConverter } from './components/tools/FormatConverter';

export default function App() {
  const [currentTool, setCurrentTool] = useState<ToolId>('home');

  const renderTool = () => {
    switch (currentTool) {
      case 'background-remover':
        return <BackgroundRemover />;
      case 'compressor':
        return <ImageCompressor />;
      case 'converter':
        return <FormatConverter />;
      case 'home':
      default:
        return <ToolGrid onSelectTool={setCurrentTool} />;
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Header currentTool={currentTool} onSelectTool={setCurrentTool} />
      <main className="flex-1 flex flex-col">
        {renderTool()}
      </main>
      <Footer />
    </div>
  );
}
