import React, { useState } from 'react';
import { ArrowLeft, X, FileDown, Loader2, Check, ExternalLink, Copy, BookOpen } from 'lucide-react';
import { UserManualInfo } from '../data/apps';
import { downloadPdfFile } from '../utils/navigation';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manual: UserManualInfo | null;
  appName: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  manual,
  appName
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !manual) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      await downloadPdfFile(manual.url, manual.fileName);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = manual.url.startsWith('http')
      ? manual.url
      : `${window.location.origin}${manual.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenNewTab = () => {
    window.open(manual.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#07111E] text-white animate-in fade-in duration-200">
      
      {/* 1. TOP STICKY NAVIGATION BAR - ALWAYS VISIBLE */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-[#0A192F] border-b border-amber-500/30 shadow-xl backdrop-blur-md">
        
        {/* Left: Prominent Back / Return to App Button */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            title="Quay trở lại ứng dụng Duy Anh Digital Lab"
          >
            <ArrowLeft className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Trở về app</span>
          </button>

          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-extrabold text-white truncate flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
              <span className="truncate">{manual.title}</span>
            </h2>
            <div className="text-[10px] sm:text-xs text-slate-400 truncate">
              {appName} • PDF • {manual.fileSize}
            </div>
          </div>
        </div>

        {/* Right Actions: Save PDF file & options */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Direct Download / Save File Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 shadow-emerald-600/30'
            }`}
            title="Lưu file PDF về điện thoại hoặc máy tính mà không làm mất trang web"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="hidden sm:inline">Đang lưu...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-white stroke-[3]" />
                <span>Đã lưu file!</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Lưu / Tải file PDF</span>
                <span className="sm:hidden">Lưu file</span>
              </>
            )}
          </button>

          {/* Copy Link Button (Desktop & Tablet) */}
          <button
            onClick={handleCopyLink}
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#0E223D] hover:bg-[#142C4C] text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Sao chép đường dẫn file PDF"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Đã chép link' : 'Chép link'}</span>
          </button>

          {/* Open in new tab (Desktop) */}
          <button
            onClick={handleOpenNewTab}
            className="hidden lg:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#0E223D] hover:bg-[#142C4C] text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Mở tài liệu sang tab riêng của trình duyệt"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            <span>Tab mới</span>
          </button>

          {/* Quick Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Đóng trình đọc sách HDSD"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. PDF VIEWER CONTENT AREA */}
      <main className="flex-1 w-full relative bg-[#07111E] overflow-hidden flex flex-col">
        <iframe
          src={`${manual.url}#view=FitH`}
          className="w-full flex-1 border-0 bg-slate-900"
          title={manual.title}
        />

        {/* 3. MOBILE BOTTOM FLOATING BAR - GUARANTEES ZERO-CONFUSION EXIT ON PHONES */}
        <div className="sm:hidden sticky bottom-0 z-40 p-3 bg-[#0A192F]/95 border-t border-slate-800 backdrop-blur-md flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 active:scale-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>← Đóng &amp; Quay lại ứng dụng</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-emerald-600 active:scale-95 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 cursor-pointer shrink-0"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Lưu PDF</span>
              </>
            )}
          </button>
        </div>
      </main>

    </div>
  );
};
