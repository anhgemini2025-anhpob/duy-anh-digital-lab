import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apps = [
  {
    id: "bjc-sales-training",
    name: "BJC Sales Training",
    category: "BÁN HÀNG & ĐÀO TẠO",
    url: "https://bjc-sales-training.pages.dev/",
    theme: { from: "#1e3a8a", to: "#2563eb", accent: "#60a5fa" },
    icon: "GraduationCap",
    tagline: "Hệ thống đào tạo kiến thức sản phẩm và lộ trình bán hàng B2B chuyên nghiệp",
    indicators: ["Learning Path", "Product Knowledge", "Quiz Assessment", "Progress Tracking"]
  },
  {
    id: "customer-visit",
    name: "Customer Visit Management",
    category: "QUẢN LÝ & HOẠT ĐỘNG SALES",
    url: "https://customer-visit.anhpob.workers.dev",
    theme: { from: "#0f766e", to: "#0d9488", accent: "#2dd4bf" },
    icon: "MapPin",
    tagline: "Theo dõi hành trình, lịch biểu công tác và đánh giá hiệu quả viếng thăm khách hàng B2B",
    indicators: ["Route Planning", "Client Database", "Visit Check-in", "Sales Pipeline"]
  },
  {
    id: "lipoid-advisor",
    name: "Lipoid R&D Advisor",
    category: "R&D & NGUYÊN LIỆU MỸ PHẨM",
    url: "https://lipoidadvisor.vercel.app",
    theme: { from: "#4c1d95", to: "#6d28d9", accent: "#a78bfa" },
    icon: "FlaskConical",
    tagline: "Tra cứu thông số kỹ thuật, tương thích và tư vấn công thức Phospholipid & Lecithin cao cấp",
    indicators: ["Phospholipid Search", "Formulation Guide", "Compatibility Checker", "Spec Sheets"]
  },
  {
    id: "clinic-spa",
    name: "Clinic Spa Management",
    category: "VẬN HÀNH & QUẢN TRỊ DỊCH VỤ",
    url: "https://linh-da-skinlab.pages.dev",
    theme: { from: "#831843", to: "#be185d", accent: "#f472b6" },
    icon: "Sparkles",
    tagline: "Hệ thống quản trị lịch hẹn, hồ sơ khách hàng, liệu trình da liễu và doanh thu phòng khám",
    indicators: ["Appointment Desk", "Patient Profiles", "Treatment Regimens", "Revenue Analytics"]
  },
  {
    id: "spa-landing",
    name: "Spa Service Landing Page",
    category: "DỊCH VỤ & CHĂM SÓC KHÁCH HÀNG",
    url: "https://linhda-skinlap.pages.dev",
    theme: { from: "#9d174d", to: "#db2777", accent: "#fb7185" },
    icon: "HeartHandshake",
    tagline: "Trang đích chuyển đổi cao giới thiệu không gian trải nghiệm và phác đồ trẻ hóa chuyên sâu",
    indicators: ["Hero Experience", "Service Packages", "Testimonial Showcase", "Instant Booking"]
  },
  {
    id: "bjc-sales-pitch",
    name: "Sales Pitch & Sales Battle Card",
    category: "CÔNG CỤ BÁN HÀNG B2B",
    url: "https://bjc-sales-pitch.pages.dev",
    theme: { from: "#1e3a8a", to: "#1d4ed8", accent: "#38bdf8" },
    icon: "Swords",
    tagline: "Tạo lập kịch bản thuyết trình bán hàng và thẻ chiến lược đối đầu sản phẩm đối thủ tức thì",
    indicators: ["Battle Cards", "Objection Handling", "Value Propositions", "Competitor Matrix"]
  },
  {
    id: "badminton-management",
    name: "Badminton Group Management",
    category: "THỂ THAO & CỘNG ĐỒNG",
    url: "https://splendid-panda-ef075e.netlify.app",
    theme: { from: "#14532d", to: "#15803d", accent: "#4ade80" },
    icon: "Activity",
    tagline: "Quản lý thành viên câu lạc bộ, xếp lịch sân, tính điểm Elo và quản lý quỹ hội minh bạch",
    indicators: ["Match Scheduler", "Elo Leaderboard", "Member Registry", "Treasury Tracker"]
  },
  {
    id: "tro-ly-vi-ngon",
    name: "Trợ Lý Vị Ngon",
    category: "AI & CÔNG NGHỆ ẨM THỰC",
    url: "https://trolyvingon.vercel.app/",
    theme: { from: "#c2410c", to: "#ea580c", accent: "#fb923c" },
    icon: "Bot",
    tagline: "Trợ lý AI thông minh giải đáp câu hỏi chuyên sâu về cân bằng vị giác, cấu trúc món và gia vị",
    indicators: ["AI Flavor Pairing", "Umami Balancing", "Ingredient Synergy", "Sensory Analysis"]
  },
  {
    id: "vet-aqua-erp",
    name: "Vet & Aqua ERP Lite",
    category: "ERP & NÔNG NGHIỆP THỦY SẢN",
    url: "https://vet-aqua-erp-lite.vercel.app",
    theme: { from: "#0e7490", to: "#0284c7", accent: "#38bdf8" },
    icon: "Fish",
    tagline: "Giải pháp ERP tinh gọn cho đại lý phân phối thuốc thú y, thức ăn thủy sản và kiểm soát tồn kho",
    indicators: ["Inventory Control", "Batch Tracking", "Debt & Receivables", "POS Cashier"]
  },
  {
    id: "yeast-extract-test",
    name: "Yeast Extract Knowledge Test",
    category: "ĐÀO TẠO & ĐÁNH GIÁ NĂNG LỰC",
    url: "https://cool-tulumba-fa58d6.netlify.app/",
    theme: { from: "#78350f", to: "#b45309", accent: "#f59e0b" },
    icon: "CheckSquare",
    tagline: "Hệ thống trắc nghiệm đánh giá kiến thức chuyên môn chiết xuất nấm men Lallemand Savory",
    indicators: ["Assessment Matrix", "Timed Examination", "Instant Scoring", "Deep Explanation"]
  },
  {
    id: "vanderbilt-advisor",
    name: "Vanderbilt R&D Advisor",
    category: "R&D & HÓA CHẤT CHUYÊN DỤNG",
    url: "https://vanderbiltadvisor.vercel.app",
    theme: { from: "#1e293b", to: "#334155", accent: "#94a3b8" },
    icon: "Cpu",
    tagline: "Tư vấn công nghệ khoáng chất, chất lưu biến Veegum/Vanatree cho dược phẩm và mỹ phẩm",
    indicators: ["Rheology Advisor", "Veegum Grade Finder", "Suspension Guide", "Tech Data Sheets"]
  },
  {
    id: "algaktiv-advisor",
    name: "Algaktiv R&D Advisor",
    category: "R&D & CÔNG NGHỆ TẢO BIỂN",
    url: "https://algaktiv-advisor.pages.dev/",
    theme: { from: "#065f46", to: "#059669", accent: "#34d399" },
    icon: "Waves",
    tagline: "Khám phá hoạt chất sinh học từ vi tảo biển cho các giải pháp chăm sóc da liễu tiên tiến",
    indicators: ["Microalgae Actives", "Clinical Studies", "Skin Biology Guide", "Formulation Lab"]
  },
  {
    id: "lanxess-cosmetic-advisor",
    name: "LANXESS Cosmetic Advisor",
    category: "R&D & HỆ BẢO QUẢN MỸ PHẨM",
    url: "https://lanxess-cosmetic-advisor.pages.dev/",
    theme: { from: "#991b1b", to: "#dc2626", accent: "#f87171" },
    icon: "ShieldCheck",
    tagline: "Tra cứu hệ thống chất bảo quản, kháng khuẩn và giải pháp vi sinh an toàn cho mỹ phẩm",
    indicators: ["Preservative Match", "Microbial Protection", "Global Regulatory", "pH Stability Map"]
  },
  {
    id: "cosmederm-ai-academy",
    name: "CosmeDerm AI Academy",
    category: "AI • ĐÀO TẠO & R&D MỸ PHẨM",
    url: "https://cosmederm-ai.vercel.app/",
    featured: true,
    theme: { from: "#312e81", to: "#4338ca", accent: "#818cf8" },
    icon: "BookOpenCheck",
    tagline: "Học viện số hóa ứng dụng AI kết hợp cơ sở dữ liệu 10 đầu sách kinh điển về Khoa học Mỹ phẩm",
    indicators: ["AI Formulation Bot", "Ingredient Database", "10-Book Core Library", "Safety Assessment"]
  },
  {
    id: "foodtech-hub",
    name: "Vietnam Food Tech Hub",
    category: "CÔNG NGHỆ THỰC PHẨM & R&D",
    url: "https://foodtechhub.vercel.app/",
    featured: true,
    theme: { from: "#854d0e", to: "#ca8a04", accent: "#facc15" },
    icon: "Layers",
    tagline: "Nền tảng số hóa kiến thức, phụ gia, tiêu chuẩn QA/QC và công cụ xử lý sự cố công nghệ thực phẩm",
    indicators: ["Additive Directory", "QA/QC Workflows", "Troubleshooting Hub", "Cost Optimizer"]
  },
  {
    id: "htx-rau-cu",
    name: "HTX Rau Củ Quả",
    category: "NÔNG NGHIỆP SỐ & HỢP TÁC XÃ",
    url: "https://htxraucuqua.vercel.app",
    theme: { from: "#166534", to: "#22c55e", accent: "#86efac" },
    icon: "Sprout",
    tagline: "Hệ thống quản lý sản lượng thu hoạch, xã viên, lịch mùa vụ và phân phối nông sản an toàn",
    indicators: ["Harvest Records", "Member Management", "Seasonal Calendar", "Supply Chain Link"]
  },
  {
    id: "uth-scm-navigator",
    name: "UTH SCM Navigator",
    category: "EDTECH & CHUỖI CUNG ỨNG LOGISTICS",
    url: "https://uhtscm.vercel.app/",
    featured: true,
    theme: { from: "#0369a1", to: "#0284c7", accent: "#38bdf8" },
    icon: "Compass",
    tagline: "Cẩm nang số hóa điều hướng học tập chuyên ngành Logistics & Quản lý Chuỗi cung ứng ĐH GTVT TP.HCM",
    indicators: ["Curriculum Roadmap", "Incoterms & Freight", "Supply Chain Models", "Exam Simulator"]
  }
];

function generateSVG(app) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_${app.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="primaryGrad_${app.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${app.theme.from}" />
      <stop offset="100%" stop-color="${app.theme.to}" />
    </linearGradient>
    <linearGradient id="cardGrad_${app.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>
    <filter id="glow_${app.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1600" height="1000" fill="url(#bgGrad_${app.id})" />

  <!-- Ambient Glow Behind Browser -->
  <circle cx="800" cy="500" r="380" fill="${app.theme.accent}" opacity="0.12" filter="url(#glow_${app.id})" />

  <!-- Decorative Grid Overlay -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="200" x2="1600" y2="200" />
    <line x1="0" y1="400" x2="1600" y2="400" />
    <line x1="0" y1="600" x2="1600" y2="600" />
    <line x1="0" y1="800" x2="1600" y2="800" />
    <line x1="400" y1="0" x2="400" y2="1000" />
    <line x1="800" y1="0" x2="800" y2="1000" />
    <line x1="1200" y1="0" x2="1200" y2="1000" />
  </g>

  <!-- Mockup Window / Browser Container -->
  <g transform="translate(100, 80)">
    <!-- Outer Shadow Frame -->
    <rect width="1400" height="840" rx="24" fill="#0f172a" stroke="#334155" stroke-width="2" opacity="0.95" />
    
    <!-- Window Header -->
    <rect width="1400" height="64" rx="24" fill="#1e293b" />
    <rect y="40" width="1400" height="24" fill="#1e293b" />
    <line x1="0" y1="64" x2="1400" y2="64" stroke="#334155" stroke-width="1.5" />

    <!-- Window Controls -->
    <circle cx="36" cy="32" r="8" fill="#ef4444" opacity="0.8" />
    <circle cx="64" cy="32" r="8" fill="#f59e0b" opacity="0.8" />
    <circle cx="92" cy="32" r="8" fill="#10b981" opacity="0.8" />

    <!-- Address Bar -->
    <rect x="240" y="16" width="920" height="32" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1" />
    <text x="700" y="38" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="500" text-anchor="middle">
      ${app.url}
    </text>

    <!-- Status Indicator Pill -->
    <rect x="1200" y="18" width="160" height="28" rx="14" fill="${app.theme.from}" opacity="0.4" />
    <text x="1280" y="37" fill="${app.theme.accent}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" text-anchor="middle">
      Live Application
    </text>

    <!-- Main Content Area -->
    <g transform="translate(60, 100)">
      <!-- Category Badge -->
      <rect x="0" y="0" width="300" height="34" rx="8" fill="${app.theme.from}" opacity="0.3" stroke="${app.theme.accent}" stroke-width="1" />
      <text x="150" y="22" fill="${app.theme.accent}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" text-anchor="middle">
        ${app.category}
      </text>

      <!-- App Title -->
      <text x="0" y="85" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="44" font-weight="800">
        ${app.name}
      </text>

      <!-- App Subtitle -->
      <text x="0" y="125" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="400">
        ${app.tagline}
      </text>

      <!-- Dashboard Visual Matrix -->
      <g transform="translate(0, 170)">
        <!-- 4 Functional Feature Tiles -->
        ${app.indicators.map((indicator, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const x = col * 660;
          const y = row * 220;
          return `
          <g transform="translate(${x}, ${y})">
            <rect width="620" height="190" rx="16" fill="url(#cardGrad_${app.id})" stroke="#334155" stroke-width="1.5" />
            <circle cx="48" cy="50" r="22" fill="${app.theme.from}" opacity="0.5" />
            <text x="48" y="56" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="700" text-anchor="middle">0${index + 1}</text>
            <text x="90" y="56" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="700">${indicator}</text>
            <rect x="36" y="95" width="548" height="12" rx="6" fill="#1e293b" />
            <rect x="36" y="95" width="${180 + index * 90}" height="12" rx="6" fill="${app.theme.accent}" opacity="0.8" />
            <rect x="36" y="130" width="380" height="10" rx="5" fill="#334155" opacity="0.6" />
          </g>`;
        }).join('')}
      </g>
    </g>

    <!-- Bottom Center Watermark Badge: Section 2 & 10 requirement -->
    <g transform="translate(560, 770)">
      <rect width="280" height="42" rx="21" fill="#030712" stroke="${app.theme.accent}" stroke-width="1.5" opacity="0.95" />
      <circle cx="28" cy="21" r="7" fill="${app.theme.accent}" />
      <text x="145" y="27" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="600" text-anchor="middle">
        Screenshot preview
      </text>
    </g>
  </g>
</svg>`;
}

const publicAppsDir = path.join(__dirname, '..', 'public', 'apps');
if (!fs.existsSync(publicAppsDir)) {
  fs.mkdirSync(publicAppsDir, { recursive: true });
}

const manifest = [];

apps.forEach(app => {
  const appDir = path.join(publicAppsDir, app.id);
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  const svgContent = generateSVG(app);
  
  // Write cover-placeholder.svg (as required by prompt section 2 & 10)
  fs.writeFileSync(path.join(appDir, 'cover-placeholder.svg'), svgContent, 'utf-8');
  
  // Also provide cover.webp fallback or SVG for local serving
  fs.writeFileSync(path.join(appDir, 'cover.svg'), svgContent, 'utf-8');

  manifest.push({
    id: app.id,
    name: app.name,
    category: app.category,
    sourceUrl: app.url,
    cover: `/apps/${app.id}/cover.svg`,
    placeholder: `/apps/${app.id}/cover-placeholder.svg`,
    featured: !!app.featured
  });

  console.log(`Generated assets for: ${app.id}`);
});

// Write manifest.json (required by prompt section 23)
fs.writeFileSync(
  path.join(publicAppsDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf-8'
);

console.log('Manifest written successfully to /public/apps/manifest.json');
