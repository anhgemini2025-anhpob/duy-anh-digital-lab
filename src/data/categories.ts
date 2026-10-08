import { APPS_DATA } from './apps';

export interface CategoryItem {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

const RAW_CATEGORIES: Omit<CategoryItem, 'count'>[] = [
  {
    id: "all",
    name: "Tất cả ứng dụng",
    shortName: "Tất cả",
    icon: "LayoutGrid",
    description: "Toàn bộ hệ sinh thái ứng dụng web thực tế đã phát triển và sẵn sàng triển khai",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "sales-business",
    name: "Bán hàng B2B & Quản trị Doanh nghiệp",
    shortName: "Sales & B2B",
    icon: "Briefcase",
    description: "Báo cáo thuế Hộ kinh doanh, quản lý hợp đồng mua bán B2B, huấn luyện sales thực địa và kịch bản chốt đơn Battle Card",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: "ai-education",
    name: "AI & Đào tạo Tri thức",
    shortName: "AI & Đào tạo",
    icon: "Sparkles",
    description: "Hệ sinh thái học Tiếng Việt Thực Chiến 360° (Vietreal), học viện thẩm mỹ CosmeDerm AI Academy và giải pháp số hóa giáo dục",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: "rd-cosmetics",
    name: "R&D Hóa chất & Mỹ phẩm",
    shortName: "R&D & Mỹ phẩm",
    icon: "FlaskConical",
    description: "Bộ công cụ tư vấn kỹ thuật nguyên liệu, nhũ tương, lưu biến và hệ bảo quản tiêu chuẩn quốc tế",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "food-tech",
    name: "Công nghệ Thực phẩm & F&B",
    shortName: "Food Tech",
    icon: "Utensils",
    description: "Giải pháp số hóa nghiên cứu phụ gia thực phẩm, xử lý sự cố dây chuyền và trợ lý vị giác",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "agriculture-htx",
    name: "Nông nghiệp & Chuỗi cung ứng SCM",
    shortName: "Nông nghiệp & SCM",
    icon: "Sprout",
    description: "ERP quản trị đại lý thú y thủy sản, chuỗi cung ứng SCM và số hóa quản lý hợp tác xã nông nghiệp",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "services-clinic",
    name: "Vận hành Dịch vụ & Clinic Spa",
    shortName: "Dịch vụ & Clinic",
    icon: "Building2",
    description: "Quản trị phòng khám da liễu spa, landing page chuyển đổi cao và phần mềm cộng đồng",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "healthcare",
    name: "Sức khỏe & Y tế",
    shortName: "Sức khỏe",
    icon: "HeartPulse",
    description: "Hệ thống PWA quản trị rủi ro và chất lượng phòng xét nghiệm bệnh viện, giám sát IoT môi trường và kiểm soát an toàn người bệnh.",
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: "lifestyle",
    name: "Đời sống",
    shortName: "Đời sống",
    icon: "Baby",
    description: "Hệ sinh thái Làm Cha Mẹ toàn diện 0 tháng đến 18 tuổi: Nuôi dưỡng bé 0–60 tháng, Nuôi dạy con 6–11 tuổi, Thấu hiểu thiếu niên 12–15 tuổi và Định hướng thanh niên 16–18 tuổi.",
    color: "from-rose-500 to-amber-500"
  }
];

export const CATEGORIES: CategoryItem[] = RAW_CATEGORIES.map(cat => ({
  ...cat,
  count: cat.id === 'all' 
    ? APPS_DATA.length 
    : APPS_DATA.filter(app => app.categoryId === cat.id).length
}));
