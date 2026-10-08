export interface CountryEdition {
  id: string;
  flag: string;
  countryName: string;
  nativeTitle: string;
  vietnameseTitle: string;
  nativeDesc: string;
  vietnameseDesc: string;
  route: string;
}

export const VIETREAL_COUNTRY_EDITIONS: CountryEdition[] = [
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
    nativeDesc: 'ພາສາຫວຽດທີ່ໃຊ້ແທ້ ສຳລັບການຮຽນ, ການເຮັດວຽກ ແລະ ຊີວິດປະຈຳວັນ.',
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
