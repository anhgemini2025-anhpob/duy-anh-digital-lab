const fs = require('fs');
const path = require('path');

const timestampsPath = path.resolve('public/apps/vietreal/timestamps.json');
const timestampsData = JSON.parse(fs.readFileSync(timestampsPath, 'utf8'));

const vietrealApp = {
  logoUrl: "/apps/vietreal/app-logo.svg",
  id: "vietreal",
  name: "VIETREAL — Tiếng Việt Thực Chiến 360°",
  url: "https://vietreal.vercel.app",
  category: "AI & Đào tạo",
  categoryId: "ai-education",
  description: "Hệ sinh thái học Tiếng Việt Thực Chiến 360° kết nối Người học – Giáo viên – Trung tâm đào tạo trên một nền tảng chuyển đổi số toàn diện. Tích hợp AI phân tích cao độ sóng âm 6 thanh điệu, ma trận đại từ xưng hô thông minh theo ngữ cảnh, tùy chọn 3 phương ngữ Bắc – Trung – Nam, AI Role-Play 24/7 và lộ trình cá nhân hóa cho từng cộng đồng quốc gia (Nhật, Hàn, Trung, Mỹ, Pháp, Đức, Nga, Thái).",
  tags: [
    "Tiếng Việt Thực Chiến",
    "Vietreal 360",
    "EdTech AI",
    "Visual Pronunciation",
    "6 Thanh Điệu",
    "Bắc Trung Nam",
    "AI Role-Play",
    "Giáo Viên Số Hóa",
    "AI Đào Tạo"
  ],
  coverImage: "/apps/vietreal/cover.jpg",
  placeholderImage: "/apps/vietreal/cover.jpg",
  detailImages: [
    "/apps/vietreal/feature_01_sua_phat_am_bang_hinh_anh.jpg",
    "/apps/vietreal/feature_02_hoc_xung_ho_theo_tinh_huong.jpg",
    "/apps/vietreal/feature_03_hoc_dung_giong_dia_phuong.jpg",
    "/apps/vietreal/feature_04_tinh_huong_thuc_te_doi_song.jpg",
    "/apps/vietreal/feature_05_ai_roleplay_luyen_phan_xa.jpg",
    "/apps/vietreal/feature_06_ca_nhan_hoa_theo_quoc_tich.jpg",
    "/apps/vietreal/feature_07_tu_dong_tao_lo_trinh_hoc.jpg",
    "/apps/vietreal/feature_08_on_tap_thong_minh_spaced_repetition.jpg",
    "/apps/vietreal/feature_09_hoc_khong_ap_luc_gamification.jpg",
    "/apps/vietreal/feature_10_kho_bai_tap_giao_bai_so_hoa.jpg",
    "/apps/vietreal/feature_11_ai_danh_gia_phat_am_giao_vien.jpg",
    "/apps/vietreal/feature_12_luu_tru_bai_noi_tap_trung.jpg",
    "/apps/vietreal/feature_13_phan_hoi_bang_voice_note.jpg",
    "/apps/vietreal/feature_14_theo_doi_tien_bo_tung_hoc_vien.jpg",
    "/apps/vietreal/feature_15_he_sinh_thai_vietreal_360.jpg"
  ],
  imageAlt: "Vietreal - Hệ sinh thái học Tiếng Việt Thực Chiến 360 độ cho người nước ngoài",
  featured: true,
  audience: "Người nước ngoài học tiếng Việt, Giảng viên tiếng Việt bản ngữ, Trung tâm ngôn ngữ & Doanh nghiệp FDI tại Việt Nam.",
  problem: "Người nước ngoài học tiếng Việt thường 'học nhiều nhưng không dám mở lời' do rào cản 6 thanh điệu khó phân biệt bằng tai thường, đại từ xưng hô phức tạp theo thứ bậc, sự khác biệt ngữ điệu 3 miền Bắc – Trung – Nam và giáo trình xa rời thực tế đời sống. Trong khi đó, giáo viên dạy tiếng Việt phải soạn bài thủ công, thiếu công cụ chấm âm học tự động và lưu trữ bài thu âm học viên rải rác.",
  solution: "Hệ sinh thái EdTech & AI toàn diện Vietreal 360°: Trực quan hóa cao độ thanh điệu bằng biểu đồ sóng âm so sánh trực tiếp với giọng mẫu bản xứ, ma trận đại từ xưng hô tự động, hỗ trợ đủ 3 phương ngữ Bắc - Trung - Nam, AI Role-Play 24/7 luyện phản xạ hai chiều không phán xét, cá nhân hóa lộ trình theo 8 quốc tịch. Phía giáo viên: Kho bài tập chuẩn hóa giao 1 chạm, AI trợ giảng bóc tách lỗi âm thanh điệu, nhận xét bằng Voice Note và Dashboard tiến độ toàn diện.",
  keyFeatures: [
    "Sửa phát âm bằng hình ảnh: So sánh đường cong cao độ giọng nói trực quan với giọng mẫu bản xứ",
    "Học đại từ xưng hô chuẩn xác: Ma trận chọn tuổi, giới tính, bối cảnh giao tiếp tự nhiên và lịch thiệp",
    "Linh hoạt 3 phương ngữ: Tùy chọn giọng Bắc, giọng Trung, giọng Nam phù hợp nơi học viên sinh sống",
    "Tình huống thực tế đời sống: Học từ gọi phở, đi chợ, thuê nhà, ký hợp đồng đến hội thoại công sở",
    "AI Role-Play 24/7: Đóng vai người bản xứ luyện phản xạ giao tiếp tự nhiên hai chiều, xóa bỏ e ngại",
    "Cá nhân hóa theo quốc tịch: Lộ trình chuyên sâu khắc phục điểm nghẽn phát âm riêng của từng nước",
    "Lộ trình vi mô tự động: Tối ưu khối lượng học từ 3–5 phút đến 30 phút theo mục tiêu cá nhân",
    "Ôn tập thông minh Spaced Repetition: Nhận diện từ hay quên và kích hoạt thời điểm vàng ghi nhớ sâu",
    "Gamification & Streak: Chuỗi ngày luyện tập, điểm kinh nghiệm và huy hiệu khích lệ thói quen bền bỉ",
    "Kho bài tập số hóa 1 chạm cho giáo viên: Giao bài tập nghe - nói chuẩn hóa không cần soạn thủ công",
    "AI trợ giảng chấm phát âm tự động: Bóc tách lỗi phụ âm đầu, vần và đường cao độ thanh điệu chi tiết",
    "Lưu trữ bài nói đám mây tập trung: Quản lý toàn bộ voice recording theo hồ sơ học viên, tua lại đối chiếu",
    "Phản hồi trực quan bằng Voice Note: Thầy cô thu âm giọng mẫu và hướng dẫn khẩu hình miệng 1-kèm-1",
    "Dashboard phân tích tiến độ: Thống kê tỷ lệ hoàn thành, tốc độ phản xạ và học viên cần kèm cặp",
    "Hệ sinh thái mở rộng đa quốc gia: Kết nối phiên bản bản địa hóa cho Nhật, Hàn, Trung, Mỹ, Pháp, Đức, Nga, Thái"
  ],
  videoDuration: "5:19",
  videoTagline: "Vietreal 360° — Cầu nối ngôn ngữ & văn hóa cho cộng đồng quốc tế sống và làm việc tại Việt Nam",
  supportedAudioLanguages: ["vi", "en"],
  videoScenes: timestampsData.videoScenes,
  theme: {
    from: "#0284c7",
    to: "#06b6d4",
    accent: "#0ea5e9",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-800",
    badgeBorder: "border-sky-200"
  }
};

const appsFilePath = path.resolve('src/data/apps.ts');
let appsFileContent = fs.readFileSync(appsFilePath, 'utf8');

// Insert vietreal right after 'dinh-huong-thanh-nien-16-18' or at the beginning of APPS_DATA
// Let's insert it right after 'dinh-huong-thanh-nien-16-18' object
const targetMarker = "id: \"dinh-huong-thanh-nien-16-18\",";
const targetIdx = appsFileContent.indexOf(targetMarker);
if (targetIdx === -1) {
  console.error("Could not find target marker");
  process.exit(1);
}

// Find the end of this app object by matching the closing brace before the next app
// Let's find the closing brace followed by comma and next object
const nextAppMarker = "id: \"taxhkd\",";
const nextAppIdx = appsFileContent.indexOf(nextAppMarker);
if (nextAppIdx === -1) {
  console.error("Could not find next app marker");
  process.exit(1);
}

// Find the last "}," before nextAppIdx
const insertionPoint = appsFileContent.lastIndexOf("},", nextAppIdx) + 2;

const vietrealCode = "\n  " + JSON.stringify(vietrealApp, null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n') + ",";

const newContent = appsFileContent.slice(0, insertionPoint) + vietrealCode + appsFileContent.slice(insertionPoint);

fs.writeFileSync(appsFilePath, newContent, 'utf8');
console.log("Successfully inserted vietreal into src/data/apps.ts!");
