import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, Download, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const FormatConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/png');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selected: File) => {
    if (!selected.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file.');
      return;
    }
    setErrorMsg(null);
    setFile(selected);
    setConvertedUrl(null);
    setPreview(URL.createObjectURL(selected));
  };

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        setErrorMsg('Canvas context unavailable.');
        return;
      }
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        setIsProcessing(false);
        if (blob) {
          setConvertedUrl(URL.createObjectURL(blob));
        } else {
          setErrorMsg('Conversion failed.');
        }
      }, targetFormat, 0.92);
    };
    img.onerror = () => {
      setIsProcessing(false);
      setErrorMsg('Failed to load image.');
    };
    img.src = preview!;
  };

  const extensionMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Instant Format Conversion</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Image Format Converter</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Convert your images between PNG, JPEG, and WebP formats instantly in your browser.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Conversion Settings</h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/50 rounded-xl p-5 text-center cursor-pointer transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <Upload className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">{file ? file.name : 'Choose Image'}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">Target Format</label>
            <div className="grid grid-cols-3 gap-2">
              {(['image/png', 'image/jpeg', 'image/webp'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setTargetFormat(fmt)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    targetFormat === fmt
                      ? 'bg-amber-600 border-amber-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt.split('/')[1].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!file || isProcessing}
            className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span>Convert Image</span>
          </button>

          {convertedUrl && (
            <a
              href={convertedUrl}
              download={`converted-${file?.name.replace(/\.[^/.]+$/, '') || 'image'}.${extensionMap[targetFormat]}`}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-center block"
            >
              <Download className="w-4 h-4" />
              <span>Download Converted File</span>
            </a>
          )}
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[450px]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Preview</h3>
          <div className="flex-1 flex items-center justify-center my-4">
            {!preview ? (
              <div className="text-center py-16 space-y-3">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Upload an image to convert format</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
                  <span className="text-xs font-semibold text-slate-400">Original</span>
                  <div className="h-60 flex items-center justify-center overflow-hidden">
                    <img src={preview} alt="Original" className="max-h-full max-w-full object-contain rounded" />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2 text-center">
                  <span className="text-xs font-semibold text-amber-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Converted ({extensionMap[targetFormat].toUpperCase()})
                  </span>
                  <div className="h-60 flex items-center justify-center overflow-hidden">
                    {convertedUrl ? (
                      <img src={convertedUrl} alt="Converted" className="max-h-full max-w-full object-contain rounded" />
                    ) : (
                      <p className="text-xs text-slate-500">Click convert to see results</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
