import React, { useState } from 'react';
import { 
  Sparkles, ExternalLink, ArrowRight, Rocket, Check, Plus, 
  Video, Image as ImageIcon, Bot, ShieldCheck, 
  FileText, DollarSign, Award, Store, Languages, Flame,
  Star, Zap, Trophy, Play, CheckCircle2, RefreshCw
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

interface VietnailShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
  onToggleRequest?: (app: AppItem) => void;
  isAppRequested?: (appId: string) => boolean;
}

export const VietnailShowcaseSection: React.FC<VietnailShowcaseSectionProps> = ({
  onSelectApp,
  apps = [],
  onToggleRequest,
  isAppRequested
}) => {
  const vietnailApp = apps.find(a => a.id === 'vietnail-guide') || apps[0];
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);

  // 8 Tính năng cốt lõi (Gắn icon bắt mắt, màu sắc riêng biệt, ngắn gọn, súc tích)
  const coreFeatures = [
    {
      idx: 0,
      badge: "Tính năng 1",
      icon: Trophy,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/20 border-amber-400/50",
      tag: "Song ngữ Việt - Anh",
      title: "Học Nghề & Luyện Thi Bằng Nail (State Board)",
      shortTitle: "Luyện Thi Bằng Nail",
      desc: "Ngân hàng câu hỏi trắc nghiệm lý thuyết song ngữ Việt - Anh bám sát cấu trúc đề thi thật của Hội đồng Thẩm mỹ (State Board) các tiểu bang.",
      screen: "/apps/vietnail/feature_01_luyen_thi_bang_nail.png"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      icon: RefreshCw,
      iconColor: "text-sky-400",
      iconBg: "bg-sky-500/20 border-sky-400/50",
      tag: "Đổi bằng CA, TX, FL, NY...",
      title: "Cấp Phép & Chuyển Đổi Bằng Tiểu Bang (Reciprocity)",
      shortTitle: "Chuyển Bằng Liên Bang",
      desc: "Hướng dẫn chi tiết thủ tục, hồ sơ và điều kiện đổi bằng giữa các tiểu bang (CA, TX, FL, NY, GA...) mà không cần phải học lại từ đầu.",
      screen: "/apps/vietnail/feature_02_chuyen_doi_bang_tieu_bang.png"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      icon: Store,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/20 border-emerald-400/50",
      tag: "A-Z Pháp lý & Mặt bằng",
      title: "Mở Tiệm Nail & Vận Hành Kinh Doanh Salon",
      shortTitle: "Mở Tiệm Salon",
      desc: "Trọn bộ quy trình xin giấy phép Salon, đăng ký kinh doanh, hợp đồng thuê mặt bằng, tiêu chuẩn cơ sở vật chất và quản trị thợ.",
      screen: "/apps/vietnail/feature_03_mo_tiem_nail_salon.png"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      icon: DollarSign,
      iconColor: "text-lime-400",
      iconBg: "bg-lime-500/20 border-lime-400/50",
      tag: "Chuẩn IRS & Tối ưu Tip",
      title: "Quản Lý Thu Chi & Tối Ưu Thuế (W-2 vs 1099)",
      shortTitle: "Thu Chi & Thuế 1099",
      desc: "Phân biệt rõ ràng thợ ăn lương W-2 và thợ độc lập 1099; theo dõi tiền tip, chi phí khấu trừ đồ nghề và chuẩn bị sổ sách kế toán tránh bị IRS phạt.",
      screen: "/apps/vietnail/feature_04_thu_chi_thue_w2_1099.png"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      icon: ShieldCheck,
      iconColor: "text-rose-400",
      iconBg: "bg-rose-500/20 border-rose-400/50",
      tag: "Tránh phạt thanh tra đột xuất",
      title: "An Toàn & Vệ Sinh Chuẩn State Board / OSHA",
      shortTitle: "An Toàn & Vệ Sinh",
      desc: "Quy chuẩn khử trùng tiệt trùng dụng cụ, bảo hộ lao động, thông gió hút bụi hóa chất và bảng kiểm sẵn sàng đón đợt thanh tra đột xuất.",
      screen: "/apps/vietnail/feature_05_an_toan_ve_sinh_state_board.png"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      icon: FileText,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/20 border-indigo-400/50",
      tag: "Booth Rental in sẵn",
      title: "Biểu Mẫu Song Ngữ & Hợp Đồng In Sẵn",
      shortTitle: "Biểu Mẫu & Hợp Đồng",
      desc: "Mẫu hợp đồng thuê bàn ghế (Booth Rental Agreement), thỏa thuận thợ ăn chia, phiếu miễn trừ trách nhiệm và tư vấn khách hàng song ngữ.",
      screen: "/apps/vietnail/feature_06_bieu_mau_hop_dong_in_san.png"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      icon: Languages,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/20 border-cyan-400/50",
      tag: "Giao tiếp với khách Mỹ",
      title: "Tiếng Anh Giao Tiếp Thực Chiến Tại Bàn Nail",
      shortTitle: "Tiếng Anh Tại Bàn",
      desc: "Tổng hợp các mẫu câu hội thoại thực tế: từ chào hỏi, tư vấn mẫu móng, hỏi ý kiến độ dài/màu sắc đến giải quyết phàn nàn của khách Mỹ.",
      screen: "/apps/vietnail/feature_07_tieng_anh_giao_tiep_tai_ban.png"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      icon: Bot,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20 border-purple-400/50",
      tag: "Giọng nói & Gõ chữ 24/7",
      title: "Trợ Lý AI Hỏi Đáp Bằng Giọng Nói & Chữ 24/7",
      shortTitle: "Trợ Lý AI Voice",
      desc: "Tra cứu quy định pháp lý, giải đáp thắc mắc nghề nghiệp tức thì bằng giọng nói tiếng Việt hoặc gõ chữ — đồng hành cùng người làm nail 24/7.",
      screen: "/apps/vietnail/cover.png"
    }
  ];

  const currentFeature = coreFeatures[activeFeatureIdx] || coreFeatures[0];
  const isRequested = Boolean(vietnailApp && isAppRequested && isAppRequested(vietnailApp.id));

  return (
    <section id="vietnail-showcase" className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-amber-500/30 bg-gradient-to-b from-[#07111E] via-[#091A33] to-[#07111E]">
      {/* Background Ambience & Red/Blue/Gold Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-amber-500/15 to-red-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner: Official Portfolio & Category Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-sm">
              <img 
                src="/logo.jpg" 
                alt="Duy Anh Digital Lab" 
                className="w-7 h-7 rounded-xl object-cover border border-amber-400/50"
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Official Portfolio</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono">Web Apps &amp; AI Systems</div>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">10 Nhóm Ngành</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">30+ Ứng Dụng</span>
            </div>
          </div>

          {/* EYE-CATCHING NEW RELEASE FLASH PILL */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 border-2 border-yellow-200">
            <Flame className="w-4 h-4 text-slate-950 fill-current animate-bounce" />
            <span className="uppercase tracking-wider">🔥 PHÁT HÀNH MỚI NHẤT • ĐẦU TRANG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            <span className="text-[11px] font-mono">LIVE PRODUCTION</span>
          </div>
        </div>

        {/* SECTION HERO HEADER: ULTRA EYE-CATCHING */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-4">
          
          {/* Attention Badge with Stars & Flags */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/90 via-slate-900/90 to-blue-950/90 border-2 border-amber-400/70 text-amber-300 text-xs sm:text-sm font-extrabold shadow-xl shadow-amber-500/10">
            <span className="text-base">💅</span>
            <span className="font-extrabold tracking-wide uppercase">CẨM NANG NGHỀ &amp; KINH DOANH NAIL TẠI MỸ CHO NGƯỜI VIỆT</span>
            <span className="text-base">🇺🇸</span>
          </div>

          {/* Big Radiant Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-md">
              VIETNAIL GUIDE AI
            </span>
            <span className="block text-xl sm:text-3xl lg:text-4xl text-slate-100 font-black mt-2">
              Cẩm Nang Nghề &amp; Quản Trị Tiệm Nail Tại Mỹ
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hệ thống cẩm nang số hóa toàn diện: Luyện thi bằng State Board – Chuyển bằng giữa các tiểu bang – Mở tiệm &amp; Tối ưu thuế W-2/1099 – Biểu mẫu song ngữ – Trợ lý AI hỏi đáp 24/7.
          </p>

          {/* Quick Tag Pills with Eye-Catching Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0B2447] border border-blue-400/40 text-blue-300 text-xs font-bold">
              <span>🇺🇸</span>
              <span>Dành cho thợ &amp; chủ nail tại Mỹ</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#081E15] border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Luyện thi State Board</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1E110A] border border-amber-400/40 text-amber-300 text-xs font-bold">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Chuyển bằng liên bang</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#1D0E1E] border border-purple-400/40 text-purple-300 text-xs font-bold">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Trợ lý AI Voice 24/7</span>
            </span>
          </div>
        </div>

        {/* MAIN SHOWCASE CONTAINER WITH GLOWING GOLD BORDER */}
        <div className="max-w-5xl mx-auto p-4 sm:p-7 bg-[#0A192F]/95 border-2 border-amber-400 rounded-3xl backdrop-blur-xl shadow-2xl shadow-blue-950 relative">
          
          {/* Top Bar: Brand, Status Badge & Media Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/50" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400 fill-current" />
                <span>TIÊU ĐIỂM DỊCH VỤ &amp; SALON NAIL • HOA KỲ</span>
              </span>
            </div>

            {/* View Mode Toggle: YouTube Video vs Feature Images */}
            <div className="flex items-center bg-[#07111E] rounded-xl p-1 border border-slate-700 shadow-md">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white font-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Xem khung video quảng cáo YouTube"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Clip Quảng Cáo YouTube</span>
              </button>

              <button
                onClick={() => setActiveTab('image')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Xem ảnh chụp các tính năng thực tế từ ứng dụng"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ảnh Tính Năng ({coreFeatures.length})</span>
              </button>
            </div>
          </div>

          {/* APP IDENTITY HEADER & DIRECT ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-950/90 rounded-2xl border border-amber-400/40 mb-5 shadow-xl">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0B2447] border-2 border-amber-400 p-1.5 shrink-0 shadow-lg shadow-amber-400/20 flex items-center justify-center">
                  <img 
                    src="/apps/vietnail/app-logo.svg" 
                    alt="VietNail Guide AI" 
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Floating "HOT" badge on logo */}
                <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-500 text-[9px] font-black text-white shadow-md uppercase">
                  MỚI
                </div>
              </div>

              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-2xl font-black text-white truncate">
                    VietNail Guide AI
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 bg-red-600/20 text-red-300 border border-red-500/40 font-mono font-bold rounded-md">
                    Cẩm Nang Nghề Mỹ
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-400 font-mono truncate mt-0.5 font-bold">
                  https://vietnail.vercel.app
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
              <a
                href="https://vietnail.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://vietnail.vercel.app', e)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-xl shadow-amber-400/30 transition-all cursor-pointer group"
                title="Mở trực tiếp https://vietnail.vercel.app trong tab mới"
              >
                <Rocket className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>Mở Web App: vietnail.vercel.app</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {vietnailApp && (
                <button
                  onClick={() => onSelectApp(vietnailApp, activeTab)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-[#0E223D] hover:bg-[#142F54] border border-slate-700 hover:border-amber-400 transition-all cursor-pointer"
                  title="Xem toàn bộ mô tả chi tiết và thông số"
                >
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {vietnailApp && onToggleRequest && (
                <button
                  onClick={() => onToggleRequest(vietnailApp)}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    isRequested
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-[#0E223D] hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700'
                  }`}
                  title={isRequested ? 'Đã thêm vào danh sách yêu cầu' : 'Thêm vào danh sách yêu cầu'}
                >
                  {isRequested ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* MEDIA DISPLAY: YOUTUBE EMBED SLOT OR SCREENSHOT GALLERY          */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'video' ? (
            /* YOUTUBE VIDEO SECTION */
            <div className="space-y-4">
              {vietnailApp && vietnailApp.youtubeUrl ? (
                /* LIVE YOUTUBE PLAYER EMBED */
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-red-500/80 shadow-2xl shadow-red-500/25">
                    <iframe
                      src={getYouTubeEmbedUrl(vietnailApp.youtubeUrl)}
                      title="VietNail Guide AI - Clip Giới Thiệu YouTube"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* Video Info Strip */}
                  <div className="p-3.5 rounded-xl bg-slate-950/85 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-amber-300">🎬 Đang phát clip giới thiệu:</span>
                      <span className="text-slate-300 truncate max-w-xs sm:max-w-md">VietNail Guide AI – Cẩm nang nghề &amp; quản trị tiệm nail tại Mỹ</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={vietnailApp.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-red-300 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mở trên YouTube</span>
                      </a>
                      <button
                        onClick={() => setActiveTab('image')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-slate-300 bg-[#0E223D] hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Xem 7 ảnh tính năng</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ULTRA EYE-CATCHING YOUTUBE PLACEHOLDER SPOT (CHỪA CHỖ ĐỂ CHÈN CLIP QUẢNG CÁO YOUTUBE) */
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0E1F38] to-[#07111E] border-2 border-dashed border-red-500/80 p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-2xl group">
                  {/* Glowing background halo */}
                  <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/15 transition-colors pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Pulsing YouTube Icon with Glowing Radar Rings */}
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white mx-auto flex items-center justify-center shadow-2xl shadow-red-600/50 ring-4 ring-red-400/40 group-hover:scale-110 transition-transform">
                    <svg className="w-11 h-11 sm:w-14 sm:h-14 fill-current drop-shadow-md" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>

                  {/* Attention-grabbing Placeholder Heading & Subtitle */}
                  <div className="relative z-10 mt-5 space-y-2.5 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/25 border-2 border-red-400/60 text-xs font-mono font-black text-red-200 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                      <span>ĐIỂM CHÈN CLIP QUẢNG CÁO YOUTUBE SẴN SÀNG (SẼ DÁN SAU)</span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                      Video Giới Thiệu &amp; Quảng Cáo Ứng Dụng Trên YouTube
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg mx-auto">
                      Khung phát video chuẩn 16:9 đã được cấu hình hoàn chỉnh. Khi dán link clip YouTube vào biến <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-xs border border-amber-400/30">youtubeUrl</code> trong file <code className="text-amber-300 font-mono">apps.ts</code>, clip sẽ <strong className="text-amber-400">tự động phát trực tiếp tại vị trí này</strong>!
                    </p>
                  </div>

                  {/* Actions inside placeholder */}
                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('image')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-amber-300 bg-[#0E223D] hover:bg-[#142F54] border border-amber-400/50 hover:border-amber-400 transition-all cursor-pointer shadow-lg"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Xem trước 7 ảnh tính năng thực tế</span>
                    </button>

                    <a
                      href="https://vietnail.vercel.app"
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp('https://vietnail.vercel.app', e)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer shadow-xl shadow-amber-400/30"
                    >
                      <span>Trải nghiệm ngay: vietnail.vercel.app</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SCREENSHOT GALLERY WITH INTERACTIVE PREVIEWS */
            <div className="space-y-4">
              <div 
                onClick={() => vietnailApp && onSelectApp(vietnailApp, 'image')}
                className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 hover:border-amber-400 shadow-2xl cursor-pointer select-none"
                title="Bấm để phóng to và xem toàn màn hình"
              >
                <img
                  key={currentFeature.screen}
                  src={currentFeature.screen}
                  alt={currentFeature.title}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />

                {/* Bottom Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md">
                      {currentFeature.badge} • {currentFeature.tag}
                    </span>
                    <h4 className="text-lg sm:text-2xl font-black text-white mt-1.5 drop-shadow-md">
                      {currentFeature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 max-w-2xl leading-relaxed">
                      {currentFeature.desc}
                    </p>
                  </div>
                </div>

                {/* Click Hint */}
                <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 border border-amber-400/60 text-amber-300 text-xs font-bold backdrop-blur-md">
                  <span>Phóng to xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 8 Feature Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {coreFeatures.map((feat) => {
                  const isCurrent = feat.idx === activeFeatureIdx;
                  const Icon = feat.icon;
                  return (
                    <button
                      key={feat.idx}
                      onClick={() => setActiveFeatureIdx(feat.idx)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 border ${
                        isCurrent
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-lg'
                          : 'bg-[#081528] border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg ${feat.iconBg} flex items-center justify-center shrink-0 border`}>
                        <Icon className={`w-4 h-4 ${feat.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <span className={`text-[10px] font-mono block leading-none ${isCurrent ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                          0{feat.idx + 1}
                        </span>
                        <span className="text-xs font-extrabold truncate block mt-0.5">
                          {feat.shortTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* 8 CORE FEATURES GRID: EYE-CATCHING ICONS & CLEAR BULLETS         */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <div className="mt-8 pt-7 border-t border-slate-700/80">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs sm:text-sm font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-current" />
                <span>8 TÍNH NĂNG CỐT LÕI (GIỚI THIỆU NGẮN GỌN):</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline font-semibold">
                May đo đặc quyền cho cộng đồng người Việt tại Hoa Kỳ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {coreFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={feat.idx}
                    className="p-4 rounded-2xl bg-[#081528] border border-slate-700/80 hover:border-amber-400 transition-all flex items-start gap-3.5 group hover:bg-[#0B1D36] shadow-md"
                  >
                    <div className={`w-10 h-10 rounded-2xl ${feat.iconBg} border flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${feat.iconColor}`} />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {feat.idx + 1}. {feat.title}
                        </h5>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-900 border border-slate-700 text-slate-300">
                          {feat.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Callout Bar */}
          <div className="mt-7 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Ghi chú dán video:</span>
              </span>
              <span>Dán link YouTube vào trường <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-[11px] border border-slate-700 font-bold">youtubeUrl</code> trong file <code className="text-slate-200 font-mono">apps.ts</code> để kích hoạt phát ngay.</span>
            </div>

            <a
              href="https://vietnail.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://vietnail.vercel.app', e)}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-extrabold underline cursor-pointer"
            >
              <span>Truy cập vietnail.vercel.app</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
