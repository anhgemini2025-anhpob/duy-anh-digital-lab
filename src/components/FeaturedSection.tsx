import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Plus, Check, Image as ImageIcon, Video, FileDown, Layers, GraduationCap, Clock, Globe } from 'lucide-react';
import { AppItem } from '../data/apps';
import { AppMockupVisual } from './AppMockupVisual';
import { openExternalApp, isMobileOrWebview, downloadPdfFile } from '../utils/navigation';

interface CountryEdition {
  id: string;
  flag: string;
  countryName: string;
  nativeTitle: string;
  vietnameseTitle: string;
  nativeDesc: string;
  vietnameseDesc: string;
  route: string;
}

const VIETREAL_COUNTRY_EDITIONS: CountryEdition[] = [
  {
    id: 'japan',
    flag: '🇯🇵',
    countryName: 'Nhật Bản',
    nativeTitle: '日本人のためのベトナム語',
    vietnameseTitle: 'Người Nhật học tiếng Việt',
    nativeDesc: 'ビジネスでも生活でも、本当に使えるベトナム語を。',
    vietnameseDesc: 'Tiếng Việt thực tế dùng được trong kinh doanh và đời sống.',
    route: 'https://jpvn.vercel.app'
  },
  {
    id: 'thailand',
    flag: '🇹🇭',
    countryName: 'Thái Lan',
    nativeTitle: 'ภาษาเวียดนามสำหรับคนไทย',
    vietnameseTitle: 'Người Thái học tiếng Việt',
    nativeDesc: 'เรียนภาษาเวียดนามที่ใช้ได้จริง ทั้งการเรียน การทำงาน และชีวิตประจำวัน',
    vietnameseDesc: 'Học tiếng Việt dùng được thực tế trong học tập, công việc và đời sống hàng ngày.',
    route: 'https://thvn.vercel.app'
  },
  {
    id: 'korea',
    flag: '🇰🇷',
    countryName: 'Hàn Quốc',
    nativeTitle: '한국인을 위한 베트남어',
    vietnameseTitle: 'Người Hàn học tiếng Việt',
    nativeDesc: '결혼·가족·비즈니스, 생활에서 바로 쓰는 베트남어.',
    vietnameseDesc: 'Kết hôn, gia đình, kinh doanh — tiếng Việt dùng ngay trong đời sống.',
    route: 'https://krvn.vercel.app'
  },
  {
    id: 'china',
    flag: '🇨🇳',
    countryName: 'Trung Quốc (Hoa)',
    nativeTitle: '华人学越南语',
    vietnameseTitle: 'Người Hoa học tiếng Việt',
    nativeDesc: '为工作、生活和家庭量身定制的实用越南语。',
    vietnameseDesc: 'Tiếng Việt thực dụng may đo cho công việc, cuộc sống và gia đình.',
    route: 'https://zhvn.vercel.app'
  },
  {
    id: 'usa',
    flag: '🇺🇸',
    countryName: 'Mỹ (Hoa Kỳ)',
    nativeTitle: 'Vietnamese for Americans',
    vietnameseTitle: 'Người Mỹ học tiếng Việt',
    nativeDesc: 'Real-life Vietnamese for work, family and travel — built around you.',
    vietnameseDesc: 'Tiếng Việt đời thực cho công việc, gia đình và du lịch — thiết kế riêng cho bạn.',
    route: 'https://usvn.vercel.app'
  },
  {
    id: 'france',
    flag: '🇫🇷',
    countryName: 'Pháp',
    nativeTitle: 'Le vietnamien pour les Français',
    vietnameseTitle: 'Người Pháp học tiếng Việt',
    nativeDesc: 'Un vietnamien concret pour vivre, voyager et travailler au Vietnam.',
    vietnameseDesc: 'Tiếng Việt cụ thể để sinh sống, du lịch và làm việc tại Việt Nam.',
    route: 'https://frvn.vercel.app'
  },
  {
    id: 'germany',
    flag: '🇩🇪',
    countryName: 'Đức',
    nativeTitle: 'Vietnamesisch für Deutsche',
    vietnameseTitle: 'Người Đức học tiếng Việt',
    nativeDesc: 'Alltagstaugliches Vietnamesisch für Arbeit, Familie und Reisen.',
    vietnameseDesc: 'Tiếng Việt ứng dụng đời thường cho công việc, gia đình và du lịch.',
    route: 'https://devn.vercel.app'
  },
  {
    id: 'russia',
    flag: '🇷🇺',
    countryName: 'Nga',
    nativeTitle: 'Вьетнамский для русских',
    vietnameseTitle: 'Người Nga học tiếng Việt',
    nativeDesc: 'Живой вьетнамский для работы, семьи и путешествий — под ваши цели.',
    vietnameseDesc: 'Tiếng Việt sống động cho công việc, gia đình và du lịch — phù hợp mục tiêu của bạn.',
    route: 'https://ruvn.vercel.app'
  },
  {
    id: 'cambodia',
    flag: '🇰🇭',
    countryName: 'Campuchia',
    nativeTitle: 'ភាសាវៀតណាមសម្រាប់ជនជាតិខ្មែរ',
    vietnameseTitle: 'Người Campuchia học tiếng Việt',
    nativeDesc: 'ភាសាវៀតណាមពិតៗ សម្រាប់ការងារ អាជីវកម្ម និងជីវិតប្រចាំថ្ងៃ។',
    vietnameseDesc: 'Tiếng Việt thực tế cho công việc, kinh doanh và đời sống thường nhật.',
    route: 'https://khvn.vercel.app'
  },
  {
    id: 'laos',
    flag: '🇱🇦',
    countryName: 'Lào',
    nativeTitle: 'ພາສາຫວຽດສຳລັບຄົນລາວ',
    vietnameseTitle: 'Người Lào học tiếng Việt',
    nativeDesc: 'ພາສາຫວຽດທີ່ໃຊ້ໄດ້ແທ້ ສຳລັບການຮຽນ, ການເຮັດວຽກ ແລະ ຊີວິດປະຈຳວັນ.',
    vietnameseDesc: 'Tiếng Việt ứng dụng thực tế cho học tập, làm việc và sinh hoạt hàng ngày.',
    route: 'https://lavn.vercel.app'
  },
  {
    id: 'india',
    flag: '🇮🇳',
    countryName: 'Ấn Độ',
    nativeTitle: 'भारतीयों के लिए वियतनामी',
    vietnameseTitle: 'Người Ấn học tiếng Việt',
    nativeDesc: 'काम, कारोबार और रोज़मर्रा की ज़िंदगी के लिए असली वियतनामी।',
    vietnameseDesc: 'Tiếng Việt thực tế cho công việc, kinh doanh và cuộc sống hàng ngày.',
    route: 'https://invn.vercel.app'
  },
  {
    id: 'spain',
    flag: '🇪🇸',
    countryName: 'Tây Ban Nha',
    nativeTitle: 'Vietnamita para hispanohablantes',
    vietnameseTitle: 'Người Tây Ban Nha học tiếng Việt',
    nativeDesc: 'Vietnamita práctico y real para el trabajo, la familia y los viajes.',
    vietnameseDesc: 'Tiếng Việt thực tế và ứng dụng cao cho công việc, gia đình và du lịch.',
    route: 'https://esvn.vercel.app'
  },
  {
    id: 'portugal',
    flag: '🇵🇹',
    countryName: 'Bồ Đào Nha',
    nativeTitle: 'Vietnamita para lusófonos',
    vietnameseTitle: 'Người Bồ Đào Nha học tiếng Việt',
    nativeDesc: 'Vietnamita prático para o dia a dia, negócios e integração cultural.',
    vietnameseDesc: 'Tiếng Việt thực hành cho cuộc sống hàng ngày, kinh doanh và hòa nhập văn hóa.',
    route: 'https://ptvn.vercel.app'
  }
];

interface FeaturedSectionProps {
  apps: AppItem[];
  onSelectApp: (app: AppItem, initialTab?: 'image' | 'video') => void;
  onToggleRequest: (app: AppItem) => void;
  isAppRequested: (appId: string) => boolean;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  apps,
  onSelectApp,
  onToggleRequest,
  isAppRequested
}) => {
  // 0. Vietreal: Hệ Sinh Thái Học Tiếng Việt Thực Chiến 360°
  const vietrealApp = apps.find(a => a.id === 'vietreal');

  // 0.1 Hệ Sinh Thái Đồng Hành Làm Cha Mẹ & Đời Sống Gia Đình (4 app)
  const parentingOrder = [
    'nuoi-duong-be-0-60',
    'nuoi-day-tre-6-11',
    'thau-hieu-thieu-nien-12-15',
    'dinh-huong-thanh-nien-16-18'
  ];
  const parentingApps = parentingOrder
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is AppItem => Boolean(a));

  // 1. Group 1: Nền Tảng Công Nghệ & Quản Trị Tiêu Biểu - Nền Tảng Trọng Điểm • Hệ Sinh Thái Web Apps (4 app)
  const flagshipOrder = [
    'foodtech-hub',
    'cosmederm-ai-academy',
    'htx-rau-cu',
    'taxhkd'
  ];
  const flagshipApps = flagshipOrder
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is AppItem => Boolean(a));

  // 2. Group 2: TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 app)
  const spotlightOrder = [
    'uth-scm-navigator',
    'quan-ly-hop-dong-abm',
    'vet-aqua-erp',
    'bjc-sales-training',
    'customer-visit'
  ];
  const spotlightApps = spotlightOrder
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is AppItem => Boolean(a));

  const [activeMedia, setActiveMedia] = useState<Record<string, 'image' | 'video'>>({});

  const toggleMedia = (appId: string, mode: 'image' | 'video') => {
    setActiveMedia(prev => ({ ...prev, [appId]: mode }));
  };

  const renderAppCard = (app: AppItem, index: number, isLead: boolean = false, badgeText?: string) => {
    const requested = isAppRequested(app.id);
    const currentMedia = activeMedia[app.id] || 'image';

    return (
      <div
        key={app.id}
        onClick={() => onSelectApp(app)}
        className={`group relative flex flex-col ${
          isLead ? 'lg:col-span-2 lg:flex-row' : ''
        } rounded-3xl bg-[#0B1A2F] border border-slate-700/80 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/15 overflow-hidden cursor-pointer`}
      >
        {/* Visual Area */}
        <div className={`relative ${
          isLead 
            ? 'w-full lg:w-7/12 aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] border-b lg:border-b-0 lg:border-r' 
            : 'aspect-[16/10] w-full border-b'
        } overflow-hidden bg-slate-950 border-slate-800`}>
          
          {/* Media Toggle Switcher */}
          <div className="absolute top-3 right-3 z-20 flex items-center bg-[#07111E]/95 backdrop-blur-md rounded-xl p-0.5 border border-slate-700 shadow-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMedia(app.id, 'image');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentMedia === 'image'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hình ảnh</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMedia(app.id, 'video');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentMedia === 'video'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Clip</span>
            </button>
          </div>

          {/* Top Bar Badges */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              {badgeText || (isLead ? 'FLAGSHIP TIÊU ĐIỂM #1' : `NỀN TẢNG #${index + 1}`)}
            </span>
            {app.demoCredential && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#07111E]/95 border border-amber-400/50 text-amber-300 shadow-md">
                Có TK Demo
              </span>
            )}
            {app.userManual && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 shadow-md flex items-center gap-1 backdrop-blur-md">
                <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Có HDSD</span>
              </span>
            )}
          </div>

          {/* DISPLAY CONTENT */}
          <AppMockupVisual
            app={app}
            mode={currentMedia}
            onOpenDetails={() => onSelectApp(app)}
          />

        </div>

        {/* Content Area */}
        <div className={`p-6 sm:p-8 flex flex-col flex-1 justify-between bg-[#0B1A2F] ${
          isLead ? 'lg:w-5/12' : ''
        }`}>
          <div>
            {/* Category & Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border bg-amber-400/10 text-amber-300 border-amber-400/30">
                {app.category}
              </span>
              <span className="text-xs font-mono text-slate-400 font-medium">
                {app.audience}
              </span>
            </div>

            {/* App Header with Logo & Title */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-[#0E223D] border border-amber-400/30 shadow-md p-1.5 flex items-center justify-center group-hover:scale-105 group-hover:border-amber-400 transition-all">
                <img 
                  src={app.logoUrl} 
                  alt={`${app.name} logo`} 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors leading-snug"
                >
                  {app.name}
                </h3>
              </div>
            </div>
            
            {/* Clear, readable Description */}
            <p className="text-base sm:text-lg text-slate-200 mt-2 leading-relaxed">
              {app.description}
            </p>

            {/* Key features highlight */}
            {app.keyFeatures && (
              <div className="mt-4 p-3.5 rounded-xl bg-[#07111E]/80 border border-slate-700/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Tính năng trọng tâm:</div>
                {app.keyFeatures.slice(0, isLead ? 3 : 2).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Click prompt note */}
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-[#07111E]/80 border border-slate-700/80 flex items-center justify-between text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">💡 Chi tiết:</span>
                <span>Click để xem bài toán, giải pháp AI, ảnh chụp thực tế &amp; video clip tour</span>
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {app.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-[#0E223D] text-slate-300 border border-slate-700 hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions Bar */}
          <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectApp(app, 'image');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Xem chi tiết &amp; Trải nghiệm</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              {app.userManual && (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (app.userManual) {
                      await downloadPdfFile(app.userManual.url, app.userManual.fileName);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all border border-emerald-400/40 cursor-pointer active:scale-95"
                  title={`Tải sách hướng dẫn sử dụng PDF (${app.userManual.fileSize}) về máy`}
                >
                  <FileDown className="w-4 h-4" />
                  <span>Tải HDSD</span>
                </button>
              )}

              <a
                href={app.url}
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp(app.url, e)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-[#0E223D] hover:bg-[#142C4C] hover:text-amber-300 transition-all border border-slate-700 hover:border-amber-400/50 cursor-pointer"
                title={`Mở trực tiếp ${app.url}`}
              >
                <span>Mở trực tiếp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRequest(app);
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  requested
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#0E223D] hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-amber-400'
                }`}
              >
                {requested ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã chọn</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Chọn yêu cầu</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  };

  return (
    <section id="featured" className="py-16 sm:py-20 bg-[#07111E] border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================================= */}
        {/* PHẦN 0: TRỌN BỘ 4 ỨNG DỤNG ĐỒNG HÀNH LÀM CHA MẸ & TRẺ EM (0 - 18 TUỔI) */}
        {/* ========================================================================= */}
        <div>
          {/* Section 0 Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-indigo-500/20 border border-amber-400/40 text-xs sm:text-sm font-bold text-amber-300 mb-3 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>HỆ SINH THÁI LÀM CHA MẸ TOÀN DIỆN • 4 GIAI ĐOẠN TRƯỞNG THÀNH (0 – 18 TUỔI)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Trọn Bộ 4 Ứng Dụng Đồng Hành Làm Cha Mẹ &amp; Trẻ Em (0 Tháng Đến 18 Tuổi)
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                Giải pháp số hóa toàn diện từ Duy Anh Lab đồng hành cùng cha mẹ Việt qua trọn vẹn 4 chặng đường: Nuôi dưỡng vàng 0–5 tuổi (0–60 tháng), Kỷ luật tích cực 6–11 tuổi (Tiểu học), Thấu hiểu tuổi dậy thì 12–15 tuổi (THCS) và Định hướng bứt phá tự lập 16–18 tuổi (THPT).
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-emerald-400 font-bold bg-[#0A192F] px-3.5 py-1.5 rounded-xl border border-emerald-400/30 whitespace-nowrap">
              [ TRỌN BỘ 4 NỀN TẢNG • LIVE PRODUCTION ]
            </div>
          </div>

          {/* Grid for 4 Live Parenting Apps (2x2 layout for optimal readability) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {parentingApps.map((app, index) => {
              let badge = `CHẶNG #${index + 1}`;
              if (app.id === 'nuoi-duong-be-0-60') badge = 'CHẶNG 1: 0–5 TUỔI (0–60 THÁNG) • PWA OFFLINE';
              if (app.id === 'nuoi-day-tre-6-11') badge = 'CHẶNG 2: 6–11 TUỔI • TIỂU HỌC & AI COPILOT';
              if (app.id === 'thau-hieu-thieu-nien-12-15') badge = 'CHẶNG 3: 12–15 TUỔI • DẬY THÌ & THCS';
              if (app.id === 'dinh-huong-thanh-nien-16-18') badge = 'CHẶNG 4: 16–18 TUỔI • THPT & TỰ LẬP (MỚI)';
              return renderAppCard(app, index, false, badge);
            })}
          </div>

          {/* Lifecycle Summary Banner */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0B1A2F] via-[#0E223D] to-[#122A4E] border border-amber-400/40 p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black text-white">
                    Hệ Sinh Thái Làm Cha Mẹ Khép Kín Đầu Tiên Tại Việt Nam (0–18 Tuổi)
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    0–60 tháng (Chăm sóc vàng) ➔ 6–11 tuổi (Kỷ luật tích cực) ➔ 12–15 tuổi (Thấu hiểu dậy thì) ➔ 16–18 tuổi (Bứt phá THPT &amp; Tự lập)
                  </div>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 shrink-0">
                100% Hoàn Thiện &amp; Vận Hành
              </span>
            </div>
          </div>
        </div>

        {/* Subtle separating divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-sky-500/40 text-xs font-mono font-bold text-sky-400 flex items-center gap-2 shadow-md">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>HỆ SINH THÁI GIÁO DỤC QUỐC TẾ • TIẾNG VIỆT THỰC CHIẾN 360°</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHẦN 0.5: HỆ SINH THÁI HỌC TIẾNG VIỆT THỰC CHIẾN ĐA QUỐC GIA — VIETREAL 360° */}
        {/* ========================================================================= */}
        {vietrealApp && (
          <div>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-teal-500/20 border border-sky-400/40 text-xs sm:text-sm font-bold text-sky-300 mb-3 shadow-sm">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>HỆ SINH THÁI HỌC TIẾNG VIỆT THỰC CHIẾN CHO TỪNG QUỐC GIA • VIETREAL 360°</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Vietreal 360° — Hệ Sinh Thái Dạy Tiếng Việt Cho Người Nước Ngoài
                </h2>
                <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                  Mỗi cộng đồng một lộ trình, một ngôn ngữ giải thích — cùng một mục tiêu: dùng tiếng Việt ngoài đời thực. Nền tảng cốt lõi Vietreal 360° đã hoàn thiện &amp; vận hành thực tế kết nối 8 phiên bản bản địa hóa chuyên sâu theo từng quốc tịch (Nhật Bản, Hàn Quốc, Trung Quốc, Mỹ, Thái Lan, Pháp, Đức và Nga sắp ra mắt).
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-sky-400 font-bold bg-[#0A192F] px-3.5 py-1.5 rounded-xl border border-sky-400/30 whitespace-nowrap">
                [ NỀN TẢNG CỐT LÕI LIVE • 8 PHIÊN BẢN QUỐC TẾ SẮP RA MẮT ]
              </div>
            </div>

            {/* Main Lead Card: Vietreal Live Flagship */}
            <div className="mb-10">
              {renderAppCard(vietrealApp, 0, true, 'HỆ SINH THÁI CỐT LÕI • LIVE PRODUCTION')}
            </div>

            {/* 13 Country Editions Sub-Section */}
            <div className="mt-8 rounded-3xl bg-[#081524] border border-sky-500/40 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span>13 PHIÊN BẢN BẢN ĐỊA HÓA CHO TỪNG QUỐC GIA</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 font-extrabold">SẮP RA MẮT (COMING SOON)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    Lộ Trình &amp; Ngôn Ngữ Giải Thích May Đo Theo Quốc Tịch Học Viên
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Mỗi quốc gia có khó khăn ngữ âm và văn hóa riêng. Vietreal thiết kế giáo trình bản địa hóa khắc phục trực tiếp điểm nghẽn của từng thứ tiếng mẹ đẻ với liên kết ứng dụng độc lập cho từng nước.
                  </p>
                </div>
                <a
                  href="https://vietreal.vercel.app/hoc"
                  target={isMobileOrWebview() ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp('https://vietreal.vercel.app/hoc', e)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/80 border border-sky-400/50 hover:bg-sky-900/80 hover:text-white transition-all shrink-0 cursor-pointer shadow-md"
                >
                  <span>Cổng hệ sinh thái: vietreal.vercel.app/hoc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 13 Cards Grid (4 columns on xl/lg, 2 on sm, 1 on xs) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {VIETREAL_COUNTRY_EDITIONS.map((c) => (
                  <div
                    key={c.id}
                    onClick={(e) => openExternalApp(c.route, e)}
                    className="group relative rounded-2xl bg-[#0B1A2F]/90 border border-slate-700/80 hover:border-sky-400 transition-all duration-300 p-5 flex flex-col justify-between shadow-lg hover:shadow-sky-500/15 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-3xl filter drop-shadow-md">{c.flag}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-400/15 border border-amber-400/40 text-amber-300">
                            SẮP RA MẮT
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-colors" />
                        </div>
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-black text-white group-hover:text-sky-300 transition-colors tracking-tight line-clamp-1">
                        {c.nativeTitle}
                      </h4>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">
                        {c.vietnameseTitle}
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                        {c.nativeDesc}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                        ({c.vietnameseDesc})
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5 truncate min-w-0">
                        <span className="font-semibold text-slate-300">{c.countryName}:</span>
                        <span className="font-mono text-sky-400 font-bold truncate">{c.route.replace('https://', '')}</span>
                      </div>
                      <span className="text-amber-400 group-hover:translate-x-1 group-hover:text-amber-300 transition-all text-xs font-bold shrink-0 ml-1">➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifecycle Summary Banner */}
            <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0B1A2F] via-[#0E223D] to-[#122A4E] border border-sky-400/40 p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-sky-400/20 border border-sky-400/50 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-white">
                      Hệ Sinh Thái Dạy Tiếng Việt Thực Chiến Đa Quốc Gia (Vietreal 360°)
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Nền tảng Cốt lõi Vietreal ➔ 13 Bản địa hóa Quốc gia (Nhật 🇯🇵, Thái 🇹🇭, Hàn 🇰🇷, Trung 🇨🇳, Mỹ 🇺🇸, Pháp 🇫🇷, Đức 🇩🇪, Nga 🇷🇺, Campuchia 🇰🇭, Lào 🇱🇦, Ấn Độ 🇮🇳, Tây Ban Nha 🇪🇸, Bồ Đào Nha 🇵🇹) ➔ Đồng bộ Học viên - Giáo viên - Trung tâm
                    </div>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-xs font-bold text-sky-300 shrink-0">
                  Cốt Lõi Live • Hệ Sinh Thái Mở Rộng
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Subtle separating divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-amber-500/30 text-xs font-mono font-bold text-amber-400 flex items-center gap-2 shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span>NỀN TẢNG DOANH NGHIỆP &amp; QUẢN TRỊ NGHIỆP VỤ</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHẦN 1: Nền Tảng Công Nghệ & Quản Trị Tiêu Biểu - Nền Tảng Trọng Điểm (4 app) */}
        {/* ========================================================================= */}
        <div>
          {/* Section 1 Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs sm:text-sm font-bold text-amber-300 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>NỀN TẢNG TRỌNG ĐIỂM • HỆ SINH THÁI WEB APPS (4 APP)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nền Tảng Công Nghệ &amp; Quản Trị Tiêu Biểu - Nền Tảng Trọng Điểm • Hệ Sinh Thái Web Apps
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                4 nền tảng số hóa quản trị cốt lõi đã hoàn thiện và vận hành thực tế: Trung tâm R&amp;D Vietnam Food Tech Hub, Viện đào tạo mỹ phẩm CosmeDerm AI Academy, Nông nghiệp số HTX Rau Củ Quả và Quản trị thuế hộ kinh doanh SmartTax HKD &amp; POS bán hàng.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-amber-400 font-bold bg-[#0A192F] px-3.5 py-1.5 rounded-xl border border-amber-400/30 whitespace-nowrap">
              [ 4 NỀN TẢNG TRỌNG ĐIỂM • SẴN SÀNG TRẢI NGHIỆM ]
            </div>
          </div>

          {/* Grid for 4 Flagship Apps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {flagshipApps.map((app, index) => 
              renderAppCard(app, index, false, `TRỌNG ĐIỂM #${index + 1}`)
            )}
          </div>
        </div>

        {/* Subtle separating divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-amber-500/30 text-xs font-mono font-bold text-amber-400 flex items-center gap-2 shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span>TIẾP NỐI DANH MỤC TRỌNG TÂM</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHẦN 2: TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 app) */}
        {/* ========================================================================= */}
        <div>
          {/* Section 2 Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-xs sm:text-sm font-bold text-emerald-300 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 APP)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Tiêu Điểm Dự Án Nổi Bật
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                Các nền tảng quản trị vận hành và số hóa chuyên sâu: Điều hành chuỗi cung ứng UTH SCM, quản lý hợp đồng thương mại &amp; tài liệu AB Mauri, ERP thú y thủy sản, đào tạo sales LMS và quản trị kinh doanh thực địa.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-emerald-400 font-bold bg-[#0A192F] px-3.5 py-1.5 rounded-xl border border-emerald-400/30 whitespace-nowrap">
              [ 5 DỰ ÁN TIÊU ĐIỂM • LIVE PRODUCTION ]
            </div>
          </div>

          {/* Grid for 5 Spotlight Apps: 1 lead card + 4 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {spotlightApps.map((app, index) => {
              const isLead = index === 0;
              return renderAppCard(app, index, isLead, isLead ? 'FLAGSHIP TIÊU ĐIỂM #1' : `DỰ ÁN #${index + 1}`);
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
