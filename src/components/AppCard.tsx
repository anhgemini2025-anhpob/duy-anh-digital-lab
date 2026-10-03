import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Plus, Check, Image as ImageIcon, Video, Sparkles, ShieldCheck, FileDown } from 'lucide-react';
import { AppItem } from '../data/apps';
import { AppMockupVisual } from './AppMockupVisual';
import { openExternalApp, isMobileOrWebview, downloadPdfFile } from '../utils/navigation';

interface AppCardProps {
  app: AppItem;
  index?: number;
  onSelectApp: (app: AppItem, initialTab?: 'image' | 'video') => void;
  onToggleRequest: (app: AppItem) => void;
  isRequested: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  index,
  onSelectApp,
  onToggleRequest,
  isRequested
}) => {
  const [viewMode, setViewMode] = useState<'image' | 'video'>('image');

  return (
    <div 
      onClick={() => onSelectApp(app)}
      className="group flex flex-col rounded-2xl sm:rounded-3xl bg-[#0B1A2F] border border-slate-700/80 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden cursor-pointer"
    >
      
      {/* 1. VISUAL & VIDEO CLIP HEADER (Aspect Ratio 16:10) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
        
        {/* Top-Left Index & Demo Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 flex-wrap">
          {index !== undefined && (
            <span className="px-2 py-0.5 rounded-lg bg-[#07111E]/95 border border-amber-400/40 text-xs font-mono font-black text-amber-300 shadow-md">
              #{String(index).padStart(2, '0')}
            </span>
          )}
          {app.demoCredential && (
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>TK Demo</span>
            </span>
          )}
          {app.userManual && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] flex items-center gap-1 border border-emerald-500/40 shadow-md backdrop-blur-md">
              <FileDown className="w-3 h-3 text-emerald-400" />
              <span>Có HDSD</span>
            </span>
          )}
        </div>

        {/* View Mode Switcher: [Ảnh giao diện] / [Video Clip] */}
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center bg-[#07111E]/95 backdrop-blur-md rounded-xl p-0.5 border border-slate-700 shadow-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('image');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'image'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hình ảnh</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('video');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'video'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Clip</span>
          </button>
        </div>

        {/* MOCKUP VISUAL OR INTERACTIVE VIDEO */}
        <AppMockupVisual
          app={app}
          mode={viewMode}
          onOpenDetails={() => onSelectApp(app)}
        />
      </div>

      {/* 2. CARD CONTENT CONTAINER */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-[#0B1A2F]">
        <div>
          {/* CATEGORY & FEATURED BADGE */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border bg-amber-400/10 text-amber-300 border-amber-400/30">
              {app.category}
            </span>
            {app.featured && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 font-extrabold border border-amber-400/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured
              </span>
            )}
          </div>

          {/* APP HEADER WITH LOGO & TITLE */}
          <div className="flex items-start gap-3.5 mb-2.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#0E223D] border border-amber-400/30 shadow-md p-1.5 flex items-center justify-center group-hover:scale-105 group-hover:border-amber-400 transition-all">
              <img 
                src={app.logoUrl} 
                alt={`${app.name} logo`} 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1"
                title={app.name}
              >
                {app.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-300/90 font-semibold truncate mt-0.5">
                {app.audience}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base text-slate-200 mt-2 line-clamp-2 leading-relaxed">
            {app.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {app.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0E223D] text-slate-300 border border-slate-700/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3. CARD ACTIONS */}
        <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-amber-400 group-hover:text-amber-300 transition-colors">
              <span>Xem chi tiết</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </span>

            <a
              href={app.url}
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(app.url, e)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-amber-300 bg-[#0E223D] hover:bg-[#142C4C] px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-amber-400/50 transition-colors cursor-pointer"
              title={`Mở trực tiếp ${app.url}`}
            >
              <span>Mở Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {app.userManual && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (app.userManual) {
                    await downloadPdfFile(app.userManual.url, app.userManual.fileName);
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-white bg-emerald-950/60 hover:bg-emerald-600 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 transition-all cursor-pointer shadow-xs active:scale-95"
                title={`Tải sách hướng dẫn sử dụng PDF (${app.userManual.fileSize}) về máy`}
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Tải HDSD</span>
              </button>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleRequest(app);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isRequested
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#0E223D] hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-amber-400'
            }`}
          >
            {isRequested ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ Yêu cầu</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
