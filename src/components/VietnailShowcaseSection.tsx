import React, { useState } from 'react';
import { 
  Sparkles, ExternalLink, ArrowRight, Rocket, Check, Plus, 
  Video, Image as ImageIcon, BookOpen, Bot, ShieldCheck, 
  FileText, DollarSign, Award, Store, Languages, HelpCircle
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

  // 8 Tính năng cốt lõi (Trình bày ngắn gọn, súc tích, dễ nắm bắt)
  const coreFeatures = [
    {
      idx: 0,
      badge: "Tính năng 1",
      icon: Award,
      title: "Học Nghề & Luyện Thi Bằng Nail (State Board)",
      shortTitle: "Luyện Thi Bằng",
      desc: "Ngân hàng câu hỏi trắc nghiệm lý thuyết song ngữ Việt - Anh sát cấu trúc đề thi thật của Hội đồng Thẩm mỹ (State Board) các tiểu bang.",
      screen: "/apps/vietnail/feature_01_luyen_thi_bang_nail.png"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      icon: RefreshCwIcon,
      title: "Cấp Phép & Chuyển Đổi Bằng Tiểu Bang (Reciprocity)",
      shortTitle: "Chuyển Bằng Bang",
      desc: "Hướng dẫn chi tiết thủ tục, hồ sơ và điều kiện đổi bằng giữa các tiểu bang (CA, TX, FL, NY, GA...) mà không cần học lại từ đầu.",
      screen: "/apps/vietnail/feature_02_chuyen_doi_bang_tieu_bang.png"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      icon: Store,
      title: "Mở Tiệm Nail & Vận Hành Kinh Doanh Salon",
      shortTitle: "Mở Tiệm Salon",
      desc: "Trọn bộ quy trình xin giấy phép Salon, đăng ký kinh doanh, hợp đồng thuê mặt bằng, tiêu chuẩn cơ sở vật chất và quản trị nhân sự.",
      screen: "/apps/vietnail/feature_03_mo_tiem_nail_salon.png"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      icon: DollarSign,
      title: "Quản Lý Thu Chi & Tối Ưu Thuế (W-2 vs 1099)",
      shortTitle: "Thu Chi & Thuế",
      desc: "Phân biệt rõ ràng thợ ăn lương W-2 và thợ độc lập 1099; theo dõi tiền tip, chi phí khấu trừ đồ nghề và chuẩn bị sổ sách kế toán tránh bị IRS phạt.",
      screen: "/apps/vietnail/feature_04_thu_chi_thue_w2_1099.png"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      icon: ShieldCheck,
      title: "An Toàn & Vệ Sinh Chuẩn State Board / OSHA",
      shortTitle: "An Toàn Vệ Sinh",
      desc: "Quy chuẩn khử trùng tiệt trùng dụng cụ, bảo hộ lao động, thông gió hút bụi hóa chất và bảng kiểm sẵn sàng đón đợt thanh tra đột xuất.",
      screen: "/apps/vietnail/feature_05_an_toan_ve_sinh_state_board.png"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      icon: FileText,
      title: "Biểu Mẫu Song Ngữ & Hợp Đồng In Sẵn",
      shortTitle: "Biểu Mẫu & Hợp Đồng",
      desc: "Mẫu hợp đồng thuê bàn ghế (Booth Rental Agreement), thỏa thuận thợ ăn chia, phiếu miễn trừ trách nhiệm và tư vấn khách hàng song ngữ.",
      screen: "/apps/vietnail/feature_06_bieu_mau_hop_dong_in_san.png"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      icon: Languages,
      title: "Tiếng Anh Giao Tiếp Thực Chiến Tại Bàn Nail",
      shortTitle: "Tiếng Anh Tại Bàn",
      desc: "Tổng hợp các mẫu câu hội thoại thực tế: từ chào hỏi, tư vấn mẫu móng, hỏi ý kiến độ dài/màu sắc đến giải quyết phàn nàn của khách Mỹ.",
      screen: "/apps/vietnail/feature_07_tieng_anh_giao_tiep_tai_ban.png"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      icon: Bot,
      title: "Trợ Lý AI Hỏi Đáp Bằng Giọng Nói & Chữ 24/7",
      shortTitle: "Trợ Lý AI Voice",
      desc: "Tra cứu quy định pháp lý, giải đáp thắc mắc nghề nghiệp tức thì bằng giọng nói tiếng Việt hoặc gõ chữ — đồng hành cùng người làm nail 24/7.",
      screen: "/apps/vietnail/cover.png"
    }
  ];

  const currentFeature = coreFeatures[activeFeatureIdx] || coreFeatures[0];
  const isRequested = Boolean(vietnailApp && isAppRequested && isAppRequested(vietnailApp.id));

  return (
    <section id="vietnail-showcase" className="relative overflow-hidden py-12 sm:py-16 border-b border-amber-500/20 bg-gradient-to-b from-[#07111E] via-[#08172E] to-[#07111E]">
      {/* Background Ambience & Red/Blue/Gold Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-900/80 via-slate-900/90 to-red-900/80 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold mb-3 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="font-extrabold tracking-wide uppercase">ỨNG DỤNG MỚI RA MẮT • CẨM NANG NGHỀ NAIL TẠI MỸ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            VIETNAIL GUIDE AI — Cẩm Nang Nghề &amp; Quản Trị Tiệm Nail Tại Mỹ
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Giải pháp số hóa toàn diện đồng hành cùng cộng đồng người Việt: Luyện thi bằng State Board, chuyển bằng liên bang, quản lý thu chi, thuế W-2/1099, an toàn vệ sinh và trợ lý AI song ngữ 24/7.
          </p>
        </div>

        {/* Main Interactive Container */}
        <div className="max-w-5xl mx-auto p-4 sm:p-7 bg-[#0A192F]/95 border-2 border-amber-400/60 rounded-3xl backdrop-blur-xl shadow-2xl shadow-blue-950/80 relative">
          
          {/* Top Bar: Brand, Status Badge & Media Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                TIÊU ĐIỂM DỊCH VỤ &amp; SALON NAIL • HOA KỲ
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                LIVE PRODUCTION
              </span>
            </div>

            {/* View Mode Toggle: YouTube Video vs Feature Images */}
            <div className="flex items-center bg-[#07111E] rounded-xl p-1 border border-slate-700 shadow-md">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

          {/* App Header Bar & Direct Launch Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-950/85 rounded-2xl border border-amber-400/35 mb-5 shadow-lg">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B2447] border border-amber-400/70 p-1.5 shrink-0 shadow-lg shadow-amber-400/10 flex items-center justify-center">
                <img 
                  src="/apps/vietnail/app-logo.svg" 
                  alt="VietNail Guide AI" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-xl font-black text-white truncate">
                    VietNail Guide AI
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/40 font-mono font-bold rounded-md">
                    Cẩm Nang Nghề Mỹ
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 truncate mt-0.5">
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
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-md shadow-amber-400/30 transition-all cursor-pointer group"
                title="Mở trực tiếp https://vietnail.vercel.app trong tab mới"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>Mở Web App: vietnail.vercel.app</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {vietnailApp && (
                <button
                  onClick={() => onSelectApp(vietnailApp, activeTab)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-[#0E223D] hover:bg-[#142F54] border border-slate-700 hover:border-amber-400 transition-all cursor-pointer"
                  title="Xem toàn bộ mô tả chi tiết và thông số"
                >
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {vietnailApp && onToggleRequest && (
                <button
                  onClick={() => onToggleRequest(vietnailApp)}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
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
            /* YOUTUBE VIDEO SECTION: IF EMBED URL EXISTS, SHOW IFRAME; OTHERWISE, SHOW GORGEOUS PLACEHOLDER SLOT */
            <div className="space-y-4">
              {vietnailApp && vietnailApp.youtubeUrl ? (
                /* LIVE YOUTUBE PLAYER EMBED */
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400/60 shadow-2xl">
                  <iframe
                    src={getYouTubeEmbedUrl(vietnailApp.youtubeUrl)}
                    title="VietNail Guide AI - Clip Giới Thiệu YouTube"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                /* DEDICATED YOUTUBE PLACEHOLDER SPOT (CHỪA CHỖ ĐỂ CHÈN CLIP QUẢNG CÁO YOUTUBE - SẼ DÁN SAU) */
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#081528] via-[#0B1A2F] to-[#07111E] border-2 border-dashed border-red-500/60 p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-2xl group">
                  {/* Subtle red glow background */}
                  <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* YouTube Icon Badge */}
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white mx-auto flex items-center justify-center shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform">
                    <svg className="w-9 h-9 sm:w-11 sm:h-11 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>

                  {/* Placeholder Content */}
                  <div className="relative z-10 mt-4 space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-[11px] font-mono font-bold text-red-300">
                      <span>CHỖ CHÈN CLIP QUẢNG CÁO TRÊN YOUTUBE (SẼ DÁN SAU)</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                      Video Giới Thiệu &amp; Quảng Cáo Ứng Dụng Trên YouTube
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                      Vị trí này được cấu hình sẵn sàng chuẩn 16:9 cho clip giới thiệu. Khi có link YouTube, chỉ cần dán URL vào biến <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-xs border border-amber-400/30">youtubeUrl</code>, video sẽ tự động phát trực tiếp tại đây!
                    </p>
                  </div>

                  {/* Actions inside placeholder */}
                  <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('image')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-amber-300 bg-[#0E223D] hover:bg-[#142F54] border border-amber-400/40 hover:border-amber-400 transition-all cursor-pointer shadow-md"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Xem trước 7 ảnh tính năng thực tế</span>
                    </button>

                    <a
                      href="https://vietnail.vercel.app"
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp('https://vietnail.vercel.app', e)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer shadow-md"
                    >
                      <span>Trải nghiệm ngay: vietnail.vercel.app</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
                className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 hover:border-amber-400/60 shadow-2xl cursor-pointer select-none"
                title="Bấm để phóng to và xem toàn màn hình"
              >
                <img
                  key={currentFeature.screen}
                  src={currentFeature.screen}
                  alt={currentFeature.title}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />

                {/* Bottom Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950">
                      {currentFeature.badge}
                    </span>
                    <h4 className="text-base sm:text-xl font-black text-white mt-1 drop-shadow-md">
                      {currentFeature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 max-w-2xl">
                      {currentFeature.desc}
                    </p>
                  </div>
                </div>

                {/* Click Hint */}
                <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-400/50 text-amber-300 text-xs font-bold backdrop-blur-md">
                  <span>Phóng to xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 8 Feature Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {coreFeatures.map((feat) => {
                  const isCurrent = feat.idx === activeFeatureIdx;
                  const Icon = feat.icon;
                  return (
                    <button
                      key={feat.idx}
                      onClick={() => setActiveFeatureIdx(feat.idx)}
                      className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2 border ${
                        isCurrent
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-md'
                          : 'bg-[#081528] border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div className="min-w-0">
                        <span className={`text-[10px] font-mono block leading-none ${isCurrent ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                          0{feat.idx + 1}
                        </span>
                        <span className="text-xs font-bold truncate block mt-0.5">
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
          {/* CORE FEATURES SUMMARY (GIỚI THIỆU CÁC TÍNH NĂNG NGẮN GỌN)       */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <div className="mt-7 pt-6 border-t border-slate-700/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>8 TÍNH NĂNG CỐT LÕI (GIỚI THIỆU NGẮN GỌN):</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Thiết kế may đo cho cộng đồng thợ &amp; chủ nail tại Mỹ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coreFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={feat.idx}
                    className="p-3.5 rounded-2xl bg-[#081528] border border-slate-700/70 hover:border-amber-400/50 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-400/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {feat.idx + 1}. {feat.title}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Call to Action */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">💡 Hướng dẫn dán link:</span>
              <span>Dán link video YouTube vào trường <code className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono text-[11px] border border-slate-700">youtubeUrl</code> trong <code className="text-slate-200 font-mono">apps.ts</code> để kích hoạt phát clip ngay.</span>
            </div>

            <a
              href="https://vietnail.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://vietnail.vercel.app', e)}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
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

// Helper icon
function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
