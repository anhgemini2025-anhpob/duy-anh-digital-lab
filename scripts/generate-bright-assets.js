import fs from 'fs';
import path from 'path';

const apps = [
  {
    id: "cosmederm-ai-academy",
    name: "CosmeDerm AI Academy",
    category: "AI • ĐÀO TẠO & R&D MỸ PHẨM",
    url: "https://cosmederm-ai.vercel.app/",
    accent: "#6366f1",
    accentLight: "#e0e7ff",
    sidebarBg: "#1e1b4b",
    stats: [
      { label: "Sách Da Liễu Lõi", val: "10 Quyển", change: "+100%" },
      { label: "Hoạt Chất R&D", val: "1,420+", change: "Đã chuẩn hóa" },
      { label: "Công Thức Điều Chế", val: "285+", change: "AI Verified" }
    ],
    panelTitle: "Phòng Thí Nghiệm R&D Mỹ Phẩm & Trợ Lý AI Formulation",
    details: [
      "AI Formulation Bot: Phân tích tỷ lệ Niacinamide & HA an toàn",
      "Thư viện 10 đầu sách kinh điển Khoa học Da liễu Thẩm mỹ",
      "Ma trận tương thích hệ nhũ hóa & kiểm tra độ ổn định",
      "Lộ trình đào tạo chuẩn hóa cho Dược sĩ R&D mới"
    ]
  },
  {
    id: "foodtech-hub",
    name: "Vietnam Food Tech Hub",
    category: "CÔNG NGHỆ THỰC PHẨM & R&D",
    url: "https://foodtechhub.vercel.app/",
    accent: "#d97706",
    accentLight: "#fef3c7",
    sidebarBg: "#451a03",
    stats: [
      { label: "Phụ Gia Tra Cứu", val: "850+ Loại", change: "Codex & BYT" },
      { label: "Quy Trình QA/QC", val: "48 Chuẩn", change: "HACCP/ISO" },
      { label: "Sự Cố Đã Khắc Phục", val: "120+ Case", change: "Real-time" }
    ],
    panelTitle: "Cổng Tri Thức & Bộ Công Cụ Chẩn Đoán Sự Cố Thực Phẩm",
    details: [
      "Bộ công cụ xử lý sự cố tách lớp, nhớt, chua, biến màu sốt & đồ hộp",
      "Bảng tính tự động chi phí R&D theo kg thành phẩm",
      "Dữ liệu giới hạn phụ gia an toàn theo Thông tư Bộ Y tế",
      "Thư viện công nghệ chế biến thịt, thủy sản, đồ uống, bánh kẹo"
    ]
  },
  {
    id: "uth-scm-navigator",
    name: "UTH SCM Navigator",
    category: "EDTECH & CHUỖI CUNG ỨNG LOGISTICS",
    url: "https://uhtscm.vercel.app/",
    accent: "#0284c7",
    accentLight: "#e0f2fe",
    sidebarBg: "#082f49",
    stats: [
      { label: "Lộ Trình Đào Tạo", val: "4 Năm", change: "135 Tín chỉ" },
      { label: "Điều Khoản Incoterms", val: "11 Quy Tắc", change: "Incoterms 2020" },
      { label: "Mô Phỏng Cước Biển", val: "9 Tuyến Quốc Tế", change: "Active" }
    ],
    panelTitle: "Cẩm Nang Số Hóa Ngành Logistics ĐH Giao Thông Vận Tải TP.HCM",
    details: [
      "Bản đồ điều hướng 4 năm chuyên ngành Logistics & SCM",
      "Mô hình chuỗi cung ứng SCOR & công cụ tính chi phí tồn kho EOQ",
      "Tra cứu trực quan rủi ro giao nhận vận tải đa phương thức",
      "Ngân hàng đề thi trắc nghiệm và tình huống nghiệp vụ xuất nhập khẩu"
    ]
  },
  {
    id: "bjc-sales-training",
    name: "BJC Sales Training",
    category: "BÁN HÀNG & ĐÀO TẠO NỘI BỘ",
    url: "https://bjc-sales-training.pages.dev/",
    accent: "#2563eb",
    accentLight: "#dbeafe",
    sidebarBg: "#172554",
    stats: [
      { label: "Nhân Viên Đào Tạo", val: "150+ Sales", change: "Hoàn thành 94%" },
      { label: "Module Sản Phẩm", val: "42 Bài", change: "B2B Mastery" },
      { label: "Điểm Đánh Giá TB", val: "9.2 / 10", change: "+1.4 điểm" }
    ],
    panelTitle: "Hệ Thống LMS Đào Tạo Bán Hàng & Sản Phẩm Hóa Chất B2B BJC",
    details: [
      "Lộ trình 30-60-90 ngày chuẩn hóa cho Sales mới gia nhập",
      "Kho tài liệu sản phẩm B2B phân theo từng ngành công nghiệp",
      "Hệ thống thi trắc nghiệm cấp chứng chỉ nội bộ tự động",
      "Bảng xếp hạng thi đua doanh số và kỹ năng tư vấn"
    ]
  },
  {
    id: "customer-visit",
    name: "Customer Visit Management",
    category: "BÁN HÀNG & QUẢN TRỊ THỰC ĐỊA",
    url: "https://customer-visit.anhpob.workers.dev",
    accent: "#0d9488",
    accentLight: "#ccfbf1",
    sidebarBg: "#134e4a",
    stats: [
      { label: "Khách Hàng Nhà Máy", val: "320 Điểm", change: "Bản đồ số" },
      { label: "Lượt Thăm Tuần", val: "45 Lượt", change: "+18% hiệu suất" },
      { label: "Mẫu Thử Kỹ Thuật", val: "88 Mẫu", change: "Đang theo dõi" }
    ],
    panelTitle: "Quản Lý Hành Trình Viếng Thăm & Chăm Sóc Khách Hàng B2B",
    details: [
      "Check-in vị trí GPS và ghi chú nhanh biên bản cuộc họp tại nhà máy",
      "Lập lịch trình viếng thăm thông minh tối ưu cung đường di chuyển",
      "Theo dõi tiến độ gửi mẫu test và phản hồi từ phòng R&D khách hàng",
      "Báo cáo đo lường tần suất chăm sóc khách hàng VIP theo tháng"
    ]
  },
  {
    id: "lipoid-advisor",
    name: "Lipoid R&D Advisor",
    category: "R&D & NGUYÊN LIỆU MỸ PHẨM",
    url: "https://lipoid-advisor.pages.dev",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
    sidebarBg: "#2e1065",
    stats: [
      { label: "Dòng Phospholipid", val: "35 Sản Phẩm", change: "Đức / Thụy Sĩ" },
      { label: "Công Thức Mẫu", val: "72 Formula", change: "Lab Tested" },
      { label: "Độ Ổn Định Nhũ", val: "Nano & Lamellar", change: "Phục hồi da" }
    ],
    panelTitle: "Cố Vấn Kỹ Thuật Phospholipid & Lecithin Tự Nhiên Hãng Lipoid",
    details: [
      "Bộ lọc thông số Phospholipon, Phosal, Lipoid PE theo công dụng",
      "Chỉ dẫn nhiệt độ và tốc độ khuấy phân tán tối ưu chống tách lớp",
      "Tính toán chỉ số HLB và khả năng vận chuyển hoạt chất qua da",
      "Tài liệu kỹ thuật TDS/COA và chứng nhận COSMOS Organic"
    ]
  },
  {
    id: "clinic-spa",
    name: "Clinic Spa Management",
    category: "VẬN HÀNH & QUẢN TRỊ DỊCH VỤ",
    url: "https://linh-da-skinlab.pages.dev",
    accent: "#db2777",
    accentLight: "#fce7f3",
    sidebarBg: "#500724",
    stats: [
      { label: "Lịch Hẹn Hôm Nay", val: "28 Khách", change: "Đầy 92%" },
      { label: "Doanh Thu Tháng", val: "185 Triệu", change: "+24.5%" },
      { label: "Hồ Sơ Bệnh Án", val: "1,240 KH", change: "Hình ảnh trước/sau" }
    ],
    panelTitle: "Hệ Thống Quản Trị Vận Hành Toàn Diện Clinic Spa Y Khoa",
    details: [
      "Lịch hẹn thông minh kéo thả theo phòng điều trị và bác sĩ phụ trách",
      "Hồ sơ bệnh án da liễu lưu trữ hình ảnh trước/sau mỗi buổi peel/laser",
      "Tự động tính hoa hồng dịch vụ cho kỹ thuật viên và điều dưỡng",
      "Quản lý tồn kho dược mỹ phẩm sử dụng tại phòng khám"
    ]
  },
  {
    id: "spa-landing",
    name: "Spa Service Landing Page",
    category: "DỊCH VỤ & TRẢI NGHIỆM KHÁCH HÀNG",
    url: "https://linhda-skinlap.pages.dev",
    accent: "#e11d48",
    accentLight: "#ffe4e6",
    sidebarBg: "#4c0519",
    stats: [
      { label: "Tỷ Lệ Chuyển Đổi", val: "14.8%", change: "+5.2% Ads" },
      { label: "Gói Dịch Vụ Nổi Bật", val: "6 Liệu Trình", change: "Y khoa" },
      { label: "Đánh Giá 5 Sao", val: "99.4%", change: "Khách hàng hài lòng" }
    ],
    panelTitle: "Trang Đích Sang Trọng Chăm Sóc & Trẻ Hóa Da Linh Đa Skinlab",
    details: [
      "Thiết kế y khoa thẩm mỹ cao cấp, hình ảnh phác đồ chuẩn y khoa",
      "Tích hợp form đặt lịch tư vấn và bảng giá dịch vụ minh bạch",
      "Trình diễn công nghệ máy móc chuẩn FDA và chứng chỉ bác sĩ",
      "Tối ưu tốc độ tải trang dưới 1 giây trên điện thoại thông minh"
    ]
  },
  {
    id: "bjc-sales-pitch",
    name: "Sales Pitch & Battle Card",
    category: "BÁN HÀNG & VŨ KHÍ CẠNH TRANH",
    url: "https://bjc-sales-pitch.pages.dev",
    accent: "#1d4ed8",
    accentLight: "#dbeafe",
    sidebarBg: "#1e3a8a",
    stats: [
      { label: "Thẻ Battle Card", val: "24 Thẻ", change: "Đối đầu trực tiếp" },
      { label: "Tỷ Lệ Thắng Thầu", val: "76%", change: "+22% Win Rate" },
      { label: "Xử Lý Từ Chối", val: "65 Kịch Bản", change: "Spin Selling" }
    ],
    panelTitle: "Công Cụ Tạo Kịch Bản Bán Hàng & Thẻ Chiến Lược B2B Battle Card",
    details: [
      "So sánh trực diện tính năng kỹ thuật và hiệu quả kinh tế với đối thủ",
      "Bộ lập luận chứng minh tổng chi phí sở hữu TCO thấp hơn",
      "Ngân hàng câu hỏi khám phá nỗi đau khách hàng trong sản xuất",
      "Xuất file tóm tắt đề xuất giá trị gửi ngay cho giám đốc nhà máy"
    ]
  },
  {
    id: "badminton-management",
    name: "Badminton Group Management",
    category: "THỂ THAO & QUẢN LÝ CỘNG ĐỒNG",
    url: "https://splendid-panda-ef075e.netlify.app",
    accent: "#16a34a",
    accentLight: "#dcfce7",
    sidebarBg: "#14532d",
    stats: [
      { label: "Thành Viên CLB", val: "48 Tay Vợt", change: "Active" },
      { label: "Bảng Điểm Elo", val: "Cập nhật Live", change: "Xếp hạng tự động" },
      { label: "Quỹ Sân & Cầu", val: "12.8 Triệu", change: "Thu chi minh bạch" }
    ],
    panelTitle: "Phần Mềm Quản Trị Câu Lạc Bộ Cầu Lông & Xếp Cặp Đấu Elo",
    details: [
      "Bảng xếp hạng điểm số Elo cập nhật ngay sau mỗi trận giao hữu",
      "Thuật toán ghép cặp thông minh đảm bảo trận đấu cân sức",
      "Sổ quỹ câu lạc bộ thu tiền sân, tiền cầu minh bạch qua QR code",
      "Quản lý lịch sinh hoạt định kỳ và thông báo trận đấu qua nhóm"
    ]
  },
  {
    id: "tro-ly-vi-ngon",
    name: "Trợ Lý Vị Ngon",
    category: "AI & CÔNG NGHỆ ẨM THỰC",
    url: "https://trolyvingon.vercel.app/",
    accent: "#ea580c",
    accentLight: "#ffedd5",
    sidebarBg: "#431407",
    stats: [
      { label: "Thư Viện Vị Giác", val: "6 Tầng Vị", change: "Umami & Kokumi" },
      { label: "Phối Hương Vị AI", val: "540+ Cặp", change: "Flavor Pairing" },
      { label: "Thời Gian Phản Hồi", val: "0.8 Giây", change: "AI Chuyên sâu" }
    ],
    panelTitle: "Trợ Lý AI Tư Vấn Cân Bằng Vị Giác & Hương Liệu Thực Phẩm F&B",
    details: [
      "Biểu đồ cảm quan 6 chiều: Ngọt, Mặn, Chua, Đắng, Umami, Béo Kokumi",
      "Đề xuất phối hợp cặp hương vị (Flavor Pairing) tạo nét độc đáo cho món",
      "Giải pháp khử mùi tanh đạm thực vật và tăng vị umami tự nhiên",
      "Tối ưu tỷ lệ gia vị sốt cho sản xuất công nghiệp quy mô lớn"
    ]
  },
  {
    id: "vet-aqua-erp",
    name: "Vet & Aqua ERP Lite",
    category: "ERP & NÔNG NGHIỆP THỦY SẢN",
    url: "https://vet-aqua-erp-lite.vercel.app",
    accent: "#0891b2",
    accentLight: "#cffafe",
    sidebarBg: "#164e63",
    stats: [
      { label: "Mặt Hàng Thuốc", val: "450 Mã", change: "Quản lý Lô/Date" },
      { label: "Sổ Nợ Vụ Mùa", val: "38 Ao Nuôi", change: "Cảnh báo hạn mức" },
      { label: "Đơn Bán POS", val: "Quét Mã Vạch", change: "Tích hợp VietQR" }
    ],
    panelTitle: "Phần Mềm Quản Trị Đại Lý Thú Y - Thủy Sản & Kiểm Soát Lô Date",
    details: [
      "Quản lý xuất kho theo hạn dùng FEFO (hàng cận date xuất trước)",
      "Theo dõi sổ nợ theo từng vụ mùa tôm/cá của bà con nông dân",
      "Tạo đơn bán hàng POS màn hình cảm ứng in phiếu nhanh",
      "Báo cáo cảnh báo tồn kho an toàn và thuốc sắp hết hạn"
    ]
  },
  {
    id: "yeast-extract-test",
    name: "Yeast Extract Knowledge Test",
    category: "ĐÀO TẠO & ĐÁNH GIÁ NĂNG LỰC",
    url: "https://cool-tulumba-fa58d6.netlify.app/",
    accent: "#b45309",
    accentLight: "#fef3c7",
    sidebarBg: "#78350f",
    stats: [
      { label: "Ngân Hàng Câu Hỏi", val: "100+ Câu", change: "Tình huống thực tế" },
      { label: "Thời Gian Làm Bài", val: "15 Phút", change: "Đếm ngược trực tuyến" },
      { label: "Cấp Chứng Chỉ", val: "Tự Động", change: "Lallemand Savory" }
    ],
    panelTitle: "Hệ Thống Trắc Nghiệm Kiến Thức Chiết Xuất Nấm Men Lallemand",
    details: [
      "Phân tầng câu hỏi từ cơ bản đến giải pháp tạo ngọt vị thịt tự nhiên",
      "Giải thích cơ chế khoa học sâu sau mỗi đáp án giúp ghi nhớ lâu",
      "Chấm điểm tức thì và phân tích biểu đồ năng lực theo từng mảng kiến thức",
      "Chứng nhận năng lực chuyên môn tư vấn ứng dụng nấm men chiết xuất"
    ]
  },
  {
    id: "vanderbilt-advisor",
    name: "Vanderbilt R&D Advisor",
    category: "R&D & HÓA CHẤT CHUYÊN DỤNG",
    url: "https://vanderbilt-advisor.anh-gemini2025.workers.dev/",
    accent: "#475569",
    accentLight: "#f1f5f9",
    sidebarBg: "#0f172a",
    stats: [
      { label: "Dòng Veegum/Vanzan", val: "18 Cấp Độ", change: "Mỹ phẩm & Dược" },
      { label: "Độ Nhớt Huyền Phù", val: "Bền Vững", change: "Chống tách lớp" },
      { label: "Tài Liệu Kỹ Thuật", val: "100% US Data", change: "Vanderbilt Minerals" }
    ],
    panelTitle: "Cố Vấn Kỹ Thuật Chất Lưu Biến Đất Sét Khoáng Veegum & Vanatree",
    details: [
      "Bộ chọn cấp độ Veegum HV, K, Ultra theo độ nhớt mong muốn",
      "Biểu đồ hướng dẫn quy trình hydrat hóa nhiệt độ cao và tốc độ khuấy",
      "Tối ưu độ ổn định phân tán hạt màu trong kem chống nắng và kem nền",
      "Tra cứu độ tương thích với chất hoạt động bề mặt và chất điện giải"
    ]
  },
  {
    id: "algaktiv-advisor",
    name: "Algaktiv R&D Advisor",
    category: "R&D & HOẠT CHẤT CÔNG NGHỆ SINH HỌC",
    url: "https://algaktiv-advisor.pages.dev/",
    accent: "#059669",
    accentLight: "#d1fae5",
    sidebarBg: "#064e3b",
    stats: [
      { label: "Hoạt Chất Vi Tảo", val: "14 Dòng", change: "Tây Ban Nha" },
      { label: "Bằng Chứng Lâm Sàng", val: "In-Vivo Data", change: "Hiệu quả rõ rệt" },
      { label: "Bảo Vệ Ánh Sáng Xanh", val: "GenoFix & Zen", change: "Chống lão hóa" }
    ],
    panelTitle: "Khám Phá Hoạt Chất Sinh Học Vi Tảo Biển Hãng Algaktiv",
    details: [
      "Bộ sưu tập hoạt chất BioSKN, GenoFix, Densidyl, UpLift chăm sóc da",
      "Báo cáo thử nghiệm lâm sàng trên người thật với biểu đồ đo lường khoa học",
      "Hướng dẫn điều kiện ổn định pH và nhiệt độ gia nhiệt trong sản xuất",
      "Tư vấn câu chuyện marketing khoa học cho các thương hiệu mỹ phẩm sạch"
    ]
  },
  {
    id: "lanxess-cosmetic-advisor",
    name: "LANXESS Cosmetic Advisor",
    category: "R&D & HỆ BẢO QUẢN MỸ PHẨM",
    url: "https://lanxess-cosmetic-advisor.pages.dev/",
    accent: "#dc2626",
    accentLight: "#fee2e2",
    sidebarBg: "#7f1d1d",
    stats: [
      { label: "Hệ Chất Bảo Quản", val: "22 Giải Pháp", change: "Thay thế Paraben" },
      { label: "Khoảng pH Ổn Định", val: "pH 3.0 - 8.5", change: "Phổ rộng" },
      { label: "Chuẩn Thử Nghiệm", val: "ISO 11930", change: "Challenge Test" }
    ],
    panelTitle: "Hệ Thống Lựa Chọn Chất Bảo Quản & An Toàn Vi Sinh Mỹ Phẩm",
    details: [
      "Bộ lọc hệ bảo quản theo khoảng pH sản phẩm và phân khúc Leave-on/Rinse-off",
      "Kiểm tra tính tuân thủ pháp lý theo tiêu chuẩn ASEAN và EU Cosmetics Regulation",
      "Hướng dẫn tối ưu liều dùng vượt qua bài kiểm tra nhiễm khuẩn Challenge Test",
      "Khả năng kháng nấm men, nấm mốc và vi khuẩn Gram âm/dương toàn diện"
    ]
  },
  {
    id: "htx-rau-cu",
    name: "HTX Rau Củ Quả",
    category: "NÔNG NGHIỆP SỐ & HỢP TÁC XÃ",
    url: "https://htxraucuqua.vercel.app",
    accent: "#16a34a",
    accentLight: "#dcfce7",
    sidebarBg: "#14532d",
    stats: [
      { label: "Nông Dân Xã Viên", val: "65 Hộ", change: "VietGAP" },
      { label: "Sản Lượng Vụ Mùa", val: "120 Tấn", change: "Rau củ an toàn" },
      { label: "Tem Truy Xuất QR", val: "Tự Động In", change: "Chuỗi siêu thị" }
    ],
    panelTitle: "Phần Mềm Quản Trị Sản Xuất & Tiêu Thụ Nông Sản Hợp Tác Xã",
    details: [
      "Nhật ký đồng ruộng điện tử ghi nhận ngày gieo trồng, bón phân, cách ly",
      "Dự báo sản lượng rau củ chuẩn bị thu hoạch theo từng thửa ruộng",
      "Tạo tem mã QR truy xuất nguồn gốc nông sản cho từng lô hàng xuất bán",
      "Quản lý lịch giao xe tải và đối soát thanh toán minh bạch cho xã viên"
    ]
  },
  {
    id: "quan-ly-hop-dong-abm",
    name: "Quản Lý Hợp Đồng AB Mauri",
    category: "BÁN HÀNG B2B & QUẢN TRỊ HỢP ĐỒNG",
    url: "https://quan-ly-hop-dong-abm.netlify.app/",
    accent: "#0284c7",
    accentLight: "#e0f2fe",
    sidebarBg: "#0c4a6e",
    stats: [
      { label: "Hợp Đồng Hoạt Động", val: "180+ Khách", change: "2026-2027" },
      { label: "File Scan G-Drive", val: "Đồng Bộ 100%", change: "PDF Link" },
      { label: "Cảnh Báo Hết Hạn", val: "Tự Động 30 Ngày", change: "Active" }
    ],
    panelTitle: "Hệ Thống Quản Lý Hợp Đồng Khách Hàng Thương Mại AB Mauri",
    details: [
      "Danh bạ hợp đồng kinh doanh men bánh & nguyên liệu làm bánh AB Mauri",
      "Liên kết trực tiếp file scan hợp đồng PDF lưu trữ trên Google Drive",
      "Nhập dữ liệu tự động từ file Excel bảng kê hợp đồng thương mại",
      "Cảnh báo hợp đồng sắp hết hạn và hỗ trợ lưu trữ cục bộ hoạt động offline"
    ]
  }
];

function generateBrightSVG(app) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <!-- Crisp Bright Background Gradient -->
    <linearGradient id="bg_${app.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="40%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <!-- Vibrant Header Accent -->
    <linearGradient id="brandGrad_${app.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${app.accent}" />
      <stop offset="100%" stop-color="${app.sidebarBg}" />
    </linearGradient>

    <filter id="softShadow_${app.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1600" height="1000" fill="url(#bg_${app.id})" />

  <!-- Ambient Light Orbs -->
  <circle cx="1400" cy="180" r="320" fill="${app.accent}" opacity="0.12" />
  <circle cx="150" cy="850" r="280" fill="${app.accent}" opacity="0.08" />

  <!-- Main Browser Mockup Container -->
  <g transform="translate(80, 50)" filter="url(#softShadow_${app.id})">
    <!-- Window Outer Frame -->
    <rect width="1440" height="900" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />

    <!-- Chrome Browser Header Bar -->
    <rect width="1440" height="60" rx="20" fill="#f8fafc" />
    <rect y="40" width="1440" height="20" fill="#f8fafc" />
    <line x1="0" y1="60" x2="1440" y2="60" stroke="#e2e8f0" stroke-width="1.5" />

    <!-- Traffic Light Controls -->
    <circle cx="36" cy="30" r="7" fill="#ef4444" />
    <circle cx="60" cy="30" r="7" fill="#f59e0b" />
    <circle cx="84" cy="30" r="7" fill="#10b981" />

    <!-- Address Bar with Padlock -->
    <rect x="220" y="14" width="1000" height="32" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
    <g transform="translate(236, 21)">
      <!-- Padlock Icon -->
      <path d="M4 6V4a3 3 0 0 1 6 0v2m-7 0h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <text x="260" y="35" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600">
      ${app.url}
    </text>
    <rect x="1100" y="19" width="105" height="22" rx="11" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
    <text x="1152" y="34" fill="#059669" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" text-anchor="middle">
      ✓ SSL SECURE
    </text>

    <!-- App Header Inside Window -->
    <g transform="translate(0, 60)">
      <!-- App Top Nav -->
      <rect width="1440" height="68" fill="#ffffff" />
      <line x1="0" y1="68" x2="1440" y2="68" stroke="#f1f5f9" stroke-width="1.5" />

      <!-- Brand Logo & Title -->
      <rect x="40" y="14" width="40" height="40" rx="10" fill="${app.accent}" />
      <text x="60" y="39" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle">
        ${app.name.charAt(0)}
      </text>

      <text x="96" y="38" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="800">
        ${app.name}
      </text>
      <rect x="96" y="44" width="180" height="4" rx="2" fill="${app.accent}" />

      <!-- Live Category Badge -->
      <rect x="1160" y="18" width="240" height="32" rx="8" fill="${app.accentLight}" />
      <text x="1280" y="39" fill="${app.accent}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5" text-anchor="middle">
        ${app.category}
      </text>
    </g>

    <!-- Main Workspace Content -->
    <g transform="translate(40, 150)">
      
      <!-- Top 3 Metrics Stats Banner -->
      <g>
        ${app.stats.map((stat, i) => {
          const x = i * 465;
          return `
          <g transform="translate(${x}, 0)">
            <rect width="435" height="110" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="24" y="38" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600">${stat.label}</text>
            <text x="24" y="80" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="32" font-weight="800">${stat.val}</text>
            <rect x="300" y="24" width="110" height="26" rx="13" fill="${app.accentLight}" />
            <text x="355" y="41" fill="${app.accent}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${stat.change}</text>
          </g>`;
        }).join('')}
      </g>

      <!-- Main Interactive Work Panel -->
      <g transform="translate(0, 135)">
        <rect width="1360" height="480" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
        
        <!-- Panel Header -->
        <rect width="1360" height="54" rx="18" fill="#f8fafc" />
        <rect y="36" width="1360" height="18" fill="#f8fafc" />
        <line x1="0" y1="54" x2="1360" y2="54" stroke="#e2e8f0" stroke-width="1" />

        <text x="28" y="34" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="700">
          ${app.panelTitle}
        </text>

        <!-- Simulated Active UI Content -->
        <g transform="translate(28, 80)">
          <!-- 4 Feature Cards -->
          ${app.details.map((detail, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const x = col * 660;
            const y = row * 180;
            return `
            <g transform="translate(${x}, ${y})">
              <rect width="630" height="150" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2" />
              <!-- Status Dot & Number -->
              <circle cx="36" cy="40" r="16" fill="${app.accent}" />
              <text x="36" y="46" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="800" text-anchor="middle">0${idx+1}</text>
              
              <!-- Text -->
              <text x="68" y="46" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" font-weight="700">Tính Năng Chuyên Sâu #${idx+1}</text>
              <text x="36" y="90" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="500">${detail.slice(0, 60)}</text>
              <text x="36" y="114" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="400">${detail.slice(60) || 'Dữ liệu được chuẩn hóa và tự động hóa theo thời gian thực.'}</text>
              
              <!-- Interactive progress bar -->
              <rect x="460" y="32" width="140" height="8" rx="4" fill="#e2e8f0" />
              <rect x="460" y="32" width="${80 + idx * 20}" height="8" rx="4" fill="${app.accent}" />
            </g>`;
          }).join('')}
        </g>
      </g>

      <!-- Bottom Interactive Watermark & Production Badge -->
      <g transform="translate(480, 640)">
        <rect width="400" height="44" rx="22" fill="#0f172a" />
        <circle cx="28" cy="22" r="8" fill="#10b981" />
        <text x="215" y="28" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="700" text-anchor="middle">
          DUY ANH DIGITAL LAB • PRODUCTION LIVE
        </text>
      </g>
    </g>
  </g>
</svg>`;
}

const publicAppsDir = path.resolve('public', 'apps');

apps.forEach(app => {
  const appDir = path.join(publicAppsDir, app.id);
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  const svgContent = generateBrightSVG(app);
  fs.writeFileSync(path.join(appDir, 'cover.svg'), svgContent, 'utf-8');
  fs.writeFileSync(path.join(appDir, 'cover-placeholder.svg'), svgContent, 'utf-8');
  console.log(`Generated bright vivid SVG for: ${app.id}`);
});

console.log('All 17 bright SVGs generated successfully!');
