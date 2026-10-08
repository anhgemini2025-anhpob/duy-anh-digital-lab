import React, { useState } from 'react';
import { ArrowRight, Sparkles, Play, ExternalLink, ShieldCheck, HeartPulse, Rocket, Zap, ShieldAlert, QrCode, Cpu, FileCheck, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview } from '../utils/navigation';
import { VIETREAL_COUNTRY_EDITIONS } from '../data/vietrealCountries';

interface HeroProps {
  onExploreClick: () => void;
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
  featuredApps?: AppItem[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectApp,
  apps = [],
  featuredApps = []
}) => {
  const allApps = apps.length > 0 ? apps : featuredApps;
  const vietrealApp = allApps.find(a => a.id === 'vietreal');

  const [activeVietrealFeatureIdx, setActiveVietrealFeatureIdx] = useState<number>(0);
  const [showCountryLinks, setShowCountryLinks] = useState<boolean>(false);

  // 10 tính năng cốt lõi VIETREAL 360° (Dạy Tiếng Việt Thực Chiến Cho Người Nước Ngoài)
  const vietrealFeatures = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: "Sửa Phát Âm Trực Quan & So Sánh Cao Độ Sóng Âm",
      shortTitle: "Sửa Phát Âm AI",
      desc: "Trực quan hóa độ cao, độ dài thanh điệu và đối chiếu sóng âm với người bản xứ theo thời gian thực.",
      screen: "/apps/vietreal/feature_01_sua_phat_am_bang_hinh_anh.jpg"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: "Học Đại Từ Xưng Hô Theo Ngữ Cảnh Tự Nhiên",
      shortTitle: "Xưng Hô Ngữ Cảnh",
      desc: "Ma trận xưng hô thông minh giúp học viên chọn đúng vai vế, tuổi tác, bối cảnh gia đình và công việc.",
      screen: "/apps/vietreal/feature_02_hoc_xung_ho_theo_tinh_huong.jpg"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: "Luyện Nghe Nói Đa Giọng Bắc – Trung – Nam",
      shortTitle: "Giọng 3 Miền",
      desc: "Tùy chọn học phát âm chuẩn Hà Nội, Sài Gòn hoặc miền Trung với ngữ điệu và từ vựng đặc trưng.",
      screen: "/apps/vietreal/feature_03_hoc_dung_giong_dia_phuong.jpg"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: "Tình Huống Thực Tế Đời Sống & Đường Phố Việt Nam",
      shortTitle: "Tình Huống Thực Tế",
      desc: "Học qua ngữ cảnh gọi món, đi chợ, thuê nhà, đặt xe công nghệ và giao tiếp thường nhật sát thực tiễn.",
      screen: "/apps/vietreal/feature_04_tinh_huong_thuc_te_doi_song.jpg"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: "AI Role-Play Đối Thoại Tương Tác 24/7",
      shortTitle: "AI Role-Play",
      desc: "Luyện phản xạ giao tiếp không ngại sai cùng AI đóng vai người bản xứ, sửa lỗi tức thì bằng song ngữ.",
      screen: "/apps/vietreal/feature_05_ai_roleplay_luyen_phan_xa.jpg"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: "Cá Nhân Hóa Giáo Trình May Đo Cho 13 Quốc Gia",
      shortTitle: "13 Quốc Gia",
      desc: "Thiết kế riêng cho học viên Nhật, Thái, Hàn, Trung, Mỹ, Pháp, Đức, Nga, Campuchia, Lào, Ấn, TBN, Bồ Đào Nha.",
      screen: "/apps/vietreal/feature_06_ca_nhan_hoa_theo_quoc_tich.jpg"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: "Tự Động Tạo Lộ Trình Học Cá Nhân Hóa",
      shortTitle: "Lộ Trình AI",
      desc: "Hệ thống tự động đánh giá trình độ đầu vào và xây dựng lộ trình học tập tối ưu hóa theo mục tiêu riêng.",
      screen: "/apps/vietreal/feature_07_tu_dong_tao_lo_trinh_hoc.jpg"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: "Ôn Tập Thông Minh Lặp Lại Ngắt Quãng Spaced Repetition",
      shortTitle: "Spaced Repetition",
      desc: "Thuật toán ghi nhớ dài hạn nhắc nhở ôn từ vựng và mẫu câu đúng thời điểm vàng trước khi bị lãng quên.",
      screen: "/apps/vietreal/feature_08_on_tap_thong_minh_spaced_repetition.jpg"
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: "Gamification Học Tập Thú Vị Không Áp Lực",
      shortTitle: "Gamification",
      desc: "Hệ thống điểm thưởng, huy hiệu và bảng xếp hạng biến mỗi giờ học tiếng Việt thành trải nghiệm vui vẻ.",
      screen: "/apps/vietreal/feature_09_hoc_khong_ap_luc_gamification.jpg"
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: "Hệ Sinh Thái Kết Nối Học Viên – Giáo Viên – Trung Tâm",
      shortTitle: "Hệ Sinh Thái 360°",
      desc: "Cổng số hóa đồng bộ bài tập, voice note phản hồi và quản lý tiến độ học tập toàn diện trên một nền tảng.",
      screen: "/apps/vietreal/feature_15_he_sinh_thai_vietreal_360.jpg"
    }
  ];

  const currentVietrealFeature = vietrealFeatures[activeVietrealFeatureIdx] || vietrealFeatures[0];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 border-b border-amber-500/20 bg-gradient-to-b from-[#07111E] via-[#081526] to-[#07111E]">
      
      {/* Background Ambience & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-teal-500/15 via-amber-500/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ═══════════════════════════════════════════════════════════════════════
              LEFT COLUMN (6 cols): Brand Headline, Mission & Quick Actions
          ═══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              
              {/* Brand Monogram Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-sm">
                <img 
                  src="/logo.jpg" 
                  alt="Duy Anh Digital Lab" 
                  className="w-8 h-8 rounded-xl object-cover border border-amber-400/50"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Official Portfolio</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">Web Apps &amp; AI Systems</div>
                </div>
              </div>

              {/* Eye-Catching New App Release Pill (VIETREAL 360°) */}
              <a 
                href="https://vietreal.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://vietreal.vercel.app', e)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-sky-950/90 via-[#0c223c]/90 to-blue-950/90 border border-sky-400/70 text-sky-300 hover:border-sky-300 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-sky-500/20 group"
                title="Mở ứng dụng mới ra mắt: VIETREAL 360° (vietreal.vercel.app)"
              >
                {/* Blinking / Flashing Vivid Icon */}
                <span className="animate-chop-tat inline-flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                </span>

                <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-sky-200 via-cyan-200 to-amber-300 bg-clip-text text-transparent group-hover:text-white">
                  MỚI RA MẮT: VIETREAL 360°
                </span>

                <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/40 font-mono font-bold uppercase">
                  AI &amp; Ngôn Ngữ
                </span>

                <ExternalLink className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Biến mọi ý tưởng thành{' '}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                ứng dụng thực tế
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-1">
              Chuyên thiết kế &amp; phát triển các ứng dụng Web chuyên sâu, giải pháp AI thực chiến và nền tảng PWA: bảo mật không lưu dữ liệu, sử dụng được offline và cá nhân hóa từng người sử dụng trên 8 nhóm ngành chuyên sâu.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <span>Khám phá Kho ứng dụng</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href="#featured"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0A192F] border border-amber-400/40 hover:border-amber-400 hover:bg-[#0E223D] hover:text-amber-300 shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Xem Nền tảng Tiêu biểu</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="pt-5 grid grid-cols-3 gap-3 border-t border-slate-800 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">30+</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Web Apps &amp; AI Thực tế</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-teal-400">PWA</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold leading-tight">Không lưu dữ liệu • Dùng Offline • Cá nhân hóa</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Live Production</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              {/* ═══════════════════════════════════════════════════════════════════════
              RIGHT COLUMN (6 cols): VIETREAL 360° FLAGSHIP HERO SHOWCASE
              (Ứng dụng mới ra mắt đưa lên vị trí tiêu điểm)
          ═══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Background Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/25 via-blue-500/20 to-amber-500/15 rounded-3xl blur-2xl -z-10 animate-pulse transition-all duration-700" />

              {/* Showcase Container */}
              <div className="p-4 sm:p-5 bg-[#0A192F]/95 border-2 border-sky-400/60 rounded-3xl backdrop-blur-xl shadow-2xl shadow-sky-950/80 relative">
                
                {/* 1. Top Announcement Header Bar */}
                <div className="flex items-center justify-between px-1 pb-3 border-b border-sky-500/30 mb-3.5">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Live pulse dot */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400 shadow-sm"></span>
                    </span>

                    <span className="animate-chop-tat inline-flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                    </span>

                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-sky-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                      ỨNG DỤNG MỚI RA MẮT • AI &amp; ĐÀO TẠO
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-mono font-black text-sky-300 bg-sky-400/10 border border-sky-400/40 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    13 QUỐC GIA • SONG NGỮ
                  </span>
                </div>

                {/* 2. App Identity & Prominent Direct Launch Button */}
                <div className="flex items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-2xl border border-sky-500/35 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 border border-sky-400/60 p-1 shrink-0 shadow-md shadow-sky-500/20">
                      <img 
                        src="/apps/vietreal/app-logo.svg" 
                        alt="VIETREAL 360°" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-black text-white truncate">
                          VIETREAL 360°
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-sky-400/20 text-sky-300 border border-sky-400/40 font-mono font-bold rounded uppercase">
                          Live PWA
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-300 truncate">
                        Dạy Tiếng Việt Thực Chiến Cho Người Nước Ngoài
                      </div>
                    </div>
                  </div>

                  {/* Prominent Eye-Catching Launch Link Button */}
                  <a
                    href="https://vietreal.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://vietreal.vercel.app', e)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-md shadow-amber-400/30 transition-all cursor-pointer group"
                    title="Truy cập trực tiếp https://vietreal.vercel.app"
                  >
                    <span className="animate-chop-tat inline-flex">
                      <Rocket className="w-3.5 h-3.5 text-slate-950" />
                    </span>
                    <span className="hidden sm:inline">Mở Web App</span>
                    <span className="sm:hidden">Mở App</span>
                    <ExternalLink className="w-3 h-3 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* 3. Interactive Screen Showcase Player (Aspect 16:10) */}
                <div
                  onClick={() => vietrealApp && onSelectApp(vietrealApp, 'video')}
                  className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-sky-500/50 shadow-2xl cursor-pointer select-none"
                  title="Bấm để xem video tour giới thiệu ứng dụng"
                >
                  <img
                    key={currentVietrealFeature.screen}
                    src={currentVietrealFeature.screen}
                    alt={currentVietrealFeature.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Top Feature Tag & Standard Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-sky-400/60 text-[10px] sm:text-[11px] font-extrabold text-sky-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      <span>{currentVietrealFeature.badge}: {currentVietrealFeature.shortTitle}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-sky-950/90 border border-sky-400/60 text-[10px] sm:text-[11px] font-bold text-sky-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      <Globe className="w-3 h-3 text-sky-400" />
                      <span>13 Quốc gia</span>
                    </span>
                  </div>

                  {/* Center Play Button for Video Tour */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center gap-2">
                      <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-400/60 border-2 border-white">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-slate-950/95 border border-sky-400/80 text-[11px] sm:text-xs font-black text-sky-300 backdrop-blur-md shadow-lg tracking-wide">
                        ▶ XEM VIDEO TOUR CÓ LỜI BÌNH (VIỆT &amp; MỸ)
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-2.5 inset-x-2.5 z-20 pointer-events-none bg-slate-950/95 backdrop-blur-md border border-sky-500/50 rounded-xl p-2.5 text-left">
                    <div className="text-xs sm:text-sm font-black text-white line-clamp-1">
                      {currentVietrealFeature.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {currentVietrealFeature.desc}
                    </div>
                  </div>
                </div>

                {/* 4. Interactive 10-Feature Selector (#1 to #10) */}
                <div className="mt-3 text-left">
                  <div className="text-[11px] font-mono text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                    <span className="text-sky-300">10 TÍNH NĂNG CỐT LỖI VIETREAL 360° (BẤM ĐỔI MÀN HÌNH):</span>
                    <span className="text-amber-400 font-extrabold">{activeVietrealFeatureIdx + 1}/10</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {vietrealFeatures.map((feat) => {
                      const isActive = activeVietrealFeatureIdx === feat.idx;
                      return (
                        <button
                          key={feat.idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVietrealFeatureIdx(feat.idx);
                          }}
                          className={`px-1 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold truncate transition-all text-center border cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-amber-300 font-black shadow-md scale-[1.03]'
                              : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-sky-400/60 hover:text-white'
                          }`}
                          title={`${feat.badge}: ${feat.title}`}
                        >
                          #{feat.idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Bottom Call-To-Action Controls */}
                <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                  <a
                    href="https://vietreal.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://vietreal.vercel.app', e)}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="animate-chop-tat inline-flex">
                      <Rocket className="w-4 h-4 text-slate-950" />
                    </span>
                    <span>Trải Nghiệm Live App</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                  </a>

                  <button
                    onClick={() => vietrealApp && onSelectApp(vietrealApp, 'video')}
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-slate-900 border border-sky-400/50 hover:border-sky-300 hover:bg-slate-850 hover:text-sky-200 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>Xem Video Tour</span>
                  </button>

                  <button
                    onClick={() => vietrealApp && onSelectApp(vietrealApp, 'image')}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-900/60 border border-slate-700 hover:border-slate-500 hover:text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                    title="Xem chi tiết 15 màn hình và hồ sơ giải pháp"
                  >
                    <span>Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 6. Subtle Collapsible Trigger: 13 National Editions (Only expands when clicked) */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                  <button
                    onClick={() => setShowCountryLinks(!showCountryLinks)}
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-sky-300 hover:text-white bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 transition-all cursor-pointer group"
                    title="Bấm để mở danh sách đường link 13 quốc gia"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-45 transition-transform" />
                      <span>13 Phiên Bản Quốc Gia Dạy Tiếng Việt (Sắp ra mắt)</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 font-bold">
                      <span>{showCountryLinks ? 'Thu gọn' : 'Xem link'}</span>
                      {showCountryLinks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {/* Clean list of links revealed ONLY when clicked */}
                  {showCountryLinks && (
                    <div className="mt-2.5 p-3 rounded-2xl bg-[#07111E]/95 border border-sky-400/40 shadow-2xl space-y-2 animate-fadeIn max-h-[300px] overflow-y-auto">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
                        <span className="font-bold text-sky-300">Click vào tên quốc gia để mở link app:</span>
                        <button
                          onClick={() => setShowCountryLinks(false)}
                          className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          ✕ Đóng
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {VIETREAL_COUNTRY_EDITIONS.map((c) => (
                          <a
                            key={c.id}
                            href={c.route}
                            target={isMobileOrWebview() ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            onClick={(e) => openExternalApp(c.route, e)}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 hover:bg-sky-950/80 border border-slate-800 hover:border-sky-400 transition-all group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xl shrink-0">{c.flag}</span>
                              <div className="truncate">
                                <div className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                                  {c.countryName}: <span className="font-normal text-slate-300">{c.vietnameseTitle}</span>
                                </div>
                                <div className="text-[10px] font-mono text-sky-400 group-hover:text-amber-300 truncate">
                                  {c.route.replace('https://', '')}
                                </div>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 shrink-0 ml-1.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
