import React, { useState } from 'react';
import {
  Sparkles, ExternalLink, ArrowRight, Play, Check, Copy,
  Home, Calculator, Table2, Wand2, Scale, FileText, CloudSun,
  ShieldCheck, CheckCircle2, ChevronRight, Layers, FileSpreadsheet
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

// =========================================================================
// 🎬 Ô DÁN LINK YOUTUBE GIỚI THIỆU VIETHOME AI:
// Sau này có link YouTube, bạn chỉ cần dán URL vào biến dưới đây.
// Ví dụ: const VIETHOME_YOUTUBE_URL = "https://www.youtube.com/watch?v=XXXXXXXXXXX";
// Khi để trống (""), hệ thống sẽ tự động hiển thị khung chờ (placeholder) nhẹ nhàng, trang nhã.
// =========================================================================
const VIETHOME_YOUTUBE_URL = "https://www.youtube.com/watch?v=2mxqCjFARIk";

// 7 Bước vòng đời công trình chuẩn hóa của Viethome AI
export const VIETHOME_STEPS = [
  { step: 1, name: "Phỏng vấn", desc: "Nhu cầu & thế đất", icon: Home },
  { step: 2, name: "Hồ sơ", desc: "Quy chuẩn & thông số", icon: CheckCircle2 },
  { step: 3, name: "Dự toán", desc: "Suất vốn Bộ Xây dựng", icon: Calculator },
  { step: 4, name: "BOQ", desc: "Bóc tách khối lượng", icon: Table2 },
  { step: 5, name: "Nhập giá Excel", desc: "Đồng bộ 2 chiều", icon: FileSpreadsheet },
  { step: 6, name: "Prompt 3D", desc: "May đo phối cảnh", icon: Wand2 },
  { step: 7, name: "Báo cáo", desc: "Xuất PDF in ấn", icon: FileText }
];

// 6 Tính năng cốt lõi trình bày đơn giản, ngắn gọn, nhẹ nhàng
export const VIETHOME_HIGHLIGHT_FEATURES = [
  {
    icon: Home,
    title: "Khảo sát nhu cầu thông minh",
    desc: "Trả lời vài câu hỏi ngắn về kích thước đất, số tầng, hẻm xe — AI phân tích và đề xuất cơ cấu công năng tối ưu cho gia đình.",
    badge: "Bước 1 & 2"
  },
  {
    icon: Calculator,
    title: "Dự toán minh bạch có nguồn",
    desc: "Tính diện tích quy đổi m², tự động đối chiếu suất vốn đầu tư Bộ Xây dựng (QĐ 425/QĐ-BXD) và VAT, rõ ràng từng con số.",
    badge: "Bước 3"
  },
  {
    icon: Table2,
    title: "Bóc tách BOQ & Đồng bộ Excel",
    desc: "Tự động lập bảng khối lượng chi tiết từng hạng mục. Hỗ trợ tải về và nhập lại file Excel 2 chiều giữ nguyên công thức.",
    badge: "Bước 4 & 5"
  },
  {
    icon: Wand2,
    title: "Prompt 3D may đo thực tế",
    desc: "Tự sinh câu lệnh mô tả chuẩn xác đúng kích thước thực để vẽ phối cảnh 3D ngoại thất và nội thất phòng khách, bếp, ngủ.",
    badge: "Bước 6"
  },
  {
    icon: Scale,
    title: "Căn cứ pháp lý & Cảnh báo bẫy",
    desc: "Cập nhật Luật Xây dựng 2025, nhận diện các bẫy hợp đồng thi công phổ biến và cảnh báo nguy cơ đội vốn phát sinh.",
    badge: "Pháp lý & Hợp đồng"
  },
  {
    icon: CloudSun,
    title: "Báo cáo PDF & Tiện ích công trường",
    desc: "Xuất hồ sơ dự toán hoàn chỉnh in ấn/lưu trữ; tích hợp tiện ích dự báo thời tiết công trình tránh các ngày mưa khi đổ bê tông.",
    badge: "Bước 7 & Tiện ích"
  }
];

interface ViethomeShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
}

export const ViethomeShowcaseSection: React.FC<ViethomeShowcaseSectionProps> = ({
  onSelectApp,
  apps = []
}) => {
  const viethomeApp = apps.find(a => a.id === 'viethome-ai');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Active youtube url: priorities constant first, then app.youtubeUrl if set
  const activeYoutubeUrl = VIETHOME_YOUTUBE_URL || viethomeApp?.youtubeUrl || "";

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section 
      id="viethome-showcase" 
      className="relative overflow-hidden py-14 sm:py-20 border-b border-amber-500/25 bg-gradient-to-b from-[#060E18] via-[#0A1A2F] to-[#07111E]"
    >
      {/* Background Ambience Subtle architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-amber-600/10 via-yellow-500/10 to-amber-700/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. HEADER SECTION (Format nhẹ nhàng, ngắn gọn, súc tích) */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3.5 shadow-sm">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>VIETHOME AI • TRỢ LÝ AI QUẢN LÝ THI CÔNG &amp; DỰ TOÁN NHÀ PHỐ</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Viethome AI — Biết Rõ Chi Phí Xây Nhà Trước Khi Đặt Bút Ký
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Nền tảng AI đồng hành cùng gia chủ xây nhà dân dụng: <strong>Minh bạch • Có nguồn số liệu • Không đoán mò</strong>. Hoạch định ngân sách theo suất vốn Bộ Xây dựng, bóc tách BOQ, đồng bộ Excel 2 chiều và tạo prompt 3D may đo.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://viethomeai.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://viethomeai.vercel.app', e)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Truy Cập Ứng Dụng: viethomeai.vercel.app</span>
              <ExternalLink className="w-4 h-4 text-slate-950" />
            </a>

            {viethomeApp && (
              <button
                onClick={() => onSelectApp(viethomeApp)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0B1E38] border border-amber-400/40 hover:border-amber-400 hover:bg-[#0E2850] transition-all cursor-pointer"
              >
                <span>Xem Thông Tin Chi Tiết</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. 7 BƯỚC VÒNG ĐỜI CÔNG TRÌNH (Trình bày nhẹ nhàng, tuần tự) */}
        {/* ================================================================= */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#091B33]/80 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Quy trình 7 bước khép kín — Từ ý tưởng đến hồ sơ hoàn chỉnh
              </span>
              <span className="text-slate-400 font-mono hidden sm:inline">Chuẩn hóa TCVN &amp; Suất vốn BXD</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {VIETHOME_STEPS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div 
                    key={s.step} 
                    className="p-2.5 rounded-xl bg-[#061427]/80 border border-slate-700/60 hover:border-amber-400/50 transition-colors text-center flex flex-col items-center justify-between"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center font-bold text-xs mb-1.5 border border-amber-400/30">
                      {idx + 1}
                    </div>
                    <div className="font-bold text-xs text-white leading-tight mb-0.5">{s.name}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. 6 TÍNH NĂNG CỐT LÕI (Đơn giản, ngắn gọn, format nhẹ nhàng) */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-6xl mx-auto">
          {VIETHOME_HIGHLIGHT_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#091C35]/90 border border-slate-700/80 hover:border-amber-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#071324] border border-slate-700 text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 4. Ô CHỜ YOUTUBE LINK (Chừa 1 chỗ để sau này link với YouTube) */}
        {/* ================================================================= */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#081B34] border-2 border-amber-500/35 shadow-xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Video Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>VIDEO GIỚI THIỆU VIETHOME AI</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/40 uppercase">
                      YouTube Video
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Trực quan hóa quy trình dự toán chi phí &amp; quản lý thi công nhà phố
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  {activeYoutubeUrl ? 'ĐÃ NHÚNG VIDEO' : 'Ô CHỜ DÁN LINK YOUTUBE'}
                </span>
              </div>
            </div>

            {/* Video Player OR Clean Placeholder Box */}
            {activeYoutubeUrl ? (
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border-2 border-amber-500/50 shadow-amber-500/10">
                  <iframe
                    src={getYouTubeEmbedUrl(activeYoutubeUrl)}
                    title="MÁI NHÀ TRÊN BẢN NHÁP | Phóng sự: Tổng hợp các nỗi đau khi xây, sửa nhà - Viethome AI"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Video Info Strip */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-amber-300">🎬 Đang phát phóng sự / video giới thiệu:</span>
                    <span className="text-slate-300 truncate max-w-xs sm:max-w-md">MÁI NHÀ TRÊN BẢN NHÁP • Tổng hợp các nỗi đau khi xây, sửa nhà</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={activeYoutubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-red-300 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Mở trên YouTube</span>
                    </a>
                    <a
                      href="https://viethomeai.vercel.app"
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp('https://viethomeai.vercel.app', e)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Trải Nghiệm Ứng Dụng</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Awaiting YouTube link - clean, gentle placeholder */
              <div className="p-8 sm:p-10 rounded-2xl bg-[#061224] border-2 border-dashed border-amber-500/35 text-center relative overflow-hidden group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/25 to-red-500/15 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40 shadow-lg shadow-amber-600/15 group-hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 text-amber-400" />
                </div>

                <div className="mt-4 max-w-lg mx-auto space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-xs font-mono font-bold text-amber-300">
                    🎬 Ô DÀNH SẴN CHO YOUTUBE INTRO LINK
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Video Clip Trải Nghiệm Dự Toán &amp; Quản Lý Viethome AI
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khung phát video YouTube đã được thiết lập sẵn sàng. Khi cập nhật đường link giới thiệu, clip hướng dẫn dự toán nhà phố và bóc tách BOQ sẽ lập tức hiển thị và phát trực tiếp tại đây.
                  </p>
                </div>

                {/* Video Topics Preview */}
                <div className="mt-5 max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-amber-400 block mb-0.5">Phần 1</span>
                    <span className="text-xs text-slate-200">Khảo sát &amp; Suất vốn BXD</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-sky-400 block mb-0.5">Phần 2</span>
                    <span className="text-xs text-slate-200">BOQ &amp; Đồng bộ Excel</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">Phần 3</span>
                    <span className="text-xs text-slate-200">Prompt 3D &amp; Phát sinh</span>
                  </div>
                </div>

                {/* Direct Action inside box */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://viethomeai.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://viethomeai.vercel.app', e)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md cursor-pointer transition-colors"
                  >
                    <span>Trải Nghiệm Viethome AI Ngay</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleCopyLink('https://viethomeai.vercel.app', e)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer transition-colors"
                  >
                    {copiedUrl === 'https://viethomeai.vercel.app' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Đã chép link</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sao chép link web</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
