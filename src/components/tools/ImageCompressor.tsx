import React, { useState, useRef } from 'react';
import { Upload, Minimize2, Download, RefreshCw, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
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
    setCompressedUrl(null);
    setPreview(URL.createObjectURL(selected));
  };

  const handleCompress = () => {
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
        setErrorMsg('Failed to process image canvas.');
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        setIsProcessing(false);
        if (blob) {
          setCompressedSize(blob.size);
          setCompressedUrl(URL.createObjectURL(blob));
        } else {
          setErrorMsg('Compression failed.');
        }
      }, 'image/jpeg', quality / 100);
    };
    img.onerror = () => {
      setIsProcessing(false);
      setErrorMsg('Failed to load image for compression.');
    };
    img.src = preview!;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const savings = file && compressedSize ? Math.max(0, Math.round((1 - compressedSize / file.size) * 100)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Lossless & Lossy Compression</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Image Compressor</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Reduce file size up to 80% while preserving visual clarity. Adjust quality level and compare instantly.
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
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Settings</h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 bg-slate-950/50 rounded-xl p-5 text-center cursor-pointer transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <Upload className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">{file ? file.name : 'Choose Image'}</p>
            <p className="text-xs text-slate-400">PNG, JPG, WebP</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">Quality Level</span>
              <span className="text-emerald-400 font-bold">{quality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <button
            onClick={handleCompress}
            disabled={!file || isProcessing}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Minimize2 className="w-4 h-4" />}
            <span>Compress Image</span>
          </button>

          {compressedUrl && (
            <a
              href={compressedUrl}
              download={`compressed-${file?.name || 'image.jpg'}`}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-center block"
            >
              <Download className="w-4 h-4" />
              <span>Download Compressed Image</span>
            </a>
          )}
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[450px]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Preview & Comparison</h3>
          </div>

          <div className="flex-1 flex items-center justify-center my-4">
            {!preview ? (
              <div className="text-center py-16 space-y-3">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Upload an image to test compression</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
                  <span className="text-xs font-semibold text-slate-400">Original ({file ? formatSize(file.size) : '0'})</span>
                  <div className="h-60 flex items-center justify-center overflow-hidden">
                    <img src={preview} alt="Original" className="max-h-full max-w-full object-contain rounded" />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2 text-center">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Compressed ({compressedSize ? formatSize(compressedSize) : 'Pending'})
                  </span>
                  <div className="h-60 flex items-center justify-center overflow-hidden">
                    {compressedUrl ? (
                      <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain rounded" />
                    ) : (
                      <p className="text-xs text-slate-500">Click compress to see results</p>
                    )}
                  </div>
                  {compressedSize > 0 && (
                    <p className="text-xs font-bold text-emerald-400">Saved {savings}% file size!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
