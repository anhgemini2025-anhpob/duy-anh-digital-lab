import React, { useState } from 'react';
import { ArrowRight, Sparkles, Play, ExternalLink, ShieldCheck, HeartPulse, Rocket, Zap, ShieldAlert, QrCode, Cpu, FileCheck } from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview } from '../utils/navigation';

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
  const tropilabApp = allApps.find(a => a.id === 'tropilab-riskos');

  const [activeTropilabFeatureIdx, setActiveTropilabFeatureIdx] = useState<number>(0);

  // 10 tính năng cốt lõi TROPILAB RISKOS (Quản lý rủi ro và an toàn phòng xét nghiệm chuẩn ISO 22367 / ISO 15189)
  const tropilabFeatures = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: "Báo Lỗi Một Chạm & Khóa Mẫu Khẩn Cấp",
      shortTitle: "Báo Lỗi & Khóa Mẫu LIS",
      desc: "Kỹ thuật viên gửi mã lỗi trong 30s kèm ảnh chụp; hệ thống tự động khóa trạng thái mẫu trên LIS và đếm ngược xử lý sự cố.",
      screen: "/apps/tropilab-riskos/feature_01_bao_loi_mot_cham_khoa_mau.jpg"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: "Xác Nhận Người Bệnh & Quét QR Chống Sai Sót",
      shortTitle: "Quét QR Người Bệnh",
      desc: "Điều dưỡng quét mã QR trên vòng tay hoặc phiếu hẹn, tự động đối chiếu thông tin y lệnh trước khi chọc kim lấy máu.",
      screen: "/apps/tropilab-riskos/feature_02_xac_nhan_nguoi_benh_chong_sai_sot.jpg"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: "Bản Đồ Ống Nghiệm Trực Quan & Trợ Lý Lấy Mẫu",
      shortTitle: "Bản Đồ Ống Nghiệm",
      desc: "Trực quan hóa màu nắp ống, chất chống đông, thứ tự rút máu chuẩn CLSI và quy cách lắc trộn, chuẩn hóa thao tác lấy mẫu.",
      screen: "/apps/tropilab-riskos/feature_03_ban_do_ong_nghiem_truc_quan.jpg"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: "Cảnh Báo Dán Nhãn Phụ Tự Động",
      shortTitle: "Cảnh Báo Tem Phụ",
      desc: "Nhắc nhở dán tem phụ cho mẫu bệnh phẩm đặc thù (sốt xuất huyết Dengue, ký sinh trùng, HIV) và bắt buộc đối chiếu kép trước khi chuyển mẫu.",
      screen: "/apps/tropilab-riskos/feature_04_canh_bao_dan_nhan_tu_dong.jpg"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: "Trợ Lý Kiểm Tra Y Lệnh Thông Minh",
      shortTitle: "Kiểm Tra Y Lệnh AI",
      desc: "Tự động đối chiếu y lệnh bác sĩ với tiền sử khám và mã bệnh ICD-10; cảnh báo sớm chỉ định trùng lặp hoặc sai sót mã y lệnh.",
      screen: "/apps/tropilab-riskos/feature_05_tro_ly_kiem_tra_y_lenh_thong_minh.jpg"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: "Tự Động Hóa Hồ Sơ ISO & Kế Hoạch CAPA Ký Số",
      shortTitle: "Hồ Sơ ISO & CAPA",
      desc: "Tự động kết xuất Phiếu nhận diện nguy cơ, kế hoạch CAPA chuẩn ISO 22367:2020 & ISO 15189:2022, hỗ trợ phê duyệt ký số điện tử.",
      screen: "/apps/tropilab-riskos/feature_06_tu_dong_hoa_ho_so_iso.jpg"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: "Giám Sát Môi Trường & Tủ Lạnh 24/7 Bằng IoT",
      shortTitle: "Giám Sát IoT 24/7",
      desc: "Cảm biến thông minh liên tục theo dõi nhiệt độ, độ ẩm phòng xét nghiệm và tủ lạnh sinh phẩm, phát còi cảnh báo tức thì khi vượt ngưỡng.",
      screen: "/apps/tropilab-riskos/feature_07_giam_sat_moi_truong_247.jpg"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: "Màn Hình Điều Hành & Ma Trận Rủi Ro Realtime",
      shortTitle: "Ma Trận Rủi Ro Heatmap",
      desc: "Bảng điều khiển trung tâm hiển thị trực quan các KPI chất lượng, bản đồ nhiệt rủi ro FMEA, tỷ lệ ngoại nhiễm và thời gian quay vòng TAT.",
      screen: "/apps/tropilab-riskos/feature_08_man_hinh_dieu_hanh_ma_tran_rui_ro.jpg"
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: "Dự Báo Vật Tư Tiêu Hao & Quản Lý Bảo Trì Thiết Bị",
      shortTitle: "Dự Báo Vật Tư & Bảo Trì",
      desc: "Phân tích tốc độ tiêu thụ hóa chất, thuốc thử để cảnh báo mua sắm từ sớm; quản lý lịch kiểm định, hiệu chuẩn máy móc định kỳ.",
      screen: "/apps/tropilab-riskos/feature_09_du_bao_vat_tu_quan_ly_bao_tri.jpg"
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: "Theo Dõi Tiến Trình & Thông Báo Zalo Cho Người Bệnh",
      shortTitle: "Theo Dõi & Nhắn Zalo",
      desc: "Người bệnh quét mã QR theo dõi tiến độ xét nghiệm; tự động gửi tin nhắn Zalo kèm hướng dẫn ưu tiên khi phát sinh yêu cầu lấy lại mẫu.",
      screen: "/apps/tropilab-riskos/feature_10_theo_doi_nguoi_benh_thong_bao_zalo.jpg"
    }
  ];

  const currentTropilabFeature = tropilabFeatures[activeTropilabFeatureIdx] || tropilabFeatures[0];

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

              {/* Eye-Catching New App Release Pill (TROPILAB RISKOS) */}
              <a 
                href="https://tropilab.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://tropilab.vercel.app', e)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-teal-950/90 via-[#0a2738]/90 to-cyan-950/90 border border-teal-400/70 text-teal-300 hover:border-teal-300 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-teal-500/20 group"
                title="Mở ứng dụng mới ra mắt: TROPILAB RISKOS (tropilab.vercel.app)"
              >
                {/* Blinking / Flashing Vivid Icon */}
                <span className="animate-chop-tat inline-flex items-center justify-center shrink-0">
                  <Rocket className="w-3.5 h-3.5 text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
                </span>

                <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-300 bg-clip-text text-transparent group-hover:text-white">
                  MỚI RA MẮT: TROPILAB RISKOS
                </span>

                <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-400/20 text-teal-300 border border-teal-400/40 font-mono font-bold uppercase">
                  Sức Khỏe
                </span>

                <ExternalLink className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
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
              Chuyên thiết kế &amp; phát triển các ứng dụng Web chuyên sâu, giải pháp AI thực chiến và phần mềm quản trị nghiệp vụ theo yêu cầu riêng của bạn: từ y tế, quản trị rủi ro bệnh viện chuẩn ISO 22367 đến kinh doanh, giáo dục và hệ sinh thái đa ngành.
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
                <div className="text-3xl sm:text-4xl font-black text-amber-400">{allApps.length}+</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Web Apps &amp; AI Thực tế</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-teal-400">ISO 22367</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Quản Trị Rủi Ro Y Tế</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Live Production</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              RIGHT COLUMN (6 cols): TROPILAB RISKOS FLAGSHIP HERO SHOWCASE
              (Thay thế 4 app làm cha mẹ để đưa App mới ra mắt lên vị trí tiêu điểm)
          ═══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Background Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-emerald-500/15 rounded-3xl blur-2xl -z-10 animate-pulse transition-all duration-700" />

              {/* Showcase Container */}
              <div className="p-4 sm:p-5 bg-[#0A192F]/95 border-2 border-teal-400/60 rounded-3xl backdrop-blur-xl shadow-2xl shadow-teal-950/80 relative">
                
                {/* 1. Top Announcement Header Bar */}
                <div className="flex items-center justify-between px-1 pb-3 border-b border-teal-500/30 mb-3.5">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Live pulse dot */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400 shadow-sm"></span>
                    </span>

                    {/* Flashing Sparkle / Rocket Icon */}
                    <span className="animate-chop-tat inline-flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 drop-shadow-[0_0_8px_rgba(45,212,191,0.9)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="tropiHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="50%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"
                          fill="url(#tropiHeroGrad)"
                        />
                        <path
                          d="M19 15L20 17.5L22.5 18.5L20 19.5L19 22L18 19.5L15.5 18.5L18 17.5L19 15Z"
                          fill="url(#tropiHeroGrad)"
                        />
                      </svg>
                    </span>

                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                      ỨNG DỤNG MỚI RA MẮT • SỨC KHỎE &amp; Y TẾ
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-mono font-black text-teal-300 bg-teal-400/10 border border-teal-400/40 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    ISO 22367:2020
                  </span>
                </div>

                {/* 2. App Identity & Prominent Direct Launch Button */}
                <div className="flex items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-2xl border border-teal-500/35 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 border border-teal-400/60 p-1 shrink-0 shadow-md shadow-teal-500/20">
                      <img 
                        src="/apps/tropilab-riskos/app-logo.png" 
                        alt="TROPILAB RISKOS" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-black text-white truncate">
                          TROPILAB RISKOS
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-teal-400/20 text-teal-300 border border-teal-400/40 font-mono font-bold rounded uppercase">
                          Live PWA
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-300 truncate">
                        Quản lý rủi ro &amp; An toàn xét nghiệm bệnh viện
                      </div>
                    </div>
                  </div>

                  {/* Prominent Eye-Catching Launch Link Button */}
                  <a
                    href="https://tropilab.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://tropilab.vercel.app', e)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 hover:from-teal-200 hover:to-cyan-200 active:scale-95 shadow-md shadow-teal-400/30 transition-all cursor-pointer group"
                    title="Truy cập trực tiếp https://tropilab.vercel.app"
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
                  onClick={() => tropilabApp && onSelectApp(tropilabApp, 'video')}
                  className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-teal-500/50 shadow-2xl cursor-pointer select-none"
                  title="Bấm để xem video tour giới thiệu ứng dụng"
                >
                  <img
                    key={currentTropilabFeature.screen}
                    src={currentTropilabFeature.screen}
                    alt={currentTropilabFeature.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Top Feature Tag & Standard Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-teal-400/60 text-[10px] sm:text-[11px] font-extrabold text-teal-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-teal-400" />
                      <span>{currentTropilabFeature.badge}: {currentTropilabFeature.shortTitle}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-400/60 text-[10px] sm:text-[11px] font-bold text-teal-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      <HeartPulse className="w-3 h-3 text-teal-400" />
                      <span>Sức khỏe Y khoa</span>
                    </span>
                  </div>

                  {/* Center Play Button for Video Tour */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center gap-2">
                      <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-teal-400/60 border-2 border-white">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-slate-950/95 border border-teal-400/80 text-[11px] sm:text-xs font-black text-teal-300 backdrop-blur-md shadow-lg tracking-wide">
                        ▶ XEM VIDEO TOUR CÓ LỜI BÌNH (3:10)
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-2.5 inset-x-2.5 z-20 pointer-events-none bg-slate-950/95 backdrop-blur-md border border-teal-500/50 rounded-xl p-2.5 text-left">
                    <div className="text-xs sm:text-sm font-black text-white line-clamp-1">
                      {currentTropilabFeature.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {currentTropilabFeature.desc}
                    </div>
                  </div>
                </div>

                {/* 4. Interactive 10-Feature Selector (#1 to #10) */}
                <div className="mt-3 text-left">
                  <div className="text-[11px] font-mono text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                    <span className="text-teal-300">10 TÍNH NĂNG CỐT LỖI TROPILAB RISKOS (BẤM ĐỔI MÀN HÌNH):</span>
                    <span className="text-teal-400 font-extrabold">{activeTropilabFeatureIdx + 1}/10</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {tropilabFeatures.map((feat) => {
                      const isActive = activeTropilabFeatureIdx === feat.idx;
                      return (
                        <button
                          key={feat.idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTropilabFeatureIdx(feat.idx);
                          }}
                          className={`px-1 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold truncate transition-all text-center border cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 border-teal-300 font-black shadow-md scale-[1.03]'
                              : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-teal-400/60 hover:text-white'
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
                    href="https://tropilab.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://tropilab.vercel.app', e)}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 hover:from-teal-200 hover:to-cyan-200 shadow-md shadow-teal-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="animate-chop-tat inline-flex">
                      <Rocket className="w-4 h-4 text-slate-950" />
                    </span>
                    <span>Trải Nghiệm Live App</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                  </a>

                  <button
                    onClick={() => tropilabApp && onSelectApp(tropilabApp, 'video')}
                    className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-slate-900 border border-teal-400/50 hover:border-teal-300 hover:bg-slate-850 hover:text-teal-200 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-teal-400" />
                    <span>Xem Video Tour</span>
                  </button>

                  <button
                    onClick={() => tropilabApp && onSelectApp(tropilabApp, 'image')}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-900/60 border border-slate-700 hover:border-slate-500 hover:text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                    title="Xem chi tiết 10 màn hình và hồ sơ giải pháp"
                  >
                    <span>Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
