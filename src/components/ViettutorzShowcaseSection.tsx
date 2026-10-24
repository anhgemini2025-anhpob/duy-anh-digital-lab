import React, { useState } from 'react';
import { 
  Sparkles, ExternalLink, ArrowRight, Play, Check, Copy, 
  GraduationCap, BookOpen, Brain, ShieldCheck, CheckCircle2,
  ChevronRight, Layers, Flame, Video, Compass, Award
} from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, getYouTubeEmbedUrl } from '../utils/navigation';

// =========================================================================
// 🎬 Ô DÁN LINK YOUTUBE GIỚI THIỆU VIETTUTORZ:
// Sau này có link YouTube, bạn chỉ cần dán URL vào biến dưới đây.
// Ví dụ: const VIETTUTORZ_YOUTUBE_URL = "https://www.youtube.com/watch?v=XXXXXXXXXXX";
// Khi để trống (""), hệ thống sẽ tự động hiển thị khung chờ (placeholder) chuẩn hóa.
// =========================================================================
const VIETTUTORZ_YOUTUBE_URL = "";

export interface VietTutorClassItem {
  grade: number;
  name: string;
  level: 'Tiểu học' | 'THCS' | 'THPT';
  levelKey: 'tieuhoc' | 'thcs' | 'thpt';
  focus: string;
  subjects: string;
  url: string;
}

export const VIETTUTOR_CLASSES: VietTutorClassItem[] = [
  {
    grade: 1,
    name: "VietTutor 1",
    level: "Tiểu học",
    levelKey: "tieuhoc",
    focus: "Làm quen số, chữ cái, ghép vần & nếp học đầu đời",
    subjects: "Toán 1 • Tiếng Việt 1 • Tự nhiên & Xã hội 1",
    url: "https://vietgiasu1.vercel.app"
  },
  {
    grade: 2,
    name: "VietTutor 2",
    level: "Tiểu học",
    levelKey: "tieuhoc",
    focus: "Phép tính cộng trừ có nhớ & mở rộng vốn từ tiếng Việt",
    subjects: "Toán 2 • Tiếng Việt 2 • Tự nhiên & Xã hội 2",
    url: "https://vietgiasu2.vercel.app"
  },
  {
    grade: 3,
    name: "VietTutor 3",
    level: "Tiểu học",
    levelKey: "tieuhoc",
    focus: "Toán có lời văn 2 bước tính & rèn tính tự giác hoàn thành bài",
    subjects: "Toán 3 • Tiếng Việt 3 • Tin học & Công nghệ 3",
    url: "https://vietgiasu3.vercel.app"
  },
  {
    grade: 4,
    name: "VietTutor 4",
    level: "Tiểu học",
    levelKey: "tieuhoc",
    focus: "Làm chủ phân số, hình học cơ bản & viết đoạn văn miêu tả",
    subjects: "Toán 4 • Tiếng Việt 4 • Lịch sử & Địa lí 4",
    url: "https://vietgiasu4.vercel.app"
  },
  {
    grade: 5,
    name: "VietTutor 5",
    level: "Tiểu học",
    levelKey: "tieuhoc",
    focus: "Số thập phân, toán chuyển động & tổng ôn chuyển cấp lên THCS",
    subjects: "Toán 5 • Tiếng Việt 5 • Lịch sử & Địa lí 5",
    url: "https://vietgiasu5.vercel.app"
  },
  {
    grade: 6,
    name: "VietTutor 6",
    level: "THCS",
    levelKey: "thcs",
    focus: "Số nguyên, KHTN tích hợp & thích ứng phương pháp học THCS",
    subjects: "Toán 6 • Ngữ văn 6 • KHTN 6 (Lý - Hóa - Sinh)",
    url: "https://vietgiasu6.vercel.app"
  },
  {
    grade: 7,
    name: "VietTutor 7",
    level: "THCS",
    levelKey: "thcs",
    focus: "Số hữu tỉ, chứng minh hình học tam giác & văn nghị luận",
    subjects: "Toán 7 • Ngữ văn 7 • KHTN 7 • Lịch sử & Địa lí 7",
    url: "https://vietgiasu7.vercel.app"
  },
  {
    grade: 8,
    name: "VietTutor 8",
    level: "THCS",
    levelKey: "thcs",
    focus: "7 hằng đẳng thức đáng nhớ, phương trình đại số & KHTN chuyên sâu",
    subjects: "Toán 8 • Ngữ văn 8 • KHTN 8 (Lý - Hóa - Sinh) • Tiếng Anh 8",
    url: "https://vietgiasu8.vercel.app"
  },
  {
    grade: 9,
    name: "VietTutor 9",
    level: "THCS",
    levelKey: "thcs",
    focus: "Tổng ôn chiến lược & luyện đề bứt phá tuyển sinh vào lớp 10",
    subjects: "Toán 9 (Căn thức, Đ.tròn) • Ngữ văn 9 • Tiếng Anh 9",
    url: "https://vietgiasu9.vercel.app"
  },
  {
    grade: 10,
    name: "VietTutor 10",
    level: "THPT",
    levelKey: "thpt",
    focus: "Định hình tổ hợp chuyên đề, hình học vector & phương pháp tự học",
    subjects: "Toán 10 • Ngữ văn 10 • Tổ hợp tự chọn (Lý, Hóa, Sinh, Sử, Địa)",
    url: "https://vietgiasu10.vercel.app"
  },
  {
    grade: 11,
    name: "VietTutor 11",
    level: "THPT",
    levelKey: "thpt",
    focus: "Lượng giác, đạo hàm, hình không gian & kiến thức trọng tâm ĐGNL",
    subjects: "Toán 11 • Ngữ văn 11 • KHTN / KHXH chuyên đề nâng cao",
    url: "https://vietgiasu11.vercel.app"
  },
  {
    grade: 12,
    name: "VietTutor 12",
    level: "THPT",
    levelKey: "thpt",
    focus: "Tổng ôn chiến lược Tốt nghiệp THPT & luyện đề Đánh giá năng lực",
    subjects: "Toán 12 (Giải tích, Oxyz) • Ngữ văn 12 • Luyện đề thi chuẩn hóa",
    url: "https://vietgiasu12.vercel.app"
  }
];

interface ViettutorzShowcaseSectionProps {
  onSelectApp: (app: AppItem, tab?: 'image' | 'video') => void;
  apps?: AppItem[];
}

export const ViettutorzShowcaseSection: React.FC<ViettutorzShowcaseSectionProps> = ({
  onSelectApp,
  apps = []
}) => {
  const viettutorzApp = apps.find(a => a.id === 'viettutorz');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | 'tieuhoc' | 'thcs' | 'thpt'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Active youtube url: priorities constant first, then app.youtubeUrl if set
  const activeYoutubeUrl = VIETTUTORZ_YOUTUBE_URL || viettutorzApp?.youtubeUrl || "";

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredClasses = selectedLevelFilter === 'all'
    ? VIETTUTOR_CLASSES
    : VIETTUTOR_CLASSES.filter(c => c.levelKey === selectedLevelFilter);

  return (
    <section 
      id="viettutorz-showcase" 
      className="relative overflow-hidden py-14 sm:py-20 border-b border-sky-500/25 bg-gradient-to-b from-[#07111E] via-[#08172E] to-[#07111E]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/15 via-sky-500/10 to-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* 1. SECTION HEADER (Ngắn gọn, súc tích, dễ hiểu) */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/50 text-blue-300 text-xs font-bold mb-3 shadow-md">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>HỆ SINH THÁI GIA SƯ AI LỚP 1–12 • CHƯƠNG TRÌNH GDPT 2018</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            VietTutorz — Gia Sư AI Đồng Hành Lớp 1–12
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Hệ sinh thái gồm <strong>12 ứng dụng gia sư AI độc lập</strong> từ Lớp 1 đến Lớp 12: Gợi mở tư duy từng bước thay vì đưa sẵn đáp án, bám sát SGK và hoàn toàn <strong>không cần đăng nhập</strong> – mở là học ngay.
          </p>

          {/* Top Quick Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://vietgiasu.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://vietgiasu.vercel.app', e)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 hover:from-sky-300 hover:to-cyan-200 shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
            >
              <span>Vào Cổng Chính: vietgiasu.vercel.app</span>
              <ExternalLink className="w-4 h-4 text-slate-950" />
            </a>

            {viettutorzApp && (
              <button
                onClick={() => onSelectApp(viettutorzApp)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0A1D3A] border border-blue-400/40 hover:border-blue-400 hover:bg-[#0E2850] transition-all cursor-pointer"
              >
                <span>Xem Thông Tin Chi Tiết</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. 3 ĐẶC ĐIỂM CỐT LÕI (Trình bày ngắn gọn, dễ hiểu) */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#091A33]/90 border border-blue-500/30 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-blue-400/40">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Gợi mở từng bước tư duy</h4>
              <p className="text-xs text-slate-300 leading-snug">
                Hướng dẫn cách suy luận, đặt câu hỏi gợi ý; nói không với giải hộ hay chép lời giải sẵn.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#091A33]/90 border border-emerald-500/30 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Mở là học ngay • Không cần tạo tài khoản</h4>
              <p className="text-xs text-slate-300 leading-snug">
                Truy cập trực tiếp trên điện thoại hoặc máy tính, không lưu thông tin cá nhân của học sinh.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#091A33]/90 border border-amber-500/30 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Bám sát Chương trình GDPT 2018</h4>
              <p className="text-xs text-slate-300 leading-snug">
                Theo sát cấu trúc môn học của Bộ GD&amp;ĐT: Toán, Tiếng Việt/Văn, KHTN, Tiếng Anh...
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. Ô YOUTUBE LINK GIỚI THIỆU (Chừa 1 ô để dán YouTube link sau này) */}
        {/* ================================================================= */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#081830] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Video Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-red-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>VIDEO GIỚI THIỆU VIETTUTORZ</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/40 uppercase">
                      YouTube Video
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Trực quan hóa trải nghiệm 12 khối lớp &amp; phương pháp gợi ý thông minh
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
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800">
                <iframe
                  src={getYouTubeEmbedUrl(activeYoutubeUrl)}
                  title="VietTutorz Video Giới Thiệu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* Awaiting YouTube link - clean, professional placeholder */
              <div className="p-8 sm:p-10 rounded-2xl bg-[#061122] border-2 border-dashed border-red-500/35 text-center relative overflow-hidden group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-600/25 to-red-500/10 text-red-400 mx-auto flex items-center justify-center border border-red-500/50 shadow-xl shadow-red-600/20 group-hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 text-red-400" />
                </div>

                <div className="mt-4 max-w-lg mx-auto space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-400/40 text-xs font-mono font-bold text-red-300">
                    🎬 Ô DÀNH SẴN CHO YOUTUBE INTRO LINK
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Video Clip Giới Thiệu Trải Nghiệm Học Tập VietTutorz
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khung phát video YouTube đã được thiết lập sẵn sàng. Khi cập nhật link giới thiệu, clip hướng dẫn tự học 12 khối lớp sẽ lập tức hiển thị và phát trực tiếp tại đây.
                  </p>
                </div>

                {/* Video Topics Preview */}
                <div className="mt-5 max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-sky-400 block mb-0.5">Phần 1</span>
                    <span className="text-xs text-slate-200">Hỏi đáp AI gợi mở từng bước</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">Phần 2</span>
                    <span className="text-xs text-slate-200">12 lớp từ Tiểu học đến THPT</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#091D3A]/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold text-amber-400 block mb-0.5">Phần 3</span>
                    <span className="text-xs text-slate-200">Phụ huynh đồng hành không áp lực</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-6">
                  <a
                    href="https://vietgiasu.vercel.app"
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp('https://vietgiasu.vercel.app', e)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600/80 hover:bg-red-600 border border-red-400/50 shadow-md transition-all cursor-pointer"
                  >
                    <span>Trải nghiệm trực tiếp tại vietgiasu.vercel.app</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. 12 Ô TƯƠNG ỨNG TỪ VIETTUTOR 1 ĐẾN 12 (DÁN SẴN LINK TỪNG Ô) */}
        {/* ================================================================= */}
        <div>
          {/* Subheader and Stage Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-sky-500/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  12 Ứng Dụng Gia Sư AI Theo Khối Lớp (Lớp 1 – 12)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Bấm vào ô lớp của học sinh để mở ứng dụng riêng biệt tương ứng.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0A1D3A] border border-blue-400/30 shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedLevelFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevelFilter === 'all'
                    ? 'bg-sky-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Tất cả 12 Lớp
              </button>
              <button
                onClick={() => setSelectedLevelFilter('tieuhoc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevelFilter === 'tieuhoc'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Tiểu học (1–5)
              </button>
              <button
                onClick={() => setSelectedLevelFilter('thcs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevelFilter === 'thcs'
                    ? 'bg-sky-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                THCS (6–9)
              </button>
              <button
                onClick={() => setSelectedLevelFilter('thpt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevelFilter === 'thpt'
                    ? 'bg-purple-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                THPT (10–12)
              </button>
            </div>
          </div>

          {/* Grid of 12 Classes with Ready-Pasted Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredClasses.map((item) => {
              const levelBadgeStyle = item.levelKey === 'tieuhoc'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : item.levelKey === 'thcs'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-purple-500/20 text-purple-300 border-purple-500/40';

              const cardBorderHover = item.levelKey === 'tieuhoc'
                ? 'hover:border-emerald-400 hover:shadow-emerald-500/10'
                : item.levelKey === 'thcs'
                ? 'hover:border-sky-400 hover:shadow-sky-500/10'
                : 'hover:border-purple-400 hover:shadow-purple-500/10';

              const gradeColor = item.levelKey === 'tieuhoc'
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-400/30'
                : item.levelKey === 'thcs'
                ? 'text-sky-400 bg-sky-500/10 border-sky-400/30'
                : 'text-purple-300 bg-purple-500/10 border-purple-400/30';

              const isCopied = copiedUrl === item.url;

              return (
                <div
                  key={item.grade}
                  className={`p-4 rounded-2xl bg-[#091A33] border border-slate-700/80 ${cardBorderHover} transition-all duration-200 flex flex-col justify-between shadow-md hover:shadow-xl group`}
                >
                  <div>
                    {/* Top Row: Grade Number Badge & Level */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`px-2.5 py-1 rounded-xl font-mono font-black text-xs border ${gradeColor}`}>
                        LỚP {String(item.grade).padStart(2, '0')}
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${levelBadgeStyle}`}>
                        {item.level}
                      </span>
                    </div>

                    {/* App Title */}
                    <h4 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      <span>{item.name}</span>
                    </h4>

                    {/* Core Focus (Ngắn gọn 1 câu) */}
                    <p className="text-xs text-slate-300 mt-1.5 leading-snug min-h-[36px]">
                      {item.focus}
                    </p>

                    {/* Subject Tags */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 truncate" title={item.subjects}>
                      📚 {item.subjects}
                    </div>
                  </div>

                  {/* Ready-Pasted URL & Open Button */}
                  <div className="mt-4 pt-3 border-t border-slate-800/90 space-y-2">
                    {/* URL Display with Copy Button */}
                    <div className="flex items-center justify-between gap-2 p-1.5 px-2 rounded-lg bg-[#061122] border border-slate-800 text-[11px] font-mono text-slate-300">
                      <span className="truncate text-sky-300">{item.url.replace('https://', '')}</span>
                      <button
                        onClick={(e) => handleCopyLink(item.url, e)}
                        title="Sao chép đường dẫn"
                        className="p-1 hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-slate-200" />
                        )}
                      </button>
                    </div>

                    {/* Main Clickable Launch Button */}
                    <a
                      href={item.url}
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp(item.url, e)}
                      className="w-full py-2.5 px-3 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 hover:from-sky-300 hover:to-cyan-200 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:shadow-sky-500/20"
                    >
                      <span>Mở {item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-[#091A33]/80 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Tất cả 12 ứng dụng gia sư AI hoạt động độc lập, không yêu cầu cài đặt hay tạo tài khoản cá nhân.
            </span>
          </div>

          <a
            href="https://vietgiasu.vercel.app"
            target={isMobileOrWebview() ? '_self' : '_blank'}
            rel="noopener noreferrer"
            onClick={(e) => openExternalApp('https://vietgiasu.vercel.app', e)}
            className="inline-flex items-center gap-1.5 font-bold text-sky-400 hover:text-sky-300 shrink-0 transition-colors cursor-pointer"
          >
            <span>Trang chủ VietTutorz Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
