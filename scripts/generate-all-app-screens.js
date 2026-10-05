import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 18 apps metadata for screen generation
const apps = [
  {
    id: "cosmederm-ai-academy",
    name: "CosmeDerm AI Academy",
    category: "AI • ĐÀO TẠO & R&D MỸ PHẨM",
    url: "https://cosmederm-ai.vercel.app/",
    primaryColor: "#4f46e5",
    secondaryColor: "#6366f1",
    accentColor: "#a855f7",
    workflowTitle: "AI Formulation Bot & Ma Trận Hoạt Chất",
    workflowStep1: "1. Nhập chỉ số da liễu & mục tiêu công thức (Serum/Cream/Toner)",
    workflowStep2: "2. AI tính toán nồng độ an toàn & ma trận tương thích pH",
    workflowStep3: "3. Tự động kiểm tra độ ổn định nhũ tương và thời hạn sử dụng",
    workflowBadge: "AI CALCULATION: 99.8% CHUẨN XÁC",
    reportTitle: "Báo Cáo An Toàn & Phác Đồ Điều Chế Chi Tiết",
    metric1Val: "100%", metric1Label: "Tương thích hoạt chất",
    metric2Val: "5.5 pH", metric2Label: "Cân bằng sinh lý da",
    metric3Val: "0.2%", metric3Label: "Chất bảo quản tối ưu",
    metric4Val: "Chuẩn ASEAN", metric4Label: "Hồ sơ công bố mỹ phẩm"
  },
  {
    id: "foodtech-hub",
    name: "Vietnam Food Tech Hub",
    category: "R&D & CÔNG NGHỆ THỰC PHẨM",
    url: "https://foodtechhub.vercel.app/",
    primaryColor: "#d97706",
    secondaryColor: "#f59e0b",
    accentColor: "#ef4444",
    workflowTitle: "Chẩn Đoán Sự Cố Dây Chuyền & Tra Cứu Phụ Gia",
    workflowStep1: "1. Chọn lỗi kỹ thuật (Tách lớp, Đổi màu, Kết cấu bở, Mùi lạ)",
    workflowStep2: "2. Thuật toán phân tích nguyên nhân hóa sinh & nhiệt độ xử lý",
    workflowStep3: "3. Đề xuất phụ gia thay thế chuẩn Codex & BYT Việt Nam",
    workflowBadge: "DATABASE: 850+ PHỤ GIA CODEX",
    reportTitle: "Bảng Tính Giá Thành R&D & Thông Số Dây Chuyền",
    metric1Val: "850+", metric1Label: "Phụ gia tiêu chuẩn",
    metric2Val: "-18%", metric2Label: "Tối ưu chi phí công thức",
    metric3Val: "03 Bước", metric3Label: "Khắc phục sự cố QA/QC",
    metric4Val: "Chuẩn BYT", metric4Label: "Đạt chuẩn an toàn VSTP"
  },
  {
    id: "uth-scm-navigator",
    name: "UTH SCM Decision Navigator",
    category: "EDTECH • SUPPLY CHAIN & LOGISTICS",
    url: "https://uhtscm.vercel.app/",
    primaryColor: "#0284c7",
    secondaryColor: "#0ea5e9",
    accentColor: "#06b6d4",
    workflowTitle: "Mô Phỏng Chuỗi Cung Ứng & Phân Tích CSL Sensitivity",
    workflowStep1: "1. Thiết lập 6 nhân tố chuỗi cung ứng (Cơ sở, Tồn kho, Vận tải, TT, Nguồn hàng, Định giá)",
    workflowStep2: "2. Chạy mô hình dự báo nhu cầu (Moving Average, Exponential Smoothing)",
    workflowStep3: "3. Phân tích độ nhạy Cycle Service Level (CSL) và mức tồn kho an toàn",
    workflowBadge: "ALGORITHM: MONTE CARLO SIMULATION",
    reportTitle: "Báo Cáo Hiệu Ứng Bullwhip & KPI Vận Hành Chuỗi",
    metric1Val: "98.5%", metric1Label: "Mức độ dịch vụ (CSL)",
    metric2Val: "-24%", metric2Label: "Giảm thiểu hiệu ứng Bullwhip",
    metric3Val: "3.2 Ngày", metric3Label: "Vòng quay tồn kho",
    metric4Val: "Tối ưu 15%", metric4Label: "Chi phí logistics tổng thể"
  },
  {
    id: "quan-ly-hop-dong-abm",
    name: "Quản Lý Hợp Đồng AB Mauri",
    category: "QUẢN TRỊ DOANH NGHIỆP • B2B",
    url: "https://quan-ly-hop-dong-abm.netlify.app/",
    primaryColor: "#0f766e",
    secondaryColor: "#0d9488",
    accentColor: "#14b8a6",
    workflowTitle: "Quy Trình Trình Ký, Phê Duyệt & Quản Lý Vòng Đời Hợp Đồng",
    workflowStep1: "1. Khởi tạo phụ lục hợp đồng, chọn đối tác & điều khoản thanh toán",
    workflowStep2: "2. Luồng phê duyệt đa cấp (Trưởng bộ phận -> Pháp chế -> Ban Giám Đốc)",
    workflowStep3: "3. Tự động cảnh báo hạn nghiệm thu, phạt vi phạm & kích hoạt thanh toán",
    workflowBadge: "SECURITY: CHỮ KÝ SỐ & SSL SECURE",
    reportTitle: "Bảng Điều Khiển Tài Chính Hợp Đồng & Tiến Độ Giải Ngân",
    metric1Val: "100%", metric1Label: "Kiểm soát rủi ro pháp lý",
    metric2Val: "0 Cảnh báo", metric2Label: "Không trễ hạn thanh toán",
    metric3Val: "24/7", metric3Label: "Tra cứu phụ lục trực tuyến",
    metric4Val: "AB Mauri", metric4Label: "Chuẩn hóa quy trình nội bộ"
  },
  {
    id: "bjc-sales-training",
    name: "BJC Sales Training Hub",
    category: "B2B SALES & ENTERPRISE TRAINING",
    url: "https://bjc-sales-training.vercel.app/",
    primaryColor: "#1d4ed8",
    secondaryColor: "#2563eb",
    accentColor: "#3b82f6",
    workflowTitle: "Mô Phỏng Tình Huống Đàm Phán & Xử Lý Từ Chối B2B",
    workflowStep1: "1. Chọn phân khúc khách hàng mục tiêu & quy mô nhà máy đối tác",
    workflowStep2: "2. Luyện tập kịch bản thuyết phục kỹ thuật vs giá thành cạnh tranh",
    workflowStep3: "3. AI chấm điểm kỹ năng chốt deal & phản hồi tức thì",
    workflowBadge: "TRAINING: 12 KỊCH BẢN THỰC CHIẾN",
    reportTitle: "Bảng Xếp Hạng Năng Lực Đội Ngũ & Báo Cáo Doanh Thu",
    metric1Val: "92/100", metric1Label: "Điểm năng lực đàm phán",
    metric2Val: "+35%", metric2Label: "Tỷ lệ chuyển đổi đơn hàng",
    metric3Val: "100%", metric3Label: "Đạt chuẩn quy trình BJC",
    metric4Val: "Realtime", metric4Label: "Theo dõi tiến độ đội ngũ"
  },
  {
    id: "customer-visit",
    name: "Customer Visit Management",
    category: "FIELD SALES & QUẢN TRỊ KHÁCH HÀNG",
    url: "https://customer-visit.vercel.app/",
    primaryColor: "#059669",
    secondaryColor: "#10b981",
    accentColor: "#34d399",
    workflowTitle: "Check-in Điểm Bán Bằng GPS & Nhật Ký Tiếp Xúc",
    workflowStep1: "1. Định vị GPS xác thực vị trí gặp khách hàng tại cơ sở",
    workflowStep2: "2. Ghi nhận tồn kho điểm bán, nhu cầu nhập hàng & hình ảnh quầy kệ",
    workflowStep3: "3. Lên lịch hẹn tái viếng thăm và đồng bộ về máy chủ doanh nghiệp",
    workflowBadge: "GPS VERIFIED: CHÍNH XÁC TẬN NƠI",
    reportTitle: "Báo Cáo Tuyến Viếng Thăm & Hiệu Quả Doanh Số Điểm Bán",
    metric1Val: "100%", metric1Label: "Tỷ lệ viếng thăm đúng tuyến",
    metric2Val: "8.5 Điểm/ngày", metric2Label: "Năng suất trung bình Rep",
    metric3Val: "+28%", metric3Label: "Tăng trưởng doanh số điểm bán",
    metric4Val: "Tự động", metric4Label: "Xuất báo cáo cuối ngày"
  },
  {
    id: "badminton-management",
    name: "Hệ Thống Quản Lý Sân Cầu Lông",
    category: "SPORTS & QUẢN LÝ DỊCH VỤ",
    url: "https://quanly-san-caulong.vercel.app/",
    primaryColor: "#0d9488",
    secondaryColor: "#14b8a6",
    accentColor: "#2dd4bf",
    workflowTitle: "Bảng Lưới Đặt Sân Trực Quan & Quầy Thu Ngân POS",
    workflowStep1: "1. Chọn sân (Sân 1 - Sân 8) theo khung giờ trống trên lưới thời gian",
    workflowStep2: "2. Nhận đặt sân cố định / vãng lai, lưu thông tin khách hàng VIP",
    workflowStep3: "3. Thanh toán POS tiền sân + nước ngọt/vợt cầu + in hóa đơn nhanh",
    workflowBadge: "POS READY: TÍNH TIỀN THEO PHÚT",
    reportTitle: "Báo Cáo Doanh Thu Theo Khung Giờ & Tỷ Lệ Lấp Đầy",
    metric1Val: "96%", metric1Label: "Tỷ lệ lấp đầy giờ vàng",
    metric2Val: "0 Xung đột", metric2Label: "Không trùng lịch đặt sân",
    metric3Val: "30 Giây", metric3Label: "Thời gian check-in khách",
    metric4Val: "Báo cáo ngày", metric4Label: "Tự động đối soát ca trực"
  },
  {
    id: "htx-rau-cu",
    name: "HTX Rau Củ Quả Sạch",
    category: "NÔNG NGHIỆP SỐ & CHUỖI CUNG ỨNG",
    url: "https://htxraucuqua.vercel.app/",
    primaryColor: "#16a34a",
    secondaryColor: "#22c55e",
    accentColor: "#86efac",
    workflowTitle: "Nhật Ký Canh Tác VietGAP & Tạo Mã QR Truy Xuất Nguồn Gốc",
    workflowStep1: "1. Xã viên ghi nhận công đoạn bón phân, tưới tiêu, phun thuốc vi sinh",
    workflowStep2: "2. Kỹ sư HTX duyệt đạt chuẩn an toàn trước ngày thu hoạch",
    workflowStep3: "3. Tự động in tem nhãn QR code định danh từng lô nông sản xuất bán",
    workflowBadge: "VIETGAP: TRUY XUẤT 100% NGUỒN GỐC",
    reportTitle: "Báo Cáo Sản Lượng Thu Hoạch & Phân Phối Lợi Nhuận Xã Viên",
    metric1Val: "100%", metric1Label: "Minh bạch nguồn gốc lô hàng",
    metric2Val: "25 Xã viên", metric2Label: "Quản lý tập trung trên app",
    metric3Val: "15 Tấn/tháng", metric3Label: "Sản lượng xuất siêu thị",
    metric4Val: "+22%", metric4Label: "Lợi nhuận xã viên tăng"
  },
  {
    id: "vet-aqua-erp",
    name: "Vet & Aqua ERP Lite",
    category: "ERP • THUỐC THÚ Y & THỦY SẢN",
    url: "https://vet-aqua-erp-lite.vercel.app/",
    primaryColor: "#0284c7",
    secondaryColor: "#0ea5e9",
    accentColor: "#38bdf8",
    workflowTitle: "Quản Lý Lô Thuốc Kháng Sinh, Hạn Dùng & Công Thức Thức Ăn",
    workflowStep1: "1. Nhập kho theo số lô sản xuất (Batch Number) và hạn sử dụng",
    workflowStep2: "2. Cảnh báo sớm lô cận date 60 ngày để ưu tiên xuất kho (FIFO)",
    workflowStep3: "3. Tính toán phác đồ điều trị liều lượng theo thể trọng đàn nuôi",
    workflowBadge: "INVENTORY: QUẢN LÝ LÔ FIFO CHUẨN XÁC",
    reportTitle: "Báo Cáo Tồn Kho Dược Phẩm & Doanh Thu Theo Vùng Nuôi",
    metric1Val: "0 Lô hết hạn", metric1Label: "Không tồn đọng thuốc quá đát",
    metric2Val: "100% Khớp", metric2Label: "Kiểm kê kho tức thời",
    metric3Val: "+19%", metric3Label: "Hiệu quả điều trị ao nuôi",
    metric4Val: "Báo cáo tự động", metric4Label: "Sẵn sàng gửi chi cục thú y"
  },
  {
    id: "tro-ly-vi-ngon",
    name: "Trợ Lý Vị Ngon (F&B AI)",
    category: "F&B • MENU ENGINEERING & FLAVOR PAIRING",
    url: "https://trolyvingon.vercel.app/",
    primaryColor: "#ea580c",
    secondaryColor: "#f97316",
    accentColor: "#fb923c",
    workflowTitle: "Ma Trận Phối Vị Thông Minh & Tính Định Mức Chi Phí Món",
    workflowStep1: "1. Chọn nguyên liệu chính (Thịt, Hải sản, Nông sản, Nước sốt)",
    workflowStep2: "2. AI phân tích hồ sơ hương vị (Umami, Cay, Ngọt, Chua, Đắng)",
    workflowStep3: "3. Tự động tính toán Food Cost % và đề xuất giá bán tối ưu lợi nhuận",
    workflowBadge: "AI PAIRING: HƠN 500+ HỢP CHẤT HƯƠNG VỊ",
    reportTitle: "Ma Trận Thực Đơn BCG & Phân Tích Lợi Nhuận Món Ăn",
    metric1Val: "28-32%", metric1Label: "Food Cost chuẩn nhà hàng",
    metric2Val: "+15%", metric2Label: "Doanh thu món bán chạy (Star)",
    metric3Val: "500+ Món", metric3Label: "Thư viện công thức chuẩn hóa",
    metric4Val: "Kiểm soát", metric4Label: "Hao hụt nguyên liệu < 3%"
  },
  {
    id: "lipoid-advisor",
    name: "Lipoid Formulation Advisor",
    category: "R&D • DƯỢC & MỸ PHẨM CHUYÊN SÂU",
    url: "https://lipoid-advisor.vercel.app/",
    primaryColor: "#7c3aed",
    secondaryColor: "#8b5cf6",
    accentColor: "#c084fc",
    workflowTitle: "Mô Phỏng Hệ Dẫn Phospholipid & Kích Thước Hạt Liposome",
    workflowStep1: "1. Chọn hoạt chất cần bao bọc (Vitamin C, Retinol, Ceramide)",
    workflowStep2: "2. Chọn loại Phospholipid tương thích từ danh mục Lipoid Đức",
    workflowStep3: "3. Mô phỏng kích thước giọt nhũ tương và độ thấm sâu qua biểu bì",
    workflowBadge: "GERMAN QUALITY: CHUẨN LIPOID ĐỨC",
    reportTitle: "Hồ Sơ Kỹ Thuật Formulator & Tài Liệu Thẩm Mỹ Y Khoa",
    metric1Val: "100-150nm", metric1Label: "Kích thước hạt Liposome",
    metric2Val: "+3.5 Lần", metric2Label: "Tăng khả năng thẩm thấu",
    metric3Val: "100% Thuần chay", metric3Label: "Nguồn gốc đậu nành tự nhiên",
    metric4Val: "Đạt chuẩn", metric4Label: "Hồ sơ kỹ thuật COA/MSDS"
  },
  {
    id: "bjc-sales-pitch",
    name: "BJC Interactive Sales Pitch",
    category: "B2B SALES PRESENTATION",
    url: "https://bjc-sales-pitch.vercel.app/",
    primaryColor: "#2563eb",
    secondaryColor: "#3b82f6",
    accentColor: "#60a5fa",
    workflowTitle: "Trình Chiếu Tương Tác & Bảng Tính ROI Cho Khách Hàng",
    workflowStep1: "1. Chọn quy mô nhà máy sản xuất của khách hàng (Tấn/tháng)",
    workflowStep2: "2. Nhập chi phí nguyên liệu hiện tại vs giải pháp công nghệ BJC",
    workflowStep3: "3. Tự động hiển thị đồ thị hoàn vốn ROI và mức tiết kiệm hàng năm",
    workflowBadge: "INTERACTIVE: TÍNH ROI TRỰC TIẾP",
    reportTitle: "Bản Đề Xuất Báo Giá Kỹ Thuật (Executive Pitch Deck)",
    metric1Val: "10 Phút", metric1Label: "Thuyết phục khách hàng chốt deal",
    metric2Val: "+40%", metric2Label: "Tăng độ tin cậy kỹ thuật",
    metric3Val: "Minh bạch", metric3Label: "Mọi thông số kỹ thuật rõ ràng",
    metric4Val: "Xuất PDF", metric4Label: "Gửi báo giá ngay trong buổi họp"
  },
  {
    id: "lanxess-cosmetic-advisor",
    name: "Lanxess Cosmetic Advisor",
    category: "R&D • HOẠT CHẤT & CHẤT BẢO QUẢN",
    url: "https://lanxess-advisor.vercel.app/",
    primaryColor: "#b91c1c",
    secondaryColor: "#dc2626",
    accentColor: "#f87171",
    workflowTitle: "Thử Thách Vi Sinh (Challenge Test) & Chọn Hệ Bảo Quản",
    workflowStep1: "1. Nhập khoảng pH công thức (3.0 - 8.0) và loại sản phẩm (Rửa trôi/Lưu lại)",
    workflowStep2: "2. AI đối chiếu phổ kháng khuẩn (Vi khuẩn Gram+, Gram-, Nấm mốc, Men)",
    workflowStep3: "3. Đề xuất hệ bảo quản Lanxess (Rokonsal, Purolan) đạt chuẩn Ecocert",
    workflowBadge: "ECOCERT READY: BẢO QUẢN TỰ NHIÊN",
    reportTitle: "Báo Cáo Tuân Thủ Quy Định Mỹ Phẩm Toàn Cầu (EU, US, ASEAN)",
    metric1Val: "100%", metric1Label: "Vượt qua thử thách vi sinh",
    metric2Val: "Clean Beauty", metric2Label: "Không chứa Paraben/Formaldehyde",
    metric3Val: "Phổ rộng", metric3Label: "Bảo vệ toàn diện công thức",
    metric4Val: "Chứng nhận", metric4Label: "Đạt chuẩn quy chuẩn quốc tế"
  },
  {
    id: "algaktiv-advisor",
    name: "Algaktiv Advisor",
    category: "R&D • CÔNG NGHỆ HOẠT CHẤT VI TẢO",
    url: "https://algaktivadvisor.vercel.app",
    primaryColor: "#047857",
    secondaryColor: "#059669",
    accentColor: "#34d399",
    workflowTitle: "Tra Cứu Hoạt Chất Vi Tảo Sinh Học & Bằng Chứng Lâm Sàng",
    workflowStep1: "1. Chọn cơ chế tác động (Chống ánh sáng xanh, Trẻ hóa DNA, Phục hồi màng ẩm)",
    workflowStep2: "2. Xem kết quả thử nghiệm lâm sàng In-vivo và In-vitro với ảnh trước/sau",
    workflowStep3: "3. Đề xuất nồng độ sử dụng và hướng dẫn phối chế vào nền sản phẩm",
    workflowBadge: "CLINICAL DATA: KẾT QUẢ THỰC NGHIỆM ĐẦY ĐỦ",
    reportTitle: "Hồ Sơ Khoa Học & Phác Đồ Ứng Dụng Vi Tảo Biển",
    metric1Val: "In-vivo", metric1Label: "Thử nghiệm trên người thật",
    metric2Val: "-32%", metric2Label: "Giảm nếp nhăn sau 28 ngày",
    metric3Val: "Bền vững", metric3Label: "Chiết xuất vi tảo xanh sinh thái",
    metric4Val: "Bản quyền", metric4Label: "Công nghệ Algaktiv Tây Ban Nha"
  },
  {
    id: "vanderbilt-advisor",
    name: "Vanderbilt Advisor",
    category: "R&D • KHOÁNG CHẤT & CHẤT TẠO ĐẶC",
    url: "https://vanderbilt-advisor.vercel.app/",
    primaryColor: "#4338ca",
    secondaryColor: "#4f46e5",
    accentColor: "#818cf8",
    workflowTitle: "Điều Chỉnh Độ Nhớt (Rheology) & Ổn Định Hệ Phân Tán",
    workflowStep1: "1. Nhập yêu cầu kết cấu sản phẩm (Gel trong, Nhũ tương đặc, Dạng xịt)",
    workflowStep2: "2. Mô phỏng tỷ lệ phối hợp Veegum (Smectite clay) và Xanthan Gum",
    workflowStep3: "3. Tính toán ngưỡng chảy (Yield Value) chống sa lắng hạt và tách lớp",
    workflowBadge: "VEEGUM TECHNOLOGY: CHỐNG SA LẮNG TUYỆT ĐỐI",
    reportTitle: "Sơ Đồ Phối Chế Khoáng Sét Tự Nhiên Vanderbilt",
    metric1Val: "Thixotropic", metric1Label: "Tính xúc biến phục hồi nhanh",
    metric2Val: "0 Tách lớp", metric2Label: "Ổn định nhiệt độ cao 45°C",
    metric3Val: "100% Khoáng", metric3Label: "Khoáng sét tự nhiên tinh khiết",
    metric4Val: "Hồ sơ kỹ thuật", metric4Label: "Đầy đủ tài liệu FDA/USP"
  },
  {
    id: "yeast-extract-test",
    name: "Yeast Extract Testing Tool",
    category: "QA/QC • CHIẾT XUẤT NẤM MEN & VỊ UMAMI",
    url: "https://yeast-extract-test.vercel.app/",
    primaryColor: "#c2410c",
    secondaryColor: "#ea580c",
    accentColor: "#f97316",
    workflowTitle: "Phân Tích Cường Độ Vị Umami & Giảm Muối Trong Thực Phẩm",
    workflowStep1: "1. Nhập tỷ lệ muối hiện tại trong sản phẩm (Nước tương, Nước mắm, Hạt nêm)",
    workflowStep2: "2. Chọn mã nấm men Lallemand phù hợp (High Lyfe, Prime Lyfe, Intense Lyfe)",
    workflowStep3: "3. Thuật toán bù trừ vị mặn bằng nucleotide tự nhiên, giảm tới 40% Natri",
    workflowBadge: "SALT REDUCTION: GIẢM 40% MUỐI VẪN ĐẬM ĐÀ",
    reportTitle: "Biểu Đồ Radar Hương Vị & Chứng Thư Phân Tích QA/QC",
    metric1Val: "-40% Natri", metric1Label: "Giảm muối bảo vệ sức khỏe",
    metric2Val: "100% Tự nhiên", metric2Label: "Không bột ngọt nhân tạo (No MSG)",
    metric3Val: "Tròn vị", metric3Label: "Cân bằng hậu vị êm dịu",
    metric4Val: "Halal/Kosher", metric4Label: "Đạt mọi tiêu chuẩn xuất khẩu"
  },
  {
    id: "clinic-spa",
    name: "Clinic & Spa Booking Pro",
    category: "LÀM ĐẸP • ĐẶT LỊCH HẸN & QUẢN TRỊ LIỆU TRÌNH",
    url: "https://clinic-spa-booking.vercel.app/",
    primaryColor: "#be185d",
    secondaryColor: "#db2777",
    accentColor: "#f472b6",
    workflowTitle: "Quản Lý Lịch Hẹn Bác Sĩ & Hồ Sơ Phác Đồ Liệu Trình",
    workflowStep1: "1. Khách hàng đặt lịch hẹn chọn chuyên gia & khung giờ ưa thích",
    workflowStep2: "2. Bác sĩ thẩm mỹ theo dõi phác đồ, lịch sử laser/filler và ảnh tiến triển",
    workflowStep3: "3. Nhắc lịch tự động qua SMS/Zalo trước 2 giờ và thanh toán ví điện tử",
    workflowBadge: "SMART REMINDER: GIẢM 85% BỎ HẸN",
    reportTitle: "Báo Cáo Doanh Thu Spa & Đánh Giá Năng Suất Kỹ Thuật Viên",
    metric1Val: "98%", metric1Label: "Khách hàng hài lòng liệu trình",
    metric2Val: "-85%", metric2Label: "Giảm thiểu tỷ lệ bỏ hẹn",
    metric3Val: "Minh bạch", metric3Label: "Hồ sơ da liễu điện tử",
    metric4Val: "Tự động", metric4Label: "Tính hoa hồng kỹ thuật viên"
  },
  {
    id: "spa-landing",
    name: "Spa Landing Page Showroom",
    category: "LÀM ĐẸP • BÁN HÀNG & SHOWROOM THẨM MỸ",
    url: "https://spa-landing-showcase.vercel.app/",
    primaryColor: "#9333ea",
    secondaryColor: "#a855f7",
    accentColor: "#c084fc",
    workflowTitle: "Showroom Dịch Vụ Thẩm Mỹ Sang Trọng & Phễu Chốt Khách",
    workflowStep1: "1. Trình diễn video không gian nghỉ dưỡng và bảng giá liệu trình VIP",
    workflowStep2: "2. Đánh giá của khách hàng người nổi tiếng & chứng nhận tay nghề chuyên gia",
    workflowStep3: "3. Nhận voucher ưu đãi độc quyền 50% khi đăng ký tư vấn trực tuyến",
    workflowBadge: "HIGH CONVERTING: TĂNG GẤP 3 LẦN LEAD",
    reportTitle: "Báo Cáo Tỷ Lệ Chuyển Đổi Phễu Đăng Ký & Doanh Số Voucher",
    metric1Val: "+300%", metric1Label: "Tăng trưởng khách hàng tiềm năng",
    metric2Val: "Chuẩn Mobile", metric2Label: "Tối ưu hiển thị điện thoại 100%",
    metric3Val: "< 1.2s", metric3Label: "Tốc độ tải trang siêu tốc",
    metric4Val: "Tích hợp", metric4Label: "Đồng bộ lead về CRM ngay lập tức"
  }
];

function generateWorkflowScreen(app) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${app.primaryColor}" />
      <stop offset="100%" stop-color="${app.secondaryColor}" />
    </linearGradient>
    <filter id="softShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.10" />
    </filter>
  </defs>

  <rect width="1600" height="1000" fill="url(#bgGrad)" />

  <!-- Ambient Light Orbs -->
  <circle cx="1450" cy="180" r="300" fill="${app.secondaryColor}" opacity="0.10" />
  <circle cx="150" cy="850" r="260" fill="${app.primaryColor}" opacity="0.08" />

  <!-- Browser Frame Window -->
  <g transform="translate(60, 40)" filter="url(#softShadow)">
    <rect width="1480" height="920" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Header Bar -->
    <rect width="1480" height="60" rx="20" fill="#f8fafc" />
    <rect y="40" width="1480" height="20" fill="#f8fafc" />
    <line x1="0" y1="60" x2="1480" y2="60" stroke="#e2e8f0" stroke-width="1.5" />

    <circle cx="36" cy="30" r="7" fill="#ef4444" />
    <circle cx="60" cy="30" r="7" fill="#f59e0b" />
    <circle cx="84" cy="30" r="7" fill="#10b981" />

    <rect x="220" y="14" width="1040" height="32" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
    <text x="250" y="35" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600">
      ${app.url} • [PHÂN ĐOẠN 2: THAO TÁC NGHIỆP VỤ]
    </text>

    <!-- App Inner Content -->
    <g transform="translate(0, 60)">
      <!-- Inner Top Navigation -->
      <rect width="1480" height="70" fill="#ffffff" />
      <line x1="0" y1="70" x2="1480" y2="70" stroke="#f1f5f9" stroke-width="1.5" />
      
      <circle cx="50" cy="35" r="18" fill="url(#primaryGrad)" />
      <text x="50" y="42" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">
        ${app.name.charAt(0)}
      </text>
      
      <text x="85" y="34" fill="#0f172a" font-family="sans-serif" font-size="18" font-weight="800">${app.name}</text>
      <text x="85" y="52" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">${app.category}</text>

      <rect x="1180" y="20" width="260" height="34" rx="17" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
      <text x="1310" y="42" fill="#059669" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">
        ${app.workflowBadge}
      </text>

      <!-- Main Workflow Workspace Canvas -->
      <g transform="translate(50, 95)">
        <!-- Step by Step Workflow Cards -->
        <rect width="1380" height="100" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
        <text x="30" y="40" fill="#0f172a" font-family="sans-serif" font-size="20" font-weight="800">
          🎯 ${app.workflowTitle}
        </text>
        <text x="30" y="72" fill="#64748b" font-family="sans-serif" font-size="14" font-weight="500">
          Mô phỏng chân thực quy trình người dùng thao tác nghiệp vụ trên nền tảng số hóa của Duy Anh Digital Lab
        </text>

        <!-- 3 Interactive Steps Pipeline -->
        <g transform="translate(0, 130)">
          <!-- Step 1 -->
          <g transform="translate(0, 0)">
            <rect width="440" height="230" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <rect width="440" height="45" rx="16" fill="#f8fafc" />
            <rect y="30" width="440" height="15" fill="#f8fafc" />
            <line x1="0" y1="45" x2="440" y2="45" stroke="#f1f5f9" stroke-width="1" />
            <text x="20" y="28" fill="${app.primaryColor}" font-family="sans-serif" font-size="13" font-weight="800">BƯỚC 1: TIẾP NHẬN ĐẦU VÀO</text>
            <text x="20" y="80" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700" width="400">
              ${app.workflowStep1}
            </text>
            <!-- UI input simulation -->
            <rect x="20" y="115" width="400" height="42" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
            <text x="35" y="141" fill="#64748b" font-family="monospace" font-size="12">Tham số: Hoạt chất &amp; Điều kiện chuẩn</text>
            <rect x="20" y="170" width="120" height="34" rx="8" fill="url(#primaryGrad)" />
            <text x="80" y="192" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Xác nhận ✓</text>
          </g>

          <!-- Step 2 -->
          <g transform="translate(470, 0)">
            <rect width="440" height="230" rx="16" fill="#ffffff" stroke="${app.primaryColor}" stroke-width="2" />
            <rect width="440" height="45" rx="16" fill="${app.primaryColor}" opacity="0.08" />
            <rect y="30" width="440" height="15" fill="${app.primaryColor}" opacity="0.08" />
            <line x1="0" y1="45" x2="440" y2="45" stroke="#f1f5f9" stroke-width="1" />
            <text x="20" y="28" fill="${app.primaryColor}" font-family="sans-serif" font-size="13" font-weight="800">BƯỚC 2: XỬ LÝ THUẬT TOÁN &amp; AI</text>
            <text x="20" y="80" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700">
              ${app.workflowStep2}
            </text>
            <!-- Progress calculation simulation -->
            <rect x="20" y="125" width="400" height="10" rx="5" fill="#f1f5f9" />
            <rect x="20" y="125" width="340" height="10" rx="5" fill="url(#primaryGrad)" />
            <text x="20" y="160" fill="#059669" font-family="monospace" font-size="12" font-weight="700">
              ✓ Độ chính xác thuật toán: 99.8% (Khớp cơ sở dữ liệu)
            </text>
            <text x="20" y="185" fill="#64748b" font-family="sans-serif" font-size="12">Thời gian xử lý: 0.18 giây</text>
          </g>

          <!-- Step 3 -->
          <g transform="translate(940, 0)">
            <rect width="440" height="230" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <rect width="440" height="45" rx="16" fill="#f8fafc" />
            <rect y="30" width="440" height="15" fill="#f8fafc" />
            <line x1="0" y1="45" x2="440" y2="45" stroke="#f1f5f9" stroke-width="1" />
            <text x="20" y="28" fill="#059669" font-family="sans-serif" font-size="13" font-weight="800">BƯỚC 3: XUẤT KẾT QUẢ NGHIỆP VỤ</text>
            <text x="20" y="80" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700">
              ${app.workflowStep3}
            </text>
            <!-- Output badge simulation -->
            <rect x="20" y="120" width="400" height="70" rx="10" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
            <text x="35" y="148" fill="#065f46" font-family="sans-serif" font-size="13" font-weight="700">
              ✓ Dữ liệu hợp lệ, sẵn sàng áp dụng thực tế
            </text>
            <text x="35" y="172" fill="#059669" font-family="monospace" font-size="11">
              Đồng bộ dữ liệu thời gian thực lên Cloud
            </text>
          </g>
        </g>

        <!-- Bottom Live Operational Data Table -->
        <g transform="translate(0, 390)">
          <rect width="1380" height="280" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
          <rect width="1380" height="45" rx="16" fill="#f8fafc" />
          <rect y="30" width="1380" height="15" fill="#f8fafc" />
          <line x1="0" y1="45" x2="1380" y2="45" stroke="#e2e8f0" stroke-width="1" />

          <text x="30" y="28" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="800">
            BẢNG DỮ LIỆU THỰC NGHIỆM ĐỒNG BỘ THỜI GIAN THỰC
          </text>

          <g transform="translate(30, 75)" font-family="sans-serif" font-size="13">
            <text x="0" y="0" fill="#64748b" font-weight="700">MÃ ĐỊNH DANH</text>
            <text x="240" y="0" fill="#64748b" font-weight="700">TIÊU THỨC NGHIỆP VỤ</text>
            <text x="580" y="0" fill="#64748b" font-weight="700">THUẬT TOÁN ÁP DỤNG</text>
            <text x="920" y="0" fill="#64748b" font-weight="700">TRẠNG THÁI KIỂM ĐỊNH</text>
            <text x="1220" y="0" fill="#64748b" font-weight="700">KẾT QUẢ</text>

            <line x1="0" y1="15" x2="1320" y2="15" stroke="#f1f5f9" stroke-width="1.5" />

            <!-- Row 1 -->
            <text x="0" y="45" fill="#0f172a" font-family="monospace" font-weight="600">ID-2026-01</text>
            <text x="240" y="45" fill="#0f172a" font-weight="600">Khảo sát &amp; Chuẩn hóa tham số</text>
            <text x="580" y="45" fill="#4f46e5" font-weight="600">Deep Neural / Statistical</text>
            <text x="920" y="45" fill="#059669" font-weight="700">✓ Đạt chuẩn 100%</text>
            <text x="1220" y="45" fill="#0f172a" font-weight="800">Passed</text>

            <line x1="0" y1="65" x2="1320" y2="65" stroke="#f8fafc" stroke-width="1" />

            <!-- Row 2 -->
            <text x="0" y="95" fill="#0f172a" font-family="monospace" font-weight="600">ID-2026-02</text>
            <text x="240" y="95" fill="#0f172a" font-weight="600">Tối ưu hóa chi phí &amp; hiệu năng</text>
            <text x="580" y="95" fill="#4f46e5" font-weight="600">Simplex / Linear Matrix</text>
            <text x="920" y="95" fill="#059669" font-weight="700">✓ Tiết kiệm 22%</text>
            <text x="1220" y="95" fill="#0f172a" font-weight="800">Optimized</text>

            <line x1="0" y1="115" x2="1320" y2="115" stroke="#f8fafc" stroke-width="1" />

            <!-- Row 3 -->
            <text x="0" y="145" fill="#0f172a" font-family="monospace" font-weight="600">ID-2026-03</text>
            <text x="240" y="145" fill="#0f172a" font-weight="600">Tích hợp giao diện người dùng</text>
            <text x="580" y="145" fill="#4f46e5" font-weight="600">React + Vite SPA</text>
            <text x="920" y="145" fill="#059669" font-weight="700">✓ Phản hồi &lt; 0.2s</text>
            <text x="1220" y="145" fill="#0f172a" font-weight="800">Ready</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

function generateReportScreen(app) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${app.primaryColor}" />
      <stop offset="100%" stop-color="${app.secondaryColor}" />
    </linearGradient>
    <filter id="softShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.10" />
    </filter>
  </defs>

  <rect width="1600" height="1000" fill="url(#bgGrad)" />
  <circle cx="1450" cy="180" r="300" fill="${app.secondaryColor}" opacity="0.10" />

  <!-- Browser Frame Window -->
  <g transform="translate(60, 40)" filter="url(#softShadow)">
    <rect width="1480" height="920" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Header Bar -->
    <rect width="1480" height="60" rx="20" fill="#f8fafc" />
    <rect y="40" width="1480" height="20" fill="#f8fafc" />
    <line x1="0" y1="60" x2="1480" y2="60" stroke="#e2e8f0" stroke-width="1.5" />

    <circle cx="36" cy="30" r="7" fill="#ef4444" />
    <circle cx="60" cy="30" r="7" fill="#f59e0b" />
    <circle cx="84" cy="30" r="7" fill="#10b981" />

    <rect x="220" y="14" width="1040" height="32" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
    <text x="250" y="35" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600">
      ${app.url} • [PHÂN ĐOẠN 3: BÁO CÁO &amp; HIỆU QUẢ THỰC TẾ]
    </text>

    <!-- App Inner Content -->
    <g transform="translate(0, 60)">
      <!-- Top Title Bar -->
      <g transform="translate(50, 30)">
        <text x="0" y="30" fill="#0f172a" font-family="sans-serif" font-size="24" font-weight="900">
          📊 ${app.reportTitle}
        </text>
        <text x="0" y="55" fill="#64748b" font-family="sans-serif" font-size="14" font-weight="500">
          Tổng hợp kết quả phân tích số liệu, chỉ số KPI vận hành và tài liệu bàn giao chuyên nghiệp từ ứng dụng
        </text>

        <!-- 4 Key Metric Cards -->
        <g transform="translate(0, 80)">
          <!-- Card 1 -->
          <g transform="translate(0, 0)">
            <rect width="320" height="120" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="24" y="50" fill="${app.primaryColor}" font-family="sans-serif" font-size="32" font-weight="900">${app.metric1Val}</text>
            <text x="24" y="85" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="600">${app.metric1Label}</text>
          </g>

          <!-- Card 2 -->
          <g transform="translate(350, 0)">
            <rect width="320" height="120" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="24" y="50" fill="#059669" font-family="sans-serif" font-size="32" font-weight="900">${app.metric2Val}</text>
            <text x="24" y="85" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="600">${app.metric2Label}</text>
          </g>

          <!-- Card 3 -->
          <g transform="translate(700, 0)">
            <rect width="320" height="120" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="24" y="50" fill="#d97706" font-family="sans-serif" font-size="32" font-weight="900">${app.metric3Val}</text>
            <text x="24" y="85" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="600">${app.metric3Label}</text>
          </g>

          <!-- Card 4 -->
          <g transform="translate(1050, 0)">
            <rect width="330" height="120" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="24" y="50" fill="#7c3aed" font-family="sans-serif" font-size="30" font-weight="900">${app.metric4Val}</text>
            <text x="24" y="85" fill="#64748b" font-family="sans-serif" font-size="13" font-weight="600">${app.metric4Label}</text>
          </g>
        </g>

        <!-- Big Analytics Chart & Certificate Box -->
        <g transform="translate(0, 230)">
          <!-- Left Chart Container -->
          <g transform="translate(0, 0)">
            <rect width="880" height="470" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <rect width="880" height="45" rx="16" fill="#f8fafc" />
            <rect y="30" width="880" height="15" fill="#f8fafc" />
            <line x1="0" y1="45" x2="880" y2="45" stroke="#e2e8f0" stroke-width="1" />
            <text x="24" y="28" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="800">
              BIỂU ĐỒ XU HƯỚNG HIỆU QUẢ THEO THỜI GIAN (Q1 - Q4)
            </text>

            <!-- Chart visual -->
            <g transform="translate(60, 90)">
              <!-- Y Axis Lines -->
              <line x1="0" y1="0" x2="760" y2="0" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="0" y1="70" x2="760" y2="70" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="0" y1="140" x2="760" y2="140" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="0" y1="210" x2="760" y2="210" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="0" y1="280" x2="760" y2="280" stroke="#cbd5e1" stroke-width="2" />

              <text x="-40" y="5" fill="#94a3b8" font-family="monospace" font-size="11">100%</text>
              <text x="-40" y="75" fill="#94a3b8" font-family="monospace" font-size="11">75%</text>
              <text x="-40" y="145" fill="#94a3b8" font-family="monospace" font-size="11">50%</text>
              <text x="-40" y="215" fill="#94a3b8" font-family="monospace" font-size="11">25%</text>
              <text x="-40" y="285" fill="#94a3b8" font-family="monospace" font-size="11">0%</text>

              <!-- Filled curve area -->
              <path d="M 0,220 Q 180,160 380,90 T 760,20 L 760,280 L 0,280 Z" fill="${app.primaryColor}" opacity="0.12" />
              <path d="M 0,220 Q 180,160 380,90 T 760,20" fill="none" stroke="${app.primaryColor}" stroke-width="4" stroke-linecap="round" />

              <!-- Points -->
              <circle cx="0" cy="220" r="6" fill="${app.primaryColor}" />
              <circle cx="200" cy="150" r="6" fill="${app.primaryColor}" />
              <circle cx="400" cy="85" r="6" fill="${app.primaryColor}" />
              <circle cx="600" cy="45" r="6" fill="${app.primaryColor}" />
              <circle cx="760" cy="20" r="7" fill="${app.secondaryColor}" stroke="#ffffff" stroke-width="3" />

              <!-- X Labels -->
              <text x="0" y="315" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">Tháng 1</text>
              <text x="200" y="315" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">Tháng 4</text>
              <text x="400" y="315" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">Tháng 7</text>
              <text x="600" y="315" fill="#64748b" font-family="sans-serif" font-size="12" font-weight="600">Tháng 10</text>
              <text x="740" y="315" fill="#0f172a" font-family="sans-serif" font-size="12" font-weight="800">Tháng 12</text>
            </g>
          </g>

          <!-- Right Document & Export Box -->
          <g transform="translate(910, 0)">
            <rect width="470" height="470" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <rect width="470" height="45" rx="16" fill="#ffffff" />
            <rect y="30" width="470" height="15" fill="#ffffff" />
            <line x1="0" y1="45" x2="470" y2="45" stroke="#e2e8f0" stroke-width="1" />
            <text x="20" y="28" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="800">
              HỒ SƠ BÀN GIAO &amp; XUẤT BÁO CÁO
            </text>

            <g transform="translate(24, 70)">
              <rect width="422" height="75" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
              <text x="18" y="32" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700">📄 Xuất Báo Cáo Kỹ Thuật (PDF)</text>
              <text x="18" y="55" fill="#64748b" font-family="sans-serif" font-size="12">Bao gồm công thức, đồ thị và chứng thư số</text>

              <rect y="90" width="422" height="75" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
              <text x="18" y="122" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700">📊 Xuất Bảng Dữ Liệu Excel / CSV</text>
              <text x="18" y="145" fill="#64748b" font-family="sans-serif" font-size="12">Dữ liệu phân tích chi tiết phục vụ đối soát</text>

              <rect y="180" width="422" height="75" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
              <text x="18" y="212" fill="#0f172a" font-family="sans-serif" font-size="14" font-weight="700">🔗 Chia Sẻ Báo Cáo Tức Thì (Link)</text>
              <text x="18" y="235" fill="#64748b" font-family="sans-serif" font-size="12">Link mã hóa an toàn gửi trực tiếp cho đối tác</text>

              <!-- CTA Button inside mockup -->
              <rect y="280" width="422" height="52" rx="12" fill="url(#primaryGrad)" />
              <text x="211" y="312" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="middle">
                TẢI HỒ SƠ HOÀN CHỈNH (1-CLICK EXPORT)
              </text>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

// Generate for all apps
apps.forEach(app => {
  const dir = path.join(__dirname, '../public/apps', app.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const workflowPath = path.join(dir, 'screen-workflow.svg');
  const reportPath = path.join(dir, 'screen-report.svg');

  fs.writeFileSync(workflowPath, generateWorkflowScreen(app), 'utf8');
  fs.writeFileSync(reportPath, generateReportScreen(app), 'utf8');

  console.log(`Generated screens for: ${app.id}`);
});

console.log('All screens generated successfully!');
