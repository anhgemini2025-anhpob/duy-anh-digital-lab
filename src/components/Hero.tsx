import React, { useState } from 'react';
import { ArrowRight, Sparkles, Play, ExternalLink, ShieldCheck, Check, Clock, WifiOff, FileText, ChevronRight, Activity, Baby, GraduationCap, Compass, HeartHandshake, HeartPulse, ShieldAlert, QrCode, Cpu, FileCheck, Volume2 } from 'lucide-react';
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
  const appNuoiDuongTre = allApps.find(a => a.id === 'nuoi-duong-be-0-60' || a.id === 'nuoi-duong-tre-0-36');
  const appNuoiDayTre = allApps.find(a => a.id === 'nuoi-day-tre-6-11');
  const appThauHieu12To15 = allApps.find(a => a.id === 'thau-hieu-thieu-nien-12-15');
  const appDinhHuong16To18 = allApps.find(a => a.id === 'dinh-huong-thanh-nien-16-18');
  const tropilabApp = allApps.find(a => a.id === 'tropilab-riskos');

  const [activeTropilabFeatureIdx, setActiveTropilabFeatureIdx] = useState<number>(0);

  // 10 features for TROPILAB RISKOS (Sức khỏe & Quản lý rủi ro xét nghiệm ISO 22367 / ISO 15189)
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

  // Switcher between the 4 lifecycle parenting apps (0 months to 18 years old)
  const [selectedParentingAppId, setSelectedParentingAppId] = useState<
    'dinh-huong-thanh-nien-16-18' | 'thau-hieu-thieu-nien-12-15' | 'nuoi-day-tre-6-11' | 'nuoi-duong-be-0-60'
  >('dinh-huong-thanh-nien-16-18');

  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);

  // 10 features for "Thấu hiểu thiếu niên 12 đến 15 tuổi" (THCS & Tuổi dậy thì)
  const highlightFeatures12To15 = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: "Onboarding Đa Nền Tảng & Chế Độ Máy Chiếu",
      shortTitle: "Đa Nền Tảng & Máy Chiếu",
      desc: "Truy cập mượt mà trên điện thoại, laptop và trình chiếu màn hình lớn phòng khách, đồng bộ cả nhà cùng theo dõi.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_01_onboarding_projector.jpg"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: "Bứt Phá Tầm Vóc & Dinh Dưỡng Dậy Thì",
      shortTitle: "Tầm Vóc & Dinh Dưỡng",
      desc: "Theo dõi biểu đồ tăng trưởng chiều cao Tanner, thực đơn Canxi D3K2, bài tập xà đơn, nhảy dây và giấc ngủ sâu.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_02_tanner_nutrition.jpg"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: "Bộ Sơ Cứu Cảm Xúc & Kịch Bản Giao Tiếp NVC",
      shortTitle: "Sơ Cứu Cảm Xúc NVC",
      desc: "4 bước giao tiếp phi bạo lực NVC (Quan sát, Cảm nhận, Nhu cầu, Đề xuất) xoa dịu não bộ và xóa tan xung đột tức thì.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_03_emotional_first_aid_nvc.jpg"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: "An Toàn Số & Chống Bẫy Grooming / Sextortion",
      shortTitle: "An Toàn Số & Grooming",
      desc: "Tấm khiên bảo vệ không gian mạng: bộ quy tắc 4 KHÔNG, cảnh báo cạm bẫy trực tuyến và kết nối Tổng đài 111.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_04_cyber_safety_grooming.jpg"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: "Mốc Pháp Lý Tuổi 14 & Quyền Riêng Tư Số",
      shortTitle: "Mốc Pháp Lý Tuổi 14",
      desc: "Khung nhận thức trách nhiệm pháp lý tuổi 14, tôn trọng ranh giới cá nhân và bảo vệ không gian riêng tư của con.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_05_legal_framework_age_14.jpg"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: "Hướng Nghiệp Holland RIASEC & Phân Luồng 9+",
      shortTitle: "Holland & Phân Luồng 9+",
      desc: "Trắc nghiệm 6 nhóm tính cách Holland RIASEC, định hướng rõ ràng hai con đường Cấp 3 hoặc Trường nghề từ mốc 15 tuổi.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_06_holland_career_9plus.jpg"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: "Ma Trận Cam Kết & Phần Thưởng 2 Chiều",
      shortTitle: "Ma Trận Cam Kết",
      desc: "Thiết lập thỏa thuận gia đình minh bạch, mở khóa phần thưởng tự chủ (decor phòng, chơi game, sách truyện).",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_07_family_agreement_matrix.jpg"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: "Giả Lập Đối Thoại AI Cố Vấn",
      shortTitle: "Giả Lập Đối Thoại AI",
      desc: "Không gian luyện tập giao tiếp an toàn, AI phản hồi thời gian thực giúp cha mẹ chuẩn bị tâm thế trước khi trò chuyện cùng con.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_08_ai_dialogue_simulator.jpg"
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: "Tổng Hợp Chương Trình Giáo Dục THCS (Lớp 6–9)",
      shortTitle: "Khung Giáo Dục THCS",
      desc: "Hệ thống hóa toàn bộ chương trình THCS, chi tiết các môn học, quy chuẩn và mục tiêu kiến thức trọng tâm con cần nắm.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_09_thcs_curriculum_6to9.jpg"
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: "Cầu Nối Thấu Hiểu & Gắn Kết Gia Đình",
      shortTitle: "Cầu Nối Gắn Kết",
      desc: "Chuyển hóa xung đột thành sự gắn kết sâu sắc, cùng con bước qua tuổi dậy thì rực rỡ và đong đầy yêu thương trọn vẹn.",
      screen: "/apps/thau-hieu-thieu-nien-12-15/feature_10_family_connection.jpg"
    }
  ];

  // 10 features for "Nuôi dạy trẻ từ 6 đến 11 tuổi" (Tiểu học)
  const highlightFeatures6To11 = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: "Trợ lý AI 24/7 đồng hành cùng cha mẹ",
      shortTitle: "Trợ lý AI 24/7",
      desc: "Trợ lý hội thoại AI chuyên biệt giải đáp các tình huống nuôi dạy con theo khung: phân tích nguyên nhân, điều quan sát, gợi ý câu nói và hoạt động 5–10 phút.",
      screen: "/apps/nuoi-day-tre-6-11/feature_01_ai_companion_247.jpg"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: "Thư viện kịch bản giao tiếp (Parenting Scripts)",
      shortTitle: "Parenting Scripts",
      desc: "Danh mục câu nói tình huống với sự so sánh trực quan giữa câu nói dễ gây căng thẳng (❌) và cách nói thay thế tích cực (✅).",
      screen: "/apps/nuoi-day-tre-6-11/feature_02_parenting_scripts.jpg"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: "Trang tổng quan & Điểm tin hàng ngày",
      shortTitle: "Dashboard & Điểm tin",
      desc: "Trả lời câu hỏi 'Hôm nay cha mẹ nên biết gì về con?', hiển thị 3 trọng tâm đồng hành và khung kết nối 2 phút cùng con sáng/tối.",
      screen: "/apps/nuoi-day-tre-6-11/feature_03_home_dashboard.jpg"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: "Hồ sơ phác họa bức tranh phát triển của con",
      shortTitle: "Bức tranh phát triển",
      desc: "Phản ánh toàn diện sự phát triển qua các chỉ số mô tả (tự tin, tập trung, đọc sách, giấc ngủ, cảm xúc) thay vì chấm điểm hay so sánh xếp hạng.",
      screen: "/apps/nuoi-day-tre-6-11/feature_04_child_profile.jpg"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: "Hỗ trợ học tập & Đồ thị kiến thức lớp 1-5",
      shortTitle: "Đồ thị Kiến thức",
      desc: "Bám sát Toán, Tiếng Việt, Tiếng Anh lớp 1-5, tự động truy vết các lỗ hổng kiến thức nền tảng để gợi ý hoạt động ngắn giúp cha mẹ kèm con.",
      screen: "/apps/nuoi-day-tre-6-11/feature_05_academic_knowledge_graph.jpg"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: "Nhật ký quan sát Cảm xúc & Hành vi",
      shortTitle: "Nhật ký Cảm xúc",
      desc: "Ghi nhận trạng thái cảm xúc hàng ngày và tự động nhận diện mẫu hình quy luật theo thời gian, phát hiện khung giờ con dễ căng thẳng.",
      screen: "/apps/nuoi-day-tre-6-11/feature_06_emotional_observation.jpg"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: "Quản lý Thói quen Số & Thiết bị",
      shortTitle: "Quản lý Thói quen Số",
      desc: "Thiết lập Thỏa thuận công nghệ gia đình, theo dõi thời gian màn hình/chơi game và cung cấp kịch bản trò chuyện thay vì cấm đoán cứng nhắc.",
      screen: "/apps/nuoi-day-tre-6-11/feature_07_digital_family_manager.jpg"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: "Theo dõi Sức khỏe, Thể chất & Dinh dưỡng",
      shortTitle: "Sức khỏe & Dinh dưỡng",
      desc: "Biểu đồ theo dõi chiều cao, cân nặng, giấc ngủ, vận động cùng tính năng 'Ăn gì cho con?' gợi ý thực đơn tuần và bữa sáng nhanh 15 phút.",
      screen: "/apps/nuoi-day-tre-6-11/feature_08_health_nutrition.jpg"
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: "Thiết lập Nhịp sống & Hoạt động kết nối gia đình",
      shortTitle: "Kết nối Gia đình",
      desc: "Xây dựng thói quen cân bằng và gợi ý hoạt động kết nối 5–15 phút (đọc sách, nấu ăn, đi dạo, trò chuyện) cá nhân hóa theo độ tuổi.",
      screen: "/apps/nuoi-day-tre-6-11/feature_09_family_routine_quality_time.jpg"
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: "Báo cáo nhìn lại hàng tuần & Zone hạ nhiệt SOS",
      shortTitle: "SOS Hạ nhiệt 60s",
      desc: "Tổng kết 5–7 điểm sáng tiến bộ qua góc nhìn Ngọn Hải Đăng, kết hợp nút hạ nhiệt SOS 60 giây (nhạc Alpha + thở) giải tỏa căng thẳng khi dạy con.",
      screen: "/apps/nuoi-day-tre-6-11/feature_10_weekly_review_sos_zone.jpg"
    }
  ];

  // 10 features for "Nuôi dưỡng bé 0 - 60 tháng" (0-5 tuổi)
  const highlightFeatures0To60 = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: 'Màn hình trung tâm "Hôm nay" & Ghi chép nhanh',
      shortTitle: 'Hôm nay & Ghi nhanh',
      desc: 'Giải đáp câu hỏi "Hôm nay con cần gì" bằng cách hiển thị 3 việc quan trọng trong ngày, trạng thái sinh hoạt (ăn, ngủ, vệ sinh) và công cụ ghi nhận nhanh 1 chạm hoặc nhập bằng giọng nói.',
      screen: '/apps/nuoi-duong-be-0-60/feature_01_home_dashboard_smart_logging.jpg'
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: 'Theo dõi tăng trưởng thể chất (Growth Engine)',
      shortTitle: 'Chuẩn tăng trưởng',
      desc: 'Quản lý các chỉ số cân nặng, chiều cao, vòng đầu theo chuẩn tăng trưởng, minh họa xu hướng phát triển trực quan và đưa ra lời khuyên trung lập mà không tự ý chẩn đoán.',
      screen: '/apps/nuoi-duong-be-0-60/feature_02_growth_engine.jpg'
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: 'Trung tâm mốc phát triển (Development Center)',
      shortTitle: 'Mốc phát triển',
      desc: 'Theo dõi sự tiến bộ của bé qua 5 lĩnh vực (Giao tiếp, Vận động thô, Vận động tinh, Nhận thức, Cá nhân – Xã hội) kèm các lưu ý quan sát nhẹ nhàng, giúp cha mẹ bớt lo âu.',
      screen: '/apps/nuoi-duong-be-0-60/feature_03_development_center.jpg'
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: 'Gợi ý dinh dưỡng & Quản lý thực đơn (Meal Planner)',
      shortTitle: 'Dinh dưỡng & Thực đơn',
      desc: 'Hỗ trợ nhiều phương pháp ăn dặm (Truyền thống, BLW, Kiểu Nhật), cá nhân hóa theo độ tuổi/dị ứng, kết hợp tính năng "Tủ lạnh nhà mình có gì" để tự động gợi ý món ăn phù hợp với nguyên liệu sẵn có.',
      screen: '/apps/nuoi-duong-be-0-60/feature_04_nutrition_meal_planner.jpg'
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: 'Nút khẩn cấp SOS ngoại tuyến (Offline SOS)',
      shortTitle: 'Nút SOS ngoại tuyến',
      desc: 'Nút floating SOS luôn hiển thị để truy cập tức thì các hướng dẫn xử lý sơ cứu khẩn cấp (hóc dị vật, sốt/co giật, bỏng, chấn thương...), đảm bảo hoạt động bình thường ngay cả khi không có kết nối internet.',
      screen: '/apps/nuoi-duong-be-0-60/feature_05_offline_emergency_sos.jpg'
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: 'Lịch tiêm chủng & Nhắc lịch thông minh (Smart Reminders)',
      shortTitle: 'Lịch tiêm & Nhắc nhở',
      desc: 'Quản lý lịch tiêm (Chương trình Mở rộng & Tiêm dịch vụ), đồng thời cài đặt nhắc lịch uống thuốc, khám bệnh, đánh răng và các sinh hoạt hằng ngày.',
      screen: '/apps/nuoi-duong-be-0-60/feature_06_vaccination_smart_reminders.jpg'
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: 'Ví hồ sơ gia đình kỹ thuật số (Digital Family Vault)',
      shortTitle: 'Ví hồ sơ & Quét BHYT',
      desc: 'Quét, lưu trữ và bảo mật các giấy tờ quan trọng của bé (BHYT, phiếu tiêm, đơn thuốc), hỗ trợ xuất file PDF 1 chạm để mang đi khám bệnh hoặc nhập học.',
      screen: '/apps/nuoi-duong-be-0-60/feature_07_digital_family_vault.jpg'
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: 'Trợ lý AI đồng hành cùng cha mẹ (AI Companion)',
      shortTitle: 'Trợ lý AI đồng hành',
      desc: 'Trả lời các thắc mắc chăm sóc con, hỗ trợ chuẩn bị câu hỏi cho bác sĩ, giải thích thông tin y tế dễ hiểu và luôn dẫn nguồn minh bạch.',
      screen: '/apps/nuoi-duong-be-0-60/feature_08_ai_parenting_companion.jpg'
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: 'Bộ tạo hoạt động "Chơi cùng con 10 phút" (Activity Generator)',
      shortTitle: 'Chơi cùng con 10 phút',
      desc: 'Gợi ý các trò chơi tương tác phát triển theo độ tuổi (0–60 tháng) dựa trên quỹ thời gian rảnh và vật dụng đơn giản có sẵn trong nhà.',
      screen: '/apps/nuoi-duong-be-0-60/feature_09_activity_generator.jpg'
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: 'Dòng thời gian & Nhật ký gia đình (Family Timeline & Journal)',
      shortTitle: 'Nhật ký Timeline gia đình',
      desc: 'Tổng hợp dữ liệu sức khỏe, mốc phát triển, tiêm chủng cùng hình ảnh và khoảnh khắc đáng nhớ thành một dòng thời gian dài hạn xuyên suốt quá trình khôn lớn của trẻ.',
      screen: '/apps/nuoi-duong-be-0-60/feature_10_smart_family_timeline_journal.jpg'
    }
  ];

  // 10 features for "Định hướng thanh niên 16 đến 18 tuổi" (THPT & Hướng nghiệp)
  const highlightFeatures16To18 = [
    {
      idx: 0,
      badge: "Tính năng 1",
      title: 'Trạm Tổng quan Gia đình (Home Dashboard & Weekly Insight)',
      shortTitle: "Dashboard & Insight",
      desc: "Bức tranh tổng thể hàng tuần của con trên 5 khía cạnh (Học tập, Định hướng, Kết nối, Sức khỏe, Trưởng thành) và 3 việc làm ngay.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_01_home_dashboard_weekly_insight.jpg"
    },
    {
      idx: 1,
      badge: "Tính năng 2",
      title: "Bản đồ Học tập & Trạm Thi/Tuyển sinh (Academic & Exam Hub)",
      shortTitle: "Bản Đồ Tuyển Sinh",
      desc: "Nắm bắt GDPT 2018 (lớp 10–12), tổ hợp môn học, xu hướng tiến bộ, các mốc thời gian thi tốt nghiệp THPT và xét tuyển đại học.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_02_academic_exam_hub.jpg"
    },
    {
      idx: 2,
      badge: "Tính năng 3",
      title: "La bàn Định hướng & Kịch bản Tương lai (Career & Future Direction)",
      shortTitle: "La Bàn Hướng Nghiệp",
      desc: "Khám phá năng lực, sở thích (Holland RIASEC, Ikigai) và 3 kịch bản tương lai (An toàn, Khám phá, Đột phá) để cùng con thảo luận.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_03_career_future_direction.jpg"
    },
    {
      idx: 3,
      badge: "Tính năng 4",
      title: "Cầu nối Cha mẹ – Con (Parent–Teen Connection)",
      shortTitle: "Cầu Nối Cha Mẹ - Con",
      desc: "Tôn trọng quyền riêng tư và ứng dụng phương pháp Giao tiếp phi bạo lực (NVC) cùng mô hình GROW giải quyết xung đột tuổi mới lớn.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_04_parent_teen_connection.jpg"
    },
    {
      idx: 4,
      badge: "Tính năng 5",
      title: 'Trợ lý Giao tiếp AI ("Nói sao với con?")',
      shortTitle: "Nói Sao Với Con?",
      desc: "Nhập tình huống khó khăn (khép kín, áp lực thi, thức khuya, trái ý ngành) nhận gợi ý nguyên nhân, điều nên tránh và câu mở đầu ấm áp.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_05_ai_communication_assistant.jpg"
    },
    {
      idx: 5,
      badge: "Tính năng 6",
      title: "Thỏa thuận Gia đình (Family Boundary Builder)",
      shortTitle: "Thỏa Thuận Gia Đình",
      desc: "Xây dựng các thỏa thuận tự nguyện về giờ giấc, điện thoại, tài chính tiêu vặt và việc nhà dựa trên trách nhiệm thay vì ép buộc.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_06_family_boundary_builder.jpg"
    },
    {
      idx: 6,
      badge: "Tính năng 7",
      title: "Theo dõi Sức khỏe, Giấc ngủ & Dinh dưỡng",
      shortTitle: "Sức Khỏe & Giấc Ngủ",
      desc: "Theo dõi xu hướng giấc ngủ, thời lượng dùng màn hình, dinh dưỡng mùa thi và biểu hiện căng thẳng dưới dạng biểu đồ trực quan.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_07_health_wellness_tracker.jpg"
    },
    {
      idx: 7,
      badge: "Tính năng 8",
      title: "Đồng hành Đời sống số (Digital Life Guidance)",
      shortTitle: "Đời Sống Số An Toàn",
      desc: "Xây dựng năng lực số cho con, thảo luận về an toàn mạng xã hội, bắt nạt trên mạng, lừa đảo trực tuyến và dấu chân kỹ thuật số.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_08_digital_life_guidance.jpg"
    },
    {
      idx: 8,
      badge: "Tính năng 9",
      title: "Hành trang Bước vào Tuổi 18 (Age 18 Citizenship Prep)",
      shortTitle: "Hành Trang Tuổi 18",
      desc: "Danh mục kiểm tra kiến thức pháp lý, công dân cơ bản khi tròn 18 tuổi (giấy tờ cá nhân, VNeID, an toàn tài chính, nhận thức luật).",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_09_age18_citizenship_prep.jpg"
    },
    {
      idx: 9,
      badge: "Tính năng 10",
      title: "Trợ lý đồng hành 24/7 & Nhật ký Đồng hành",
      shortTitle: "Trợ Lý AI 24/7",
      desc: "Trợ lý AI cố vấn bình tĩnh đưa ra lời khuyên dựa trên bằng chứng, kết hợp Nhật ký ghi lại các cột mốc và quyết định quan trọng.",
      screen: "/apps/dinh-huong-thanh-nien-16-18/feature_10_ai_companion_family_journal.jpg"
    }
  ];

  // Resolve active app and features based on selection
  const is16To18 = selectedParentingAppId === 'dinh-huong-thanh-nien-16-18';
  const is12To15 = selectedParentingAppId === 'thau-hieu-thieu-nien-12-15';
  const is6To11 = selectedParentingAppId === 'nuoi-day-tre-6-11';
  const is0To60 = selectedParentingAppId === 'nuoi-duong-be-0-60';

  const activeApp = is16To18
    ? appDinhHuong16To18
    : is12To15 
      ? appThauHieu12To15 
      : is6To11 
        ? appNuoiDayTre 
        : is0To60 
          ? appNuoiDuongTre 
          : null;

  const activeFeatureList = is16To18
    ? highlightFeatures16To18
    : is12To15
      ? highlightFeatures12To15
      : is6To11
        ? highlightFeatures6To11
        : highlightFeatures0To60;

  const currentFeature = activeFeatureList[activeFeatureIdx] || activeFeatureList[0];

  return (
    <section className="relative overflow-hidden pt-4 pb-12 lg:pt-6 lg:pb-16 border-b border-amber-500/20 bg-gradient-to-b from-[#07111E] via-[#0A192F] to-[#07111E]">
      
      {/* Background soft ambient glowing orbs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            {/* Brand Logo Badge & Spotlight Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-xl shadow-black/50">
                <img 
                  src="/brand/logo.jpg" 
                  alt="Duy Anh Digital Lab" 
                  className="w-10 h-10 rounded-xl object-cover border border-amber-400/50"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">Official Portfolio</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">Web Apps &amp; AI Systems</div>
                </div>
              </div>

              {/* Clickable Spotlight Pill for Upcoming TROPILAB RISKOS */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('tropilab-hero-spotlight');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else if (tropilabApp) {
                    onSelectApp(tropilabApp, 'video');
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-teal-950/90 border border-teal-400/60 text-teal-300 hover:bg-teal-900/90 hover:border-teal-300 transition-all cursor-pointer shadow-lg shadow-teal-500/15 group"
                title="Xem ứng dụng TROPILAB RISKOS sắp ra mắt"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-300 group-hover:text-white">
                  Sắp Ra Mắt: TROPILAB RISKOS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-400/40 font-mono font-bold">
                  Sức Khỏe
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Biến mọi ý tưởng thành{' '}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                ứng dụng thực tế
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-1">
              Chuyên thiết kế &amp; phát triển các ứng dụng Web chuyên sâu, giải pháp AI thực chiến và phần mềm quản trị nghiệp vụ theo yêu cầu riêng của bạn: từ kinh doanh, đào tạo, nông nghiệp đến hệ sinh thái đồng hành gia đình từ 0 tháng đến 18 tuổi.
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
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400">{allApps.length}+</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Web Apps &amp; AI Thực tế</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white">4 Chặng</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Làm Cha Mẹ 0–18T</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
                <div className="text-xs sm:text-sm text-slate-300 font-bold">Live Production</div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 APPS SPOTLIGHT - Hệ sinh thái Làm Cha Mẹ từ 0 tháng đến 18 tuổi */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Background ambient glow effect matching active age stage */}
              <div className={`absolute inset-0 ${
                is12To15
                  ? 'bg-gradient-to-tr from-cyan-500/25 via-blue-500/20 to-amber-500/20'
                  : is6To11
                    ? 'bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-amber-500/20'
                    : is0To60
                      ? 'bg-gradient-to-tr from-rose-500/25 via-amber-500/20 to-yellow-500/20'
                      : 'bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-amber-500/20'
              } rounded-3xl blur-2xl -z-10 animate-pulse transition-all duration-700`} />

              {/* Showcase Container */}
              <div className="p-4 sm:p-5 bg-[#0A192F]/95 border-2 border-amber-400/50 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/80 relative">
                
                {/* 4-App Stage Switcher (0 tháng đến 18 tuổi) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 p-1 bg-slate-950/80 rounded-2xl border border-slate-700/80 mb-3.5 gap-1">
                  
                  {/* Stage 1: 0 - 5 Tuổi */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParentingAppId('nuoi-duong-be-0-60');
                      setActiveFeatureIdx(0);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                      is0To60
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25 border border-rose-400/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="Nuôi dưỡng bé 0 - 60 tháng (0–5 tuổi)"
                  >
                    <img 
                      src="/apps/nuoi-duong-be-0-60/app-logo.png" 
                      alt="0-5T" 
                      className="w-4 h-4 rounded object-contain shrink-0 bg-white/10 p-0.5" 
                    />
                    <span>0–5 Tuổi</span>
                  </button>

                  {/* Stage 2: 6 - 11 Tuổi */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParentingAppId('nuoi-day-tre-6-11');
                      setActiveFeatureIdx(0);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                      is6To11
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 border border-emerald-400/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="Nuôi dạy trẻ từ 6 đến 11 tuổi (Tiểu học Lớp 1-5)"
                  >
                    <img 
                      src="/apps/nuoi-day-tre-6-11/app-logo.png" 
                      alt="6-11T" 
                      className="w-4 h-4 rounded object-contain shrink-0 bg-white/10 p-0.5" 
                    />
                    <span>6–11 Tuổi</span>
                  </button>

                  {/* Stage 3: 12 - 15 Tuổi (MỚI) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParentingAppId('thau-hieu-thieu-nien-12-15');
                      setActiveFeatureIdx(0);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                      is12To15
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="Thấu hiểu thiếu niên 12 đến 15 tuổi (THCS Lớp 6-9)"
                  >
                    <img 
                      src="/apps/thau-hieu-thieu-nien-12-15/app-logo.png" 
                      alt="12-15T" 
                      className="w-4 h-4 rounded object-contain shrink-0 bg-white/10 p-0.5" 
                    />
                    <span className="flex items-center gap-0.5">
                      <span>12–15T</span>
                      <span className="text-[9px] px-1 py-0.2 bg-amber-400 text-slate-950 font-black rounded uppercase">Mới</span>
                    </span>
                  </button>

                  {/* Stage 4: 16 - 18 Tuổi (MỚI) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParentingAppId('dinh-huong-thanh-nien-16-18');
                      setActiveFeatureIdx(0);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                      is16To18
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25 border border-indigo-400/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="Định hướng thanh niên 16 đến 18 tuổi (THPT & Hướng nghiệp)"
                  >
                    <img 
                      src="/apps/dinh-huong-thanh-nien-16-18/app-logo.png" 
                      alt="16-18T" 
                      className="w-4 h-4 rounded object-contain shrink-0 bg-white/10 p-0.5" 
                    />
                    <span className="flex items-center gap-0.5">
                      <span>16–18T</span>
                      <span className="text-[9px] px-1 py-0.2 bg-amber-400 text-slate-950 font-black rounded uppercase">Mới</span>
                    </span>
                  </button>

                </div>

                {/* Header Badge */}
                <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-800 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    {/* Live indicator dot with solid center */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        is16To18 ? 'bg-indigo-400' : is12To15 ? 'bg-cyan-400' : is6To11 ? 'bg-emerald-400' : 'bg-rose-400'
                      } opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        is16To18 ? 'bg-indigo-400' : is12To15 ? 'bg-cyan-400' : is6To11 ? 'bg-emerald-400' : 'bg-rose-500'
                      } shadow-sm`}></span>
                    </span>

                    {/* Colorful blinking / flashing icon */}
                    <span className="animate-chop-tat inline-flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,100,0,0.8)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="sacSoSparkleHero4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff007f" />
                            <stop offset="35%" stopColor="#ff5400" />
                            <stop offset="70%" stopColor="#ffd60a" />
                            <stop offset="100%" stopColor="#00f5d4" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z"
                          fill="url(#sacSoSparkleHero4)"
                        />
                        <path
                          d="M19 15L20 17.5L22.5 18.5L20 19.5L19 22L18 19.5L15.5 18.5L18 17.5L19 15Z"
                          fill="url(#sacSoSparkleHero4)"
                        />
                      </svg>
                    </span>

                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-300 to-cyan-300 bg-clip-text text-transparent">
                      HỆ SINH THÁI LÀM CHA MẸ (0–18T)
                    </span>
                  </div>
                  <span className={`text-[11px] sm:text-xs font-mono font-black ${
                    is16To18
                      ? 'text-indigo-300 bg-indigo-400/10 border-indigo-400/40'
                      : is12To15 
                        ? 'text-cyan-300 bg-cyan-400/10 border-cyan-400/40' 
                        : is6To11 
                          ? 'text-emerald-300 bg-emerald-400/10 border-emerald-400/40' 
                          : 'text-amber-300 bg-amber-400/10 border-amber-400/40'
                  } border px-2.5 py-0.5 rounded-full`}>
                    {is16To18
                      ? 'MA TRẬN 2027 • TỰ LẬP 18T'
                      : is12To15 
                        ? 'GIAO TIẾP NVC • AN TOÀN SỐ' 
                        : is6To11 
                          ? 'PARENT-ONLY • AI COPILOT' 
                          : 'PWA NGOẠI TUYẾN 100%'}
                  </span>
                </div>

                {/* App Brand Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-900 border border-amber-400/40 p-1 shadow-md shrink-0">
                      <img
                        src={
                          is16To18
                            ? '/apps/dinh-huong-thanh-nien-16-18/app-logo.png'
                            : is12To15
                              ? '/apps/thau-hieu-thieu-nien-12-15/app-logo.png'
                              : is6To11
                                ? '/apps/nuoi-day-tre-6-11/app-logo.png'
                                : '/apps/nuoi-duong-be-0-60/app-logo.png'
                        }
                        alt="Logo ứng dụng"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${
                          is16To18
                            ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
                            : is12To15 
                              ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' 
                              : is6To11 
                                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                                : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                        } px-2 py-0.5 rounded border`}>
                          {is16To18 
                            ? 'Đời sống & Hướng nghiệp THPT (Lớp 10–12)' 
                            : is12To15 
                              ? 'Đời sống & Tuổi dậy thì THCS (Lớp 6–9)' 
                              : is6To11 
                                ? 'Đời sống & Đồng hành Tiểu học (Lớp 1–5)' 
                                : 'Đời sống & Nuôi dưỡng đầu đời (0–5 tuổi)'}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                        {is16To18 
                          ? 'Định hướng thanh niên 16 đến 18 tuổi' 
                          : is12To15 
                            ? 'Thấu hiểu thiếu niên 12 đến 15 tuổi' 
                            : is6To11 
                              ? 'Nuôi dạy trẻ từ 6 đến 11 tuổi' 
                              : 'Nuôi dưỡng bé 0 - 60 tháng'}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={activeApp?.url || "https://lamchame4.vercel.app"}
                    target={isMobileOrWebview() ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => openExternalApp(activeApp?.url || "https://lamchame4.vercel.app", e)}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 hover:text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 px-3 py-1.5 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                    title="Mở ứng dụng trên nền tảng web"
                  >
                    <span>Mở Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Large Visual Screen / Interactive Media Player Box */}
                <div 
                  onClick={() => activeApp && onSelectApp(activeApp, 'video')}
                  className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/40 shadow-xl cursor-pointer select-none"
                >
                  <img
                    key={currentFeature.screen}
                    src={currentFeature.screen}
                    alt={currentFeature.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Top Feature Tag & Mode Badge */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-amber-400/50 text-[11px] font-extrabold text-amber-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{currentFeature.badge}: {currentFeature.shortTitle}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-400/50 text-[11px] font-bold text-emerald-300 backdrop-blur-md shadow-md flex items-center gap-1">
                      {is16To18 ? (
                        <>
                          <Compass className="w-3 h-3 text-indigo-400" />
                          <span>Hướng nghiệp &amp; Tự lập</span>
                        </>
                      ) : is12To15 ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-cyan-400" />
                          <span>Bảo vệ &amp; Thấu hiểu</span>
                        </>
                      ) : is6To11 ? (
                        <>
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>AI Cố vấn 6 bước</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3 text-emerald-400" />
                          <span>Hoạt động ngoại tuyến</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Center Play Button for Video Tour */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-400/50 border-2 border-white">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-slate-950/90 border border-amber-400/60 text-xs font-black text-amber-300 backdrop-blur-md shadow-lg tracking-wide">
                        ▶ XEM VIDEO TOUR ({is16To18 ? '2:55' : is12To15 ? '2:55' : is6To11 ? '2:50' : '2:45'})
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-2.5 inset-x-2.5 z-20 pointer-events-none bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2 sm:p-2.5">
                    <div className="text-xs sm:text-sm font-black text-white line-clamp-1">
                      {currentFeature.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {currentFeature.desc}
                    </div>
                  </div>
                </div>

                {/* Interactive Feature Buttons (Click to preview screen) */}
                <div className="mt-3">
                  <div className="text-[11px] font-mono text-slate-400 font-bold mb-1.5 flex items-center justify-between">
                    <span>
                      {is16To18
                        ? '10 TÍNH NĂNG ĐỊNH HƯỚNG (BẤM ĐỂ XEM MÀN HÌNH):'
                        : is12To15 
                          ? '10 TÍNH NĂNG THẤU HIỂU (BẤM ĐỂ XEM MÀN HÌNH):' 
                          : is6To11 
                            ? '10 TÍNH NĂNG ĐỒNG HÀNH (BẤM ĐỂ XEM MÀN HÌNH):' 
                            : '10 TÍNH NĂNG CỐT LỖI (BẤM ĐỂ XEM MÀN HÌNH):'}
                    </span>
                    <span className="text-amber-400">{activeFeatureIdx + 1}/{activeFeatureList.length}</span>
                  </div>
                  
                  <div className={`grid ${activeFeatureList.length === 10 ? 'grid-cols-5' : 'grid-cols-4 sm:grid-cols-7'} gap-1.5`}>
                    {activeFeatureList.map((feat) => {
                      const isActive = activeFeatureIdx === feat.idx;
                      return (
                        <button
                          key={feat.idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveFeatureIdx(feat.idx);
                          }}
                          className={`px-1.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold truncate transition-all text-center border cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-sm scale-[1.03]'
                              : 'bg-[#0E223D] text-slate-300 border-slate-700 hover:border-amber-400/50 hover:text-white'
                          }`}
                          title={`${feat.badge}: ${feat.title}`}
                        >
                          #{feat.idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Call-To-Action Controls */}
                <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => activeApp && onSelectApp(activeApp, 'video')}
                    className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Xem Video Tour</span>
                  </button>

                  <button
                    onClick={() => activeApp && onSelectApp(activeApp, 'image')}
                    className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0E223D] border border-amber-400/40 hover:border-amber-400 hover:bg-[#142C4C] hover:text-amber-300 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Xem Đầy Đủ Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            UPCOMING APPLICATION SPOTLIGHT: TROPILAB RISKOS (NGÀNH MỚI: SỨC KHỎE & Y TẾ)
        ═══════════════════════════════════════════════════════════════════════════ */}
        <div id="tropilab-hero-spotlight" className="mt-10 lg:mt-12 pt-8 border-t border-teal-500/30">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061826]/95 via-[#0A2238]/90 to-[#07131F]/95 border-2 border-teal-400/50 p-5 sm:p-7 lg:p-8 shadow-2xl shadow-teal-950/70 backdrop-blur-xl">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-teal-500/25 mb-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {/* Live Indicator Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/60 text-xs font-black text-teal-300 shadow-md shadow-teal-500/20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                  </span>
                  <span className="uppercase tracking-wider">SẮP RA MẮT • DỰ ÁN TRỌNG ĐIỂM</span>
                </span>

                {/* Category Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-xs font-extrabold text-cyan-300">
                  <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NGÀNH MỚI: SỨC KHỎE &amp; Y TẾ</span>
                </span>

                {/* Standards Badge */}
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-bold text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>ISO 22367:2020 &amp; ISO 15189:2022</span>
                </span>
              </div>

              {/* Direct Link to App */}
              <a
                href="https://tropilab.vercel.app"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://tropilab.vercel.app', e)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 hover:from-teal-200 hover:to-cyan-200 shadow-md shadow-teal-500/30 transition-all cursor-pointer"
                title="Truy cập ứng dụng TROPILAB RISKOS"
              >
                <span>Mở Bản Trải Nghiệm (Live Demo)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </a>
            </div>

            {/* Body Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column (5 cols): App Details & Core Highlights */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border-2 border-teal-400/60 p-1.5 shadow-xl shadow-teal-950/80 shrink-0">
                    <img 
                      src="/apps/tropilab-riskos/app-logo.png" 
                      alt="TROPILAB RISKOS" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-mono font-extrabold text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
                      <span>CLINICAL LAB RISK MANAGEMENT</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      TROPILAB RISKOS
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                  Trung tâm điều hành số quản lý <span className="text-teal-300 font-bold">Rủi ro – Chất lượng – ISO – An toàn</span> phòng xét nghiệm bệnh viện chuẩn ISO 22367:2020 và ISO 15189:2022. Hệ thống kết nối toàn diện dữ liệu, con người và quy trình từ khâu chọc kim lấy máu đến trả kết quả.
                </p>

                {/* 4 Feature Highlights Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-teal-500/30 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Báo Lỗi &amp; Khóa Mẫu LIS</span>
                      <span className="text-slate-400 text-[11px]">Báo cáo 1 chạm 30s trên điện thoại</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-teal-500/30 flex items-start gap-2">
                    <QrCode className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Quét QR Đối Chiếu Bệnh Nhân</span>
                      <span className="text-slate-400 text-[11px]">Xác nhận chống nhầm lẫn ống máu</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-teal-500/30 flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Giám Sát IoT Tủ Lạnh 24/7</span>
                      <span className="text-slate-400 text-[11px]">Cảnh báo nhiệt ẩm sinh phẩm tức thì</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-teal-500/30 flex items-start gap-2">
                    <FileCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Hồ Sơ CAPA &amp; Ma Trận Rủi Ro</span>
                      <span className="text-slate-400 text-[11px]">Chuẩn ISO 22367 ký số điện tử</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => tropilabApp && onSelectApp(tropilabApp, 'video')}
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 hover:from-teal-300 hover:to-cyan-300 shadow-lg shadow-teal-500/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current text-slate-950" />
                    <span>Xem Video Tour (3:10)</span>
                  </button>

                  <button
                    onClick={() => tropilabApp && onSelectApp(tropilabApp, 'image')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900/90 border border-teal-400/50 hover:border-teal-300 hover:bg-slate-850 hover:text-teal-200 transition-all cursor-pointer"
                  >
                    <span>Khám phá 10 Màn Hình</span>
                    <ArrowRight className="w-4 h-4 text-teal-400" />
                  </button>
                </div>
              </div>

              {/* Right Column (7 cols): Interactive Feature Screen Player */}
              <div className="lg:col-span-7">
                <div className="p-3 sm:p-4 bg-slate-950/90 border border-teal-500/40 rounded-2xl shadow-xl">
                  
                  {/* Large Screen Showcase Container */}
                  <div
                    onClick={() => tropilabApp && onSelectApp(tropilabApp, 'video')}
                    className="group relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-teal-500/50 shadow-2xl cursor-pointer select-none"
                  >
                    <img
                      key={currentTropilabFeature.screen}
                      src={currentTropilabFeature.screen}
                      alt={currentTropilabFeature.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent pointer-events-none" />

                    {/* Top Feature Tag & Standard Badge */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-teal-400/60 text-[11px] font-extrabold text-teal-300 backdrop-blur-md shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-teal-400" />
                        <span>{currentTropilabFeature.badge}: {currentTropilabFeature.shortTitle}</span>
                      </span>

                      <span className="px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-400/60 text-[11px] font-bold text-teal-300 backdrop-blur-md shadow-md flex items-center gap-1">
                        <HeartPulse className="w-3 h-3 text-teal-400" />
                        <span>Sức khỏe &amp; An toàn Y khoa</span>
                      </span>
                    </div>

                    {/* Center Play Button for Video Tour */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center gap-2">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-teal-400/60 border-2 border-white">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-slate-950/95 border border-teal-400/80 text-xs font-black text-teal-300 backdrop-blur-md shadow-lg tracking-wide">
                          ▶ XEM VIDEO TOUR CÓ LỜI BÌNH (3:10)
                        </span>
                      </div>
                    </div>

                    {/* Bottom Caption Pill */}
                    <div className="absolute bottom-2.5 inset-x-2.5 z-20 pointer-events-none bg-slate-950/95 backdrop-blur-md border border-teal-500/50 rounded-xl p-2.5">
                      <div className="text-xs sm:text-sm font-black text-white line-clamp-1">
                        {currentTropilabFeature.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                        {currentTropilabFeature.desc}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Feature Selectors #1 to #10 */}
                  <div className="mt-3">
                    <div className="text-[11px] font-mono text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                      <span className="text-teal-300">10 TÍNH NĂNG CỐT LỖI TROPILAB RISKOS (BẤM ĐỂ ĐỔI MÀN HÌNH):</span>
                      <span className="text-teal-400">{activeTropilabFeatureIdx + 1}/10</span>
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
                            className={`px-1.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold truncate transition-all text-center border cursor-pointer ${
                              isActive
                                ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 border-teal-300 font-black shadow-md scale-[1.03]'
                                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-teal-400/60 hover:text-white'
                            }`}
                            title={`${feat.badge}: ${feat.title}`}
                          >
                            #{feat.idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
