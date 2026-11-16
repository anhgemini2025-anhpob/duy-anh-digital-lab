import React, { useState } from 'react';
import {
  Sparkles, ExternalLink, ArrowRight, Play, Check, Copy,
  Plane, ShieldCheck, ShoppingBag, Package,
  Calculator, RefreshCw, Zap, Warehouse, FileCheck, Layers, Bot,
  AlertTriangle, CheckCircle2, ChevronRight, Clock, MapPin, Heart
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

// =========================================================================
// 🎬 LINK YOUTUBE GIỚI THIỆU VIETGO AI (6 KÝ 2 YÊU THƯƠNG):
// https://www.youtube.com/watch?v=wkHjx7Kb5Bo
// =========================================================================
export const VIETGO_YOUTUBE_URL = "https://www.youtube.com/watch?v=wkHjx7Kb5Bo";

// 5 Tính năng cốt lõi trình bày ngắn gọn, đẹp mắt, súc tích
export const VIETGO_KEY_FEATURES = [
  {
    icon: Calculator,
    title: "DIM Pricing Engine: Chống Sốc Cước Thể Tích",
    desc: "Tính toán song song trọng lượng thực và thể tích quy đổi (/5000, /6000). AI gợi ý đóng gói, hút chân không để giảm đến 40% cước phí gửi hàng.",
    badge: "Tính năng #1 • Giá Cước Chuẩn",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Compliance Engine: 5 Cấp Độ Kiểm Duyệt Hải Quan",
    desc: "Tự động tra cứu danh mục FDA, USDA và US CBP. Phân loại 5 trạng thái (Được phép, Hạn chế, Cấm, Cần FDA, Nghi ngờ), chặn đứng nguy cơ bị giữ hoặc tịch thu hàng.",
    badge: "Tính năng #2 • 100% An Toàn",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: ShoppingBag,
    title: "Personal Shopper: Mua Hộ Hàng Mỹ 2 Chiều",
    desc: "Hỗ trợ mua hộ từ Amazon, eBay, BestBuy, Costco, Walmart. Báo giá trọn gói theo tỷ giá công khai, lưu vết đơn mua thực tế (purchase records) không phụ phí ẩn.",
    badge: "Tính năng #3 • Mua Hộ Thông Minh",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Package,
    title: "End-to-End Tracking: Theo Dõi Toàn Trình",
    desc: "Kiểm soát kho 2 đầu (Oregon, Cali ⇆ SGN, HAN). Cân đo, chụp ảnh kiện hàng lúc nhận, cấp mã HAWB/MAWB và tích hợp chuyển phát tận cửa (FedEx, USPS, GHTK).",
    badge: "Tính năng #4 • Minh Bạch Tuyệt Đối",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: RefreshCw,
    title: "Sổ Cái Bất Biến & Hoàn Tiền 4 Mắt",
    desc: "Hệ thống Ledger ghi nhận toàn bộ biến động tài chính, đối soát cước phí, bảo hiểm hàng hóa minh bạch và quy trình phê duyệt hoàn tiền an toàn.",
    badge: "Tính năng #5 • Tài Chính Minh Bạch",
    color: "from-rose-500 to-pink-500"
  }
];

// Mốc thời gian các chương phim giới thiệu
export const VIETGO_VIDEO_CHAPTERS = [
  { time: "00:00", label: "Mở đầu · 6 Ký 2 Yêu Thương" },
  { time: "00:43", label: "Little Saigon & Kiều Bào Mỹ" },
  { time: "02:59", label: "Gom hàng tuyến tỉnh" },
  { time: "07:56", label: "Bay qua Thái Bình Dương" },
  { time: "10:00", label: "Giới thiệu VietGo AI", highlight: true },
  { time: "11:08", label: "Trải nghiệm ứng dụng" }
];

interface VietgoShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
}

export const VietgoShowcaseSection: React.FC<VietgoShowcaseSectionProps> = ({
  onSelectApp,
  apps = []
}) => {
  const vietgoApp = apps.find(a => a.id === 'vietgo' || a.id === 'vietshiper');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Active youtube url: priorities constant first, then app.youtubeUrl if set
  const activeYoutubeUrl = VIETGO_YOUTUBE_URL || vietgoApp?.youtubeUrl;

  // Đường link chính thức chuẩn xác của VietGo AI
  const appUrl = "https://vietshiper.vercel.app/";

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section 
      id="vietgo-showcase" 
      className="relative overflow-hidden py-14 sm:py-20 border-b border-sky-500/25 bg-gradient-to-b from-[#050D1A] via-[#09172E] to-[#07111E]"
    >
      {/* Background Ambience Subtle Sky Blue & Amber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-blue-600/15 via-sky-500/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. HEADER SECTION (Trình bày ngắn gọn, súc tích, sang trọng) */}
        {/* ================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12 sm:mb-16">
          
          {/* Top Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-sky-500/15 to-amber-500/15 border border-sky-400/40 text-sky-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-lg shadow-sky-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI LOGISTICS &amp; PERSONAL SHOPPING VIỆT NAM ⇆ HOA KỲ • ỨNG DỤNG MỚI</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            VietGo AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-yellow-400">— Giao Nhận &amp; Mua Hộ Mỹ - Việt</span>
          </h2>

          {/* Tagline / Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Nền tảng công nghệ logistics hai chiều kết nối trực tiếp Việt Nam ⇆ Hoa Kỳ: <strong className="text-amber-300 font-bold">Tính cước chuẩn xác</strong> chống sốc thể tích, kiểm duyệt hải quan FDA/CBP an toàn 100%, tra cứu hành trình toàn trình và mua hộ hàng Mỹ minh bạch.
          </p>

          {/* Slogan Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-sky-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Chống Sốc Thể Tích DIM
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% An Toàn Hải Quan FDA
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-amber-400 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              Tracking Toàn Trình 2 Đầu
            </span>
          </div>

          {/* Action Buttons: Direct Links & Modal */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {/* Primary Link Button: https://vietshiper.vercel.app/ */}
            <a
              href={appUrl}
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(appUrl, e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Plane className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Truy cập ứng dụng VietGo AI</span>
              <ExternalLink className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </a>

            {/* Copy Link Pill for vietshiper.vercel.app */}
            <button
              onClick={(e) => handleCopyLink(appUrl, e)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-[#0E223D] border border-slate-700 hover:border-amber-400/50 hover:bg-[#142C4C] transition-all cursor-pointer shadow-md"
              title="Sao chép đường link ứng dụng VietGo AI"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-extrabold">Đã sao chép link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-amber-300">vietshiper.vercel.app</span>
                </>
              )}
            </button>

            {/* View Full Details Modal Button */}
            {vietgoApp && (
              <button
                onClick={() => onSelectApp(vietgoApp, 'image')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-sky-300 bg-sky-950/40 border border-sky-500/40 hover:border-sky-400 hover:bg-sky-900/30 transition-all cursor-pointer"
              >
                <span>Xem chi tiết tính năng</span>
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. KHUNG VIDEO YOUTUBE GIỚI THIỆU PHIM 6 KÝ 2 YÊU THƯƠNG */}
        {/* ================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B1A2F] border-2 border-sky-500/40 shadow-2xl shadow-sky-500/20 overflow-hidden">
            
            {/* Top Toolbar of Video Box */}
            <div className="px-5 py-3 bg-[#07111E] border-b border-sky-500/30 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                  Phim Hoạt Hình "6 Ký 2 Yêu Thương" · Giới Thiệu Ứng Dụng VietGo AI
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wider">
                  Đang phát
                </span>
              </div>

              <a
                href={activeYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5"
              >
                <span>Mở trên YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Player 16:9 */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <iframe
                src={getYouTubeEmbedUrl(activeYoutubeUrl)}
                title="6 Ký 2 Yêu Thương - Giới thiệu VietGo AI"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Chapters Quick Jump Navigation */}
            <div className="p-3.5 sm:p-4 bg-[#07111E] border-t border-sky-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs">Chương nổi bật:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {VIETGO_VIDEO_CHAPTERS.map((ch, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border ${
                      ch.highlight 
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 font-bold' 
                        : 'bg-slate-900/80 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span className="text-amber-400">{ch.time}</span>
                    <span>{ch.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Video Footer info */}
            <div className="px-4 py-3 bg-[#06101D] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Tuyến vận chuyển: Sài Gòn / Hà Nội ⇆ California / Oregon / Texas (Mỹ)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">100% Tuân thủ tiêu chuẩn FDA &amp; US CBP</span>
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
              Các Tính Năng Trọng Yếu Của VietGo AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Giải quyết triệt để nỗi đau sốc cước thể tích, kiểm duyệt hải quan và quản trị đơn hàng hai chiều
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIETGO_KEY_FEATURES.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-[#0B1A2F] border border-slate-700/80 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        {feature.badge}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500/20 to-amber-500/20 border border-sky-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {feature.title}
                    </h4>

                    {/* Description (ngắn gọn, súc tích) */}
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
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 via-[#0B1A2F] to-[#0E223D] border border-amber-400/40 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    Thương Thì Gửi · Nhớ Thì Về
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Trải Nghiệm VietGo AI Ngay Hôm Nay
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dễ dàng tính toán cước phí, kiểm tra danh mục hàng gửi đi Mỹ và theo dõi từng kiện hàng qua Thái Bình Dương chỉ với vài thao tác.
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
                  <span>Mở vietshiper.vercel.app</span>
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
