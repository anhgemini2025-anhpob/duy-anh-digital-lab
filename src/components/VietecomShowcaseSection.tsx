import React, { useState } from 'react';
import {
  Sparkles, ExternalLink, ArrowRight, Play, Check, Copy,
  TrendingUp, ShieldCheck, ShoppingCart, MessageSquare,
  BarChart3, RefreshCw, Zap, Store, FileCheck, Layers, Bot,
  AlertTriangle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

// =========================================================================
// 🎬 Ô DÁN LINK YOUTUBE GIỚI THIỆU VIETECOM:
// Dán link YouTube giới thiệu VietEcom vào đây (Ví dụ: "https://www.youtube.com/watch?v=...")
// Khi dán link vào biến này, video sẽ tự động phát trực tiếp trên landing page!
// =========================================================================
export const VIETECOM_YOUTUBE_URL = "";

// 5 Tính năng cốt lõi trình bày ngắn gọn, gọn nhẹ
export const VIETECOM_KEY_FEATURES = [
  {
    icon: TrendingUp,
    title: "Profit Engine: Tính Ngược Lợi Nhuận",
    desc: "Nhập mục tiêu lãi ròng ➔ AI tự tính số đơn, doanh số, phí sàn (8-14%), phí hoàn hủy, thuế và ngân sách Ads tối đa.",
    badge: "Tính năng #1 • Tài chính",
    color: "from-amber-500 to-emerald-500"
  },
  {
    icon: Bot,
    title: "AI Copilot & Chuỗi Nỗi Đau Bán Hàng",
    desc: "Phương pháp chuẩn hóa: Keyword ➔ Nguyên nhân ➔ Framework ➔ Prompt ➔ Công cụ ➔ KPI theo từng ngành hàng thực chiến.",
    badge: "Tính năng #2 • AI Chiến lược",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: ShieldCheck,
    title: "Compliance Center: Quét Sạch Rủi Ro",
    desc: "Kiểm duyệt từ ngữ cấm trên TikTok Shop, Shopee, Meta Ads và Luật Quảng cáo VN (Nghị định 38/2021) trước khi đăng.",
    badge: "Tính năng #3 • 100% An toàn",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: BarChart3,
    title: "Ads Doctor & Chỉ Số POAS",
    desc: "Bắt bệnh chỉ số quảng cáo CTR, CPC, CVR, ROAS/POAS theo thời gian thực; gợi ý phân bổ ngân sách tối ưu lợi nhuận.",
    badge: "Tính năng #4 • Bắt bệnh Ads",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: RefreshCw,
    title: "CRM RFM & Vận Hành Đa Kênh",
    desc: "Hộp thư hội thoại tập trung, phân nhóm khách hàng VIP/nguy cơ, lịch nội dung tự động và cảnh báo tồn kho an toàn (ROP).",
    badge: "Tính năng #5 • Vận hành",
    color: "from-rose-500 to-amber-500"
  }
];

interface VietecomShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
}

export const VietecomShowcaseSection: React.FC<VietecomShowcaseSectionProps> = ({
  onSelectApp,
  apps = []
}) => {
  const vietecomApp = apps.find(a => a.id === 'vietecom');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewTestUrl, setPreviewTestUrl] = useState<string>('');

  // Active youtube url: priorities constant first, then app.youtubeUrl if set, then manual preview test
  const activeYoutubeUrl = VIETECOM_YOUTUBE_URL || vietecomApp?.youtubeUrl || previewTestUrl;

  const appUrl = "https://vietecom.vercel.app";

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section 
      id="vietecom-showcase" 
      className="relative overflow-hidden py-14 sm:py-20 border-b border-indigo-500/25 bg-gradient-to-b from-[#060F1E] via-[#0B1A33] to-[#07111E]"
    >
      {/* Background Ambience Subtle Indigo & Cyan Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-indigo-500/15 via-cyan-500/10 to-emerald-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. HEADER SECTION (Trình bày ngắn gọn, súc tích, sang trọng) */}
        {/* ================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12 sm:mb-16">
          
          {/* Top Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/15 via-cyan-500/15 to-emerald-500/15 border border-indigo-400/40 text-indigo-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI COMMERCE &amp; SOCIAL SELLING VIỆT NAM • ỨNG DỤNG MỚI</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            VietEcom <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">— AI Business Copilot</span>
          </h2>

          {/* Tagline / Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Trợ lý AI toàn diện cho người bán hàng online tại Việt Nam: <strong className="text-amber-300 font-bold">Tính ngược lợi nhuận</strong> bằng Profit Engine, kiểm duyệt chính sách an toàn 100%, và vận hành đa kênh tự động.
          </p>

          {/* Slogan Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-amber-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Lợi Nhuận Thật
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              An Toàn Chính Sách
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Tự Động Hóa Đa Kênh
            </span>
          </div>

          {/* Action Buttons: Direct Link & Modal */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {/* Primary Link Button to Live App */}
            <a
              href={appUrl}
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(appUrl, e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Truy cập ứng dụng VietEcom</span>
              <ExternalLink className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </a>

            {/* Copy Link Pill */}
            <button
              onClick={(e) => handleCopyLink(appUrl, e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-[#0E223D] border border-slate-700 hover:border-amber-400/50 hover:bg-[#142C4C] transition-all cursor-pointer shadow-md"
              title="Sao chép đường link ứng dụng"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-extrabold">Đã sao chép link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-amber-300">vietecom.vercel.app</span>
                </>
              )}
            </button>

            {/* View Full Details Modal Button */}
            {vietecomApp && (
              <button
                onClick={() => onSelectApp(vietecomApp, 'image')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all cursor-pointer"
              >
                <span>Xem chi tiết tính năng</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CHỖ GẮN LINK YOUTUBE & VIDEO PLAYER CHUẨN 16:9 */}
        {/* ================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B1A2F] border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/20 overflow-hidden">
            
            {/* Top Toolbar of Video Box */}
            <div className="px-5 py-3 bg-[#07111E] border-b border-indigo-500/30 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                  {activeYoutubeUrl ? 'Video Giới Thiệu VietEcom (YouTube)' : 'Khung Video YouTube Giới Thiệu VietEcom'}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wider">
                  {activeYoutubeUrl ? 'Đang phát' : 'Chỗ Gắn Link YouTube'}
                </span>
              </div>

              {activeYoutubeUrl && (
                <a
                  href={activeYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5"
                >
                  <span>Mở trên YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Video Player or Placeholder Spot */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              {activeYoutubeUrl ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeYoutubeUrl)}
                  title="Video Giới thiệu VietEcom AI"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                /* Elegant Interactive Placeholder Box */
                <div className="p-6 sm:p-10 text-center max-w-xl mx-auto space-y-4">
                  {/* YouTube Red Icon Badge */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-red-600/20 border-2 border-red-500/50 flex items-center justify-center text-red-500 shadow-xl shadow-red-500/20">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 fill-current ml-1" />
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-white">
                    Chỗ Để Gắn Link YouTube Giới Thiệu VietEcom
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khung phát video chuẩn 16:9 đã được cấu hình sẵn sàng. Dán link video YouTube vào biến <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-xs border border-amber-400/30">VIETECOM_YOUTUBE_URL</code> trong file <code className="text-amber-300 font-mono">VietecomShowcaseSection.tsx</code> hoặc <code className="text-amber-300 font-mono">apps.ts</code>, clip sẽ <strong className="text-amber-400">tự động hiển thị và phát trực tiếp tại vị trí này</strong>.
                  </p>

                  {/* Quick Test / Paste input on page */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="Dán thử link YouTube (https://www.youtube.com/watch?v=...)"
                      value={previewTestUrl}
                      onChange={(e) => setPreviewTestUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    {previewTestUrl && (
                      <button
                        onClick={() => setPreviewTestUrl('')}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Video Footer info */}
            <div className="p-4 bg-[#07111E] border-t border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-400" />
                <span>Nền tảng mục tiêu: TikTok Shop, Shopee, Facebook Reels, Zalo Mini App</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">100% API &amp; Chính Sách Chính Thức</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. 5 TÍNH NĂNG CỐT LÕI (NGẮN GỌN, GỌN NHẸ, SÚC TÍCH) */}
        {/* ================================================================= */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Các Tính Năng Trọng Yếu Của VietEcom
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Thiết kế tinh gọn, tập trung vào hiệu quả kinh doanh và kiểm soát rủi ro thực tế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIETECOM_KEY_FEATURES.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-[#0B1A2F] border border-slate-700/80 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {feature.badge}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {feature.title}
                    </h4>

                    {/* Description (ngắn gọn, gọn nhẹ) */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Bottom subtle accent line */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span>Đã thử nghiệm thực tế</span>
                    <span className="text-emerald-400">✓ Sẵn sàng</span>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Call to action card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-[#0B1A2F] to-[#0E223D] border border-amber-400/40 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  Bắt Đầu Ngay
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Trải Nghiệm VietEcom Ngay Hôm Nay
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Đầy đủ chế độ Demo và dữ liệu mẫu để bạn thử nghiệm tính ngược lợi nhuận và kiểm duyệt chính sách trước khi áp dụng vào shop thực tế.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={appUrl}
                  target={isMobileOrWebview() ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp(appUrl, e)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition-all cursor-pointer"
                >
                  <span>Mở vietecom.vercel.app</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
