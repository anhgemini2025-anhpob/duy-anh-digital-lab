import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, Play, Pause, RotateCcw, Volume2, VolumeX, 
  ExternalLink, ShieldCheck, ShieldAlert, Rocket, CheckCircle2, 
  AlertTriangle, Landmark, FileText, Check, Layers, Lock, Cpu, 
  Scale, FileCheck2, CalendarClock, Bot, Maximize2, Minimize2
} from 'lucide-react';
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
  const bankApp = allApps.find(a => a.id === 'tro-ly-giam-doc-ngan-hang') || allApps[0];

  // Video State & Controls
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(23.4);

  // Active feature selector (7 tính năng cốt lõi)
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);

  // 7 Tính năng cốt lõi (chỉ ghi phần chữ, không tạo âm thanh, ngắn gọn, dễ hiểu)
  const bankFeatures = [
    {
      idx: 0,
      badge: "Tính năng 1",
      icon: FileCheck2,
      title: "Rà Soát Hợp Đồng & Hồ Sơ Tín Dụng",
      shortTitle: "Rà Soát Hợp Đồng",
      desc: "Tự động so sánh dự thảo với mẫu chuẩn, phát hiện nội dung thêm/sửa/xóa, kiểm tra thẩm quyền phán quyết và điều kiện trước giải ngân. Báo cáo 1 trang kèm ma trận đèn giao thông (Xanh - Vàng - Đỏ).",
      tags: ["Ma trận Đèn giao thông", "Thẩm quyền phán quyết", "Điều kiện giải ngân"]
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      icon: Scale,
      title: "Phân Tích Tín Dụng & Nhận Diện Rủi Ro",
      shortTitle: "Phân Tích Tín Dụng",
      desc: "Tổng hợp phương án vay, dòng tiền trả nợ, TSBĐ; tích hợp công cụ mô phỏng chỉ số DSCR, RAROC, EVA, trích lập dự phòng và kiểm tra sức chịu đựng dòng tiền (stress-test) trước biến động thị trường.",
      tags: ["Mô phỏng DSCR & RAROC", "Stress-test dòng tiền", "Trích lập dự phòng"]
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      icon: Landmark,
      title: "Tra Cứu Quy Định & Căn Cứ Pháp Lý Chuẩn Xác",
      shortTitle: "Tra Cứu Pháp Lý",
      desc: "Trình bày thông tin theo cấu trúc chuẩn 3 phần: 'Căn cứ pháp lý – Phân tích – Đề xuất hành động'. Cảnh báo rõ ràng dữ liệu chưa xác minh, ngăn ngừa rủi ro suy diễn sai lệch văn bản.",
      tags: ["Căn cứ - Phân tích - Đề xuất", "Cảnh báo chưa xác minh", "Quy định ngành"]
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      icon: ShieldCheck,
      title: "Tự Kiểm Toán & Kiểm Soát Nội Bộ (RCSA)",
      shortTitle: "Kiểm Toán RCSA",
      desc: "Hệ thống bảng kiểm (Checklist) và công cụ RCSA rà soát toàn diện hồ sơ tín dụng, chủ động phát hiện lỗ hổng và sẵn sàng dữ liệu phục vụ các kỳ kiểm tra, thanh tra nội bộ.",
      tags: ["Bảng kiểm Checklist", "Rủi ro tác nghiệp RCSA", "Chuẩn bị thanh tra"]
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      icon: FileText,
      title: "Tự Động Hóa Biên Bản Họp & Giao Việc",
      shortTitle: "Biên Bản Họp AI",
      desc: "Chuyển giọng nói từ file ghi âm cuộc họp thành biên bản văn bản tức thì; tự động bóc tách danh mục đầu việc, người chịu trách nhiệm, đơn vị phối hợp và thời hạn hoàn thành cụ thể.",
      tags: ["Voice-to-Text cuộc họp", "Bóc tách đầu việc", "Theo dõi Deadline"]
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      icon: CalendarClock,
      title: "Báo Cáo Điều Hành & Quản Lý Thời Gian",
      shortTitle: "Báo Cáo Điều Hành",
      desc: "Lập nhanh báo cáo ngày, tuần, báo cáo chuyên đề; xuất file Word, Excel, PDF; phân bổ lịch làm việc theo khung giờ và tích hợp dữ liệu thời tiết - mùa vụ phục vụ khách hàng nông nghiệp, thủy sản.",
      tags: ["Xuất Word / Excel / PDF", "Khung giờ quản trị", "Thời tiết & Mùa vụ"]
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      icon: Bot,
      title: "Bộ Prompt AI Chuẩn Hóa & Đào Tạo Nghiệp Vụ",
      shortTitle: "Prompt AI & Đào Tạo",
      desc: "Tạo đề trắc nghiệm, flashcard ôn tập nghiệp vụ; tích hợp bộ lệnh Prompt AI chuyên ngành ngân hàng có cơ chế tự động ẩn danh hóa dữ liệu trước khi gửi đi, độc lập và an toàn tuyệt đối.",
      tags: ["Tự động ẩn danh hóa", "Độc lập Core Banking", "Trắc nghiệm nghiệp vụ"]
    }
  ];

  const currentFeature = bankFeatures[activeFeatureIdx] || bankFeatures[0];
  const CurrentIcon = currentFeature.icon;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;
    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen().catch(err => {
        console.warn("Fullscreen request failed:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.warn("Exit fullscreen failed:", err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 border-b border-amber-500/20 bg-gradient-to-b from-[#050C18] via-[#081526] to-[#050C18]">
      
      {/* Background Ambience & Executive Banking Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-600/15 via-amber-500/15 to-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ═══════════════════════════════════════════════════════════════════════
            TOP BAR: Brand Identity & New 9th Category Announcement
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-800">
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
              <span className="text-amber-400 font-bold">9 Nhóm Ngành</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">30+ Ứng Dụng</span>
            </div>
          </div>

          {/* New 9th Industry Release Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-amber-950/80 border border-amber-400/60 shadow-lg shadow-amber-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              ỨNG DỤNG MỚI • NHÓM NGÀNH THỨ 9: NGÂN HÀNG
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO MAIN HEADLINE & APP VALUE PROPOSITION
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/90 border border-blue-400/50 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Banking Executive Workspace 24/7</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            TRỢ LÝ GIÁM ĐỐC NGÂN HÀNG 24/7
          </h1>

          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
            Bớt việc sự vụ – Chủ động quản trị – Kiểm soát rủi ro
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed italic">
            &ldquo;Công nghệ không thay người lãnh đạo ra quyết định. Công nghệ giúp người lãnh đạo có thêm công cụ để ra quyết định tốt hơn.&rdquo;
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            ATTENTION & IN-DEVELOPMENT ALERT BOX (Đầy đủ icon chú ý: ⚠️ 🚧 💡 🚀 🔒)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0C1A30] via-[#0E203C] to-[#0C1A30] border-2 border-amber-400/60 shadow-2xl shadow-amber-500/15">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/50 text-xs font-black uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>⚠️ LƯU Ý TRỌNG YẾU</span>
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-200">
                  <span>🚧</span>
                  <span>App đang trong quá trình phát triển chuyên sâu &amp; dần hoàn thiện tính năng</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                🔒 <strong>Bảo mật độc lập:</strong> Vận hành độc lập, không kết nối trực tiếp Core Banking, lưu trữ cục bộ mã hóa an toàn. 
                <span className="hidden sm:inline"> 💡 <strong>Nguyên tắc:</strong> AI đóng vai trò trợ lý tham mưu; luôn đối chiếu văn bản quy định chính thức của ngân hàng trước khi ký duyệt.</span>
              </p>
            </div>

            {/* Direct App Link Button */}
            <div className="shrink-0 flex items-center gap-2.5 w-full md:w-auto">
              <a
                href="https://trolybank.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://trolybank.vercel.app', e)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-xl shadow-amber-500/25 transition-all cursor-pointer group"
                title="Truy cập https://trolybank.vercel.app"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>Mở App: trolybank.vercel.app</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            TWO-COLUMN EXECUTIVE SHOWCASE:
            LEFT: Tính Năng Cốt Lõi (Chỉ Chữ, Viết Ngắn Gọn Dễ Hiểu, Không Âm Thanh)
            RIGHT: Video Thực Tế Có Sẵn (HTML5 Native Video, Không Tạo Từ Ảnh)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ───────────────────────────────────────────────────────────────────
              LEFT COLUMN (6 cols): TÍNH NĂNG CỐT LÕI (CHỈ PHẦN CHỮ, NGẮN GỌN DỄ HIỂU)
          ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <FileText className="w-4 h-4 text-amber-400" />
                </span>
                <span className="text-sm font-black uppercase text-white tracking-wider">
                  7 TÍNH NĂNG NGHIỆP VỤ CỐT LÕI (BẤM XEM CHI TIẾT)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                #{activeFeatureIdx + 1}/7
              </span>
            </div>

            {/* Quick 7-Feature Selector Pills */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {bankFeatures.map((feat) => {
                const isActive = activeFeatureIdx === feat.idx;
                return (
                  <button
                    key={feat.idx}
                    onClick={() => setActiveFeatureIdx(feat.idx)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-amber-300 font-black shadow-md scale-[1.03]'
                        : 'bg-[#0A192F] text-slate-300 border-slate-700/80 hover:border-amber-400/50 hover:text-white'
                    }`}
                    title={feat.title}
                  >
                    #{feat.idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Active Feature Spotlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A192F] border-2 border-amber-400/40 shadow-xl space-y-3 relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
                  <CurrentIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentFeature.badge}: {currentFeature.shortTitle}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Chỉ chữ • Dễ hiểu • Không âm thanh
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {currentFeature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {currentFeature.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800">
                {currentFeature.tags.map((tg, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-medium text-slate-300"
                  >
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{tg}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Compact List of Other 6 Features for Quick Scanning */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Tất cả 7 phân hệ nghiệp vụ:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {bankFeatures.map((f) => {
                  const isCurrent = f.idx === activeFeatureIdx;
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.idx}
                      onClick={() => setActiveFeatureIdx(f.idx)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isCurrent
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                          : 'bg-[#0A192F]/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0A192F]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate text-white">{f.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{f.shortTitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://trolybank.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://trolybank.vercel.app', e)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>Trải Nghiệm Live: trolybank.vercel.app</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#0A192F] border border-amber-400/40 hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Kho 9 Nhóm Ngành</span>
              </button>
            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────────────
              RIGHT COLUMN (6 cols): VIDEO THỰC TẾ CÓ SẴN (NATIVE HTML5 MP4 PLAYER)
              (Không tạo video từ ảnh, đưa video có sẵn lên, điều khiển trực quan)
          ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-4 sm:p-5 rounded-3xl bg-[#0A192F]/95 border-2 border-amber-400/50 shadow-2xl shadow-blue-950/80 backdrop-blur-xl relative">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider">
                    VIDEO THỰC TẾ ỨNG DỤNG • CHỈ GHI PHẦN CHỮ
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  MP4 • 0:23
                </span>
              </div>

              {/* HTML5 Native Video Player Container */}
              <div 
                ref={videoWrapperRef}
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-amber-400/40 shadow-2xl group select-none"
              >
                <video
                  ref={videoRef}
                  src="/apps/trolybank/trolybank.mp4"
                  poster="/apps/trolybank/poster.jpg"
                  playsInline
                  autoPlay
                  loop
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                      setDuration(videoRef.current.duration || 23.4);
                    }
                  }}
                  className="w-full h-full object-contain bg-slate-950"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                  <span className="px-3 py-1 rounded-lg bg-slate-950/90 border border-amber-400/60 text-[10px] sm:text-xs font-black text-amber-300 backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trợ Lý Giám Đốc Ngân Hàng 24/7</span>
                  </span>
                </div>

                {/* Custom Floating Video Controls Overlay */}
                <div className="absolute bottom-2.5 inset-x-2.5 z-20 p-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
                      title={isPlaying ? "Tạm dừng" : "Phát video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                      title="Xem lại từ đầu"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                      title={isMuted ? "Bật âm thanh gốc" : "Tắt âm thanh"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <span className="text-[11px] font-mono text-slate-300 font-bold ml-1">
                      {Math.floor(currentTime)}s / {Math.floor(duration)}s
                    </span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                    title={isFullscreen ? "Thoát toàn màn hình" : "Xem toàn màn hình"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

              {/* 4 Pillars of Architecture & Security */}
              <div className="mt-4 pt-3.5 border-t border-slate-800 grid grid-cols-2 gap-2.5 text-left">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Độc lập Core Banking</div>
                    <div className="text-[10px] text-slate-400">Không kết nối máy chủ nội bộ</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Mã hóa Cục bộ</div>
                    <div className="text-[10px] text-slate-400">Lưu an toàn trên thiết bị</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Ma trận Đèn giao thông</div>
                    <div className="text-[10px] text-slate-400">Báo cáo rà soát 1 trang</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Tối ưu 70% thời gian</div>
                    <div className="text-[10px] text-slate-400">Chủ động điều hành 24/7</div>
                  </div>
                </div>
              </div>

              {/* Quick Launch Direct Link Footer */}
              <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-[#0C1A30] to-[#0A192F] border border-amber-400/40 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400 font-mono">Đường dẫn chính thức ứng dụng:</div>
                  <div className="text-xs sm:text-sm font-extrabold text-amber-400 truncate">https://trolybank.vercel.app</div>
                </div>

                <a
                  href="https://trolybank.vercel.app"
                  target={isMobileOrWebview() ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp('https://trolybank.vercel.app', e)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
                >
                  <span>Truy Cập</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default Hero;
