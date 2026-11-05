import React, { useState } from 'react';
import {
  Sparkles, ExternalLink, ArrowRight, Play, Check, Copy,
  Compass, Briefcase, GraduationCap, FileText, CheckCircle2,
  Layers, Bot, ShieldCheck, HeartHandshake, Scale, Award,
  BookOpen, TrendingUp, Lightbulb, Users
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

// =========================================================================
// 🎬 Ô DÁN LINK YOUTUBE GIỚI THIỆU VIETTHRIVE:
// Đã gắn link YouTube chính thức cho VietThrive AI
// =========================================================================
const VIETTHRIVE_YOUTUBE_URL = "https://www.youtube.com/watch?v=eRNeuBqnOiA";

// 5 Chặng của Hệ sinh thái Làm Cha Mẹ toàn diện (0 - 25 Tuổi)
export const PARENTING_5_STAGES = [
  { step: 1, age: "0–5 Tuổi", name: "Nuôi Dưỡng Bé (0–60 Tháng)", desc: "Tăng trưởng thể chất & mốc phát triển", active: false },
  { step: 2, age: "6–11 Tuổi", name: "Nuôi Dạy Con Tiểu Học", desc: "Kỷ luật tích cực & thói quen tự giác", active: false },
  { step: 3, age: "12–15 Tuổi", name: "Thấu Hiểu Thiếu Niên", desc: "Tâm sinh lý dậy thì & kết nối cảm xúc", active: false },
  { step: 4, age: "16–18 Tuổi", name: "Định Hướng Thanh Niên", desc: "Chọn ban, ngành học & ngưỡng cửa THPT", active: false },
  { step: 5, age: "18–25 Tuổi", name: "VietThrive — Vào Đời", desc: "Nghề nghiệp, CV, tự lập & lập nghiệp", active: true }
];

// 6 Chặng tính năng cốt lõi của VietThrive trình bày ngắn gọn, nhẹ nhàng
export const VIETTHRIVE_HIGHLIGHT_FEATURES = [
  {
    icon: Compass,
    title: "Hiểu bản thân khoa học (Myself)",
    desc: "Bộ đánh giá Holland RIASEC, Big Five và Ikigai giúp nhận diện rõ tính cách, thế mạnh tiềm ẩn và giá trị sống cốt lõi.",
    badge: "Chặng 1 • Miễn phí"
  },
  {
    icon: Briefcase,
    title: "Định hướng nghề & Bảng lương có nguồn",
    desc: "Khám phá danh mục ngành nghề, so sánh cơ hội việc làm và đối chiếu mức lương thực tế có trích dẫn nguồn số liệu minh bạch.",
    badge: "Chặng 2 • Nghề nghiệp"
  },
  {
    icon: FileText,
    title: "AI CV Builder & Tải file Word",
    desc: "AI phỏng vấn từng bước trích xuất kinh nghiệm, đo độ khớp % với JD thực tế và xuất file Microsoft Word (.docx) 2 mẫu chuẩn mực.",
    badge: "Chặng 3 • CV & JD"
  },
  {
    icon: Award,
    title: "Luyện phỏng vấn thử & Lộ trình kỹ năng",
    desc: "Giả lập phỏng vấn AI theo vị trí ứng tuyển với phản hồi tức thì; kế hoạch rèn luyện kỹ năng cá nhân hóa theo 7/30/60/90 ngày.",
    badge: "Chặng 4 • Phỏng vấn"
  },
  {
    icon: Scale,
    title: "Pháp lý lao động & Kỹ năng công sở",
    desc: "Cẩm nang Luật lao động dẫn điều luật cụ thể, công cụ tính lương Gross sang Net, văn hóa công sở và quản lý tài chính tự lập.",
    badge: "Chặng 5 • Công sở & Luật"
  },
  {
    icon: Bot,
    title: "AI Mentor 24/7 đồng hành không phán xét",
    desc: "Cố vấn AI theo ngữ cảnh hồ sơ, giải đáp thắc mắc hướng nghiệp, bảo mật thiết bị tin cậy và có hệ thống an toàn nhận diện khủng hoảng.",
    badge: "Chặng 6 • AI Mentor"
  }
];

interface VietthriveShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
}

export const VietthriveShowcaseSection: React.FC<VietthriveShowcaseSectionProps> = ({
  onSelectApp,
  apps = []
}) => {
  const vietthriveApp = apps.find(a => a.id === 'vietthrive');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Active youtube url: priorities constant first, then app.youtubeUrl if set
  const activeYoutubeUrl = VIETTHRIVE_YOUTUBE_URL || vietthriveApp?.youtubeUrl || "";

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <section 
      id="vietthrive-showcase" 
      className="relative overflow-hidden py-14 sm:py-20 border-b border-teal-500/25 bg-gradient-to-b from-[#05111B] via-[#081F2F] to-[#07111E]"
    >
      {/* Background Ambience Subtle teal & emerald grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-cyan-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. HEADER SECTION (Trình bày ngắn gọn, súc tích, sang trọng) */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-400/40 text-teal-300 text-xs font-bold mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>HỆ SINH THÁI LÀM CHA MẸ • APP THỨ 5 TIẾP THEO (18–25 TUỔI)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            VietThrive — Hiểu Mình. Chọn Đúng. Phát Triển Vượt Trội.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Nền tảng AI đồng hành cùng người trẻ 18–25 tuổi và các bậc cha mẹ trong giai đoạn bước vào đời: <strong>Thấu hiểu bản thân khoa học • Chọn đúng nghề nghiệp • Tạo CV chuẩn JD • Luyện phỏng vấn &amp; Sống tự chủ</strong>.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://vietthrive.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://vietthrive.vercel.app', e)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              <span>Truy Cập Ứng Dụng: vietthrive.vercel.app</span>
              <ExternalLink className="w-4 h-4 text-slate-950" />
            </a>

            {vietthriveApp && (
              <button
                onClick={() => onSelectApp(vietthriveApp)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0A2234] border border-teal-400/40 hover:border-teal-400 hover:bg-[#0E2E46] transition-all cursor-pointer"
              >
                <span>Xem Thông Tin Chi Tiết</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. HÀNH TRÌNH 5 CHẶNG HỆ SINH THÁI LÀM CHA MẸ (0 - 25 TUỔI) */}
        {/* ================================================================= */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081F30]/85 border border-teal-500/30 shadow-md">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wide">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                Hệ sinh thái Làm Cha Mẹ khép kín 5 chặng — Đồng hành từ 0 tháng đến 25 tuổi
              </span>
              <span className="text-slate-400 font-mono hidden sm:inline">Chặng 5: Vào Đời &amp; Sự Nghiệp</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PARENTING_5_STAGES.map((s) => {
                return (
                  <div 
                    key={s.step} 
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-between transition-all ${
                      s.active 
                        ? 'bg-gradient-to-b from-teal-950/90 to-[#0A293D] border-teal-400/80 shadow-md shadow-teal-500/10 ring-1 ring-teal-400/40' 
                        : 'bg-[#061622]/80 border-slate-700/60 opacity-80 hover:opacity-100 hover:border-slate-500'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        s.active 
                          ? 'bg-teal-400 text-slate-950' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        App #{s.step}
                      </span>
                      <span className={`text-[10px] font-bold ${s.active ? 'text-teal-300' : 'text-slate-400'}`}>
                        {s.age}
                      </span>
                    </div>
                    <div className={`font-extrabold text-xs leading-snug mb-1 ${s.active ? 'text-white' : 'text-slate-200'}`}>
                      {s.name}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {s.desc}
                    </div>
                    {s.active && (
                      <span className="mt-2 text-[10px] px-2 py-0.5 rounded-md font-bold bg-teal-400/20 text-teal-300 border border-teal-400/40 animate-pulse">
                        ✦ Tiêu điểm mới
                      </span>
                    )}
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
          {VIETTHRIVE_HIGHLIGHT_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#092236]/90 border border-slate-700/80 hover:border-teal-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-400/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#051724] border border-teal-500/30 text-teal-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
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
        {/* 4. Ô CHỜ YOUTUBE LINK (Chừa 1 chỗ sẵn sàng để gắn link YouTube sau) */}
        {/* ================================================================= */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#082032] border-2 border-teal-500/35 shadow-xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Video Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-teal-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>VIDEO GIỚI THIỆU VIETTHRIVE AI</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/40 uppercase">
                      YouTube Video
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Trực quan hóa hành trình hướng nghiệp, AI CV Builder &amp; kỹ năng vào đời (18–25 tuổi)
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
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border-2 border-teal-500/50 shadow-teal-500/10">
                  <iframe
                    src={getYouTubeEmbedUrl(activeYoutubeUrl)}
                    title="Video Giới Thiệu VietThrive AI — Nền Tảng Hướng Nghiệp & Phát Triển Cuộc Sống 18–25 Tuổi"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Video Info Strip */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-teal-300">🎬 Đang phát video giới thiệu:</span>
                    <span className="text-slate-300 truncate max-w-xs sm:max-w-md">VietThrive — Hiểu Mình. Chọn Đúng. Phát Triển Vượt Trội</span>
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
                      href="https://vietthrive.vercel.app"
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp('https://vietthrive.vercel.app', e)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer"
                    >
                      <span>Trải Nghiệm Ứng Dụng</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Awaiting YouTube link - clean, gentle placeholder */
              <div className="p-8 sm:p-10 rounded-2xl bg-[#051624] border-2 border-dashed border-teal-500/35 text-center relative overflow-hidden group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-teal-500/25 to-emerald-500/15 text-teal-400 mx-auto flex items-center justify-center border border-teal-500/40 shadow-lg shadow-teal-600/15 group-hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 text-teal-400" />
                </div>

                <div className="mt-4 max-w-lg mx-auto space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-xs font-mono font-bold text-teal-300">
                    🎬 Ô DÀNH SẴN CHO YOUTUBE INTRO LINK
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Video Clip Trải Nghiệm Nền Tảng Hướng Nghiệp &amp; Kỹ Năng VietThrive
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khung phát video YouTube đã được thiết lập sẵn sàng. Khi cập nhật đường link giới thiệu, clip hướng dẫn khám phá bản thân, trải nghiệm AI CV Builder và lộ trình bước vào đời sẽ lập tức hiển thị và phát trực tiếp tại đây.
                  </p>
                </div>

                {/* Video Topics Preview */}
                <div className="mt-5 max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-[#09253B]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-teal-400 block mb-0.5">Phần 1</span>
                    <span className="text-xs text-slate-200">Hiểu mình: RIASEC &amp; Ikigai</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#09253B]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-cyan-400 block mb-0.5">Phần 2</span>
                    <span className="text-xs text-slate-200">AI CV Builder &amp; Khớp JD</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#09253B]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">Phần 3</span>
                    <span className="text-xs text-slate-200">Phỏng vấn &amp; AI Mentor 24/7</span>
                  </div>
                </div>

                {/* Direct Action inside box */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://vietthrive.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://vietthrive.vercel.app', e)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md cursor-pointer transition-colors"
                  >
                    <span>Trải Nghiệm VietThrive Ngay</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleCopyLink('https://vietthrive.vercel.app', e)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer transition-colors"
                  >
                    {copiedUrl === 'https://vietthrive.vercel.app' ? (
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
