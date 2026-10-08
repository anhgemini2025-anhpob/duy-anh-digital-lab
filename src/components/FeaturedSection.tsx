import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, ExternalLink, Plus, Check, 
  Image as ImageIcon, Video, FileDown, Layers, Globe, 
  ChevronLeft, ChevronRight, RotateCcw, Eye, ShieldCheck, 
  HeartPulse, Activity, CheckCircle2, Stethoscope, Play
} from 'lucide-react';
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
    route: 'https://thviet.vercel.app'
  },
  {
    id: 'korea',
    flag: '🇰🇷',
    countryName: 'Hàn Quốc',
    nativeTitle: '한국인을 위한 베트남어',
    vietnameseTitle: 'Người Hàn học tiếng Việt',
    nativeDesc: '결혼·가족·비즈니스, 생활에서 바로 쓰는 베트남어.',
    vietnameseDesc: 'Kết hôn, gia đình, kinh doanh — tiếng Việt dùng ngay trong đời sống.',
    route: 'https://krviet.vercel.app'
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
    nativeDesc: 'Живой вьетнамский для работы, семьи và путешествий — под ваши цели.',
    vietnameseDesc: 'Tiếng Việt sống động cho công việc, gia đình và du lịch — phù hợp mục tiêu của bạn.',
    route: 'https://ruviet.vercel.app'
  },
  {
    id: 'cambodia',
    flag: '🇰🇭',
    countryName: 'Campuchia',
    nativeTitle: 'ភាសាវៀតណាមសម្រាប់ជនជាតិខ្មែរ',
    vietnameseTitle: 'Người Campuchia học tiếng Việt',
    nativeDesc: 'ភាសាវៀតណាមពិតៗ សម្រាប់ការងារ អាជីវកម្ម និងជីវិតប្រចាំថ្ងៃ។',
    vietnameseDesc: 'Tiếng Việt thực tế cho công việc, kinh doanh và đời sống thường nhật.',
    route: 'https://khviet.vercel.app'
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
    route: 'https://inviet.vercel.app'
  },
  {
    id: 'spain',
    flag: '🇪🇸',
    countryName: 'Tây Ban Nha',
    nativeTitle: 'Vietnamita para hispanohablantes',
    vietnameseTitle: 'Người Tây Ban Nha học tiếng Việt',
    nativeDesc: 'Vietnamita práctico y real para el trabajo, la familia y los viajes.',
    vietnameseDesc: 'Tiếng Việt thực tế và ứng dụng cao cho công việc, gia đình và du lịch.',
    route: 'https://esviet.vercel.app'
  },
  {
    id: 'portugal',
    flag: '🇵🇹',
    countryName: 'Bồ Đào Nha',
    nativeTitle: 'Vietnamita para lusófonos',
    vietnameseTitle: 'Người Bồ Đào Nha học tiếng Việt',
    nativeDesc: 'Vietnamita prático para o dia a dia, negócios e integração cultural.',
    vietnameseDesc: 'Tiếng Việt thực hành cho cuộc sống hàng ngày, kinh doanh và hòa nhập văn hóa.',
    route: 'https://ptviet.vercel.app'
  }
];

const TROPILAB_FEATURES = [
  {
    idx: 0,
    badge: "Tính năng 1",
    title: "Báo Lỗi Một Chạm & Khóa Mẫu Khẩn Cấp",
    shortTitle: "Báo Lỗi 1 Chạm",
    desc: "Kỹ thuật viên chọn mã lỗi, chụp ảnh chứng cứ và gửi ngay trên di động; hệ thống tự động khóa trạng thái mẫu trên LIS và đếm ngược thời gian xử lý sự cố.",
    screen: "/apps/tropilab-riskos/feature_01_bao_loi_mot_cham_khoa_mau.jpg"
  },
  {
    idx: 1,
    badge: "Tính năng 2",
    title: "Xác Nhận Người Bệnh & Kiểm Tra Chống Sai Sót",
    shortTitle: "Quét QR Chống Nhầm",
    desc: "Điều dưỡng quét mã QR vòng tay bệnh nhân; hệ thống đối chiếu y lệnh trước khi chọc kim lấy máu, thiết lập thêm lớp khiên bảo vệ an toàn cho bệnh nhân.",
    screen: "/apps/tropilab-riskos/feature_02_xac_nhan_nguoi_benh_chong_sai_sot.jpg"
  },
  {
    idx: 2,
    badge: "Tính năng 3",
    title: "Bản Đồ Ống Nghiệm Trực Quan Chuẩn CLSI",
    shortTitle: "Bản Đồ Ống Nghiệm",
    desc: "Trực quan hóa chuẩn màu nắp ống, thể tích, chất chống đông và thứ tự rút máu CLSI, giúp nhân viên mới thao tác chuẩn xác, không nhầm lẫn.",
    screen: "/apps/tropilab-riskos/feature_03_ban_do_ong_nghiem_truc_quan.jpg"
  },
  {
    idx: 3,
    badge: "Tính năng 4",
    title: "Cảnh Báo Dán Nhãn Phụ Tự Động",
    shortTitle: "Cảnh Báo Nhãn Phụ",
    desc: "Với các chỉ định Dengue, KST sốt rét, HIV khẳng định, hệ thống tự động nhắc nhở dán tem phụ và bắt buộc xác nhận đối chiếu kép trước khi chuyển mẫu.",
    screen: "/apps/tropilab-riskos/feature_04_canh_bao_dan_nhan_tu_dong.jpg"
  },
  {
    idx: 4,
    badge: "Tính năng 5",
    title: "Trợ Lý Kiểm Tra Y Lệnh Thông Minh",
    shortTitle: "Trợ Lý Y Lệnh",
    desc: "Tự động đối chiếu y lệnh bác sĩ với lịch sử khám và mã ICD-10; cảnh báo sớm các xét nghiệm trùng lặp không cần thiết hoặc sai sót chỉ định.",
    screen: "/apps/tropilab-riskos/feature_05_tro_ly_kiem_tra_y_lenh_thong_minh.jpg"
  },
  {
    idx: 5,
    badge: "Tính năng 6",
    title: "Tự Động Hóa Hồ Sơ ISO & CAPA Ký Số",
    shortTitle: "Hồ Sơ ISO / CAPA",
    desc: "Tổng hợp dữ liệu sự cố để tự động kết xuất Phiếu nhận diện nguy cơ & Kế hoạch khắc phục CAPA chuẩn ISO 22367:2020 & ISO 15189:2022 hỗ trợ ký số điện tử.",
    screen: "/apps/tropilab-riskos/feature_06_tu_dong_hoa_ho_so_iso.jpg"
  },
  {
    idx: 6,
    badge: "Tính năng 7",
    title: "Giám Sát Tủ Lạnh & Môi Trường 24/7 Bằng IoT",
    shortTitle: "Cảm Biến IoT 24/7",
    desc: "Cảm biến thông minh liên tục đo nhiệt độ, độ ẩm tủ bảo quản sinh phẩm; phát còi và gửi cảnh báo khẩn cấp ngay khi nhiệt độ vượt ngưỡng cho phép.",
    screen: "/apps/tropilab-riskos/feature_07_giam_sat_moi_truong_247.jpg"
  },
  {
    idx: 7,
    badge: "Tính năng 8",
    title: "Màn Hình Điều Hành & Ma Trận Rủi Ro Realtime",
    shortTitle: "Ma Trận Rủi Ro",
    desc: "Bảng điều khiển trung tâm hiển thị chỉ số chất lượng, heat-map rủi ro, tỷ lệ ngoại nhiễm, thời gian quay vòng TAT và tiến độ xử lý sự cố ca trực.",
    screen: "/apps/tropilab-riskos/feature_08_man_hinh_dieu_hanh_ma_tran_rui_ro.jpg"
  },
  {
    idx: 8,
    badge: "Tính năng 9",
    title: "Dự Báo Vật Tư Tiêu Hao & Quản Lý Bảo Trì Máy",
    shortTitle: "Dự Báo Vật Tư",
    desc: "Phân tích tốc độ tiêu thụ hóa chất, sinh phẩm QC để dự báo đặt hàng sớm; quản lý lịch hiệu chuẩn, bảo dưỡng định kỳ ngăn ngừa hỏng hóc đột xuất.",
    screen: "/apps/tropilab-riskos/feature_09_du_bao_vat_tu_quan_ly_bao_tri.jpg"
  },
  {
    idx: 9,
    badge: "Tính năng 10",
    title: "Theo Dõi Mẫu & Thông Báo Zalo Người Bệnh",
    shortTitle: "Thông Báo Zalo",
    desc: "Người bệnh quét mã QR tra cứu tiến trình mẫu; tự động gửi tin nhắn cảm thông kèm hướng dẫn ưu tiên khi xảy ra tình huống cần lấy lại mẫu.",
    screen: "/apps/tropilab-riskos/feature_10_theo_doi_nguoi_benh_thong_bao_zalo.jpg"
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
  // 1. Tropilab RiskOS: Top premier platform (placed right before the 4 parenting apps)
  const tropilabApp = apps.find(a => a.id === 'tropilab-riskos');
  const [activeTropilabFeatureIdx, setActiveTropilabFeatureIdx] = useState<number>(0);
  const [tropilabMode, setTropilabMode] = useState<'image' | 'video'>('image');

  // 2. Hệ Sinh Thái Đồng Hành Làm Cha Mẹ & Đời Sống Gia Đình (4 app)
  const parentingOrder = [
    'nuoi-duong-be-0-60',
    'nuoi-day-tre-6-11',
    'thau-hieu-thieu-nien-12-15',
    'dinh-huong-thanh-nien-16-18'
  ];
  const parentingApps = parentingOrder
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is AppItem => Boolean(a));

  // Focus view index for Parenting apps: null means compact grid view, 0-3 means single app focus view
  const [activeParentingIdx, setActiveParentingIdx] = useState<number | null>(null);

  // 3. Nền Tảng Công Nghệ & Quản Trị Tiêu Biểu (Flagship 4 app: Foodtech, CosmeDerm, HTX, TaxHKD)
  const flagshipOrder = [
    'foodtech-hub',
    'cosmederm-ai-academy',
    'htx-rau-cu',
    'taxhkd'
  ];
  const flagshipApps = flagshipOrder
    .map(id => apps.find(a => a.id === id))
    .filter((a): a is AppItem => Boolean(a));

  // Focus view index for Flagship apps: null means compact grid view, 0-3 means single app focus view
  const [activeFlagshipIdx, setActiveFlagshipIdx] = useState<number | null>(null);

  // 4. TIÊU ĐIỂM DỰ ÁN NỔI BẬT (Spotlight 5 app: UTH SCM, ABM, Vet Aqua, BJC Sales, Customer Visit)
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

  // Focus view index for Spotlight apps: null means compact grid view, 0-4 means single app focus view
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState<number | null>(null);

  // Active media mode (image/video) for individual app cards
  const [activeMedia, setActiveMedia] = useState<Record<string, 'image' | 'video'>>({});

  const toggleMedia = (appId: string, mode: 'image' | 'video') => {
    setActiveMedia(prev => ({ ...prev, [appId]: mode }));
  };

  /**
   * Render a compact visual card:
   * - Minimal text: ONLY image, logo, title, category/stage badge
   * - Zero wall of text or clutter
   * - Clicking opens focus view
   */
  const renderCompactCard = (
    app: AppItem,
    index: number,
    badgeText: string,
    onExpand: () => void,
    accentColor: 'amber' | 'emerald' | 'sky' | 'rose' = 'amber'
  ) => {
    const requested = isAppRequested(app.id);
    const borderHover = 
      accentColor === 'emerald' ? 'hover:border-emerald-400 hover:shadow-emerald-500/20' :
      accentColor === 'sky' ? 'hover:border-sky-400 hover:shadow-sky-500/20' :
      accentColor === 'rose' ? 'hover:border-rose-400 hover:shadow-rose-500/20' :
      'hover:border-amber-400 hover:shadow-amber-500/20';

    return (
      <div
        key={app.id}
        onClick={onExpand}
        className={`group relative flex flex-col rounded-2xl bg-[#0B1A2F] border border-slate-700/80 ${borderHover} transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden cursor-pointer`}
      >
        {/* Visual Thumbnail (aspect-video / 16:10) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
          <img
            src={app.coverImage || app.illustrationImage || (app.detailImages && app.detailImages[0]) || app.placeholderImage}
            alt={app.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // fallback
              (e.target as HTMLImageElement).src = app.illustrationImage || app.placeholderImage || '/apps/vietreal/cover.jpg';
            }}
          />

          {/* Top Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#07111E]/95 border border-amber-400/50 text-amber-300 shadow-md backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{badgeText}</span>
            </span>
            {app.demoCredential && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#07111E]/90 border border-slate-600 text-slate-300 shadow-sm">
                Có Demo
              </span>
            )}
          </div>

          {/* Click to expand overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1 drop-shadow-md">
              <Eye className="w-3.5 h-3.5" />
              <span>Xem chi tiết &amp; Trải nghiệm</span>
            </span>
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              ➔
            </span>
          </div>
        </div>

        {/* Compact Info Footer (Zero clutter, clean & readable) */}
        <div className="p-4 flex flex-col justify-between flex-1 bg-[#0B1A2F]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30">
                {app.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px]">
                {app.audience.split(',')[0]}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#0E223D] border border-slate-700 p-1 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                <img
                  src={app.logoUrl}
                  alt={`${app.name} logo`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
                {app.name}
              </h3>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1">
              <span>Xem chi tiết</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>

            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <a
                href={app.url}
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp(app.url, e)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-300 bg-[#0E223D] hover:bg-amber-400 hover:text-slate-950 transition-colors border border-slate-700"
                title={`Mở trực tiếp ${app.url}`}
              >
                Mở web
              </a>
              <button
                onClick={() => onToggleRequest(app)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  requested
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0E223D] text-slate-400 hover:text-white border border-slate-700'
                }`}
                title={requested ? 'Đã chọn yêu cầu' : 'Thêm vào yêu cầu'}
              >
                {requested ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render single app in Focus Detail View:
   * - Hides other apps to avoid visual clutter
   * - Provides top navigation: "Quay về", "⬅ Trước", "Tiếp theo ➔"
   * - Provides quick tab switcher for the group
   */
  const renderFocusDetailView = (
    app: AppItem,
    currentIndex: number,
    totalCount: number,
    groupLabel: string,
    allGroupApps: AppItem[],
    onBack: () => void,
    onNavigate: (newIndex: number) => void,
    stageTitles?: string[]
  ) => {
    const requested = isAppRequested(app.id);
    const currentMedia = activeMedia[app.id] || 'image';

    const handlePrev = () => {
      const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
      onNavigate(prevIdx);
    };

    const handleNext = () => {
      const nextIdx = (currentIndex + 1) % totalCount;
      onNavigate(nextIdx);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Navigation Bar (Top Bar) */}
        <div className="rounded-2xl bg-[#0B1A2F] border border-amber-400/40 p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Back button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black text-slate-200 bg-[#07111E] hover:bg-amber-400 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay về danh sách ({totalCount} ứng dụng)</span>
            </button>

            <span className="md:hidden text-xs font-mono font-bold text-amber-300 bg-[#07111E] px-2.5 py-1 rounded-lg border border-slate-700">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>

          {/* Quick Tab Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-full overflow-x-auto py-1">
            {allGroupApps.map((groupApp, gIdx) => {
              const isActive = gIdx === currentIndex;
              const tabTitle = stageTitles && stageTitles[gIdx] ? stageTitles[gIdx] : `#${gIdx + 1} ${groupApp.name.split(':')[0].trim()}`;
              return (
                <button
                  key={groupApp.id}
                  onClick={() => onNavigate(gIdx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer truncate max-w-[200px] ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md scale-105'
                      : 'bg-[#07111E] text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500'
                  }`}
                  title={groupApp.name}
                >
                  {tabTitle}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-[#07111E] hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 transition-all cursor-pointer"
              title="Xem ứng dụng trước"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <span className="hidden md:inline-block text-xs font-mono font-bold text-amber-300 px-2">
              {currentIndex + 1} / {totalCount}
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shadow-md"
              title="Xem ứng dụng tiếp theo"
            >
              <span>Tiếp theo</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Detailed App Card */}
        <div className="rounded-3xl bg-[#0B1A2F] border border-amber-400/80 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Visual Area (AppMockupVisual) */}
          <div className="w-full lg:w-7/12 min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] relative overflow-hidden bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col">
            
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
                <span>Video Clip Tour</span>
              </button>
            </div>

            {/* Badges on Visual */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                {groupLabel} #{currentIndex + 1}
              </span>
              {app.demoCredential && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#07111E]/95 border border-amber-400/50 text-amber-300 shadow-md backdrop-blur-md">
                  Có TK Demo
                </span>
              )}
              {app.userManual && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 shadow-md flex items-center gap-1 backdrop-blur-md">
                  <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Có HDSD PDF</span>
                </span>
              )}
            </div>

            {/* Visual Display */}
            <AppMockupVisual
              app={app}
              mode={currentMedia}
              onOpenDetails={() => onSelectApp(app)}
            />
          </div>

          {/* Details Content Area */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 bg-[#0B1A2F] lg:w-5/12">
            <div>
              {/* Category & Audience */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  {app.category}
                </span>
                <span className="text-xs font-mono text-slate-400 font-medium">
                  {app.audience}
                </span>
              </div>

              {/* Logo & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#0E223D] border border-amber-400/40 shadow-lg p-2 flex items-center justify-center">
                  <img
                    src={app.logoUrl}
                    alt={`${app.name} logo`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {app.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-400 mt-1">
                    Trải nghiệm trực tiếp không reload • PWA Offline • Không lưu dữ liệu
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-slate-200 mt-3 leading-relaxed">
                {app.description}
              </p>

              {/* Key Features */}
              {app.keyFeatures && (
                <div className="mt-5 p-4 rounded-2xl bg-[#07111E]/90 border border-slate-700/80 space-y-2.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Tính năng nghiệp vụ cốt lõi:</span>
                  </div>
                  {app.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem / Solution */}
              {app.problem && app.solution && (
                <div className="mt-4 p-4 rounded-2xl bg-[#07111E]/70 border border-slate-700/60 space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-rose-300">Bài toán thực tế: </span>
                    <span className="text-slate-300">{app.problem}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300">Giải pháp số hóa: </span>
                    <span className="text-slate-300">{app.solution}</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {app.tags.slice(0, 5).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0E223D] text-slate-300 border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => onSelectApp(app, 'image')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>Xem Toàn Bộ Chi Tiết &amp; Ảnh</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {app.userManual && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (app.userManual) {
                        await downloadPdfFile(app.userManual.url, app.userManual.fileName);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all border border-emerald-400/40 cursor-pointer"
                    title={`Tải sách HDSD PDF (${app.userManual.fileSize})`}
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-[#0E223D] hover:bg-amber-400 hover:text-slate-950 transition-all border border-slate-700 cursor-pointer"
                  title={`Mở trực tiếp ${app.url}`}
                >
                  <span>Mở web app</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onToggleRequest(app)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    requested
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0E223D] hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700'
                  }`}
                >
                  {requested ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chọn</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Chọn yêu cầu</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Back Button */}
        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Thu gọn và quay lại xem danh sách đầy đủ</span>
          </button>
        </div>

      </div>
    );
  };

  const currentTropilabFeature = TROPILAB_FEATURES[activeTropilabFeatureIdx] || TROPILAB_FEATURES[0];

  return (
    <section id="featured" className="py-14 sm:py-20 bg-[#07111E] border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* PHẦN 1: TROPILAB RISKOS (ĐẶT NGAY ĐẦU FEATURED, TRƯỚC TRỌN BỘ 4 APP) */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {tropilabApp && (
          <div className="relative">
            {/* Tropilab Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/40 text-xs sm:text-sm font-bold text-teal-300 mb-3 shadow-sm">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>SỨC KHỎE &amp; Y TẾ • ISO 22367:2020 &amp; ISO 15189:2022 • TRUNG TÂM ĐIỀU HÀNH SỐ</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  TROPILAB RISKOS — Quản Trị Rủi Ro &amp; An Toàn Phòng Xét Nghiệm Bệnh Viện
                </h2>
                <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                  Trung tâm điều hành số hóa toàn diện quy trình kiểm soát rủi ro xét nghiệm bệnh viện: Báo lỗi 1 chạm trên di động, tự động khóa mẫu trên LIS, đối chiếu barcode người bệnh, bản đồ ống nghiệm trực quan CLSI, AI kiểm tra y lệnh và ma trận rủi ro thời gian thực.
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-teal-400 font-bold bg-[#0A192F] px-4 py-2 rounded-xl border border-teal-400/40 whitespace-nowrap shadow-sm">
                [ LIVE PRODUCTION • TROPILAB.VERCEL.APP ]
              </div>
            </div>

            {/* Tropilab Interactive Showcase Card */}
            <div className="rounded-3xl bg-[#0B1A2F] border border-teal-400/50 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
              
              {/* Visual Side: Interactive 10 Features / Video Clip */}
              <div className="w-full lg:w-7/12 min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] relative overflow-hidden bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
                
                {/* Mode Switcher */}
                <div className="absolute top-3 right-3 z-30 flex items-center bg-[#07111E]/95 backdrop-blur-md rounded-xl p-0.5 border border-slate-700 shadow-md">
                  <button
                    onClick={() => setTropilabMode('image')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tropilabMode === 'image'
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>10 Ảnh Tính Năng</span>
                  </button>

                  <button
                    onClick={() => setTropilabMode('video')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tropilabMode === 'video'
                        ? 'bg-teal-400 text-slate-950 font-black shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Clip Tour</span>
                  </button>
                </div>

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 z-30 pointer-events-none flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-md flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-950" />
                    <span>TROPILAB RISKOS • ISO 15189 / 22367</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#07111E]/95 border border-teal-400/50 text-teal-300 shadow-md">
                    Có TK Demo
                  </span>
                </div>

                {/* Main Visual Display */}
                {tropilabMode === 'video' ? (
                  <div className="w-full h-full min-h-[380px] lg:min-h-[560px]">
                    <AppMockupVisual
                      app={tropilabApp}
                      mode="video"
                      onOpenDetails={() => onSelectApp(tropilabApp, 'video')}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full min-h-[380px] lg:min-h-[560px] flex flex-col justify-between p-4 sm:p-6 bg-slate-950">
                    {/* Active Screenshot Display with smooth zoom */}
                    <div 
                      onClick={() => onSelectApp(tropilabApp, 'image')}
                      className="relative w-full flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-pointer flex items-center justify-center"
                    >
                      <img
                        src={currentTropilabFeature.screen}
                        alt={currentTropilabFeature.title}
                        className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                        <div className="text-left">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-teal-400 text-slate-950">
                            {currentTropilabFeature.badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-black text-white mt-1 drop-shadow-md">
                            {currentTropilabFeature.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-200 mt-0.5 line-clamp-2 max-w-xl">
                            {currentTropilabFeature.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 10 Interactive Feature Buttons Grid */}
                    <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {TROPILAB_FEATURES.map((feat) => {
                        const isCurrent = feat.idx === activeTropilabFeatureIdx;
                        return (
                          <button
                            key={feat.idx}
                            onClick={() => setActiveTropilabFeatureIdx(feat.idx)}
                            className={`p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isCurrent
                                ? 'bg-teal-500/20 border border-teal-400 text-white shadow-md'
                                : 'bg-[#07111E] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                            }`}
                          >
                            <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-teal-300' : 'text-slate-500'}`}>
                              0{feat.idx + 1}
                            </span>
                            <span className="text-xs font-bold truncate mt-0.5">
                              {feat.shortTitle}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Tropilab Info Side */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 bg-[#0B1A2F] lg:w-5/12">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-400/30">
                      Sức Khỏe &amp; Y Tế Bệnh Viện
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Chuẩn ISO 22367 &amp; 15189
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#0E223D] border border-teal-400/40 shadow-lg p-2 flex items-center justify-center">
                      <img
                        src={tropilabApp.logoUrl}
                        alt="Tropilab logo"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                        TROPILAB RISKOS
                      </h3>
                      <div className="text-xs font-bold text-teal-400 mt-1">
                        PWA Hoạt Động Offline • Không Lưu Dữ Liệu Riêng Tư • Phân Quyền Y Khoa
                      </div>
                    </div>
                  </div>

                  <p className="text-base text-slate-200 mt-3 leading-relaxed">
                    {tropilabApp.description}
                  </p>

                  {/* 4 Core Pillars */}
                  <div className="mt-5 p-4 rounded-2xl bg-[#07111E]/90 border border-slate-700/80 space-y-2.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                      <span>4 Điểm Nhấn Nghiệp Vụ Y Khoa Đột Phá:</span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span><strong>Báo lỗi 1 chạm:</strong> Khóa trạng thái mẫu tức thời trên LIS, chống sai sót lọt qua khâu phân tích.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span><strong>Quét mã QR vòng tay:</strong> Đối chiếu kép thông tin y lệnh trước khi chọc kim lấy máu bệnh nhân.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span><strong>Bản đồ ống nghiệm CLSI:</strong> Trực quan hóa chuẩn màu nắp ống, thể tích và quy cách chống đông.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span><strong>Tự động hóa hồ sơ ISO:</strong> Kết xuất CAPA ký số điện tử chuẩn ISO 22367:2020 &amp; ISO 15189:2022.</span>
                      </div>
                    </div>
                  </div>

                  {/* Demo Credential Note */}
                  <div className="mt-4 px-4 py-2.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs sm:text-sm text-teal-200">
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-teal-300">💡 Trải nghiệm ngay:</span>
                      <span>Có sẵn tài khoản Demo phân quyền Kỹ thuật viên &amp; Quản lý chất lượng</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectApp(tropilabApp, 'image')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                  >
                    <span>Xem Chi Tiết TROPILAB RISKOS</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://tropilab.vercel.app"
                      target={isMobileOrWebview() ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp('https://tropilab.vercel.app', e)}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-teal-200 bg-[#0E223D] hover:bg-teal-400 hover:text-slate-950 transition-all border border-slate-700 hover:border-teal-400 cursor-pointer"
                    >
                      <span>Mở tropilab.vercel.app</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => onToggleRequest(tropilabApp)}
                      className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isAppRequested(tropilabApp.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0E223D] hover:bg-teal-400 text-slate-200 hover:text-slate-950 border border-slate-700'
                      }`}
                    >
                      {isAppRequested(tropilabApp.id) ? (
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
          </div>
        )}

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-amber-500/40 text-xs font-mono font-bold text-amber-400 flex items-center gap-2 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>HỆ SINH THÁI LÀM CHA MẸ TOÀN DIỆN • 4 GIAI ĐOẠN TRƯỞNG THÀNH (0 – 18 TUỔI)</span>
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* PHẦN 2: TRỌN BỘ 4 ỨNG DỤNG ĐỒNG HÀNH LÀM CHA MẸ (0 - 18 TUỔI) */}
        {/* THU GỌN CHỮ LẠI CHO DỄ NHÌN, TRÁNH RỐI MẮT, CLICK VÀO MỚI RA CHI TIẾT */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-indigo-500/20 border border-amber-400/40 text-xs sm:text-sm font-bold text-amber-300 mb-3 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>4 CHẶNG ĐƯỜNG TRƯỞNG THÀNH • PWA OFFLINE • KHÔNG LƯU DỮ LIỆU</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Trọn Bộ 4 Ứng Dụng Đồng Hành Làm Cha Mẹ &amp; Trẻ Em (0 – 18 Tuổi)
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                Thiết kế tinh gọn, trực quan: Nhấn vào từng chặng để xem chi tiết nghiệp vụ, video clip tour và trải nghiệm ứng dụng trực tiếp.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-emerald-400 font-bold bg-[#0A192F] px-4 py-2 rounded-xl border border-emerald-400/30 whitespace-nowrap shadow-sm">
              [ TRỌN BỘ 4 CHẶNG • LIVE PRODUCTION ]
            </div>
          </div>

          {/* Conditional View: Grid View vs Focus Detail View */}
          {activeParentingIdx === null ? (
            /* COMPACT GRID VIEW (Chỉ hiện hình, logo, tên chặng — không rối mắt) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {parentingApps.map((app, index) => {
                const stages = [
                  'CHẶNG 1: 0–5 TUỔI',
                  'CHẶNG 2: 6–11 TUỔI',
                  'CHẶNG 3: 12–15 TUỔI',
                  'CHẶNG 4: 16–18 TUỔI'
                ];
                return renderCompactCard(
                  app,
                  index,
                  stages[index] || `CHẶNG #${index + 1}`,
                  () => setActiveParentingIdx(index),
                  'amber'
                );
              })}
            </div>
          ) : (
            /* FOCUS DETAIL VIEW (Chỉ hiện app đang chọn, các app khác ẩn đi) */
            renderFocusDetailView(
              parentingApps[activeParentingIdx],
              activeParentingIdx,
              parentingApps.length,
              'LÀM CHA MẸ CHẶNG',
              parentingApps,
              () => setActiveParentingIdx(null),
              (newIdx) => setActiveParentingIdx(newIdx),
              ['1. 0–5 Tuổi (0–60 Tháng)', '2. 6–11 Tuổi (Tiểu Học)', '3. 12–15 Tuổi (Dậy Thì)', '4. 16–18 Tuổi (THPT)']
            )
          )}

          {/* Parenting Ecosystem Summary */}
          {activeParentingIdx === null && (
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#0B1A2F] via-[#0E223D] to-[#122A4E] border border-amber-400/30 p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">
                    Hệ Sinh Thái Làm Cha Mẹ Khép Kín 4 Chặng (0–18 Tuổi)
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    0–60 tháng (Chăm sóc vàng) ➔ 6–11 tuổi (Kỷ luật tích cực) ➔ 12–15 tuổi (Thấu hiểu dậy thì) ➔ 16–18 tuổi (Bứt phá THPT &amp; Tự lập)
                  </div>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 shrink-0">
                100% Hoàn Thiện &amp; Vận Hành
              </span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-amber-500/30 text-xs font-mono font-bold text-amber-400 flex items-center gap-2 shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span>NỀN TẢNG CÔNG NGHỆ &amp; QUẢN TRỊ DOANH NGHIỆP</span>
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* PHẦN 3: NỀN TẢNG CÔNG NGHỆ & QUẢN TRỊ TIÊU BIỂU (4 APP: FOODTECH, COSMEDERM, HTX, TAX HKD) */}
        {/* THU GỌN CHỮ, CHỈ HIỆN HÌNH, THU NHỎ LẠI CHO DỄ NHÌN, NHẤN VÀO MỚI RA CHI TIẾT */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs sm:text-sm font-bold text-amber-300 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>NỀN TẢNG TRỌNG ĐIỂM • HỆ SINH THÁI DOANH NGHIỆP (4 APP)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nền Tảng Công Nghệ &amp; Quản Trị Tiêu Biểu
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                4 nền tảng số hóa quản trị doanh nghiệp &amp; nghiên cứu chuyên sâu: Vietnam Food Tech Hub, CosmeDerm AI Academy, Nông nghiệp HTX Rau Củ Quả và Thuế SmartTax HKD.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-amber-400 font-bold bg-[#0A192F] px-4 py-2 rounded-xl border border-amber-400/30 whitespace-nowrap shadow-sm">
              [ 4 NỀN TẢNG TRỌNG ĐIỂM • LIVE PRODUCTION ]
            </div>
          </div>

          {/* Conditional View: Grid View vs Focus Detail View */}
          {activeFlagshipIdx === null ? (
            /* COMPACT GRID VIEW (Chỉ hiện hình + tên app thu nhỏ, tránh rối mắt) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flagshipApps.map((app, index) => 
                renderCompactCard(
                  app,
                  index,
                  `TRỌNG ĐIỂM #${index + 1}`,
                  () => setActiveFlagshipIdx(index),
                  'amber'
                )
              )}
            </div>
          ) : (
            /* FOCUS DETAIL VIEW (Chỉ hiện app được chọn, các app khác ẩn đi) */
            renderFocusDetailView(
              flagshipApps[activeFlagshipIdx],
              activeFlagshipIdx,
              flagshipApps.length,
              'TRỌNG ĐIỂM',
              flagshipApps,
              () => setActiveFlagshipIdx(null),
              (newIdx) => setActiveFlagshipIdx(newIdx),
              ['1. Food Tech Hub', '2. CosmeDerm AI', '3. HTX Nông Nghiệp', '4. Thuế SmartTax HKD']
            )
          )}
        </div>

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-sky-500/40 text-xs font-mono font-bold text-sky-400 flex items-center gap-2 shadow-md">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>HỆ SINH THÁI GIÁO DỤC QUỐC TẾ • 13 QUỐC GIA BẢN ĐỊA HÓA</span>
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* PHẦN 4: VIETREAL 13 QUỐC GIA (13 PHIÊN BẢN BẢN ĐỊA HÓA SẮP RA MẮT) */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-[#081524] border border-sky-500/40 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>13 PHIÊN BẢN BẢN ĐỊA HÓA CHO TỪNG QUỐC GIA • VIETREAL 360°</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-extrabold">SẮP RA MẮT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Lộ Trình &amp; Ngôn Ngữ Giải Thích May Đo Theo Quốc Tịch Học Viên
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Nền tảng cốt lõi Vietreal 360° kết nối 13 phiên bản bản địa hóa chuyên sâu theo từng quốc tịch với đường dẫn ứng dụng độc lập cho từng nước.
              </p>
            </div>
            <a
              href="https://vietreal.vercel.app"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://vietreal.vercel.app', e)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/80 border border-sky-400/50 hover:bg-sky-900/80 hover:text-white transition-all shrink-0 cursor-pointer shadow-md"
            >
              <span>Xem Cốt Lõi: vietreal.vercel.app</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 13 Country Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {VIETREAL_COUNTRY_EDITIONS.map((c) => (
              <div
                key={c.id}
                onClick={(e) => openExternalApp(c.route, e)}
                className="group relative rounded-2xl bg-[#0B1A2F]/90 border border-slate-700/80 hover:border-sky-400 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:shadow-sky-500/15 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
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
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                    {c.vietnameseTitle}
                  </div>
                  
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                    {c.nativeDesc}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                    ({c.vietnameseDesc})
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
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

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 rounded-full bg-[#07111E] border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span>TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 APP)</span>
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* PHẦN 5: TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 APP: UTH SCM, ABM, VET AQUA, BJC, CUSTOMER VISIT) */}
        {/* THU GỌN CHỮ, CHỈ HIỆN HÌNH, THU NHỎ LẠI CHO DỄ NHÌN, NHẤN VÀO MỚI RA CHI TIẾT */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-xs sm:text-sm font-bold text-emerald-300 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>TIÊU ĐIỂM DỰ ÁN NỔI BẬT (5 APP)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Tiêu Điểm Dự Án Vận Hành &amp; Quản Trị Nghiệp Vụ
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
                Chuỗi cung ứng UTH SCM, quản lý hợp đồng AB Mauri, ERP thú y thủy sản, đào tạo kinh doanh BJC và quản trị khách hàng thực địa.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-emerald-400 font-bold bg-[#0A192F] px-4 py-2 rounded-xl border border-emerald-400/30 whitespace-nowrap shadow-sm">
              [ 5 DỰ ÁN TIÊU ĐIỂM • LIVE PRODUCTION ]
            </div>
          </div>

          {/* Conditional View: Grid View vs Focus Detail View */}
          {activeSpotlightIdx === null ? (
            /* COMPACT GRID VIEW (Chỉ hiện hình + tên app, gọn gàng, tránh rối mắt) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {spotlightApps.map((app, index) => 
                renderCompactCard(
                  app,
                  index,
                  `DỰ ÁN #${index + 1}`,
                  () => setActiveSpotlightIdx(index),
                  'emerald'
                )
              )}
            </div>
          ) : (
            /* FOCUS DETAIL VIEW (Chỉ hiện app được chọn, các app khác ẩn đi) */
            renderFocusDetailView(
              spotlightApps[activeSpotlightIdx],
              activeSpotlightIdx,
              spotlightApps.length,
              'DỰ ÁN',
              spotlightApps,
              () => setActiveSpotlightIdx(null),
              (newIdx) => setActiveSpotlightIdx(newIdx),
              ['1. UTH SCM', '2. AB Mauri', '3. Vet Aqua ERP', '4. BJC Training', '5. Customer Visit']
            )
          )}
        </div>

      </div>
    </section>
  );
};
