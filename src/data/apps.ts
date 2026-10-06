export interface DemoCredential {
  account: string;
  password?: string;
  note?: string;
}

export interface VideoScene {
  time: string;
  title: string;
  description: string;
}

export interface UserManualInfo {
  url: string;
  fileName: string;
  fileSize: string;
  title: string;
  description?: string;
}

export interface AppItem {
  logoUrl: string;
  id: string;
  name: string;
  url: string;
  category: string;
  categoryId: string;
  description: string;
  tags: string[];
  coverImage: string;
  placeholderImage: string;
  detailImages: string[];
  imageAlt: string;
  featured: boolean;
  audience: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  videoDuration: string;
  videoTagline: string;
  videoScenes: VideoScene[];
  demoCredential?: DemoCredential;
  illustrationImage?: string;
  userManual?: UserManualInfo;
  theme: {
    from: string;
    to: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
  };
}

export const APPS_DATA: AppItem[] = [
  {
    id: "tropilab-riskos",
    logoUrl: '/apps/tropilab-riskos/app-logo.png',
    name: "TROPILAB RISKOS",
    url: "https://tropilab.vercel.app",
    category: "Sức khỏe",
    categoryId: "healthcare",
    description: "Hệ thống trung tâm điều hành số quản lý Rủi ro – Chất lượng – ISO – An toàn phòng xét nghiệm bệnh viện theo tiêu chuẩn ISO 22367:2020 và ISO 15189:2022. Ứng dụng kết nối toàn diện dữ liệu, con người và quy trình với 10 tính năng cốt lõi: Báo lỗi một chạm & khóa mẫu khẩn cấp, quét mã QR xác nhận người bệnh chống nhầm lẫn, bản đồ ống nghiệm trực quan, cảnh báo dán nhãn phụ tự động, trợ lý kiểm tra y lệnh thông minh, tự động hóa hồ sơ ISO và CAPA ký số, giám sát môi trường nhiệt ẩm IoT 24/7, màn hình điều hành ma trận rủi ro thời gian thực, dự báo vật tư tiêu hao bảo trì máy, và cổng theo dõi tiến trình xét nghiệm thông báo qua Zalo cho người bệnh.",
    tags: [
      "TROPILAB RISKOS",
      "Sức Khỏe",
      "Y Tế Bệnh Viện",
      "Quản Lý Rủi Ro",
      "Phòng Xét Nghiệm",
      "Chuẩn ISO 22367",
      "Chuẩn ISO 15189",
      "Khóa Mẫu Khẩn Cấp",
      "Quét QR Chống Nhầm",
      "Giám Sát IoT 24/7",
      "Hồ Sơ CAPA Ký Số",
      "Thông Báo Zalo",
      "An Toàn Y Khoa"
    ],
    coverImage: '/apps/tropilab-riskos/cover.jpg',
    placeholderImage: '/apps/tropilab-riskos/cover.jpg',
    detailImages: [
      '/apps/tropilab-riskos/feature_01_bao_loi_mot_cham_khoa_mau.jpg',
      '/apps/tropilab-riskos/feature_02_xac_nhan_nguoi_benh_chong_sai_sot.jpg',
      '/apps/tropilab-riskos/feature_03_ban_do_ong_nghiem_truc_quan.jpg',
      '/apps/tropilab-riskos/feature_04_canh_bao_dan_nhan_tu_dong.jpg',
      '/apps/tropilab-riskos/feature_05_tro_ly_kiem_tra_y_lenh_thong_minh.jpg',
      '/apps/tropilab-riskos/feature_06_tu_dong_hoa_ho_so_iso.jpg',
      '/apps/tropilab-riskos/feature_07_giam_sat_moi_truong_247.jpg',
      '/apps/tropilab-riskos/feature_08_man_hinh_dieu_hanh_ma_tran_rui_ro.jpg',
      '/apps/tropilab-riskos/feature_09_du_bao_vat_tu_quan_ly_bao_tri.jpg',
      '/apps/tropilab-riskos/feature_10_theo_doi_nguoi_benh_thong_bao_zalo.jpg'
    ],
    imageAlt: "Giao diện hệ thống điều hành số TROPILAB RISKOS - Quản lý rủi ro và an toàn phòng xét nghiệm bệnh viện chuẩn ISO 22367 / ISO 15189",
    featured: true,
    illustrationImage: '/apps/tropilab-riskos/cover.jpg',
    demoCredential: {
      account: "Trải nghiệm ngay",
      note: "Hệ thống quản trị rủi ro bệnh viện PWA, truy cập trực tiếp tại tropilab.vercel.app với phân quyền Kỹ thuật viên, Quản lý chất lượng và Lãnh đạo khoa."
    },
    audience: "Ban Giám đốc Bệnh viện, Trưởng khoa Xét nghiệm, Kỹ thuật viên xét nghiệm, Điều dưỡng lấy mẫu, Cán bộ quản lý chất lượng ISO 15189 / ISO 22367 và Tổ An toàn người bệnh.",
    problem: "Trong bệnh viện, các sự cố xét nghiệm (nhầm lẫn mẫu, sai ống, dán nhầm nhãn, mẫu đông vón, hỏng mẫu) thường chỉ được phát hiện muộn ở giai đoạn trả kết quả; quy trình báo cáo thủ công qua giấy tờ rườm rà, hồ sơ khắc phục CAPA theo chuẩn ISO đối phó và thiếu công cụ cảnh báo tức thì từ khâu lấy mẫu.",
    solution: "TROPILAB RISKOS là trung tâm điều hành số hóa toàn bộ vòng đời mẫu xét nghiệm: Báo lỗi 1 chạm trên di động, tự động khóa mẫu trên LIS, đối chiếu barcode người bệnh, trực quan hóa bản đồ ống nghiệm, AI kiểm tra y lệnh, cảm biến IoT theo dõi tủ lạnh 24/7 và ma trận rủi ro cập nhật từng giây.",
    keyFeatures: [
      "Báo lỗi một chạm & Khóa mẫu khẩn cấp: Kỹ thuật viên chỉ cần chọn mã lỗi, chụp ảnh chứng cứ và gửi ngay trên điện thoại; hệ thống lập tức cảnh báo các bộ phận liên quan, khóa trạng thái mẫu trên LIS và kích hoạt đếm ngược thời gian xử lý sự cố.",
      "Xác nhận người bệnh & Kiểm tra chống sai sót: Điều dưỡng quét mã QR trên vòng tay người bệnh hoặc phiếu chỉ định; hệ thống tự động đối chiếu thông tin y lệnh trước khi chọc kim lấy máu, thiết lập thêm một lớp khiên bảo vệ an toàn cho bệnh nhân.",
      "Bản đồ ống nghiệm trực quan & Trợ lý thực hành tốt: Trực quan hóa chuẩn màu nắp ống, thể tích, loại chất chống đông, thứ tự rút máu chuẩn CLSI và quy cách lắc trộn, giúp nhân viên mới thao tác chuẩn xác, không nhầm lẫn.",
      "Cảnh báo dán nhãn phụ tự động: Với các chỉ định xét nghiệm đặc thù (sốt xuất huyết Dengue, ký sinh trùng sốt rét, HIV khẳng định), hệ thống tự động nhắc nhở dán tem phụ và bắt buộc xác nhận đối chiếu kép trước khi chuyển mẫu.",
      "Trợ lý kiểm tra y lệnh thông minh: Tự động đối chiếu y lệnh bác sĩ với lịch sử khám, tiền sử bệnh và mã chẩn đoán ICD-10; cảnh báo sớm các xét nghiệm trùng lặp không cần thiết hoặc sai sót mã chỉ định trước khi phân tích.",
      "Tự động hóa hồ sơ ISO & CAPA: Tổng hợp dữ liệu sự cố và giám sát tự động để kết xuất Phiếu nhận diện nguy cơ, Kế hoạch hành động khắc phục và phòng ngừa CAPA chuẩn ISO 22367 & ISO 15189, hỗ trợ ký số điện tử.",
      "Giám sát môi trường & Tủ lạnh 24/7 bằng IoT: Kết nối cảm biến thông minh liên tục đo nhiệt độ, độ ẩm phòng máy và tủ lạnh bảo quản sinh phẩm; phát còi và gửi cảnh báo khẩn cấp ngay khi nhiệt độ vượt ngưỡng cho phép.",
      "Màn hình điều hành & Ma trận rủi ro thời gian thực: Bảng điều khiển trung tâm hiển thị trực quan các chỉ số chất lượng, mức độ rủi ro heat-map, tỷ lệ ngoại nhiễm, thời gian quay vòng TAT và tiến độ xử lý sự cố của từng ca trực.",
      "Dự báo vật tư tiêu hao & Quản lý bảo trì máy: Phân tích tốc độ tiêu thụ hóa chất, sinh phẩm, kiểm chuẩn QC để dự báo nhu cầu đặt hàng từ sớm; quản lý lịch hiệu chuẩn, bảo dưỡng định kỳ thiết bị ngăn ngừa hỏng hóc đột xuất.",
      "Theo dõi tiến trình & Thông báo Zalo cho người bệnh: Người bệnh quét mã QR trên phiếu hẹn để biết mẫu đã nhận, đang chạy hay có kết quả; trong tình huống cần lấy lại mẫu, hệ thống gửi tin nhắn cảm thông kèm hướng dẫn ưu tiên."
    ],
    videoDuration: "3:10",
    videoTagline: "Trung tâm điều hành số về rủi ro, chất lượng và an toàn phòng xét nghiệm bệnh viện chuẩn ISO 22367 / ISO 15189",
    videoScenes: [
      {
        time: "0:00",
        title: "TROPILAB RISKOS: Trung Tâm Điều Hành Số Quản Lý Rủi Ro Xét Nghiệm",
        description: "Trong bệnh viện, quản lý rủi ro không chỉ là xử lý sự cố — mà là phát hiện sớm, hành động đúng và tuân thủ các yêu cầu của tiêu chuẩn ISO cùng quy định chuyên môn của Bộ Y tế. TROPILAB RISKOS là nền tảng số hóa quản lý Rủi ro – Chất lượng – ISO – An toàn phòng xét nghiệm, giúp kết nối dữ liệu, con người và quy trình trên một hệ thống. Từ phát hiện sự cố, cảnh báo, xử lý, khắc phục đến truy xuất hồ sơ, mọi bước đều được ghi nhận và kiểm soát."
      },
      {
        time: "0:15",
        title: "01 | Báo Lỗi Một Chạm Và Khóa Mẫu Khẩn Cấp",
        description: "Kỹ thuật viên chỉ cần chọn mã lỗi, chụp ảnh chứng cứ và gửi ngay trên điện thoại. Hệ thống tự động cảnh báo người liên quan, khóa trạng thái mẫu trên hệ thống quản lý xét nghiệm và bắt đầu tính thời gian xử lý. Phát hiện nhanh – xử lý ngay – không bỏ sót sự cố."
      },
      {
        time: "0:30",
        title: "02 | Xác Nhận Người Bệnh Và Kiểm Tra Chống Sai Sót",
        description: "Điều dưỡng quét mã QR trên vòng tay người bệnh hoặc phiếu chỉ định. Hệ thống tự động đối chiếu với y lệnh trước khi lấy mẫu. Thêm một bước kiểm tra – thêm một lớp an toàn cho người bệnh."
      },
      {
        time: "0:45",
        title: "03 | Bản Đồ Ống Nghiệm Trực Quan Và Trợ Lý Thực Hành Tốt",
        description: "Không cần ghi nhớ tất cả các loại ống. Hệ thống trực quan hóa màu nắp, loại bệnh phẩm, thứ tự lấy máu và cách xử lý từng loại ống. Giúp nhân viên thao tác thống nhất và giảm sai sót ngay từ khâu lấy mẫu."
      },
      {
        time: "1:00",
        title: "04 | Cảnh Báo Dán Nhãn Tự Động",
        description: "Với những chỉ định đặc biệt như sốt xuất huyết hoặc sốt rét, hệ thống tự động nhắc nhân viên dán nhãn phụ. Nhân viên phải xác nhận trước khi hoàn tất. Đúng nhận diện – đúng mẫu – đúng quy trình."
      },
      {
        time: "1:15",
        title: "05 | Trợ Lý Kiểm Tra Y Lệnh Thông Minh",
        description: "Hệ thống tự động đối chiếu y lệnh với thông tin người bệnh, lịch sử khám và mã chẩn đoán. Các chỉ định trùng lặp, bất thường hoặc sai mã được cảnh báo sớm. Phát hiện vấn đề trước khi trở thành sự cố."
      },
      {
        time: "1:30",
        title: "06 | Tự Động Hóa Hồ Sơ ISO",
        description: "Dữ liệu sự cố và dữ liệu giám sát được tự động tổng hợp để hỗ trợ lập: Phiếu nhận diện nguy cơ – Kế hoạch khắc phục và phòng ngừa – Hồ sơ quản lý chất lượng. Hỗ trợ phê duyệt và ký số ngay trên hệ thống. Giảm giấy tờ – giảm nhập liệu – dễ dàng truy xuất."
      },
      {
        time: "1:45",
        title: "07 | Giám Sát Môi Trường 24/7",
        description: "Cảm biến tự động theo dõi nhiệt độ và độ ẩm tại phòng xét nghiệm và tủ lạnh bảo quản. Khi vượt ngưỡng cho phép, hệ thống lập tức phát cảnh báo. Quản lý không cần chờ đến lúc kiểm tra mới phát hiện vấn đề."
      },
      {
        time: "2:00",
        title: "08 | Màn Hình Điều Hành Và Ma Trận Rủi Ro Thời Gian Thực",
        description: "Toàn bộ thông tin được tập trung trên một màn hình. Người quản lý có thể theo dõi chỉ số chất lượng, mức độ rủi ro, tỷ lệ ngoại nhiễm và lịch sử xử lý sự cố. Biết rủi ro ở đâu – mức độ nào – ai đang xử lý."
      },
      {
        time: "2:15",
        title: "09 | Dự Báo Vật Tư Và Quản Lý Bảo Trì",
        description: "Hệ thống phân tích mức tiêu hao hóa chất và sinh phẩm để cảnh báo nhu cầu từ sớm, hạn chế nguy cơ thiếu vật tư. Đồng thời tạo yêu cầu bảo trì và theo dõi thời gian xử lý thiết bị. Chủ động trước khi thiếu vật tư hoặc máy ngừng hoạt động."
      },
      {
        time: "2:30",
        title: "10 | Theo Dõi Người Bệnh Và Thông Báo Zalo",
        description: "Người bệnh quét mã QR trên phiếu hẹn để theo dõi tiến trình xét nghiệm. Khi xảy ra sự cố, hệ thống hỗ trợ gửi thông báo phù hợp và hướng dẫn người bệnh quay lại lấy mẫu ưu tiên khi cần. Minh bạch hơn – giảm chờ đợi – nâng cao trải nghiệm người bệnh."
      },
      {
        time: "2:45",
        title: "Lời Kết: Nhìn Thấy Rủi Ro – Hành Động Kịp Thời",
        description: "TROPILAB RISKOS không chỉ là phần mềm ghi nhận sự cố. Đây là trung tâm điều hành số, kết nối Rủi ro – Chất lượng – ISO – Xét nghiệm – Thiết bị – Dữ liệu và Người bệnh trên một nền tảng. Từ phát hiện rủi ro, cảnh báo, hành động, khắc phục đến truy xuất. Quản lý rủi ro bằng dữ liệu. Chuẩn hóa bằng quy trình. Hành động đúng lúc. TROPILAB RISKOS: Nhìn thấy rủi ro – Hành động kịp thời."
      }
    ],
    theme: {
      from: "from-teal-500",
      to: "to-cyan-600",
      accent: "text-teal-400",
      badgeBg: "bg-teal-500/10",
      badgeText: "text-teal-300",
      badgeBorder: "border-teal-500/30"
    }
  },
  {
    id: "nuoi-duong-be-0-60",
    logoUrl: '/apps/nuoi-duong-be-0-60/app-logo.png',
    name: "Nuôi dưỡng bé 0 - 60 tháng",
    url: "https://lamchame1.vercel.app",
    category: "Đời sống",
    categoryId: "lifestyle",
    description: "Ứng dụng Cha Mẹ 0–60 đồng hành cùng gia đình Việt Nam trong việc chăm sóc và theo dõi sự phát triển toàn diện của trẻ từ 0 đến 60 tháng tuổi với 10 tính năng cốt lõi: Màn hình trung tâm Hôm nay & ghi chép nhanh 1 chạm/giọng nói, theo dõi tăng trưởng thể chất chuẩn khoa học, trung tâm 5 mốc phát triển, gợi ý dinh dưỡng tủ lạnh nhà mình có gì, nút khẩn cấp SOS ngoại tuyến, lịch tiêm chủng thông minh, ví hồ sơ gia đình số xuất PDF 1 chạm, trợ lý AI đồng hành, bộ tạo hoạt động Chơi cùng con 10 phút và dòng thời gian nhật ký gia đình.",
    tags: ["Nuôi Dưỡng Bé 0-60 Tháng", "Làm Cha Mẹ", "Chuẩn Tăng Trưởng", "Ăn Dặm Tủ Lạnh", "Cấp Cứu SOS Ngoại Tuyến", "Lịch Tiêm Chủng", "Ví Hồ Sơ PDF", "Trợ Lý AI", "Chơi Cùng Con 10 Phút", "Timeline Gia Đình", "Đời Sống"],
    coverImage: '/apps/nuoi-duong-be-0-60/feature_01_home_dashboard_smart_logging.jpg',
    placeholderImage: '/apps/nuoi-duong-be-0-60/feature_01_home_dashboard_smart_logging.jpg',
    detailImages: [
      '/apps/nuoi-duong-be-0-60/feature_01_home_dashboard_smart_logging.jpg',
      '/apps/nuoi-duong-be-0-60/feature_02_growth_engine.jpg',
      '/apps/nuoi-duong-be-0-60/feature_03_development_center.jpg',
      '/apps/nuoi-duong-be-0-60/feature_04_nutrition_meal_planner.jpg',
      '/apps/nuoi-duong-be-0-60/feature_05_offline_emergency_sos.jpg',
      '/apps/nuoi-duong-be-0-60/feature_06_vaccination_smart_reminders.jpg',
      '/apps/nuoi-duong-be-0-60/feature_07_digital_family_vault.jpg',
      '/apps/nuoi-duong-be-0-60/feature_08_ai_parenting_companion.jpg',
      '/apps/nuoi-duong-be-0-60/feature_09_activity_generator.jpg',
      '/apps/nuoi-duong-be-0-60/feature_10_smart_family_timeline_journal.jpg'
    ],
    imageAlt: "Giao diện ứng dụng Nuôi dưỡng bé 0 - 60 tháng - Đồng hành cùng gia đình Việt Nam chăm sóc bé toàn diện",
    featured: false,
    illustrationImage: '/apps/nuoi-duong-be-0-60/feature_01_home_dashboard_smart_logging.jpg',
    demoCredential: {
      account: "Trải nghiệm ngay",
      note: "Ứng dụng PWA hoạt động ngay không cần đăng ký, toàn bộ dữ liệu được bảo mật trực tiếp trên thiết bị của bạn."
    },
    audience: "Cha mẹ trẻ, gia đình có con từ 0 đến 60 tháng tuổi và người nuôi dưỡng cần công cụ khoa học, tiện lợi và an toàn.",
    problem: "Cha mẹ trẻ thường bối rối giữa ma trận kiến thức nuôi con, khó theo dõi sát sao biểu đồ tăng trưởng, lúng túng khi lên thực đơn ăn dặm hàng ngày từ nguyên liệu sẵn có, và đặc biệt thiếu cẩm nang sơ cứu cấp bách có thể mở tức thì khi mất mạng Internet.",
    solution: "Ứng dụng Cha Mẹ 0–60 cung cấp 10 tính năng cốt lõi công nghệ PWA ngoại tuyến toàn diện, tích hợp nhật ký 1 chạm giọng nói, quản lý chỉ số tăng trưởng, gợi ý thực đơn từ tủ lạnh, hướng dẫn sơ cứu SOS tức thì và ví số hóa lưu trữ giấy tờ của bé.",
    keyFeatures: [
      "Màn hình trung tâm 'Hôm nay' & Ghi chép nhanh: Giải đáp câu hỏi 'Hôm nay con cần gì' bằng cách hiển thị 3 việc quan trọng trong ngày, trạng thái sinh hoạt (ăn, ngủ, vệ sinh) và công cụ ghi nhận nhanh 1 chạm hoặc nhập bằng giọng nói.",
      "Theo dõi tăng trưởng thể chất (Growth Engine): Quản lý các chỉ số cân nặng, chiều cao, vòng đầu theo chuẩn tăng trưởng, minh họa xu hướng phát triển trực quan và đưa ra lời khuyên trung lập mà không tự ý chẩn đoán.",
      "Trung tâm mốc phát triển (Development Center): Theo dõi sự tiến bộ của bé qua 5 lĩnh vực (Giao tiếp, Vận động thô, Vận động tinh, Nhận thức, Cá nhân – Xã hội) kèm các lưu ý quan sát nhẹ nhàng, giúp cha mẹ bớt lo âu.",
      "Gợi ý dinh dưỡng & Quản lý thực đơn (Nutrition & Meal Planner): Hỗ trợ nhiều phương pháp ăn dặm (Truyền thống, BLW, Kiểu Nhật), cá nhân hóa theo độ tuổi/dị ứng, kết hợp tính năng 'Tủ lạnh nhà mình có gì' để tự động gợi ý món ăn phù hợp với nguyên liệu sẵn có.",
      "Nút khẩn cấp SOS ngoại tuyến (Offline Emergency SOS): Nút floating SOS luôn hiển thị để truy cập tức thì các hướng dẫn xử lý sơ cứu khẩn cấp (hóc dị vật, sốt/co giật, bỏng, chấn thương...), đảm bảo hoạt động bình thường ngay cả khi không có kết nối internet.",
      "Lịch tiêm chủng & Nhắc lịch thông minh (Vaccination & Smart Reminders): Quản lý lịch tiêm (Chương trình Mở rộng & Tiêm dịch vụ), đồng thời cài đặt nhắc lịch uống thuốc, khám bệnh, đánh răng và các sinh hoạt hằng ngày.",
      "Ví hồ sơ gia đình kỹ thuật số (Digital Family Vault & Document Scanner): Quét, lưu trữ và bảo mật các giấy tờ quan trọng của bé (BHYT, phiếu tiêm, đơn thuốc), hỗ trợ xuất file PDF 1 chạm để mang đi khám bệnh hoặc nhập học.",
      "Trợ lý AI đồng hành cùng cha mẹ (AI Parenting Companion): Trả lời các thắc mắc chăm sóc con, hỗ trợ chuẩn bị câu hỏi cho bác sĩ, giải thích thông tin y tế dễ hiểu và luôn dẫn nguồn minh bạch.",
      "Bộ tạo hoạt động 'Chơi cùng con 10 phút' (Activity Generator): Gợi ý các trò chơi tương tác phát triển theo độ tuổi (0–60 tháng) dựa trên quỹ thời gian rảnh và vật dụng đơn giản có sẵn trong nhà.",
      "Dòng thời gian & Nhật ký gia đình (Smart Family Timeline & Journal): Tổng hợp dữ liệu sức khỏe, mốc phát triển, tiêm chủng cùng hình ảnh và khoảnh khắc đáng nhớ thành một dòng thời gian dài hạn xuyên suốt quá trình khôn lớn của trẻ."
    ],
    videoDuration: "2:45",
    videoTagline: "10 tính năng cốt lõi của ứng dụng Nuôi dưỡng bé 0–60 tháng đồng hành cùng gia đình Việt Nam chăm sóc và lưu giữ hành trình khôn lớn của con",
    videoScenes: [
      {
        time: "0:00",
        title: 'Màn hình trung tâm "Hôm nay" & Ghi chép nhanh (Home Dashboard & Smart Logging)',
        description: 'Ứng dụng "Cha Mẹ 0–60" được thiết kế với 10 tính năng cốt lõi nhằm đồng hành cùng gia đình Việt Nam trong việc chăm sóc và theo dõi sự phát triển của trẻ từ 0 đến 60 tháng tuổi: Giải đáp câu hỏi "Hôm nay con cần gì" bằng cách hiển thị 3 việc quan trọng trong ngày, trạng thái sinh hoạt (ăn, ngủ, vệ sinh) và công cụ ghi nhận nhanh 1 chạm hoặc nhập bằng giọng nói.'
      },
      {
        time: "0:15",
        title: "Theo dõi tăng trưởng thể chất (Growth Engine)",
        description: "Quản lý các chỉ số cân nặng, chiều cao, vòng đầu theo chuẩn tăng trưởng, minh họa xu hướng phát triển trực quan và đưa ra lời khuyên trung lập mà không tự ý chẩn đoán."
      },
      {
        time: "0:30",
        title: "Trung tâm mốc phát triển (Development Center)",
        description: "Theo dõi sự tiến bộ của bé qua 5 lĩnh vực (Giao tiếp, Vận động thô, Vận động tinh, Nhận thức, Cá nhân – Xã hội) kèm các lưu ý quan sát nhẹ nhàng, giúp cha mẹ bớt lo âu."
      },
      {
        time: "0:45",
        title: "Gợi ý dinh dưỡng & Quản lý thực đơn (Nutrition & Meal Planner)",
        description: 'Hỗ trợ nhiều phương pháp ăn dặm (Truyền thống, BLW, Kiểu Nhật), cá nhân hóa theo độ tuổi/dị ứng, kết hợp tính năng "Tủ lạnh nhà mình có gì" để tự động gợi ý món ăn phù hợp với nguyên liệu sẵn có.'
      },
      {
        time: "1:00",
        title: "Nút khẩn cấp SOS ngoại tuyến (Offline Emergency SOS)",
        description: "Nút floating SOS luôn hiển thị để truy cập tức thì các hướng dẫn xử lý sơ cứu khẩn cấp (hóc dị vật, sốt/co giật, bỏng, chấn thương...), đảm bảo hoạt động bình thường ngay cả khi không có kết nối internet."
      },
      {
        time: "1:15",
        title: "Lịch tiêm chủng & Nhắc lịch thông minh (Vaccination & Smart Reminders)",
        description: "Quản lý lịch tiêm (Chương trình Mở rộng & Tiêm dịch vụ), đồng thời cài đặt nhắc lịch uống thuốc, khám bệnh, đánh răng và các sinh hoạt hằng ngày."
      },
      {
        time: "1:30",
        title: "Ví hồ sơ gia đình kỹ thuật số (Digital Family Vault & Document Scanner)",
        description: "Quét, lưu trữ và bảo mật các giấy tờ quan trọng của bé (BHYT, phiếu tiêm, đơn thuốc), hỗ trợ xuất file PDF 1 chạm để mang đi khám bệnh hoặc nhập học."
      },
      {
        time: "1:45",
        title: "Trợ lý AI đồng hành cùng cha mẹ (AI Parenting Companion)",
        description: "Trả lời các thắc mắc chăm sóc con, hỗ trợ chuẩn bị câu hỏi cho bác sĩ, giải thích thông tin y tế dễ hiểu và luôn dẫn nguồn minh bạch."
      },
      {
        time: "2:00",
        title: 'Bộ tạo hoạt động "Chơi cùng con 10 phút" (Activity Generator)',
        description: "Gợi ý các trò chơi tương tác phát triển theo độ tuổi (0–60 tháng) dựa trên quỹ thời gian rảnh và vật dụng đơn giản có sẵn trong nhà."
      },
      {
        time: "2:15",
        title: "Dòng thời gian & Nhật ký gia đình (Smart Family Timeline & Journal)",
        description: "Tổng hợp dữ liệu sức khỏe, mốc phát triển, tiêm chủng cùng hình ảnh và khoảnh khắc đáng nhớ thành một dòng thời gian dài hạn xuyên suốt quá trình khôn lớn của trẻ."
      },
      {
        time: "2:30",
        title: "Lời bình & Đồng hành trọn vẹn hành trình 0–60 tháng",
        description: "Từ một giấc ngủ, một bữa ăn, một bước chân đầu tiên… đến những khoảnh khắc rất nhỏ mà sau này nhìn lại, cha mẹ sẽ thấy vô cùng đáng nhớ. Cùng con lớn lên từng ngày – và cùng nhau lưu giữ hành trình 0–60 tháng thật trọn vẹn."
      }
    ],
    theme: {
      from: "from-rose-500",
      to: "to-amber-500",
      accent: "text-rose-400",
      badgeBg: "bg-rose-500/10",
      badgeText: "text-rose-400",
      badgeBorder: "border-rose-500/30"
    }
  },
  {
    id: "nuoi-day-tre-6-11",
    logoUrl: '/apps/nuoi-day-tre-6-11/app-logo.png',
    name: "Nuôi dạy trẻ từ 6 đến 11 tuổi",
    url: "https://lamchame2.vercel.app",
    category: "Đời sống",
    categoryId: "lifestyle",
    description: "Mảnh ghép thứ 2 trong Trọn Bộ 4 Ứng Dụng Đồng Hành Làm Cha Mẹ & Trẻ Em (0–18 Tuổi), giúp cha mẹ tự tin cùng con từ lớp 1 đến hết Tiểu học với 10 tính năng cốt lõi: Trợ lý AI 24/7 đồng hành, Thư viện kịch bản giao tiếp Parenting Scripts, Home Dashboard & AI Daily Briefing, Hồ sơ phác họa bức tranh phát triển Child Profile không KPI điểm số, Hỗ trợ học tập & Đồ thị kiến thức lớp 1-5, Nhật ký cảm xúc & hành vi, Quản lý Thói quen số & Thiết bị, Theo dõi Sức khỏe & Dinh dưỡng ăn gì cho con, Nhịp sống & Hoạt động kết nối gia đình, Báo cáo hàng tuần & Nút hạ nhiệt SOS 60 giây.",
    tags: ["Nuôi Dạy Con 6-11 Tuổi", "Làm Cha Mẹ", "Tiểu Học Lớp 1-5", "Trợ Lý AI 24/7", "Parenting Scripts", "Child Profile Không KPI", "Đồ Thị Kiến Thức", "Hạ Nhiệt SOS 60s", "Đời Sống"],
    coverImage: '/apps/nuoi-day-tre-6-11/feature_01_ai_companion_247.jpg',
    placeholderImage: '/apps/nuoi-day-tre-6-11/feature_01_ai_companion_247.jpg',
    detailImages: [
      '/apps/nuoi-day-tre-6-11/feature_01_ai_companion_247.jpg',
      '/apps/nuoi-day-tre-6-11/feature_02_parenting_scripts.jpg',
      '/apps/nuoi-day-tre-6-11/feature_03_home_dashboard.jpg',
      '/apps/nuoi-day-tre-6-11/feature_04_child_profile.jpg',
      '/apps/nuoi-day-tre-6-11/feature_05_academic_knowledge_graph.jpg',
      '/apps/nuoi-day-tre-6-11/feature_06_emotional_observation.jpg',
      '/apps/nuoi-day-tre-6-11/feature_07_digital_family_manager.jpg',
      '/apps/nuoi-day-tre-6-11/feature_08_health_nutrition.jpg',
      '/apps/nuoi-day-tre-6-11/feature_09_family_routine_quality_time.jpg',
      '/apps/nuoi-day-tre-6-11/feature_10_weekly_review_sos_zone.jpg'
    ],
    imageAlt: "Giao diện ứng dụng Nuôi dạy trẻ từ 6 đến 11 tuổi - Người bạn đồng hành tự tin cùng con từ lớp 1 đến hết Tiểu học",
    featured: false,
    illustrationImage: '/apps/nuoi-day-tre-6-11/feature_01_ai_companion_247.jpg',
    demoCredential: {
      account: "Trải nghiệm ngay",
      note: "Nền tảng PWA dành riêng cho phụ huynh, bảo mật dữ liệu gia đình trực tiếp trên thiết bị và không tạo áp lực điểm số."
    },
    audience: "Cha mẹ có con trong độ tuổi Tiểu học (Lớp 1 đến Lớp 5, từ 6–11 tuổi) cần công cụ thấu hiểu tâm lý, gỡ rối học tập và đồng hành bình tĩnh cùng con mỗi ngày.",
    problem: "Khi con bước vào Tiểu học, cha mẹ cũng bước sang hành trình mới với nhiều thách thức: đồng hành cùng con học tập, quản lý thời gian, thiết bị công nghệ, xử lý bùng nổ cảm xúc và dễ áp đặt điểm số gây rạn nứt kết nối gia đình.",
    solution: "Ứng dụng Nuôi Dạy Con 6–11 Tuổi cung cấp 10 tính năng cốt lõi chuyên biệt: Trợ lý AI giải đáp tình huống theo khung cấu trúc chuẩn, thư viện kịch bản đối lập chuyển đổi ngôn từ, đồ thị kiến thức lớp 1-5 truy vết lỗ hổng nền tảng, hồ sơ không KPI so sánh, thỏa thuận công nghệ gia đình và nút hạ nhiệt SOS 60 giây.",
    keyFeatures: [
      "Trợ lý AI 24/7 đồng hành cùng cha mẹ: Trợ lý hội thoại AI chuyên biệt giải đáp các tình huống nuôi dạy con thực tế theo khung: phân tích nguyên nhân, điều cần quan sát, gợi ý câu nói, việc nên làm/tránh và gợi ý hoạt động 5–10 phút mà không đưa ra chẩn đoán y khoa hay tâm lý.",
      "Thư viện kịch bản giao tiếp (Parenting Scripts): Cung cấp danh mục câu nói tình huống (khi con không chịu học, nổi nóng, dùng điện thoại nhiều, trì hoãn...) với sự so sánh trực quan giữa câu nói dễ gây căng thẳng (❌) và cách nói thay thế tích cực (✅).",
      "Trang tổng quan & Điểm tin hàng ngày (Home Dashboard & AI Daily Briefing): Trả lời câu hỏi 'Hôm nay cha mẹ nên biết gì về con?', hiển thị 3 trọng tâm đồng hành trong tuần, gợi ý hành động thực tế từ AI và khung kết nối '2 phút cùng con' vào buổi sáng/tối.",
      "Hồ sơ phác họa bức tranh phát triển của con (Child Profile): Phản ánh toàn diện sự phát triển của con qua các chỉ số mô tả (độ tự tin học tập, mức độ tập trung, thói quen đọc sách, giấc ngủ, cảm xúc...) thay vì chấm điểm hay so sánh, xếp hạng giữa các trẻ.",
      "Hỗ trợ học tập & Đồ thị kiến thức (Academic Support Engine & Knowledge Graph): Bám sát chương trình từ Lớp 1 đến Lớp 5 cho các môn Toán, Tiếng Việt, Tiếng Anh; tự động truy vết các lỗ hổng kiến thức nền tảng (prerequisites) để gợi ý hoạt động ngắn giúp cha mẹ đồng hành cùng con.",
      "Nhật ký quan sát Cảm xúc & Hành vi (Emotional & Behavior Observation): Cho phép cha mẹ ghi nhận trạng thái cảm xúc hàng ngày của con (vui, lo lắng, bực bội...) và hệ thống tự động nhận diện mẫu hình quy luật theo thời gian (ví dụ: khung giờ con thường dễ căng thẳng).",
      "Quản lý Thói quen Số & Thiết bị (Digital Family Manager): Giúp thiết lập 'Thỏa thuận công nghệ gia đình' (Family Digital Agreement), theo dõi thời gian sử dụng màn hình/chơi game và cung cấp kịch bản trò chuyện thay vì cấm đoán cứng nhắc.",
      "Theo dõi Sức khỏe, Thể chất & Dinh dưỡng (Health & Nutrition): Biểu đồ theo dõi chiều cao, cân nặng, giấc ngủ, vận động cùng tính năng 'Ăn gì cho con?' gợi ý thực đơn tuần và bữa sáng nhanh 15 phút phù hợp với gia đình Việt.",
      "Thiết lập Nhịp sống & Hoạt động kết nối gia đình (Family Routine & Quality Time): Xây dựng thói quen sinh hoạt cân bằng và cung cấp thư viện gợi ý các hoạt động kết nối 5–15 phút (đọc sách, nấu ăn, đi dạo, trò chuyện) cá nhân hóa theo độ tuổi và năng lượng của gia đình.",
      "Báo cáo nhìn lại hàng tuần & Zone hạ nhiệt SOS (Weekly Family Review & SOS Cool-down Zone): Tổng kết 5–7 điểm sáng tiến bộ và xu hướng phát triển hàng tuần qua góc nhìn 'Ngọn Hải Đăng', kết hợp nút hạ nhiệt SOS 60 giây (nhạc Alpha + bài tập thở) giúp cha mẹ giải tỏa căng thẳng khi dạy con học."
    ],
    videoDuration: "2:50",
    videoTagline: "10 tính năng cốt lõi của ứng dụng Nuôi dạy con 6–11 tuổi giúp cha mẹ tự tin đồng hành cùng con từ lớp 1 đến hết Tiểu học",
    videoScenes: [
      {
        time: "0:00",
        title: "Trợ lý AI 24/7 đồng hành cùng cha mẹ (AI Parenting Companion)",
        description: "5 năm đầu đời trôi qua thật nhanh. Khi con bước vào Tiểu học, cha mẹ cũng bước sang một hành trình mới: đồng hành cùng con học tập, quản lý thời gian, công nghệ và cảm xúc. Nuôi Dạy Con 6–11 Tuổi với 10 tính năng cốt lõi được thiết kế chuyên biệt: Trợ lý AI chuyên biệt giải đáp các tình huống thực tế theo khung phân tích nguyên nhân, điều cần quan sát, gợi ý câu nói và hoạt động 5–10 phút."
      },
      {
        time: "0:15",
        title: "Thư viện kịch bản giao tiếp (Parenting Scripts)",
        description: "Cung cấp danh mục câu nói tình huống (khi con không chịu học, nổi nóng, dùng điện thoại nhiều, trì hoãn...) với sự so sánh trực quan giữa câu nói dễ gây căng thẳng (❌) và cách nói thay thế tích cực (✅)."
      },
      {
        time: "0:30",
        title: "Trang tổng quan & Điểm tin hàng ngày (Home Dashboard & AI Daily Briefing)",
        description: "Trả lời câu hỏi 'Hôm nay cha mẹ nên biết gì về con?', hiển thị 3 trọng tâm đồng hành trong tuần, gợi ý hành động thực tế từ AI và khung kết nối '2 phút cùng con' vào buổi sáng hoặc tối."
      },
      {
        time: "0:45",
        title: "Hồ sơ phác họa bức tranh phát triển của con (Child Profile)",
        description: "Phản ánh toàn diện sự phát triển của con qua các chỉ số mô tả (độ tự tin học tập, mức độ tập trung, thói quen đọc sách, giấc ngủ, cảm xúc...) thay vì chấm điểm hay so sánh, xếp hạng giữa các trẻ."
      },
      {
        time: "1:00",
        title: "Hỗ trợ học tập & Đồ thị kiến thức (Academic Support Engine & Knowledge Graph)",
        description: "Bám sát chương trình từ Lớp 1 đến Lớp 5 cho các môn Toán, Tiếng Việt, Tiếng Anh; tự động truy vết các lỗ hổng kiến thức nền tảng (prerequisites) để gợi ý hoạt động ngắn giúp cha mẹ đồng hành cùng con."
      },
      {
        time: "1:15",
        title: "Nhật ký quan sát Cảm xúc & Hành vi (Emotional & Behavior Observation)",
        description: "Cho phép cha mẹ ghi nhận trạng thái cảm xúc hàng ngày của con (vui, lo lắng, bực bội...) và hệ thống tự động nhận diện mẫu hình quy luật theo thời gian, phát hiện khung giờ con thường dễ căng thẳng."
      },
      {
        time: "1:30",
        title: "Quản lý Thói quen Số & Thiết bị (Digital Family Manager)",
        description: "Giúp thiết lập 'Thỏa thuận công nghệ gia đình' (Family Digital Agreement), theo dõi thời gian sử dụng màn hình/chơi game và cung cấp kịch bản trò chuyện thay vì cấm đoán cứng nhắc."
      },
      {
        time: "1:45",
        title: "Theo dõi Sức khỏe, Thể chất & Dinh dưỡng (Health & Nutrition)",
        description: "Biểu đồ theo dõi chiều cao, cân nặng, giấc ngủ, vận động cùng tính năng 'Ăn gì cho con?' gợi ý thực đơn tuần và bữa sáng nhanh 15 phút phù hợp với gia đình Việt."
      },
      {
        time: "2:00",
        title: "Thiết lập Nhịp sống & Hoạt động kết nối gia đình (Family Routine & Quality Time)",
        description: "Xây dựng thói quen sinh hoạt cân bằng và cung cấp thư viện gợi ý các hoạt động kết nối 5–15 phút (đọc sách, nấu ăn, đi dạo, trò chuyện) cá nhân hóa theo độ tuổi và năng lượng của gia đình."
      },
      {
        time: "2:15",
        title: "Báo cáo nhìn lại hàng tuần & Zone hạ nhiệt SOS (Weekly Family Review & SOS Cool-down Zone)",
        description: "Tổng kết 5–7 điểm sáng tiến bộ và xu hướng phát triển hàng tuần qua góc nhìn 'Ngọn Hải Đăng', kết hợp nút hạ nhiệt SOS 60 giây (nhạc Alpha + bài tập thở) giúp cha mẹ giải tỏa căng thẳng khi dạy con học."
      },
      {
        time: "2:30",
        title: "Lời bình & Đồng hành ý nghĩa bên con",
        description: "Hy vọng ứng dụng sẽ trở thành một người bạn đồng hành nhỏ, giúp cha mẹ có thêm góc nhìn, thêm công cụ và thêm những phút kết nối ý nghĩa bên con."
      }
    ],
    theme: {
      from: "from-emerald-500",
      to: "to-teal-500",
      accent: "text-emerald-400",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-400",
      badgeBorder: "border-emerald-500/30"
    }
  },
  {
    id: "thau-hieu-thieu-nien-12-15",
    logoUrl: '/apps/thau-hieu-thieu-nien-12-15/app-logo.png',
    name: "Thấu hiểu thiếu niên 12 đến 15 tuổi",
    url: "https://lamchame3.vercel.app",
    category: "Đời sống",
    categoryId: "lifestyle",
    description: "Trợ lý số hóa toàn diện đồng hành cùng cha mẹ và con trong giai đoạn dậy thì (12–15 tuổi / THCS): theo dõi tăng trưởng Tanner & dinh dưỡng dậy thì, bộ sơ cứu cảm xúc & kịch bản giao tiếp phi bạo lực NVC, tấm khiên an toàn số chống bẫy Grooming/Sextortion, mốc pháp lý tuổi 14 và bài test hướng nghiệp Holland RIASEC phân luồng 9+.",
    tags: ["Thiếu Niên 12-15 Tuổi", "Làm Cha Mẹ", "Tuổi Dậy Thì", "Giao Tiếp NVC", "An Toàn Số & Grooming", "Mốc Pháp Lý 14", "Holland RIASEC", "Đời Sống"],
    coverImage: '/apps/thau-hieu-thieu-nien-12-15/feature_01_onboarding_projector.jpg',
    placeholderImage: '/apps/thau-hieu-thieu-nien-12-15/feature_01_onboarding_projector.jpg',
    detailImages: [
      '/apps/thau-hieu-thieu-nien-12-15/feature_01_onboarding_projector.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_02_tanner_nutrition.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_03_emotional_first_aid_nvc.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_04_cyber_safety_grooming.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_05_legal_framework_age_14.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_06_holland_career_9plus.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_07_family_agreement_matrix.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_08_ai_dialogue_simulator.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_09_thcs_curriculum_6to9.jpg',
      '/apps/thau-hieu-thieu-nien-12-15/feature_10_family_connection.jpg'
    ],
    imageAlt: "Giao diện ứng dụng Thấu hiểu thiếu niên 12 đến 15 tuổi - Cầu nối yêu thương đồng hành cùng con tuổi dậy thì",
    featured: false,
    illustrationImage: '/apps/thau-hieu-thieu-nien-12-15/feature_01_onboarding_projector.jpg',
    demoCredential: {
      account: "Trải nghiệm ngay",
      note: "Ứng dụng PWA bảo mật dữ liệu gia đình, hỗ trợ đồng bộ đa nền tảng và chế độ trình chiếu phòng khách."
    },
    audience: "Cha mẹ có con trong độ tuổi dậy thì và cấp THCS (12 đến 15 tuổi, Lớp 6–9), thầy cô giáo và người giám hộ cần phương pháp giao tiếp thấu hiểu và bảo vệ con toàn diện.",
    problem: "Giai đoạn 12–15 tuổi là 'tâm bão dậy thì' với vô vàn biến đổi thể chất, con khép mình, dễ nổi loạn, đối mặt nguy cơ bẫy mạng xã hội (Grooming, Sextortion), mâu thuẫn gia đình leo thang và áp lực chọn trường sau Lớp 9.",
    solution: "Nền tảng Thấu hiểu thiếu niên cung cấp bộ công cụ khoa học: Khung giao tiếp phi bạo lực NVC 4 bước xoa dịu cảm xúc tức thì, tấm khiên an toàn số & hotline 111, nhận thức pháp lý tuổi 14, trắc nghiệm tính cách Holland RIASEC hướng nghiệp phân luồng 9+, giả lập đối thoại AI giúp cha mẹ luyện tập trước khi trò chuyện cùng con.",
    keyFeatures: [
      "Onboarding Đa Nền Tảng & Máy Chiếu: Dễ dàng truy cập ứng dụng trên mọi thiết bị từ điện thoại, laptop đến máy chiếu gia đình. Trải nghiệm giao diện trực quan, đồng bộ mượt mà, giúp cả nhà cùng theo dõi và đồng hành mọi lúc, mọi nơi.",
      "Bứt Phá Tầm Vóc & Dinh Dưỡng Dậy Thì: Theo dõi sát sao biểu đồ tăng trưởng chiều cao theo thang Tanner. Ứng dụng gợi ý chế độ dinh dưỡng Canxi D3K2, bài tập vận động và giấc ngủ chuẩn khoa học cho tuổi dậy thì.",
      "Bộ Sơ Cứu Cảm Xúc & Tạo Kịch Bản NVC: Xóa tan căng thẳng tức thì với 4 bước giao tiếp phi bạo lực NVC (Quan sát, Cảm nhận, Nhu cầu và Đề xuất). Cầu nối giúp cha mẹ và con lắng nghe, xoa dịu cảm xúc chân thành.",
      "An Toàn Số & Chống Bẫy Grooming / Sextortion: Tấm khiên bảo vệ kỹ thuật số toàn diện cho con trên không gian mạng. Trang bị bộ quy tắc 4 KHÔNG, cảnh báo bẫy Grooming và kết nối nhanh Tổng đài quốc gia 111.",
      "Mốc Pháp Lý Tuổi 14 & Quyền Riêng Tư Số: Tôn trọng ranh giới cá nhân và quyền riêng tư của con. Cung cấp khung nhận thức pháp lý tuổi 14, giúp cha mẹ ứng xử chuẩn mực và xây dựng niềm tin bền chặt.",
      "Hướng Nghiệp Holland RIASEC & Phân Luồng 9+: Khám phá tiềm năng vượt trội của con qua bài test Holland 6 nhóm tính cách. Định hướng rõ ràng hai con đường Cấp 3 hoặc Phân luồng 9+ ngay từ cột mốc 15 tuổi.",
      "Ma Trận Cam Kết & Phần Thưởng 2 Chiều: Thiết lập thỏa thuận gia đình minh bạch và công bằng. Mở khóa các phần thưởng tự chủ như decor phòng, chơi game, sách truyện khi con hoàn thành cam kết.",
      "Giả Lập Đối Thoại AI: Không gian thực hành giao tiếp an toàn cho cha mẹ. Trợ lý AI đóng vai trò cố vấn, đưa ra phản hồi thời gian thực giúp cha mẹ luyện tập trước khi đối thoại cùng con.",
      "Tổng Hợp Chương Trình Giáo Dục THCS (Lớp 6 – Lớp 9): Hệ thống hóa toàn bộ chương trình giáo dục từ lớp 6 đến lớp 9. Cung cấp chi tiết các môn học, quy định chuẩn và mục tiêu kiến thức trọng tâm con cần nắm vững ở từng cấp lớp.",
      "Cầu Nối Thấu Hiểu & Kết Nối Gia Đình: Chuyển hóa xung đột thành sự gắn kết sâu sắc. Cùng con bước qua tuổi dậy thì rực rỡ, đong đầy yêu thương và sự thấu hiểu trọn vẹn giữa cha mẹ và con cái."
    ],
    videoDuration: "2:55",
    videoTagline: "10 tính năng cốt lõi đồng hành bình tĩnh và thấu hiểu thiếu niên 12–15 tuổi – Cầu nối yêu thương tuổi dậy thì",
    videoScenes: [
      {
        time: "0:00",
        title: "Onboarding Đa Nền Tảng & Chế Độ Máy Chiếu",
        description: "12–15 tuổi – con không còn là một đứa trẻ, nhưng cũng chưa thực sự là một người lớn. Sau Nuôi dưỡng bé 0–60 tháng và Nuôi dạy con 6–11 tuổi, đây là giai đoạn con thay đổi rất nhanh: cơ thể, cảm xúc, suy nghĩ, bạn bè, công nghệ và cả cách con nhìn về chính mình. Thấu hiểu thiếu niên 12–15 tuổi với 10 tính năng cốt lõi: Dễ dàng truy cập ứng dụng trên mọi thiết bị từ điện thoại, laptop đến máy chiếu gia đình, giao diện trực quan mượt mà."
      },
      {
        time: "0:15",
        title: "Bứt Phá Tầm Vóc & Dinh Dưỡng Dậy Thì",
        description: "Theo dõi sát sao biểu đồ tăng trưởng chiều cao theo thang Tanner. Ứng dụng gợi ý chế độ dinh dưỡng Canxi D3K2, bài tập vận động và giấc ngủ chuẩn khoa học cho tuổi dậy thì."
      },
      {
        time: "0:30",
        title: "Bộ Sơ Cứu Cảm Xúc & Tạo Kịch Bản NVC",
        description: "Xóa tan căng thẳng tức thì với 4 bước giao tiếp phi bạo lực NVC: Quan sát, Cảm nhận, Nhu cầu và Đề xuất. Cầu nối giúp cha mẹ và con lắng nghe, xoa dịu cảm xúc chân thành."
      },
      {
        time: "0:45",
        title: "An Toàn Số & Chống Bẫy Grooming / Sextortion",
        description: "Tấm khiên bảo vệ kỹ thuật số toàn diện cho con trên không gian mạng. Trang bị bộ quy tắc 4 KHÔNG, cảnh báo bẫy Grooming và kết nối nhanh Tổng đài quốc gia 111."
      },
      {
        time: "1:00",
        title: "Mốc Pháp Lý Tuổi 14 & Quyền Riêng Tư Số",
        description: "Tôn trọng ranh giới cá nhân và quyền riêng tư của con. Cung cấp khung nhận thức pháp lý tuổi 14, giúp cha mẹ ứng xử chuẩn mực và xây dựng niềm tin bền chặt."
      },
      {
        time: "1:15",
        title: "Hướng Nghiệp Holland RIASEC & Phân Luồng 9+",
        description: "Khám phá tiềm năng vượt trội của con qua bài test Holland 6 nhóm tính cách. Định hướng rõ ràng hai con đường Cấp 3 hoặc Phân luồng 9+ ngay từ cột mốc 15 tuổi."
      },
      {
        time: "1:30",
        title: "Ma Trận Cam Kết & Phần Thưởng 2 Chiều",
        description: "Thiết lập thỏa thuận gia đình minh bạch và công bằng. Mở khóa các phần thưởng tự chủ như decor phòng, chơi game, sách truyện khi con hoàn thành cam kết."
      },
      {
        time: "1:45",
        title: "Giả Lập Đối Thoại AI Cố Vấn",
        description: "Không gian thực hành giao tiếp an toàn cho cha mẹ. Trợ lý AI đóng vai trò cố vấn, đưa ra phản hồi thời gian thực giúp cha mẹ luyện tập trước khi đối thoại cùng con."
      },
      {
        time: "2:00",
        title: "Tổng Hợp Chương Trình Giáo Dục THCS (Lớp 6 – Lớp 9)",
        description: "Hệ thống hóa toàn bộ chương trình giáo dục từ lớp 6 đến lớp 9. Cung cấp chi tiết các môn học, quy định chuẩn và mục tiêu kiến thức trọng tâm con cần nắm vững ở từng cấp lớp."
      },
      {
        time: "2:15",
        title: "Cầu Nối Thấu Hiểu & Kết Nối Gia Đình",
        description: "Chuyển hóa xung đột thành sự gắn kết sâu sắc. Cùng con bước qua tuổi dậy thì rực rỡ, đong đầy yêu thương và sự thấu hiểu trọn vẹn giữa cha mẹ và con cái."
      },
      {
        time: "2:30",
        title: "Thấu hiểu để đồng hành – Cùng con tự tin lớn lên",
        description: "Hy vọng Thấu hiểu thiếu niên 12–15 tuổi sẽ trở thành một cây cầu nhỏ, giúp cha mẹ và con gần nhau hơn giữa những thay đổi của tuổi dậy thì. Thấu hiểu để đồng hành – đồng hành để con tự tin lớn lên."
      }
    ],
    theme: {
      from: "from-cyan-500",
      to: "to-blue-600",
      accent: "text-cyan-400",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-400",
      badgeBorder: "border-cyan-500/30"
    }
  },
  {
    id: "dinh-huong-thanh-nien-16-18",
    logoUrl: '/apps/dinh-huong-thanh-nien-16-18/app-logo.png',
    name: "Định hướng thanh niên 16 đến 18 tuổi",
    url: "https://lamchame4.vercel.app",
    category: "Đời sống",
    categoryId: "lifestyle",
    description: "Mảnh ghép cuối cùng trong Trọn Bộ 4 Ứng Dụng Đồng Hành Làm Cha Mẹ & Trẻ Em (0–18 Tuổi), giúp thay đổi quan điểm chuyển từ 'quản lý' sang 'đồng hành cùng con', từ kiểm soát sang tin tưởng, từ quyết định thay con sang cùng con chuẩn bị cho tương lai với 10 tính năng cốt lõi: Trạm Tổng quan Gia đình Home Dashboard & Weekly Insight, Bản đồ Học tập & Trạm Thi Tuyển sinh GDPT 2018, La bàn Định hướng & Kịch bản Tương lai Holland Ikigai, Cầu nối Cha mẹ - Con NVC & GROW, Trợ lý Giao tiếp AI Nói sao với con, Thỏa thuận Gia đình tự nguyện, Theo dõi Sức khỏe Giấc ngủ & Dinh dưỡng mùa thi, Đồng hành Đời sống số an toàn, Hành trang Tuổi 18 pháp lý công dân VNeID, Trợ lý AI 24/7 & Nhật ký Đồng hành.",
    tags: ["Thanh Niên 16-18 Tuổi", "Làm Cha Mẹ", "Thi THPT & Tuyển Sinh", "Holland & Ikigai", "Giao Tiếp GROW NVC", "Thỏa Thuận Gia Đình", "Pháp Lý Tuổi 18", "Đời Sống"],
    coverImage: '/apps/dinh-huong-thanh-nien-16-18/feature_01_home_dashboard_weekly_insight.jpg',
    placeholderImage: '/apps/dinh-huong-thanh-nien-16-18/feature_01_home_dashboard_weekly_insight.jpg',
    detailImages: [
      '/apps/dinh-huong-thanh-nien-16-18/feature_01_home_dashboard_weekly_insight.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_02_academic_exam_hub.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_03_career_future_direction.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_04_parent_teen_connection.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_05_ai_communication_assistant.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_06_family_boundary_builder.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_07_health_wellness_tracker.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_08_digital_life_guidance.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_09_age18_citizenship_prep.jpg',
      '/apps/dinh-huong-thanh-nien-16-18/feature_10_ai_companion_family_journal.jpg'
    ],
    imageAlt: "Giao diện ứng dụng Định hướng thanh niên 16 đến 18 tuổi - Đồng hành bứt phá THPT và tự lập bước vào đời",
    featured: false,
    illustrationImage: '/apps/dinh-huong-thanh-nien-16-18/feature_01_home_dashboard_weekly_insight.jpg',
    demoCredential: {
      account: "Trải nghiệm ngay",
      note: "Nền tảng PWA đồng hành tôn trọng ranh giới riêng tư, kết nối gia đình và bảo mật dữ liệu tuyệt đối."
    },
    audience: "Cha mẹ có con trong độ tuổi THPT (16 đến 18 tuổi, Lớp 10–12), các bạn trẻ chuẩn bị thi tốt nghiệp, chọn ngành đại học và rèn luyện kỹ năng tự lập bước vào đời.",
    problem: "Giai đoạn 16–18 tuổi chứng kiến áp lực khổng lồ từ kỳ thi tốt nghiệp THPT, ma trận tuyển sinh đại học phức tạp, nỗi hoang mang chọn ngành trước làn sóng AI, mâu thuẫn thế hệ gay gắt khi con đóng kín cửa phòng và sự thiếu hụt kỹ năng sống tự lập khi rời tổ ấm.",
    solution: "Ứng dụng Định hướng thanh niên 16–18 tuổi đồng hành khoa học: Trạm tổng quan gia đình tuần, bản đồ học tập bám sát GDPT 2018, la bàn 3 kịch bản tương lai Holland-Ikigai, kịch bản giao tiếp GROW & NVC mở cánh cửa phòng con, thỏa thuận tự chủ văn minh và hành trang pháp lý tuổi 18 vững bước trưởng thành.",
    keyFeatures: [
      "Trạm Tổng quan Gia đình (Home Dashboard & Weekly Insight): Cung cấp bức tranh tổng thể hàng tuần của con trên 5 khía cạnh (Học tập, Định hướng, Kết nối, Sức khỏe & Thói quen, Trưởng thành) và gợi ý 3 việc cụ thể cha mẹ có thể làm ngay trong tuần.",
      "Bản đồ Học tập & Trạm Thi/Tuyển sinh (Academic & Exam Hub): Giúp cha mẹ nắm bắt chương trình GDPT 2018 (lớp 10–12), tổ hợp môn học, xu hướng tiến bộ, cùng các mốc thời gian thi tốt nghiệp THPT và xét tuyển đại học mà không biến cha mẹ thành 'người giám sát điểm số'.",
      "La bàn Định hướng & Kịch bản Tương lai (Career & Future Direction): Tích hợp các công cụ khám phá năng lực, sở thích (Holland RIASEC, Ikigai) và gợi ý 3 kịch bản tương lai (An toàn, Khám phá, Đột phá) để gia đình cùng thảo luận hướng đi thay vì áp đặt ngành học.",
      "Cầu nối Cha mẹ – Con (Parent–Teen Connection): Bộ hướng dẫn giúp cải thiện tương tác gia đình, tôn trọng quyền riêng tư và ứng dụng phương pháp Giao tiếp phi bạo lực (NVC) cùng mô hình GROW để giải quyết các xung đột tuổi mới lớn.",
      "Trợ lý Giao tiếp AI ('Nói sao với con?'): Công cụ tương tác cho phép cha mẹ nhập tình huống khó khăn thực tế (như con khép kín, áp lực thi cử, thức khuya, chọn ngành khác ý muốn gia đình) và nhận gợi ý về nguyên nhân, điều nên tránh, cùng câu mở đầu không phán xét.",
      "Thỏa thuận Gia đình (Family Boundary Builder): Hỗ trợ cha mẹ và con cùng xây dựng các 'thỏa thuận chung' tự nguyện về giờ giấc, sử dụng điện thoại, tài chính tiêu vặt và việc nhà dựa trên tinh thần trách nhiệm thay vì quy tắc ép buộc.",
      "Theo dõi Sức khỏe, Giấc ngủ & Dinh dưỡng (Health & Wellness Tracker): Theo dõi xu hướng giấc ngủ, thời lượng dùng màn hình, chế độ dinh dưỡng mùa thi và biểu hiện căng thẳng của con dưới dạng biểu đồ xu hướng để phát hiện sớm các dấu hiệu bất thường.",
      "Đồng hành Đời sống số (Digital Life Guidance): Hướng dẫn cha mẹ cách xây dựng năng lực số cho con, thảo luận về an toàn mạng xã hội, bắt nạt trên mạng, lừa đảo trực tuyến và dấu chân kỹ thuật số dựa trên sự tin tưởng.",
      "Hành trang Bước vào Tuổi 18 (Age 18 Citizenship Prep): Danh mục kiểm tra và cung cấp kiến thức pháp lý, công dân cơ bản khi con tròn 18 tuổi (giấy tờ cá nhân, VNeID, nhận thức pháp luật, an toàn tài chính, tài khoản cá nhân).",
      "Trợ lý đồng hành 24/7 & Nhật ký Đồng hành: Trợ lý AI trung tâm đóng vai trò người cố vấn bình tĩnh, đưa ra lời khuyên dựa trên bằng chứng, kết hợp với Nhật ký ghi lại các cột mốc, cảm xúc và quyết định quan trọng của gia đình."
    ],
    videoDuration: "2:55",
    videoTagline: "10 tính năng cốt lõi đồng hành bứt phá THPT và vững vàng bước vào đời cùng thanh niên 16–18 tuổi",
    videoScenes: [
      {
        time: "0:00",
        title: "Trạm Tổng quan Gia đình (Home Dashboard & Weekly Insight)",
        description: "Sau Nuôi dưỡng bé 0–60 tháng, Nuôi dạy con 6–11 tuổi và Thấu hiểu thiếu niên 12–15 tuổi, đây là mảnh ghép cuối cùng Định hướng thanh niên 16–18 tuổi được thiết kế với mục đích chuyển từ 'quản lý' sang 'đồng hành cùng con': Cung cấp bức tranh tổng thể hàng tuần của con trên 5 khía cạnh và gợi ý 3 việc cụ thể cha mẹ có thể làm ngay."
      },
      {
        time: "0:15",
        title: "Bản đồ Học tập & Trạm Thi/Tuyển sinh (Academic & Exam Hub)",
        description: "Giúp cha mẹ nắm bắt chương trình GDPT 2018 (lớp 10–12), tổ hợp môn học, xu hướng tiến bộ, cùng các mốc thời gian thi tốt nghiệp THPT và xét tuyển đại học mà không biến cha mẹ thành 'người giám sát điểm số'."
      },
      {
        time: "0:30",
        title: "La bàn Định hướng & Kịch bản Tương lai (Career & Future Direction)",
        description: "Tích hợp các công cụ khám phá năng lực, sở thích (Holland RIASEC, Ikigai) và gợi ý 3 kịch bản tương lai (An toàn, Khám phá, Đột phá) để gia đình cùng thảo luận hướng đi thay vì áp đặt ngành học."
      },
      {
        time: "0:45",
        title: "Cầu nối Cha mẹ – Con (Parent–Teen Connection)",
        description: "Bộ hướng dẫn giúp cải thiện tương tác gia đình, tôn trọng quyền riêng tư và ứng dụng phương pháp Giao tiếp phi bạo lực (NVC) cùng mô hình GROW để giải quyết các xung đột tuổi mới lớn."
      },
      {
        time: "1:00",
        title: "Trợ lý Giao tiếp AI ('Nói sao với con?')",
        description: "Công cụ tương tác cho phép cha mẹ nhập tình huống khó khăn thực tế (như con khép kín, áp lực thi cử, thức khuya, chọn ngành khác ý muốn gia đình) và nhận gợi ý về nguyên nhân, điều nên tránh, cùng câu mở đầu không phán xét."
      },
      {
        time: "1:15",
        title: "Thỏa thuận Gia đình (Family Boundary Builder)",
        description: "Hỗ trợ cha mẹ và con cùng xây dựng các 'thỏa thuận chung' tự nguyện về giờ giấc, sử dụng điện thoại, tài chính tiêu vặt và việc nhà dựa trên tinh thần trách nhiệm thay vì quy tắc ép buộc."
      },
      {
        time: "1:30",
        title: "Theo dõi Sức khỏe, Giấc ngủ & Dinh dưỡng (Health & Wellness Tracker)",
        description: "Theo dõi xu hướng giấc ngủ, thời lượng dùng màn hình, chế độ dinh dưỡng mùa thi và biểu hiện căng thẳng của con dưới dạng biểu đồ xu hướng để phát hiện sớm các dấu hiệu bất thường."
      },
      {
        time: "1:45",
        title: "Đồng hành Đời sống số (Digital Life Guidance)",
        description: "Hướng dẫn cha mẹ cách xây dựng năng lực số cho con, thảo luận về an toàn mạng xã hội, bắt nạt trên mạng, lừa đảo trực tuyến và dấu chân kỹ thuật số dựa trên sự tin tưởng."
      },
      {
        time: "2:00",
        title: "Hành trang Bước vào Tuổi 18 (Age 18 Citizenship Prep)",
        description: "Danh mục kiểm tra và cung cấp kiến thức pháp lý, công dân cơ bản khi con tròn 18 tuổi (giấy tờ cá nhân, VNeID, nhận thức pháp luật, an toàn tài chính, tài khoản cá nhân)."
      },
      {
        time: "2:15",
        title: "Trợ lý đồng hành 24/7 & Nhật ký Đồng hành",
        description: "Trợ lý AI trung tâm đóng vai trò người cố vấn bình tĩnh, đưa ra lời khuyên dựa trên bằng chứng, kết hợp với Nhật ký ghi lại các cột mốc, cảm xúc và quyết định quan trọng của gia đình."
      },
      {
        time: "2:30",
        title: "Trọn bộ 4 ứng dụng – Hành trình 0–18 tuổi khôn lớn cùng con",
        description: "Trọn bộ 4 ứng dụng – 4 giai đoạn – một hành trình 0–18 tuổi cùng cha mẹ đi qua từng chặng đường lớn lên của con. Nếu 5 năm đầu là chăm sóc, 6–11 tuổi là nuôi dạy, 12–15 tuổi là thấu hiểu, thì 16–18 tuổi là trao quyền và đồng hành. Cha mẹ không phải là giữ con bên mình mãi mãi, mà là giúp con đủ vững vàng để tự bước đi – và luôn biết rằng phía sau mình vẫn có một gia đình để trở về."
      }
    ],
    theme: {
      from: "from-indigo-500",
      to: "to-purple-600",
      accent: "text-indigo-400",
      badgeBg: "bg-indigo-500/10",
      badgeText: "text-indigo-400",
      badgeBorder: "border-indigo-500/30"
    }
  },
  {
    id: "taxhkd",
    logoUrl: '/apps/taxhkd/app-logo.svg',
    name: "Báo Cáo Thuế Hộ Kinh Doanh",
    url: "https://taxhkd.vercel.app",
    category: "Quản trị Thuế Hộ Kinh Doanh & Bán Hàng",
    categoryId: "sales-business",
    description: "Trợ lý số hóa quản trị bán hàng POS, kiểm soát kho và tự động kê khai thuế GTGT / TNCN theo quý cho hộ gia đình và hộ kinh doanh cá thể.",
    tags: ["Thuế Hộ Gia Đình", "Báo Cáo Thuế Hộ Kinh Doanh", "SmartTax HKD", "Hóa Đơn Điện Tử", "Thuế HKD", "POS Bán Hàng"],
    coverImage: '/apps/taxhkd/feature_01_gioi_thieu_tong_quan.jpg',
    placeholderImage: '/apps/taxhkd/feature_01_gioi_thieu_tong_quan.jpg',
    illustrationImage: '/apps/taxhkd/feature_14_smarttax_hkd_kinh_doanh_khong_ke_toan.jpg',
    detailImages: [
      '/apps/taxhkd/feature_01_gioi_thieu_tong_quan.jpg',
      '/apps/taxhkd/feature_02_khoi_tao_ho_so_3_buoc.jpg',
      '/apps/taxhkd/feature_03_xac_thuc_vneid_tai_khoan_ngan_hang.jpg',
      '/apps/taxhkd/feature_04_chup_hoa_don_ai_nhan_dien.jpg',
      '/apps/taxhkd/feature_05_mua_hang_khong_hoa_don_bang_ke.jpg',
      '/apps/taxhkd/feature_06_quan_ly_kho_hang_chan_xuat_am.jpg',
      '/apps/taxhkd/feature_07_ban_hang_pos_tren_dien_thoai.jpg',
      '/apps/taxhkd/feature_08_xuat_hoa_don_dien_tu_tuc_thi.jpg',
      '/apps/taxhkd/feature_09_thanh_toan_vietqr_dong.jpg',
      '/apps/taxhkd/feature_10_tu_dong_xu_ly_giam_thue.jpg',
      '/apps/taxhkd/feature_11_tu_dong_tong_hop_7_so_ke_toan.jpg',
      '/apps/taxhkd/feature_12_tinh_thue_ket_xuat_to_khai_01_cnkd.jpg',
      '/apps/taxhkd/feature_13_dashboard_canh_bao_nguong_thue.jpg',
      '/apps/taxhkd/feature_14_smarttax_hkd_kinh_doanh_khong_ke_toan.jpg',
      '/apps/taxhkd/feature_15_loi_binh_diem_bat_ngo_khi_thu_nghiem.jpg'
    ],
    imageAlt: "Giao diện bảng điều khiển quản trị thuế và bán hàng hộ kinh doanh SmartTax HKD",
    featured: false,
    videoDuration: "5:32",
    videoTagline: "SmartTax HKD – Bán hàng dễ hơn, Sổ sách rõ hơn, Thuế chủ động hơn",
    videoScenes: [
      {
        time: "0:00",
        title: "SMARTTAX HKD: Trợ Lý Thuế Số Hóa Cho Hộ Kinh Doanh",
        description: "Bán hàng đã bận, đến kỳ thuế sổ sách, hóa đơn, chứng từ lại khiến chủ hộ đau đầu. SmartTax HKD giúp kết nối bán hàng, hóa đơn, kho, sổ sách và kê khai thuế trọn vẹn ngay trên điện thoại."
      },
      {
        time: "0:29",
        title: "01 | Khởi Tạo Hồ Sơ Kinh Doanh Chỉ Với 3 Bước",
        description: "Thiết lập ban đầu siêu tốc: Chọn ngành nghề, nhập doanh thu dự kiến, hệ thống tự động xác định mức thuế suất GTGT và TNCN chuẩn xác từng nhóm ngành."
      },
      {
        time: "0:52",
        title: "02 | Xác Thực VNeID & Quản Lý Tài Khoản Ngân Hàng",
        description: "Gắn định danh VNeID và tài khoản ngân hàng kinh doanh riêng biệt. Tự động đối soát dòng tiền bán hàng thực tế, minh bạch thu chi và hạn chế tối đa nhầm lẫn."
      },
      {
        time: "1:12",
        title: "03 | Chụp Ảnh Hóa Đơn Đầu Vào – AI Tự Động Đọc Dữ Liệu",
        description: "Không cần gõ tay từng dòng hóa đơn mua hàng. Trí tuệ nhân tạo AI tự động nhận diện tên hàng hóa, số lượng, đơn giá, ngày mua và đưa thẳng dữ liệu vào kho."
      },
      {
        time: "1:33",
        title: "04 | Mua Hàng Không Hóa Đơn – Lập Bảng Kê & Ký Điện Tử",
        description: "Mua nông sản, thủy sản hoặc hàng trực tiếp từ người dân không có hóa đơn: Tự động lập Bảng kê mua hàng kèm chữ ký điện tử trên màn hình, chứng từ hợp lệ sẵn sàng giải trình thuế."
      },
      {
        time: "1:54",
        title: "05 | Quản Lý Kho Xuất Nhập Tồn & Chặn Xuất Âm Kho",
        description: "Kiểm soát kho theo thời gian thực: Nhập bán đến đâu cập nhật đến đó, tự động chặn xuất bán vượt tồn kho thực tế, bảo đảm sổ sách khớp từng món ngoài quầy."
      },
      {
        time: "2:17",
        title: "06 | Bán Hàng POS Siêu Tốc Ngay Trên Điện Thoại",
        description: "Giao diện máy tính tiền POS tối ưu trên điện thoại di động: Thao tác chọn món và thanh toán cực nhanh, hỗ trợ phân quyền cho nhân viên bán hàng đứng quầy."
      },
      {
        time: "2:38",
        title: "07 | Xuất Hóa Đơn Điện Tử Tức Thì Khi Bán Hàng",
        description: "Đáp ứng chuẩn quy định hóa đơn điện tử khởi tạo từ máy tính tiền: Hoàn thành đơn bán hàng là hóa đơn được tạo ngay lập tức, phân loại chuẩn cả khách lẻ không lấy hóa đơn."
      },
      {
        time: "3:00",
        title: "08 | Thanh Toán Mã Động VietQR – Khách Quét Là Xong",
        description: "Tự động sinh mã VietQR động theo đúng giá trị từng đơn hàng: Khách quét mã xác nhận chuyển khoản tức thì, tiền về tài khoản chuẩn xác không lo nhầm lẫn."
      },
      {
        time: "3:20",
        title: "09 | Tự Động Nhận Diện & Áp Dụng Chính Sách Giảm Thuế",
        description: "Cấu hình sẵn chính sách thuế cập nhật: Tự động nhận diện mặt hàng thuộc diện giảm thuế GTGT và đưa mức ưu đãi lên hóa đơn, không cần ghi nhớ thủ công."
      },
      {
        time: "3:41",
        title: "10 | Tự Động Lập Trọn Bộ 7 Sổ Kế Toán Hộ Kinh Doanh",
        description: "Tự động tổng hợp dữ liệu thành trọn bộ 7 cuốn sổ kế toán S1 đến S7 theo Thông tư 88 của Bộ Tài chính: Doanh thu, chi phí, vật liệu, tiền mặt, tiền gửi... tra cứu chỉ với một nút bấm."
      },
      {
        time: "4:03",
        title: "11 | Tự Động Tính Thuế & Kết Xuất Tờ Khai 01/CNKD",
        description: "Tự động tạm tính chính xác nghĩa vụ thuế GTGT và TNCN theo doanh thu thực tế, kết xuất bộ hồ sơ tờ khai mẫu 01/CNKD sẵn sàng phục vụ kê khai và nộp thuế."
      },
      {
        time: "4:23",
        title: "12 | Dashboard Thông Minh & Cảnh Báo Ngưỡng Thuế",
        description: "Bảng điều khiển trực quan theo dõi doanh thu lũy kế, giám sát ngưỡng 500 triệu và 1 tỷ đồng, đếm ngược nhắc hạn nộp tờ khai giúp chủ hộ luôn chủ động, tránh bị phạt."
      },
      {
        time: "4:43",
        title: "13 | SmartTax HKD: Làm Kinh Doanh, Không Phải Làm Kế Toán",
        description: "Kết nối liền mạch: Bán hàng → Hóa đơn → Thanh toán → Kho → Sổ sách → Tính thuế → Cảnh báo. Mọi việc gói gọn trong tầm tay, giải phóng hoàn toàn thời gian cho chủ hộ."
      },
      {
        time: "5:04",
        title: "14 | Lời Bình Thực Tế & Khám Phá Trải Nghiệm SmartTax HKD",
        description: "Lời bình thực tế: Hệ thống thiết kế rất sát với thực tiễn cửa hàng tại Việt Nam. Điểm bất ngờ khi thử nghiệm là ứng dụng PWA chạy mượt mà ngay cả khi mất mạng Internet. Khám phá ngay tại taxhkd.vercel.app!"
      }
    ],
    audience: "Chủ hộ gia đình, hộ kinh doanh cá thể, cửa hàng tạp hóa, nhà thuốc, siêu thị mini, tiệm bán lẻ & chuỗi dịch vụ.",
    problem: "Hộ gia đình, hộ kinh doanh chuyển đổi sang chế độ kê khai gặp nhiều bỡ ngỡ, dễ sai sót sổ sách kế toán, khó nhớ hạn nộp và đối mặt với các mức phạt nặng về hóa đơn điện tử.",
    solution: "Trợ lý số hóa toàn diện từ máy tính tiền POS, quản lý xuất nhập tồn đến tự động tính thuế GTGT/TNCN chính xác, cảnh báo vi phạm và xuất tờ khai thuế chuẩn hóa.",
    keyFeatures: [
      "Bảng điều khiển theo dõi ngưỡng miễn thuế 500 triệu và ngưỡng bắt buộc HĐĐT 1 tỷ",
      "Máy bán hàng POS tạo hóa đơn điện tử và mã thanh toán VietQR động",
      "Quản lý kho hàng xuất nhập tồn và tự động phân loại thuế suất theo ngành nghề",
      "Hệ thống 7 sổ kế toán chuẩn hóa (S1-S7) và kết xuất hồ sơ tờ khai 01/CNKD"
    ],
    demoCredential: {
      account: "minhanh@pharmacy.vn (Nhà Thuốc Minh Anh)",
      password: "Truy cập trực tiếp (Không cần mật khẩu)",
      note: "Dữ liệu mẫu Nhà Thuốc Minh Anh tích hợp sẵn"
    },
    theme: {
      from: "#16a34a",
      to: "#0f766e",
      accent: "#16a34a",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200"
    }
  },
  {
    id: "cosmederm-ai-academy",
    logoUrl: '/apps/cosmederm-ai-academy/app-logo.png',
    name: "CosmeDerm AI Academy",
    url: "https://cosmederm-ai.vercel.app/",
    category: "AI • Đào tạo & R&D Mỹ phẩm",
    categoryId: "ai-education",
    description: "Học viện số hóa ứng dụng AI hỗ trợ nghiên cứu da liễu thẩm mỹ & xây dựng công thức mỹ phẩm chuyên sâu: phòng Lab công thức ảo, tra cứu an toàn thành phần INCI, cây phác đồ điều trị, chẩn đoán tóc & da đầu và mô hình 3D tương tác.",
    tags: ["AI Formulation", "Cosmetic Science", "Dermatology", "R&D Library", "Virtual Lab", "INCI Safety", "3D Models"],
    coverImage: '/apps/cosmederm-ai-academy/cover.jpg',
    placeholderImage: '/apps/cosmederm-ai-academy/cover.jpg',
    illustrationImage: '/apps/cosmederm-ai-academy/cover.jpg',
    detailImages: [
      '/apps/cosmederm-ai-academy/feature_01_hoc_thuc_hanh_tra_cuu_da_lieu_my_pham.jpg',
      '/apps/cosmederm-ai-academy/feature_02_hoc_theo_dung_trinh_do.jpg',
      '/apps/cosmederm-ai-academy/feature_03_phong_lab_cong_thuc_ao.jpg',
      '/apps/cosmederm-ai-academy/feature_04_tra_cuu_thanh_phan_do_an_toan.jpg',
      '/apps/cosmederm-ai-academy/feature_05_cay_phac_do_tham_my.jpg',
      '/apps/cosmederm-ai-academy/feature_06_chan_doan_toc_da_dau.jpg',
      '/apps/cosmederm-ai-academy/feature_07_hoc_qua_tinh_huong_tro_choi.jpg',
      '/apps/cosmederm-ai-academy/feature_08_so_do_tu_duy_mo_hinh_3d.jpg',
      '/apps/cosmederm-ai-academy/feature_09_thu_vien_tri_thuc.jpg',
      '/apps/cosmederm-ai-academy/feature_10_thiet_ke_toi_uu_cho_dien_thoai.jpg',
      '/apps/cosmederm-ai-academy/feature_11_trai_nghiem_hien_dai_truc_quan.jpg',
      '/apps/cosmederm-ai-academy/feature_12_loi_ket_hoc_khoa_hoc_thuc_hanh_thong_minh.jpg'
    ],
    imageAlt: "CosmeDerm AI Academy learning and formulation dashboard",
    featured: true,
    videoDuration: "3:30",
    videoTagline: "Học – Thực Hành – Tra Cứu – Ứng Dụng Khoa Học Da Liễu & Mỹ Phẩm",
    videoScenes: [
      {
        time: "0:00",
        title: "COSMEDERM AI ACADEMY: Khoa Học Da Liễu & Công Thức Mỹ Phẩm",
        description: "Học da liễu và công thức mỹ phẩm quá nhiều kiến thức? Nhưng khi gặp một ca thực tế, bạn có biết phải bắt đầu từ đâu? CosmeDerm AI Academy biến kiến thức Da liễu – Mỹ phẩm – R&D thành một trải nghiệm trực quan, tương tác và có thể thực hành ngay trên điện thoại."
      },
      {
        time: "0:20",
        title: "01 | Học Theo Đúng Trình Độ",
        description: "Mới bắt đầu, sinh viên Y Dược hay chuyên gia R&D? Hệ thống tự động phân luồng lộ trình phù hợp. Không học lan man – học đúng thứ mình cần."
      },
      {
        time: "0:35",
        title: "02 | Phòng Lab Công Thức Ảo",
        description: "Muốn thử một công thức mỹ phẩm? Tự phối pha dầu, pha nước, chất nhũ hóa và hoạt chất ngay trên màn hình. Hệ thống tự tính tỷ lệ và cảnh báo nguy cơ. Thử công thức trước – hiểu công thức sâu hơn."
      },
      {
        time: "0:55",
        title: "03 | Tra Cứu Thành Phần & Độ An Toàn",
        description: "Chỉ cần nhập tên INCI. Thông tin về chức năng, mức độ an toàn và giới hạn sử dụng được hiển thị nhanh chóng. Không còn mất hàng giờ để tìm từng thành phần."
      },
      {
        time: "1:10",
        title: "04 | Cây Phác Đồ Thẩm Mỹ",
        description: "Từ tình trạng da và mức độ lão hóa, hệ thống giúp người học hình dung logic lựa chọn hoạt chất và phương pháp can thiệp. Từ kiến thức → đến tư duy xử lý một ca thực tế."
      },
      {
        time: "1:25",
        title: "05 | Chẩn Đoán Tóc & Da Đầu",
        description: "Không chỉ có làn da. Hệ thống mở rộng sang tóc và da đầu, giúp phân biệt các tình trạng thường gặp và hiểu cách chăm sóc phù hợp. Một nền tảng – kiến thức toàn diện hơn."
      },
      {
        time: "1:40",
        title: "06 | Học Qua Tình Huống & Trò Chơi",
        description: "Học bằng cách chọn đáp án, xử lý tình huống và lật thẻ ghi nhớ. Kiến thức khô khan trở thành những thử thách ngắn, nhanh và dễ nhớ. Học để nhớ – nhớ để phản xạ."
      },
      {
        time: "1:55",
        title: "07 | Sơ Đồ Tư Duy & Mô Hình 3D",
        description: "Hàng rào bảo vệ da, cấu trúc tóc hay cơ chế hấp thu… Được trực quan hóa bằng sơ đồ và mô hình tương tác. Điều khó hiểu trở nên dễ nhìn – dễ hiểu – dễ nhớ."
      },
      {
        time: "2:10",
        title: "08 | Thư Viện Tri Thức",
        description: "Một kho kiến thức chuyên sâu về da liễu, mỹ phẩm, công thức và quy định được hệ thống hóa để tra cứu nhanh. Thay vì hàng nghìn trang sách – tìm đúng kiến thức chỉ trong vài thao tác."
      },
      {
        time: "2:25",
        title: "09 | Thiết Kế Tối Ưu Cho Điện Thoại",
        description: "Không cần ngồi trước máy tính. Học, tra cứu, kiểm tra thành phần hay thực hành công thức ngay trên điện thoại, mọi lúc và mọi nơi."
      },
      {
        time: "2:40",
        title: "10 | Trải Nghiệm Hiện Đại, Trực Quan",
        description: "Giao diện lấy cảm hứng từ môi trường y khoa và phòng R&D hiện đại, thao tác mượt mà và trực quan. Công nghệ không làm kiến thức phức tạp hơn – mà giúp kiến thức dễ tiếp cận hơn."
      },
      {
        time: "3:00",
        title: "Lời Kết: Học Khoa Học – Thực Hành Thông Minh – Tạo Ra Giá Trị",
        description: "CosmeDerm AI Academy không chỉ giúp bạn học về da và mỹ phẩm. Nó giúp bạn tra cứu nhanh hơn, hiểu sâu hơn, thực hành nhiều hơn và hình thành tư duy xử lý vấn đề. Từ kiến thức → thực hành → phản xạ → ứng dụng. CosmeDerm AI Academy: Học khoa học. Thực hành thông minh. Tạo ra giá trị."
      }
    ],
    audience: "Dược sĩ R&D, Formulator, Bác sĩ da liễu, Sinh viên Y Dược, Chuyên viên phát triển sản phẩm làm đẹp.",
    problem: "Tài liệu khoa học mỹ phẩm bị phân tán, tính toán tương thích hoạt chất phức tạp và thiếu công cụ thực hành chẩn đoán trực quan.",
    solution: "Học viện số hóa với phòng Lab công thức ảo, tra cứu INCI an toàn, cây phác đồ chuẩn y khoa và mô hình 3D tương tác.",
    keyFeatures: [
      "Học theo đúng trình độ: Hệ thống tự động phân luồng lộ trình cá nhân hóa cho người mới bắt đầu, sinh viên Y Dược hay chuyên gia R&D.",
      "Phòng Lab công thức ảo: Tự phối pha dầu, pha nước, chất nhũ hóa và hoạt chất trên màn hình; tự tính tỷ lệ và cảnh báo nguy cơ bất ổn định.",
      "Tra cứu thành phần & Độ an toàn INCI: Tra cứu siêu tốc thông tin chức năng, cơ chế, mức độ an toàn và giới hạn nồng độ cho phép.",
      "Cây phác đồ thẩm mỹ: Định hình tư duy logic chuẩn y khoa để lựa chọn hoạt chất và phương pháp can thiệp theo từng tình trạng da và mức độ lão hóa.",
      "Chẩn đoán tóc & Da đầu: Mở rộng sang bệnh học tóc và da đầu, phân biệt chính xác viêm da tiết bã, rụng tóc, gàu nấm và phác đồ điều trị.",
      "Học qua tình huống & Trò chơi: Ứng dụng minigame thực chiến, câu hỏi tình huống lâm sàng và thẻ ghi nhớ Flashcard rèn phản xạ xử lý nhanh.",
      "Sơ đồ tư duy & Mô hình 3D: Trực quan hóa cấu trúc hàng rào bảo vệ da, nang tóc và cơ chế hấp thu qua lớp sừng bằng mô hình tương tác 3D.",
      "Thư viện tri thức chuyên sâu: Kho tàng tài liệu chuẩn mực về da liễu, công nghệ bào chế và quy chuẩn pháp lý mỹ phẩm dễ dàng tra cứu.",
      "Thiết kế tối ưu cho điện thoại: Linh hoạt học tập, tra cứu INCI và thực hành công thức mọi lúc mọi nơi trên thiết bị di động.",
      "Trải nghiệm hiện đại & Trực quan: Giao diện chuẩn phòng Lab y khoa tiên tiến, mang tri thức khoa học đến gần hơn với người thực hành."
    ],
    theme: {
      from: "#4f46e5",
      to: "#6366f1",
      accent: "#6366f1",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-700",
      badgeBorder: "border-indigo-200"
    }
  },
  {
    id: "foodtech-hub",
    logoUrl: '/apps/foodtech-hub/app-logo.svg',
    name: "Vietnam Food Tech Hub",
    url: "https://foodtechhub.vercel.app/",
    category: "R&D & Công nghệ Thực phẩm",
    categoryId: "food-tech",
    description: "Cổng tri thức số hóa và bộ công cụ thực chiến chuyên sâu cho kỹ sư R&D, QA/QC và công nghệ chế biến thực phẩm: chẩn đoán sự cố dây chuyền, tra cứu phụ gia E-number, máy tính công thức, thông số nhiệt F₀-D-Z và hồ sơ pháp lý xuất khẩu.",
    tags: ["Food Tech", "Food Additives", "QA/QC", "Troubleshooting", "R&D", "E-Number", "Thermal Process", "Export Regulation"],
    coverImage: '/apps/foodtech-hub/cover.jpg',
    placeholderImage: '/apps/foodtech-hub/cover.jpg',
    detailImages: [
      '/apps/foodtech-hub/feature_01_trung_tam_tri_thuc_cong_nghe_thuc_pham.jpg',
      '/apps/foodtech-hub/feature_02_chan_doan_nguyen_nhan_su_co.jpg',
      '/apps/foodtech-hub/feature_03_huong_dan_khac_phuc_su_co_nha_may.jpg',
      '/apps/foodtech-hub/feature_04_bang_thuc_chien_xu_ly_su_co.jpg',
      '/apps/foodtech-hub/feature_05_he_thong_hoa_kien_thuc_theo_nganh_hang.jpg',
      '/apps/foodtech-hub/feature_06_tra_cuu_ho_so_phap_ly_xuat_khau.jpg',
      '/apps/foodtech-hub/feature_07_tra_cuu_ma_phu_gia_e_number.jpg',
      '/apps/foodtech-hub/feature_08_may_tinh_cong_thuc_rd.jpg',
      '/apps/foodtech-hub/feature_09_tinh_toan_thong_so_nhiet_f0_d_z.jpg',
      '/apps/foodtech-hub/feature_10_kiem_tra_thanh_phan_va_noi_dung_nhan.jpg',
      '/apps/foodtech-hub/feature_11_flashcard_va_tro_choi_ren_phan_xa.jpg',
      '/apps/foodtech-hub/feature_12_loi_ket_bien_kien_thuc_thanh_cong_cu_hanh_dong.jpg'
    ],
    imageAlt: "Vietnam Food Tech Hub knowledge and practical food science platform",
    featured: true,
    videoDuration: "4:10",
    videoTagline: "Trung tâm tri thức và bộ công cụ thực chiến số hóa cho ngành công nghệ thực phẩm",
    videoScenes: [
      {
        time: "0:00",
        title: "VIETNAM FOODTECH HUB: Trung Tâm Tri Thức Và Công Cụ Thực Chiến Cho Ngành Công Nghệ Thực Phẩm",
        description: "Trong sản xuất thực phẩm, một sự cố nhỏ có thể làm chậm cả dây chuyền — nhưng tìm đúng nguyên nhân, đúng giải pháp và đúng tài liệu lại không hề đơn giản. Vietnam FoodTech Hub được xây dựng để đưa kiến thức chuyên ngành, công cụ R&D, xử lý sự cố, pháp lý và đào tạo vào một nền tảng duy nhất. Không chỉ để tra cứu — mà để giải quyết công việc nhanh hơn và ra quyết định tốt hơn."
      },
      {
        time: "0:25",
        title: "01 | Chẩn Đoán Nguyên Nhân Sự Cố",
        description: "Sản phẩm đổi màu? Tách lớp? Lắng? Mất cấu trúc? Hay không đạt chỉ tiêu? Chỉ cần tìm kiếm vấn đề, hệ thống hỗ trợ truy nguyên nhân gốc và các yếu tố có thể gây ra sự cố. Từ triệu chứng → nguyên nhân → hướng xử lý."
      },
      {
        time: "0:45",
        title: "02 | Hướng Dẫn Khắc Phục Sự Cố Nhà Máy",
        description: "Không dừng ở việc “biết nguyên nhân”. Hệ thống đưa ra các hướng kiểm tra và phương án khắc phục để kỹ thuật viên có thể tham khảo ngay trên dây chuyền. Biết vấn đề ở đâu – biết cần kiểm tra gì – biết nên xử lý từ đâu."
      },
      {
        time: "1:05",
        title: "03 | Bảng Thực Chiến Xử Lý Sự Cố",
        description: "Kiến thức hóa sinh được chuyển thành bảng hành động trực quan. Khi sự cố xảy ra, người dùng có thể nhanh chóng xác định hiện tượng – nguyên nhân – kiểm tra – hành động. Biến kiến thức thành phản xạ xử lý thực tế."
      },
      {
        time: "1:25",
        title: "04 | Hệ Thống Hóa Kiến Thức Theo Ngành Hàng",
        description: "Không phải mỗi ngành hàng đều có cùng một vấn đề. Vietnam FoodTech Hub phân loại kiến thức và giải pháp theo từng nhóm sản phẩm, giúp người dùng đi thẳng đến đúng lĩnh vực mình đang làm. Ít tìm kiếm hơn – đúng thông tin hơn."
      },
      {
        time: "1:45",
        title: "05 | Tra Cứu Hồ Sơ Pháp Lý Xuất Khẩu",
        description: "Xuất khẩu không chỉ cần sản phẩm tốt, mà còn cần đúng quy định và đủ hồ sơ. Hệ thống hỗ trợ tra cứu các yêu cầu pháp lý, hồ sơ và thông tin liên quan đến xuất khẩu thực phẩm. Giảm thời gian tìm tài liệu – hỗ trợ chuẩn bị hồ sơ đúng hướng."
      },
      {
        time: "2:05",
        title: "06 | Tra Cứu Mã Phụ Gia E-Number",
        description: "Cần kiểm tra một chất phụ gia? Nhập tên hoặc mã E-Number để nhanh chóng tra cứu thông tin liên quan. Tìm nhanh – kiểm tra nhanh – hỗ trợ ra quyết định nhanh."
      },
      {
        time: "2:25",
        title: "07 | Máy Tính Công Thức R&D",
        description: "Từ tỷ lệ nguyên liệu đến quy mô mẻ sản xuất, hệ thống hỗ trợ tính toán và quy đổi công thức cho quá trình nghiên cứu phát triển. Bớt tính thủ công – giảm sai số – thử nghiệm nhanh hơn."
      },
      {
        time: "2:45",
        title: "08 | Tính Toán Thông Số Nhiệt F₀ – D – Z",
        description: "Thanh trùng hay tiệt trùng cần kiểm soát chính xác các thông số nhiệt. Công cụ hỗ trợ tính toán F₀, D và Z để phục vụ đánh giá quá trình xử lý nhiệt. Từ dữ liệu nhiệt → có cơ sở để đánh giá quy trình."
      },
      {
        time: "3:05",
        title: "09 | Kiểm Tra Thành Phần Và Nội Dung Nhãn",
        description: "Trước khi sản phẩm ra thị trường, hãy kiểm tra lại thông tin trên nhãn. Công cụ hỗ trợ rà soát thành phần và các thông tin liên quan đến yêu cầu ghi nhãn. Thêm một lớp kiểm tra trước khi sản phẩm đến tay người tiêu dùng."
      },
      {
        time: "3:25",
        title: "10 | Flashcard Và Trò Chơi Rèn Phản Xạ",
        description: "Đào tạo chuyên môn không nhất thiết phải khô khan. Hệ thống sử dụng thẻ ghi nhớ lặp lại ngắt quãng và trò chơi tương tác để giúp người học ghi nhớ kiến thức và rèn phản xạ xử lý tình huống. Học nhanh hơn – nhớ lâu hơn – phản ứng tốt hơn khi vào thực tế."
      },
      {
        time: "3:45",
        title: "Lời Kết: Biến Kiến Thức Thành Công Cụ Để Hành Động",
        description: "Vietnam FoodTech Hub không chỉ là một thư viện kiến thức. Đây là bộ công cụ thực chiến dành cho người làm R&D, sản xuất, QA/QC, kỹ thuật và quản lý ngành thực phẩm. Từ một sự cố trên dây chuyền → một nguyên nhân → một giải pháp → một công thức → một hồ sơ pháp lý → một quyết định nhanh hơn. Vietnam FoodTech Hub – Biến kiến thức công nghệ thực phẩm thành công cụ để hành động."
      }
    ],
    audience: "Kỹ sư R&D thực phẩm, Chuyên viên QA/QC nhà máy, Nhà phát triển sản phẩm F&B, Kỹ thuật viên sản xuất.",
    problem: "Khó khăn trong việc tìm kiếm phụ gia thay thế, xử lý sự cố lỗi kết cấu/hư hỏng trên dây chuyền, kiểm soát chế độ thanh trùng và tối ưu công thức sản xuất.",
    solution: "Hệ thống dữ liệu tra cứu phụ gia E-number, chẩn đoán nguyên nhân sự cố sản xuất tức thì, bảng tính nhiệt F₀-D-Z và máy tính công thức R&D tự động.",
    keyFeatures: [
      "Chẩn đoán nguyên nhân sự cố: Truy vết nguyên nhân gốc rễ và phân tích các yếu tố gây lỗi như đổi màu, tách lớp, lắng cặn hay biến tính cấu trúc.",
      "Hướng dẫn khắc phục sự cố nhà máy: Cung cấp các bước kiểm tra và phương án xử lý tức thì cho kỹ thuật viên ngay trên dây chuyền sản xuất.",
      "Bảng thực chiến xử lý sự cố: Chuyển hóa kiến thức hóa sinh thành bảng hành động trực quan theo quy trình: Hiện tượng - Nguyên nhân - Kiểm tra - Hành động.",
      "Hệ thống hóa kiến thức theo ngành hàng: Phân loại chuyên sâu theo đồ uống, sữa, bánh kẹo, chế biến thịt, giúp tra cứu đúng giải pháp cho từng ngành.",
      "Tra cứu hồ sơ pháp lý xuất khẩu: Hệ thống hóa quy chuẩn kỹ thuật, tiêu chuẩn thị trường quốc tế và quy định pháp lý an toàn thực phẩm.",
      "Tra cứu mã phụ gia E-Number: Kiểm tra nhanh cơ chế hoạt động, giới hạn an toàn ADI và quy định của Bộ Y Tế cùng tiêu chuẩn Codex.",
      "Máy tính công thức R&D: Tự động tính toán tỷ lệ nguyên liệu và mở rộng quy mô mẻ sản xuất từ phòng Lab ra nhà máy, giảm thiểu sai số.",
      "Tính toán thông số nhiệt F₀ – D – Z: Kiểm soát nghiêm ngặt các thông số vi sinh trong thanh trùng và tiệt trùng nhiệt, tối ưu hóa quy trình chế biến.",
      "Kiểm tra thành phần và nội dung nhãn: Rà soát danh mục thành phần, cảnh báo chất gây dị ứng và đảm bảo tuân thủ quy chuẩn ghi nhãn hàng hóa.",
      "Flashcard và trò chơi rèn phản xạ: Ứng dụng kỹ thuật lặp lại ngắt quãng Spaced Repetition và minigame thực chiến, giúp ghi nhớ sâu và phản ứng nhạy bén."
    ],
    theme: {
      from: "#d97706",
      to: "#f59e0b",
      accent: "#d97706",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      badgeBorder: "border-amber-200"
    }
  },
  {
    id: "uth-scm-navigator",
    logoUrl: '/apps/uth-scm-navigator/app-logo.svg',
    name: "UTH SCM Navigator",
    url: "https://uhtscm.vercel.app/",
    category: "EdTech & Chuỗi cung ứng SCM",
    categoryId: "ai-education",
    description: "Cẩm nang số hóa điều hướng học tập chuyên ngành Logistics & Quản lý Chuỗi cung ứng Đại học Giao thông Vận tải TP.HCM (UTH): Hồ sơ học tập cá nhân, bản đồ 4 năm, trợ lý học tập AI, công cụ tính toán EOQ/ROP, nghiệp vụ Incoterms/chứng từ và kết nối thực tập doanh nghiệp.",
    tags: ["Logistics", "Supply Chain", "Incoterms", "EdTech", "UTH SCM", "AI Tutor", "Logistics 4.0"],
    coverImage: '/apps/uth-scm-navigator/cover.jpg',
    placeholderImage: '/apps/uth-scm-navigator/cover.jpg',
    detailImages: [
      '/apps/uth-scm-navigator/feature_01_gioi_thieu_tong_quan.jpg',
      '/apps/uth-scm-navigator/feature_02_dinh_huong_hoc_tap.jpg',
      '/apps/uth-scm-navigator/feature_03_ho_so_hoc_tap_ca_nhan.jpg',
      '/apps/uth-scm-navigator/feature_04_ban_do_kien_thuc_4_nam.jpg',
      '/apps/uth-scm-navigator/feature_05_hoc_de_hieu_bai.jpg',
      '/apps/uth-scm-navigator/feature_06_tro_ly_hoc_tap_ai.jpg',
      '/apps/uth-scm-navigator/feature_07_cong_cu_tinh_toan_thuc_hanh.jpg',
      '/apps/uth-scm-navigator/feature_08_chuan_bi_kiem_tra_hoc_bong.jpg',
      '/apps/uth-scm-navigator/feature_09_hoc_nghiep_vu_thuc_te.jpg',
      '/apps/uth-scm-navigator/feature_10_lam_quen_cong_nghe_logistics.jpg',
      '/apps/uth-scm-navigator/feature_11_chuan_bi_di_thuc_tap.jpg',
      '/apps/uth-scm-navigator/feature_12_xay_dung_nang_luc_di_lam.jpg',
      '/apps/uth-scm-navigator/feature_13_tot_nghiep_rang_ro.jpg',
      '/apps/uth-scm-navigator/feature_14_loi_ket_chinh_phuc_nghe_nghiep.jpg'
    ],
    imageAlt: "UTH SCM Navigator learning platform for Logistics and Supply Chain Management at UTH",
    featured: true,
    videoDuration: "4:00",
    videoTagline: "Cẩm nang điều hướng học tập 4 năm Logistics & SCM UTH: Từ năm nhất đến săn học bổng và đi làm",
    videoScenes: [
      { time: "0:00", title: "UTH SCM NAVIGATOR: Cẩm Nang Điều Hướng Học Tập Logistics UTH", description: "Học 4 năm đại học nhưng bạn có biết mình cần học gì, học thế nào để vừa có học bổng vừa ra trường làm được việc? UTH SCM Navigator là người bạn đồng hành số 1 cho sinh viên." },
      { time: "0:17", title: "Định Hướng Học Tập Chủ Động Từ Năm Nhất", description: "Thay vì học theo kiểu môn nào đến học môn đó, ứng dụng giúp bạn hệ thống hóa mục tiêu, nắm rõ vai trò từng môn học và chuẩn bị hành trang vững chắc ngay từ năm nhất." },
      { time: "0:34", title: "01 | Hồ Sơ Học Tập Cá Nhân", description: "Đăng nhập và theo dõi sát sao hành trình học tập, mục tiêu GPA, tiến độ tín chỉ và các cột mốc thi cử của chính bạn một cách khoa học." },
      { time: "0:50", title: "02 | Bản Đồ Kiến Thức 4 Năm", description: "Sơ đồ hóa toàn bộ lộ trình môn học chuyên ngành Logistics & SCM, giúp bạn nhìn thấy bức tranh tổng thể, nắm chắc môn tiên quyết và chuẩn bị kỹ lưỡng." },
      { time: "1:06", title: "03 | Học Để Hiểu Bài Sâu Sắc", description: "Giải thích các khái niệm khó như Systems Thinking, Bullwhip Effect, Trade-off bằng phương pháp trực quan, sơ đồ sinh động và cực kỳ dễ hiểu." },
      { time: "1:22", title: "04 | Trợ Lý Học Tập AI", description: "Khi gặp bài tập khó hay câu hỏi ôn tập hóc búa, bạn có thể hỏi đáp cùng trợ lý AI để đào sâu tư duy phản biện thay vì học vẹt đối phó." },
      { time: "1:38", title: "05 | Công Cụ Tính Toán & Thực Hành", description: "Từ EOQ, Safety Stock, ROP đến các bài toán Logistics thực tế — học lý thuyết song hành cùng thực hành, biến công thức thành kỹ năng giải quyết vấn đề." },
      { time: "1:55", title: "06 | Chuẩn Bị Cho Kiểm Tra & Học Bổng", description: "Hệ thống kiến thức trọng tâm, chủ động ôn tập và luyện tập bộ đề để tự tin bứt phá điểm số và chinh phục những suất học bổng danh giá." },
      { time: "2:12", title: "07 | Học Nghiệp Vụ Thực Tế", description: "Làm quen với vận tải đa phương thức, giao nhận kho cảng, chứng từ xuất nhập khẩu (Bill of Lading, hợp đồng) và quy tắc Incoterms 2020 quốc tế." },
      { time: "2:28", title: "08 | Làm Quen Công Nghệ Logistics 4.0", description: "Khám phá TMS, WMS, E-Port, AI, RFID, robot AGV và những công nghệ tự động hóa hiện đại đang làm thay đổi toàn bộ chuỗi cung ứng toàn cầu." },
      { time: "2:45", title: "09 | Chuẩn Bị Đi Thực Tập Tại Doanh Nghiệp", description: "Biết trước doanh nghiệp cảng biển và logistics cần gì, công việc thực tế ra sao và mình còn thiếu kỹ năng nào để tự tin ghi điểm trước nhà tuyển dụng." },
      { time: "3:02", title: "10 | Xây Dựng Năng Lực Để Đi Làm", description: "Mục tiêu cuối cùng không chỉ là điểm số, mà là thấu hiểu nghề, thạo việc, tự tin bước vào doanh nghiệp và phát triển sự nghiệp vững chắc." },
      { time: "3:18", title: "11 | Tốt Nghiệp Rạng Rỡ & Vững Vàng Tương Lai", description: "Với hành trang tri thức vững vàng từ UTH SCM Navigator, sinh viên tự tin bước lên bục tốt nghiệp và sẵn sàng đón nhận những cơ hội nghề nghiệp lớn." },
      { time: "3:35", title: "Lời Kết: Chạm Tay Đến Thành Công Cùng UTH SCM Navigator", description: "Đại học là bước đệm cho sự nghiệp tương lai. Hãy học để hiểu bài, đạt mục tiêu và trở thành người làm Logistics thực thụ. Khám phá UTH SCM Navigator ngay hôm nay!" }
    ],
    audience: "Sinh viên ngành Logistics & Quản lý Chuỗi cung ứng UTH, Giảng viên chuyên ngành, Chuyên viên vận hành Logistics trẻ.",
    problem: "Học đại học 4 năm theo kiểu môn nào đến học môn đó khiến sinh viên khó hiểu sâu bản chất, lúng túng khi tính toán nghiệp vụ và thiếu định hướng khi thực tập.",
    solution: "UTH SCM Navigator là người hướng dẫn học tập toàn diện từ năm nhất đến khi đi làm: Lộ trình 4 năm, trợ lý AI giải bài khó, công cụ tính toán logistics và nghiệp vụ thực tế.",
    keyFeatures: [
      "Hồ sơ học tập cá nhân: Theo dõi tiến trình, mục tiêu GPA và hành trình 4 năm đại học",
      "Bản đồ kiến thức 4 năm: Sơ đồ hóa toàn bộ lộ trình môn học Logistics & Chuỗi cung ứng",
      "Học để hiểu bài: Trực quan hóa các khái niệm Systems Thinking, Bullwhip Effect, Trade-off",
      "Trợ lý học tập AI: Giải đáp bài khó, đào sâu bản chất vấn đề và hỗ trợ ôn tập thông minh",
      "Công cụ tính toán SCM: Thực hành tính EOQ, Safety Stock, ROP trên số liệu logistics thực tế",
      "Chuẩn bị kiểm tra & học bổng: Ngân hàng câu hỏi trọng tâm giúp bứt phá điểm số và săn học bổng",
      "Học nghiệp vụ thực tế: Tiếp cận quy trình vận tải, giao nhận kho cảng, chứng từ và Incoterms",
      "Làm quen công nghệ 4.0: Khám phá WMS, TMS, E-Port, AI, RFID và robot tự hành AGV",
      "Chuẩn bị đi thực tập: Nhận diện yêu cầu doanh nghiệp, bổ sung kỹ năng còn thiếu trước kỳ thực tập",
      "Xây dựng năng lực nghề nghiệp: Định hướng hiểu nghề, biết làm và tự tin bước vào doanh nghiệp"
    ],
    theme: {
      from: "#0284c7",
      to: "#0ea5e9",
      accent: "#0284c7",
      badgeBg: "bg-sky-50",
      badgeText: "text-sky-800",
      badgeBorder: "border-sky-200"
    }
  },
  {
    id: "bjc-sales-training",
    logoUrl: '/apps/bjc-sales-training/app-logo.svg',
    name: "Huấn Luyện Sales Nội Bộ",
    url: "https://bjc-sales-training.pages.dev/",
    category: "Bán hàng & Đào tạo nội bộ",
    categoryId: "sales-business",
    description: "Hệ thống số hóa đào tạo kiến thức sản phẩm và lộ trình phát triển kỹ năng bán hàng B2B chuyên nghiệp nội bộ doanh nghiệp.",
    tags: ["B2B Sales", "Training LMS", "Product Master", "Certification"],
    coverImage: '/apps/bjc-sales-training/real-cover.jpg',
    placeholderImage: '/apps/bjc-sales-training/real-cover.jpg',
    detailImages: [
      '/apps/bjc-sales-training/real-cover.jpg',
      '/apps/bjc-sales-training/real-screen-2.jpg',
      '/apps/bjc-sales-training/real-screen-3.jpg'
    ],
    imageAlt: "Giao diện Huấn Luyện Sales Nội Bộ theo dõi lộ trình và kết quả đào tạo LMS",
    featured: true,
    videoDuration: "1:15",
    videoTagline: "Trải nghiệm học tập & sát hạch sản phẩm B2B cho nhân viên kinh doanh",
    videoScenes: [
      { time: "0:00", title: "Dashboard Tiến độ Học tập", description: "Theo dõi lộ trình hoàn thành các khóa học nguyên liệu hóa chất và chỉ số kỹ năng của nhân viên kinh doanh." },
      { time: "0:15", title: "Module Kiến thức Kỹ thuật Sản phẩm", description: "Học tập tương tác về tính năng, ứng dụng thực tế và thư viện tài liệu TDS/MSDS chi tiết." },
      { time: "0:30", title: "Kiểm tra Trắc nghiệm & Sát hạch", description: "Ngân hàng đề thi đánh giá năng lực nghiệp vụ và hệ thống chấm điểm tự động." },
      { time: "0:45", title: "Lộ trình Hội nhập 30-60-90 & Vinh danh", description: "Khung đào tạo nhân sự mới bám sát KPI thực tế và bảng xếp hạng Gamification khích lệ tinh thần thi đua." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Nền tảng học tập nội bộ chuẩn mực tập đoàn đa quốc gia. Điểm bất ngờ khi thử nghiệm là hệ thống tự động sinh chứng chỉ PDF có chữ ký số và mã QR xác thực ngay sau khi vượt qua bài thi 80%. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như mô phỏng tình huống đàm phán B2B và thư viện kịch bản xử lý phản hồi khách hàng!" }
    ],
    audience: "Nhân viên Sales B2B, Quản lý kinh doanh, Trưởng nhóm đào tạo thương mại.",
    problem: "Nhân viên mới mất nhiều tháng để nắm bắt danh mục hàng trăm nguyên liệu hóa chất, thiếu hệ thống kiểm tra năng lực chuẩn hóa.",
    solution: "Kho bài giảng micro-learning, bài kiểm tra đánh giá tự động và dashboard theo dõi tiến độ học tập của từng sales.",
    keyFeatures: [
      "Dashboard theo dõi tiến độ học tập và cấp độ kỹ năng nhân sự",
      "Hệ thống module kiến thức nguyên liệu kèm tài liệu kỹ thuật chuẩn",
      "Cơ chế kiểm tra trắc nghiệm chấm điểm tự động chống gian lận",
      "Khung hội nhập 30-60-90 ngày và bảng vinh danh thành tích học tập"
    ],
    demoCredential: {
      account: "Trang@bjc.co.th",
      password: "•••••••••• (Trang@2026!)",
      note: "Tài khoản kiểm thử phân quyền học viên"
    },
    theme: {
      from: "#2563eb",
      to: "#3b82f6",
      accent: "#2563eb",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-800",
      badgeBorder: "border-blue-200"
    }
  },
  {
    id: "quan-ly-hop-dong-abm",
    logoUrl: '/apps/quan-ly-hop-dong-abm/app-logo.png',
    name: "Quản Lý Hợp Đồng Mua Bán",
    url: "https://quan-ly-hop-dong-abm.netlify.app/",
    category: "Bán hàng B2B & Quản trị Hợp đồng",
    categoryId: "sales-business",
    description: "Hệ thống số hóa quản lý danh sách hợp đồng mua bán thương mại: Theo dõi tập trung theo Sales, ASM, khu vực; Dashboard cảnh báo gia hạn từ 15-365 ngày; tự động bắt lỗi hồ sơ; liên kết file scan Google Drive và vận hành offline PWA mượt mà.",
    tags: ["Hợp đồng mua bán", "Quản lý hợp đồng", "Google Drive", "PWA Offline", "B2B Sales", "Dashboard Cảnh báo"],
    coverImage: '/apps/quan-ly-hop-dong-abm/cover.jpg',
    placeholderImage: '/apps/quan-ly-hop-dong-abm/cover.jpg',
    detailImages: [
      '/apps/quan-ly-hop-dong-abm/feature_01.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_02.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_03.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_04.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_05.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_06.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_07.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_08.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_09.jpg',
      '/apps/quan-ly-hop-dong-abm/feature_10.jpg'
    ],
    imageAlt: "Giao diện quản lý hợp đồng mua bán thương mại, cảnh báo hạn hợp đồng và tra cứu file scan Google Drive",
    featured: true,
    videoDuration: "4:03",
    videoTagline: "Số hóa hợp đồng thương mại tập trung, tự động bắt lỗi hồ sơ, cảnh báo tái ký & tra cứu file scan Drive",
    videoScenes: [
      { time: "0:00", title: "Tổng Quan Quản Lý Hợp Đồng Mua Bán: Số Hóa & Giám Sát Tập Trung", description: "Chuyển hóa toàn bộ quy trình theo dõi hợp đồng từ file Excel rời rạc sang nền tảng số hóa trực quan, cảnh báo chủ động và kiểm soát đa chiều." },
      { time: "0:33", title: "01 | Quản Lý & Theo Dõi Hợp Đồng Toàn Diện", description: "Phân loại khoa học theo khách hàng, Sales, ASM, nhóm đối tác và trạng thái: chưa ký, sắp tái ký, sắp hết hạn, còn hiệu lực; tra cứu tức thì theo MST và số hợp đồng." },
      { time: "0:58", title: "02 | Đát-bo Trực Quan & Cảnh Báo Hết Hạn Thông Minh", description: "Bức tranh toàn cảnh về tiến độ ký kết và rủi ro quá hạn; cấu hình cảnh báo linh hoạt trước 15 đến 365 ngày giúp đội ngũ kinh doanh luôn ở thế chủ động." },
      { time: "1:22", title: "03 | Ưu Tiên Đúng Việc – Tập Trung Khách Hàng Doanh Số Cao", description: "Tự động xếp hạng ưu tiên khách hàng doanh số lớn nhất cần hoàn tất hợp đồng, theo dõi sát sao lịch đáo hạn trong 12 tháng tới để tối ưu hóa nguồn lực." },
      { time: "1:44", title: "04 | Kiểm Tra & Tự Động Bắt Lỗi Chất Lượng Hồ Sơ", description: "Tự động rà soát phát hiện thiếu sót: thiếu MST, sai định dạng, thiếu người đại diện, email lỗi hoặc chưa có file scan, ngăn ngừa tranh chấp pháp lý." },
      { time: "2:09", title: "05 | Quản Lý & Liên Kết File Scan Gu-gồ Đơ-rai-vơ", description: "Gắn kết trực tiếp file scan hợp đồng có dấu mộc đỏ lưu trữ trên Google Drive; quy tắc đặt tên chuẩn hóa, mở xem ngay lập tức trên máy tính và điện thoại." },
      { time: "2:32", title: "06 | Nhập Liệu Éch-xen & Xuất Báo Cáo Pê-Đê-Ép Đa Định Dạng", description: "Đồng bộ hàng nghìn dòng dữ liệu từ Excel chỉ trong vài giây theo từng nhóm hợp đồng, khách hàng; xuất báo cáo tổng hợp và chi tiết dạng PDF, Excel chuyên nghiệp." },
      { time: "2:55", title: "07 | Quản Lý Danh Bạ Đối Tác & Phân Quyền Bảo Mật", description: "Tập trung danh bạ khách hàng, theo dõi hợp đồng mới nhất và lũy kế doanh số; phân quyền chặt chẽ theo vai trò và cơ chế khóa tạm thời khi đăng nhập sai nhiều lần." },
      { time: "3:17", title: "08 | Chế Độ Pê-Đúp-A Óp-lai & Sao Lưu Phục Hồi Đám Mây", description: "Ứng dụng hoạt động mượt mà ngay cả khi mất kết nối Internet nhờ bộ nhớ offline thiết bị; đồng thời sao lưu và phục hồi dữ liệu an toàn tuyệt đối qua Google Drive." },
      { time: "3:42", title: "09 | Lời Kết: Chuẩn Hóa Quản Trị – Nâng Tầm Vận Hành Doanh Nghiệp", description: "Quản lý hợp đồng thương mại thông minh giúp doanh nghiệp giữ vững khách hàng, phòng ngừa rủi ro pháp lý và tạo bệ phóng phát triển kinh doanh bền vững." }
    ],
    audience: "Ban giám đốc, Giám đốc kinh doanh, Quản lý vùng (ASM), Đội ngũ Sales B2B, Chuyên viên pháp chế & Admin bán hàng.",
    problem: "Hợp đồng thương mại lưu trữ phân tán trên nhiều file Excel cá nhân, dễ quên kỳ tái ký gây gián đoạn doanh thu, khó kiểm soát chất lượng pháp lý và không tra cứu được file scan gốc khi đi thị trường.",
    solution: "Hệ thống Web App & PWA số hóa toàn diện: Quản lý tập trung theo Sales và khách hàng, Dashboard cảnh báo hạn tự động, bắt lỗi hồ sơ tức thì, kết nối Google Drive và tra cứu mượt mà ngay cả khi offline.",
    keyFeatures: [
      "Quản lý & theo dõi toàn diện hợp đồng theo Sales, ASM, nhóm đối tác và trạng thái",
      "Dashboard trực quan cảnh báo hạn hợp đồng trước 15 - 365 ngày",
      "Xếp hạng ưu tiên khách hàng doanh số cao và theo dõi lịch hết hạn 12 tháng",
      "Tự động rà soát & bắt lỗi chất lượng hồ sơ pháp lý (MST, đại diện, file scan)",
      "Liên kết trực tiếp bản scan có dấu đỏ trên Google Drive theo tên chuẩn hóa",
      "Nhập dữ liệu Excel thông minh & xuất báo cáo PDF/Excel đa chỉ tiêu",
      "Danh bạ khách hàng tập trung kèm phân quyền vai trò và bảo mật đăng nhập",
      "Vận hành PWA Offline không phụ thuộc mạng và sao lưu đám mây an toàn"
    ],
    demoCredential: {
      account: "admin",
      password: "•••••••••• (Admin@123)",
      note: "Tài khoản quản trị viên kiểm thử"
    },
    userManual: {
      url: "/manuals/QuanLyHopDong-HuongDan_SuDung.pdf",
      fileName: "QuanLyHopDong-HuongDan_SuDung.pdf",
      fileSize: "4.1 MB",
      title: "Sách Hướng Dẫn Sử Dụng Quản Lý Hợp Đồng Mua Bán",
      description: "Tài liệu hướng dẫn chi tiết quy trình số hóa danh bạ hợp đồng, đồng bộ file scan Google Drive và tra cứu offline PWA."
    },
    theme: {
      from: "#0284c7",
      to: "#0ea5e9",
      accent: "#0284c7",
      badgeBg: "bg-sky-50",
      badgeText: "text-sky-800",
      badgeBorder: "border-sky-200"
    }
  },
  {
    id: "customer-visit",
    logoUrl: '/apps/customer-visit/app-logo.png',
    name: "Customer Visit Management",
    url: "https://customer-visit.anhpob.workers.dev",
    category: "Bán hàng & Quản trị thực địa",
    categoryId: "sales-business",
    description: "Ứng dụng theo dõi, lập kế hoạch hành trình và quản lý lịch viếng thăm khách hàng B2B của đội ngũ kinh doanh.",
    tags: ["Field Sales", "Visit Tracking", "CRM", "Activity Log"],
    coverImage: '/apps/customer-visit/real-cover.jpg',
    placeholderImage: '/apps/customer-visit/real-cover.jpg',
    illustrationImage: '/apps/customer-visit/illustration-banner.jpg',
    detailImages: [
      '/apps/customer-visit/real-cover.jpg',
      '/apps/customer-visit/real-screen-2.jpg',
      '/apps/customer-visit/real-screen-3.jpg',
      '/apps/customer-visit/illustration-banner.jpg'
    ],
    imageAlt: "Customer Visit Management dashboard showing client list and visit activities",
    featured: true,
    videoDuration: "1:15",
    videoTagline: "Tối ưu hóa hành trình thăm viếng và báo cáo thực địa khách hàng B2B",
    videoScenes: [
      { time: "0:00", title: "Lập Kế hoạch Lịch trình Viếng thăm", description: "Sắp xếp lịch hẹn gặp đối tác theo tuyến đường và cụm khu công nghiệp tối ưu." },
      { time: "0:15", title: "Route Planner & Định vị GPS Thực địa", description: "Số hóa lộ trình di chuyển, hỗ trợ check-in thực tế tại nhà máy khách hàng bằng GPS." },
      { time: "0:30", title: "Biên bản Cuộc họp & Ghi nhận Nhu cầu", description: "Ghi nhanh nội dung trao đổi (Minute of Meeting), lưu yêu cầu gửi mẫu thử nghiệm và thông số kỹ thuật." },
      { time: "0:45", title: "Phân tích Độ phủ & Phân loại Lead", description: "Báo cáo tần suất chăm sóc khách hàng theo tuần và xếp hạng khách hàng tiềm năng theo chu kỳ mua sắm." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Trợ lý đắc lực giúp tối ưu hóa năng suất thực địa cho đội ngũ kinh doanh kỹ thuật B2B. Điểm bất ngờ khi thử nghiệm là tính năng đo khoảng cách và gợi ý tuyến đường kế tiếp trên Google Maps chỉ bằng một cú chạm. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như theo dõi lịch sử cấp mẫu thử nghiệm và báo cáo phân tích tỷ lệ chuyển đổi dự án!" }
    ],
    audience: "Đội ngũ Field Sales, Giám sát kinh doanh khu vực, Sales Director.",
    problem: "Báo cáo đi gặp khách hàng rời rạc qua chat/excel, không nắm được tần suất ghé thăm và cơ hội dự án tại từng nhà máy.",
    solution: "Giao diện check-in, ghi chép biên bản cuộc họp, lập kế hoạch ghé thăm theo lịch và phân tích độ phủ khách hàng tức thì.",
    keyFeatures: [
      "Bản đồ số hóa kế hoạch di chuyển và lịch trình viếng thăm theo khu công nghiệp",
      "Tính năng check-in GPS tại cổng nhà máy khách hàng và lưu nhật ký thực địa",
      "Ghi nhanh biên bản cuộc họp Minute of Meeting kèm nhu cầu mẫu thử nghiệm",
      "Báo cáo phân tích tần suất ghé thăm và độ phủ thị trường theo tuần"
    ],
    demoCredential: {
      account: "Trang@bjc.co.th",
      password: "•••••••••• (Trang@2026!)",
      note: "Tài khoản kiểm thử tính năng quản lý thị trường"
    },
    theme: {
      from: "#0d9488",
      to: "#14b8a6",
      accent: "#0d9488",
      badgeBg: "bg-teal-50",
      badgeText: "text-teal-800",
      badgeBorder: "border-teal-200"
    }
  },
  {
    id: "lipoid-advisor",
    logoUrl: '/apps/lipoid-advisor/app-logo.svg',
    name: "Lipoid R&D Advisor",
    url: "https://lipoidadvisor.vercel.app",
    category: "R&D & Nguyên liệu Mỹ phẩm",
    categoryId: "rd-cosmetics",
    description: "Cố vấn kỹ thuật số thông minh tra cứu 535 nguyên liệu Phospholipid & Lecithin cao cấp từ hãng Lipoid: Bộ lọc đa tiêu chí, tự động kiểm tra tương kỵ, gợi ý 'Chọn giúp tôi', 81 công thức mẫu và xuất phiếu yêu cầu A4/PDF chuyên nghiệp.",
    tags: ["Lipoid", "Phospholipids", "Lecithin", "Formulation Advisor", "R&D Cosmetics", "Compatibility AI"],
    coverImage: '/apps/lipoid-advisor/cover.jpg',
    placeholderImage: '/apps/lipoid-advisor/cover.jpg',
    detailImages: [
      '/apps/lipoid-advisor/feature_01_gioi_thieu_tong_quan.jpg',
      '/apps/lipoid-advisor/feature_02_bo_loc_thong_minh.jpg',
      '/apps/lipoid-advisor/feature_03_kiem_tra_tuong_ky.jpg',
      '/apps/lipoid-advisor/feature_04_chon_giup_toi.jpg',
      '/apps/lipoid-advisor/feature_05_81_cong_thuc_mau.jpg',
      '/apps/lipoid-advisor/feature_06_tim_kiem_thong_minh.jpg',
      '/apps/lipoid-advisor/feature_07_tao_phieu_yeu_cau_a4.jpg',
      '/apps/lipoid-advisor/feature_08_xem_truoc_luu_pdf.jpg',
      '/apps/lipoid-advisor/feature_09_my_list_theo_doi.jpg',
      '/apps/lipoid-advisor/feature_10_chia_se_truc_tiep.jpg',
      '/apps/lipoid-advisor/feature_11_minh_bach_nguon_goc.jpg',
      '/apps/lipoid-advisor/feature_12_loi_ket_toi_uu_cong_thuc.jpg'
    ],
    imageAlt: "Lipoid R&D Advisor intelligent ingredient search and formulation advisor interface",
    featured: false,
    videoDuration: "3:30",
    videoTagline: "Trợ lý AI chuyên sâu tra cứu 535 nguyên liệu Lipoid, kiểm tra tương kỵ và gợi ý công thức R&D",
    videoScenes: [
      { time: "0:00", title: "LIPOID ADVISOR: Trợ Lý Số Chuyên Sâu Cho R&D & Phospholipid", description: "Bạn đang tìm kiếm nguyên liệu hoàn hảo cho công thức mỹ phẩm? Lipoid Advisor giúp R&D tìm kiếm, lựa chọn và tra cứu hơn 535 nguyên liệu nhanh hơn và chính xác hơn." },
      { time: "0:18", title: "01 | Bộ Lọc Thông Minh 535 Nguyên Liệu", description: "Sàng lọc hơn 535 nguyên liệu theo nhóm sản phẩm, mục tiêu chăm sóc da hay tóc, dạng bào chế mong muốn và vai trò sinh học của Phospholipid." },
      { time: "0:35", title: "02 | Kiểm Tra Tương Kỵ Tự Động", description: "Hệ thống tự động phát hiện ngay những kết hợp chưa phù hợp, giải thích rõ nguyên nhân hóa sinh và đưa ra các cảnh báo kỹ thuật bảo vệ độ ổn định công thức." },
      { time: "0:52", title: "03 | Tính Năng 'Chọn Giúp Tôi' (Wizard AI)", description: "Chỉ cần trả lời vài câu hỏi định hướng ngắn gọn, thuật toán sẽ phân tích nhu cầu và gợi ý ngay nhóm nguyên liệu tối ưu nhất cho bài toán của bạn." },
      { time: "1:08", title: "04 | Thư Viện 81 Công Thức Mẫu Đột Phá", description: "Khám phá kho công thức mẫu chuẩn quốc tế cho da mặt, cơ thể và tóc, với khả năng tra cứu chi tiết và truy cập trực tiếp thông số kỹ thuật từng thành phần." },
      { time: "1:24", title: "05 | Tìm Kiếm Thông Minh Toàn Năng", description: "Tra cứu siêu tốc theo tên thương mại, mã số nguyên liệu hay tên công thức, hỗ trợ tìm kiếm linh hoạt ngay cả khi gõ tiếng Việt không dấu." },
      { time: "1:40", title: "06 | Tạo Phiếu Yêu Cầu Khổ A4 Chuyên Nghiệp", description: "Tự động tổng hợp và tạo ngay phiếu báo giá, đề xuất nhận mẫu thử, bảng công thức hoặc yêu cầu hỗ trợ kỹ thuật bài bản chỉ với một cú nhấp chuột." },
      { time: "1:58", title: "07 | Xem Trước & Xuất File PDF Tiêu Chuẩn", description: "Kiểm tra trực quan, in ấn trực tiếp hoặc tải phiếu yêu cầu định dạng PDF tiêu chuẩn về máy tính hay điện thoại mượt mà trên mọi trình duyệt." },
      { time: "2:15", title: "08 | Danh Mục My List Cá Nhân Hóa", description: "Gom tất cả nguyên liệu quan tâm vào danh sách riêng để theo dõi tiến độ nghiên cứu, so sánh đặc tính kỹ thuật và quản lý dự án hiệu quả." },
      { time: "2:32", title: "09 | Chia Sẻ Trực Tiếp Qua Đường Dẫn Riêng", description: "Mỗi nguyên liệu và công thức đều có đường dẫn chia sẻ chuyên biệt, giúp gửi chính xác thông tin kỹ thuật đến đồng nghiệp và đối tác trong tích tắc." },
      { time: "2:48", title: "10 | Minh Bạch Nguồn Thông Tin & Dẫn Chứng Gốc", description: "Mọi mã nguyên liệu cần lưu ý đều được gắn cảnh báo kỹ thuật rõ ràng và liên kết trực tiếp tới tài liệu kỹ thuật gốc từ nhà sản xuất Lipoid." },
      { time: "3:05", title: "Lời Kết: Tìm Đúng Nguyên Liệu – Phát Triển Công Thức Thông Minh Hơn", description: "Từ 535 nguyên liệu đến đúng giải pháp tối ưu không còn là bài toán mất nhiều tuần lễ. Tìm đúng nguyên liệu, hiểu đúng thông tin và phát triển công thức vượt trội!" }
    ],
    audience: "Kỹ sư R&D mỹ phẩm, Chuyên viên công thức kem dưỡng da, Nhà nghiên cứu hệ nhũ tương Phospholipid sinh học.",
    problem: "535 nguyên liệu và hàng chục tiêu chí kỹ thuật phức tạp khiến đội ngũ R&D mất nhiều tuần tra cứu tài liệu rời rạc và đối mặt nguy cơ tương kỵ hệ nhũ.",
    solution: "Trợ lý Lipoid Advisor số hóa toàn diện 535 nguyên liệu, cảnh báo tương kỵ tự động, gợi ý 81 công thức mẫu và tạo phiếu yêu cầu kỹ thuật/PDF tức thì.",
    keyFeatures: [
      "Bộ lọc thông minh: Lọc 535 nguyên liệu theo nhóm sản phẩm, mục tiêu da - tóc, dạng bào chế và vai trò phospholipid",
      "Kiểm tra tương kỵ tự động: Phát hiện lựa chọn chưa phù hợp, giải thích nguyên nhân và cảnh báo kỹ thuật",
      "'Chọn giúp tôi': Trả lời vài câu hỏi định hướng để nhận gợi ý nhóm nguyên liệu tối ưu",
      "Thư viện 81 công thức mẫu: Khám phá các formulation cho da mặt, cơ thể và tóc với thông số kỹ thuật chi tiết",
      "Tìm kiếm thông minh: Tra cứu nhanh theo tên, mã nguyên liệu hoặc công thức kể cả tiếng Việt không dấu",
      "Tạo phiếu yêu cầu A4: Tạo nhanh phiếu báo giá, mẫu thử, công thức hoặc yêu cầu hỗ trợ kỹ thuật",
      "Xem trước & lưu PDF: In hoặc tải phiếu định dạng PDF tiêu chuẩn trên máy tính và thiết bị di động",
      "My List: Gom các nguyên liệu quan tâm vào danh sách riêng để theo dõi và so sánh đặc tính",
      "Chia sẻ trực tiếp: Đường dẫn riêng biệt cho từng nguyên liệu và công thức giúp gửi thông tin tức thì",
      "Minh bạch thông tin: Cảnh báo kỹ thuật rõ ràng và dẫn nguồn trực tiếp đến tài liệu gốc từ nhà sản xuất Lipoid"
    ],
    theme: {
      from: "#7c3aed",
      to: "#8b5cf6",
      accent: "#7c3aed",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-800",
      badgeBorder: "border-purple-200"
    }
  },
  {
    id: "clinic-spa",
    logoUrl: '/apps/clinic-spa/app-logo.svg',
    name: "Clinic Spa Management",
    url: "https://linh-da-skinlab.pages.dev",
    category: "Dịch vụ & Quản lý Phòng khám",
    categoryId: "services-clinic",
    description: "Hệ thống phần mềm quản lý vận hành chuyên sâu cho Clinic & Spa Da liễu: Lịch hẹn, phác đồ điều trị và doanh thu.",
    tags: ["Clinic ERP", "Spa Booking", "Patient EMR", "Revenue"],
    coverImage: '/apps/clinic-spa/real-cover.jpg',
    placeholderImage: '/apps/clinic-spa/real-cover.jpg',
    detailImages: [
      '/apps/clinic-spa/real-cover.jpg',
      '/apps/clinic-spa/real-screen-2.jpg',
      '/apps/clinic-spa/real-screen-3.jpg'
    ],
    imageAlt: "Clinic Spa Management operational and appointment dashboard",
    featured: false,
    videoDuration: "1:15",
    videoTagline: "Vận hành phòng khám da liễu thẩm mỹ từ lịch hẹn đến hồ sơ bệnh án",
    videoScenes: [
      { time: "0:00", title: "Lịch hẹn Điều phối Trực quan", description: "Đặt lịch theo phòng, giường và chuyên viên trị liệu, tự động gửi nhắc hẹn tránh trùng ca." },
      { time: "0:15", title: "Hồ sơ Bệnh án & Soi da Y khoa", description: "Lưu trữ phác đồ điều trị đa buổi, hình ảnh theo dõi tiến trình hồi phục và lịch sử sử dụng mỹ phẩm." },
      { time: "0:30", title: "Định mức Tiêu hao Kho Dược mỹ phẩm", description: "Tự động trừ kho nguyên phụ liệu, serum, ampoule theo từng bước kỹ thuật của gói dịch vụ." },
      { time: "0:45", title: "Báo cáo Doanh thu & Tính Hoa hồng Tự động", description: "Tổng hợp doanh số dịch vụ, bán lẻ và tự động tính tỷ lệ hoa hồng cho bác sĩ, điều dưỡng, kỹ thuật viên." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Trợ thủ vận hành chuẩn y khoa giúp số hóa toàn diện quy trình phòng khám da liễu và spa chuyên sâu. Điểm bất ngờ khi thử nghiệm là thanh trượt so sánh Before-After hình ảnh da thực tế của khách hàng trực quan và tính năng cảnh báo tồn kho dược mỹ phẩm chạm ngưỡng an toàn. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như hệ thống phân quyền nhân sự đa cấp và quản lý thẻ thành viên tích điểm!" }
    ],
    audience: "Chủ Clinic Spa, Bác sĩ da liễu thẩm mỹ, Lễ tân phòng khám, Kỹ thuật viên chăm sóc da.",
    problem: "Quản lý lịch hẹn chồng chéo, thất thoát lịch sử liệu trình của khách hàng và khó kiểm soát hoa hồng kỹ thuật viên.",
    solution: "Quy trình số hóa từ đặt lịch thông minh, hồ sơ bệnh án da liễu điện tử đến tính toán doanh số và tồn kho mỹ phẩm sử dụng.",
    keyFeatures: [
      "Lịch hẹn thông minh kéo thả trực quan theo phòng, giường và chuyên viên",
      "Hồ sơ bệnh án điện tử lưu trữ hình ảnh soi da Before-After và phác đồ điều trị",
      "Quản lý định mức tiêu hao kho dược mỹ phẩm theo từng buổi trị liệu",
      "Báo cáo tài chính doanh thu và tính toán hoa hồng kỹ thuật viên tự động"
    ],
    theme: {
      from: "#db2777",
      to: "#ec4899",
      accent: "#db2777",
      badgeBg: "bg-pink-50",
      badgeText: "text-pink-800",
      badgeBorder: "border-pink-200"
    }
  },
  {
    id: "spa-landing",
    logoUrl: '/apps/spa-landing/app-logo.svg',
    name: "Spa Service Landing Page",
    url: "https://linhda-skinlap.pages.dev",
    category: "Dịch vụ & Trải nghiệm Khách hàng",
    categoryId: "services-clinic",
    description: "Trang đích cao cấp giới thiệu dịch vụ chăm sóc & trẻ hóa da chuyên sâu Linh Đa Skinlab với trải nghiệm hình ảnh sang trọng.",
    tags: ["Landing Page", "Spa Branding", "High Conversion", "Beauty UI"],
    coverImage: '/apps/spa-landing/real-cover.jpg',
    placeholderImage: '/apps/spa-landing/real-cover.jpg',
    detailImages: [
      '/apps/spa-landing/real-cover.jpg',
      '/apps/spa-landing/real-screen-2.jpg',
      '/apps/spa-landing/real-screen-3.jpg'
    ],
    imageAlt: "Linh Da Skinlab premium spa service landing page hero experience",
    featured: false,
    videoDuration: "1:15",
    videoTagline: "Trải nghiệm giao diện thẩm mỹ y khoa chuyển đổi cao trên di động",
    videoScenes: [
      { time: "0:00", title: "Hero Trải nghiệm Thẩm mỹ Y khoa", description: "Định vị thương hiệu cao cấp, thông điệp cá nhân hóa phác đồ điều trị và video clip trải nghiệm không gian viện thẩm mỹ." },
      { time: "0:15", title: "Bảng giá Minh bạch & Gói Dịch vụ", description: "Trình bày chi tiết từng bước liệu trình trẻ hóa da, bảng giá niêm yết rõ ràng và thời lượng thực hiện." },
      { time: "0:30", title: "Đặt hẹn Thông minh & Khảo sát Da Nhanh", description: "Form đăng ký tư vấn trực tuyến tích hợp câu hỏi trắc nghiệm nhanh tình trạng da để chuẩn bị trước hồ sơ thăm khám." },
      { time: "0:45", title: "Bảo chứng Y khoa & Đội ngũ Chuyên gia", description: "Hồ sơ năng lực bác sĩ da liễu, chứng nhận an toàn thiết bị y tế quốc tế và thư viện kết quả điều trị thực tế." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giao diện chuẩn y khoa sang trọng, tối ưu tỷ lệ chuyển đổi khách hàng tiềm năng trên thiết bị di động. Điểm bất ngờ khi thử nghiệm là popup ưu đãi khung giờ vàng thông minh xuất hiện đúng thời điểm khách hàng chuẩn bị thoát trang, giúp tăng mạnh số lượng cuộc gọi tư vấn. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như tính năng ước tính chi phí liệu trình và cổng kết nối tư vấn chuyên viên 24/7!" }
    ],
    audience: "Khách hàng cá nhân tìm kiếm dịch vụ điều trị da liễu, Chuyên gia marketing spa.",
    problem: "Các trang web spa thông thường thiếu sự tinh tế, tải chậm và tỷ lệ chuyển đổi khách đặt lịch điều trị thấp.",
    solution: "Thiết kế hiện đại chuẩn thẩm mỹ viện y khoa, hiển thị chi tiết bảng giá liệu trình, công nghệ máy móc và form đặt hẹn nhanh.",
    keyFeatures: [
      "Giao diện chuẩn y khoa cao cấp với tỷ lệ chuyển đổi khách hàng tiềm năng tối ưu",
      "Bảng giá dịch vụ và phác đồ trị liệu da công khai minh bạch",
      "Form đăng ký tư vấn thông minh tích hợp trắc nghiệm tình trạng da ban đầu",
      "Khu vực bảo chứng uy tín bác sĩ da liễu và chứng nhận công nghệ chuẩn quốc tế"
    ],
    theme: {
      from: "#e11d48",
      to: "#f43f5e",
      accent: "#e11d48",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-800",
      badgeBorder: "border-rose-200"
    }
  },
  {
    id: "bjc-sales-pitch",
    logoUrl: '/apps/bjc-sales-pitch/app-logo.svg',
    name: "Sales Pitch & Battle Card",
    url: "https://bjc-sales-pitch.pages.dev",
    category: "Bán hàng & Vũ khí Cạnh tranh",
    categoryId: "sales-business",
    description: "Công cụ hỗ trợ sales B2B tạo kịch bản thuyết phục khách hàng và tra cứu thẻ chiến lược đối đầu sản phẩm cạnh tranh.",
    tags: ["Battle Card", "Sales Pitch", "Value Selling", "Competitor Matrix"],
    coverImage: '/apps/bjc-sales-pitch/real-cover.jpg',
    placeholderImage: '/apps/bjc-sales-pitch/real-cover.jpg',
    detailImages: [
      '/apps/bjc-sales-pitch/real-cover.jpg',
      '/apps/bjc-sales-pitch/real-screen-2.jpg',
      '/apps/bjc-sales-pitch/real-screen-3.jpg'
    ],
    imageAlt: "Sales Pitch and Battle Card tool interface for B2B chemical sales",
    featured: false,
    videoDuration: "1:15",
    videoTagline: "Tạo kịch bản thuyết phục và đối đầu sản phẩm đối thủ trong 30 giây",
    videoScenes: [
      { time: "0:00", title: "Ma trận So sánh Sản phẩm & Đối thủ", description: "Đối chiếu trực diện thông số kỹ thuật, xuất xứ và hiệu quả công nghệ giữa sản phẩm công ty và đối thủ cạnh tranh." },
      { time: "0:15", title: "Thẻ Chiến lược Battle Card", description: "Bộ luận điểm phản biện sắc bén, vạch rõ điểm yếu của đối thủ và định vị giá trị khác biệt cốt lõi." },
      { time: "0:30", title: "Công cụ Tính toán ROI & Tổng Chi phí", description: "Nhập sản lượng và quy mô sản xuất của khách hàng để tính toán chính xác số tiền tiết kiệm nguyên liệu hàng năm." },
      { time: "0:45", title: "Kịch bản SPIN Selling & Xử lý Từ chối", description: "Cung cấp lộ trình câu hỏi gợi mở nhu cầu ngầm định, hóa giải lo ngại về đơn giá cao và chốt thỏa thuận hợp tác." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cẩm nang đàm phán di động cực kỳ thực chiến, giúp nhân viên kinh doanh tự tin tư vấn ngay trước mặt đối tác. Điểm bất ngờ khi thử nghiệm là khả năng kết xuất bản báo cáo đề xuất giá trị định dạng PDF chuyên nghiệp chỉ trong 5 giây để gửi ngay sau cuộc họp. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như thư viện mẫu thử nghiệm kỹ thuật và kho tài liệu chứng minh lâm sàng!" }
    ],
    audience: "Đại diện kinh doanh B2B, Kỹ sư bán hàng (Technical Sales), Trưởng phòng kinh doanh.",
    problem: "Sales lúng túng khi bị khách hàng ép giá hoặc so sánh với sản phẩm đối thủ ngoại nhập giá rẻ hơn.",
    solution: "Cung cấp ngay lập tức các luận điểm giá trị gia tăng (USP), phân tích tổng chi phí sở hữu (TCO) và kịch bản xử lý phản đối.",
    keyFeatures: [
      "Ma trận so sánh thông số kỹ thuật và tính năng trực diện với sản phẩm đối thủ",
      "Thẻ chiến lược Battle Card cung cấp luận điểm phản biện sắc bén khi gặp trở ngại giá",
      "Bảng tính kinh tế ROI và tổng chi phí sở hữu TCO theo thời gian thực",
      "Bộ kịch bản câu hỏi SPIN Selling và kết xuất bản đề xuất giá trị PDF tức thì"
    ],
    demoCredential: {
      account: "Trang@bjc.co.th",
      password: "•••••••••• (Trang@2026!)",
      note: "Tài khoản kiểm thử tính năng tra cứu kịch bản"
    },
    theme: {
      from: "#1d4ed8",
      to: "#2563eb",
      accent: "#1d4ed8",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-800",
      badgeBorder: "border-blue-200"
    }
  },
  {
    id: "badminton-management",
    logoUrl: '/apps/badminton-management/app-logo.svg',
    name: "Badminton Group Management",
    url: "https://splendid-panda-ef075e.netlify.app",
    category: "Thể thao & Quản lý Cộng đồng",
    categoryId: "services-clinic",
    description: "Hệ thống điều hành câu lạc bộ cầu lông toàn diện AEROz: Điểm danh 1 chạm 'Tôi đã đến', quét VietQR tự động đối soát gạch nợ, chia tiền sân cầu tự động và quản lý quỹ hội minh bạch.",
    tags: ["Badminton Club", "AEROz Manager", "VietQR Auto-match", "Court Scheduling", "Finance PWA"],
    coverImage: '/apps/badminton-management/cover.jpg',
    placeholderImage: '/apps/badminton-management/cover.jpg',
    illustrationImage: '/apps/badminton-management/feature_01_chao_mung_aeroz_badminton.jpg',
    detailImages: [
      '/apps/badminton-management/feature_01_chao_mung_aeroz_badminton.jpg',
      '/apps/badminton-management/feature_02_diem_danh_lich_choi_1_cham.jpg',
      '/apps/badminton-management/feature_03_quet_vietqr_tu_dong_gach_no.jpg',
      '/apps/badminton-management/feature_04_tinh_phi_buoi_choi_dashboard.jpg',
      '/apps/badminton-management/feature_05_phan_nhom_cong_bang_vang_lai.jpg',
      '/apps/badminton-management/feature_06_thanh_thoi_sau_buoi_danh.jpg',
      '/apps/badminton-management/feature_07_nhac_no_thong_minh_zalo_sms.jpg',
      '/apps/badminton-management/feature_08_bao_cao_dong_tien_phan_quyen.jpg',
      '/apps/badminton-management/feature_09_cong_dong_cau_long_minh_bach.jpg'
    ],
    imageAlt: "AEROz Badminton Group Management mobile interface and finance dashboard",
    featured: false,
    videoDuration: "3:46",
    videoTagline: "Chơi vui, quản lý gọn, tài chính minh bạch – Tự động hóa điểm danh, chia tiền và quỹ CLB",
    videoScenes: [
      { time: "0:00", title: "Chào Mừng & Giải Quyết Bài Toán Quản Lý CLB Cầu Lông", description: "Số hóa toàn diện hoạt động câu lạc bộ từ 30–100 thành viên, chấm dứt hoàn toàn tình trạng hỗn độn Excel và tin nhắn nhắc nợ thủ công." },
      { time: "0:38", title: "Điểm Danh & Lịch Chơi 1 Chạm 'Tôi Đã Đến'", description: "Thành viên chỉ cần bấm 'Tôi đã đến' trên điện thoại ngay khi đến sân, hệ thống tự động ghi nhận số lượng thực tế để phân bổ chi phí chính xác." },
      { time: "1:02", title: "Quét VietQR Tự Động Gạch Nợ Thông Minh", description: "Tích hợp mã VietQR động tự điền số tiền chính xác, tự động đối chiếu sao kê ngân hàng và cập nhật trạng thái 'Đã thu' không cần dò bill." },
      { time: "1:27", title: "Tự Động Chia Phí Buổi Chơi & Dashboard Dòng Tiền", description: "Tự động cộng tiền sân và tiền cầu, chia đều cho thành viên điểm danh, tính phụ phí khách vãng lai và trực quan hóa số dư quỹ theo thời gian thực." },
      { time: "1:50", title: "Quản Lý Nhóm Chơi & Phân Chia Công Bằng", description: "Điều phối lịch sân, sắp xếp cặp đấu theo trình độ, cân bằng số trận thi đấu giữa hội viên chính thức và vãng lai, hạn chế tối đa tranh cãi." },
      { time: "2:12", title: "Trải Nghiệm Thảnh Thơi Sau Buổi Tập Thể Thao", description: "Giải phóng ban chủ nhiệm và thủ quỹ khỏi gánh nặng sổ sách; thành viên yên tâm chơi thể thao hết mình, ra về sảng khoái không bận tâm tiền nong." },
      { time: "2:34", title: "Nhắc Nợ Tự Động Qua Zalo/SMS & Tra Cứu Cá Nhân", description: "Hệ thống tự phát hiện nợ quá hạn và gửi tin nhắn nhắc nhở tế nhị qua Zalo/SMS; thành viên tự do tra cứu lịch sử đóng tiền minh bạch." },
      { time: "2:54", title: "Báo Cáo Tài Chính Chuyên Nghiệp & Phân Quyền 3 Cấp", description: "Phân quyền 3 cấp Admin - Thủ quỹ - Thành viên; theo dõi biểu đồ dòng tiền, cơ cấu chi phí và xuất báo cáo sang Google Sheets chỉ với 1 chạm." },
      { time: "3:21", title: "Chuẩn PWA Hiện Đại – Chơi Vui, Quản Lý Gọn, Minh Bạch", description: "Cài đặt trực tiếp dạng Progressive Web App không cần App Store; giải pháp đồng hành bền vững xây dựng cộng đồng cầu lông văn minh, gắn kết." }
    ],
    audience: "Chủ nhiệm CLB cầu lông, Thủ quỹ, Vận động viên phong trào, Ban liên lạc thể thao.",
    problem: "Quản lý 30–100 thành viên bằng Excel và tin nhắn gây nhầm lẫn công nợ, tranh cãi chia tiền sân cầu và tốn hàng chục giờ đối soát thủ công.",
    solution: "AEROz Badminton Manager tự động hóa trọn gói: Điểm danh 1 chạm, quét VietQR gạch nợ tức thì, chia tiền thông minh và biểu đồ tài chính công khai.",
    keyFeatures: [
      "Điểm danh 1 chạm 'Tôi đã đến' trên điện thoại, ghi nhận chính xác sĩ số thực tế",
      "Thanh toán VietQR động tự điền tiền và tự động gạch nợ đối soát ngân hàng",
      "Thuật toán tự động chia tiền sân, tiền cầu và phụ phí vãng lai minh bạch",
      "Dashboard tài chính, biểu đồ dòng tiền và xuất báo cáo Google Sheets 1 cú nhấp",
      "Nhắc nợ thông minh qua Zalo/SMS và phân quyền bảo mật 3 cấp chuyên nghiệp"
    ],
    theme: {
      from: "#16a34a",
      to: "#22c55e",
      accent: "#16a34a",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200"
    }
  },
  {
    id: "tro-ly-vi-ngon",
    logoUrl: '/apps/tro-ly-vi-ngon/app-logo.svg',
    name: "Trợ Lý Vị Ngon",
    url: "https://trolyvingon.vercel.app/",
    category: "AI & Công nghệ Ẩm thực",
    categoryId: "food-tech",
    description: "Trợ lý trí tuệ nhân tạo chuyên sâu cho R&D và kỹ thuật thực phẩm: Chẩn đoán sự cố, bản đồ cảm quan trực quan, thay thế HVP sang Yeast Extract, Recipe Sandbox và tối ưu chi phí công thức.",
    tags: ["AI Culinary", "Flavor Pairing", "Umami Science", "Clean Label", "Yeast Extract", "Recipe Sandbox"],
    coverImage: '/apps/tro-ly-vi-ngon/cover.jpg',
    placeholderImage: '/apps/tro-ly-vi-ngon/cover.jpg',
    detailImages: [
      '/apps/tro-ly-vi-ngon/feature_01_gioi_thieu_tong_quan.jpg',
      '/apps/tro-ly-vi-ngon/feature_02_tro_ly_xu_ly_su_co_rd.jpg',
      '/apps/tro-ly-vi-ngon/feature_03_ban_do_thay_the_hvp.jpg',
      '/apps/tro-ly-vi-ngon/feature_04_ban_do_cam_quan_truc_quan.jpg',
      '/apps/tro-ly-vi-ngon/feature_05_kiem_tra_tuong_thich_nguyen_lieu.jpg',
      '/apps/tro-ly-vi-ngon/feature_06_recipe_sandbox_thu_nghiem.jpg',
      '/apps/tro-ly-vi-ngon/feature_07_kho_tinh_huong_thuc_te.jpg',
      '/apps/tro-ly-vi-ngon/feature_08_tinh_toan_hieu_qua_cong_thuc.jpg',
      '/apps/tro-ly-vi-ngon/feature_09_tra_cuu_san_pham_giai_phap.jpg',
      '/apps/tro-ly-vi-ngon/feature_10_gio_mau_thong_minh.jpg',
      '/apps/tro-ly-vi-ngon/feature_11_mot_nen_tang_da_dang_bai_toan.jpg',
      '/apps/tro-ly-vi-ngon/feature_12_loi_ket_thau_hieu_huong_vi.jpg'
    ],
    imageAlt: "Tro Ly Vi Ngon AI culinary R&D assistant platform interface and flavor profile",
    featured: false,
    videoDuration: "3:30",
    videoTagline: "Trợ lý AI chuyên sâu cho R&D thực phẩm: Chẩn đoán sự cố, bản đồ cảm quan, thay thế HVP & tối ưu công thức",
    videoScenes: [
      { time: "0:00", title: "TRỢ LÝ VỊ NGON: Trợ Lý AI Chuyên Sâu Cho R&D Thực Phẩm", description: "Một công thức gặp lỗi, nguyên liệu cần thay thế hay sự cố về vị và kết cấu. Trợ Lý Vị Ngon giúp đội ngũ R&D và kỹ thuật thực phẩm tìm ra giải pháp nhanh chóng, chính xác và hiệu quả." },
      { time: "0:18", title: "01 | Trợ Lý Xử Lý Sự Cố R&D", description: "Chẩn đoán siêu tốc các vấn đề kỹ thuật về vị, mùi lạ, lỗi lên men và kết cấu. Hệ thống tự động truy vết nguyên nhân gốc và gợi ý hướng xử lý kèm liều dùng cụ thể." },
      { time: "0:35", title: "02 | Bản Đồ Thay Thế HVP & Clean Label", description: "Lộ trình từng bước chuyển đổi từ HVP sang chiết xuất nấm men (Yeast Extract) theo xu hướng nhãn sạch Clean Label, loại bỏ triệt để rủi ro từ 3-MCPD và chất gây dị ứng." },
      { time: "0:52", title: "03 | Bản Đồ Cảm Quan Trực Quan", description: "So sánh 5 yếu tố cảm quan cốt lõi trên biểu đồ mạng nhện trực quan, giúp nhìn rõ sự khác biệt thuyết phục trước và sau khi ứng dụng giải pháp điều vị chuyên sâu." },
      { time: "1:08", title: "04 | Kiểm Tra Tương Thích Nguyên Liệu", description: "Khám phá cơ chế phối hợp sinh hóa, xác định tỷ lệ vàng và kích hoạt khả năng cộng hưởng vị giác giữa các nguyên liệu, tạo nên cấu trúc hương vị hài hòa nhất." },
      { time: "1:24", title: "05 | Recipe Sandbox – Thử Nghiệm Công Thức", description: "Không gian mô phỏng công thức ảo, cho phép thử nghiệm các ý tưởng gia vị, tinh chỉnh tỷ lệ và tham khảo công thức chuẩn hóa trước khi bước vào sản xuất mẻ thật." },
      { time: "1:40", title: "06 | Kho Tình Huống Thực Tế", description: "Tập hợp hàng trăm bài toán hóc búa từ hiện trường R&D thực chiến: xử lý mùi ngái đạm thực vật, giảm mặn nước mắm, cải thiện độ giòn dai và bền nhiệt cấu trúc." },
      { time: "1:58", title: "07 | Tính Toán Hiệu Quả Công Thức", description: "Tự động ước tính chi phí nguyên liệu trên từng kg thành phẩm và đo lường chính xác giá trị kinh tế mang lại khi tối ưu hóa hoặc thay thế nguyên liệu trong sản xuất." },
      { time: "2:15", title: "08 | Tra Cứu Sản Phẩm & Giải Pháp", description: "Nhanh chóng định vị đúng nguyên liệu và giải pháp chuyên biệt cho từng ngành hàng: thủy hải sản, chế biến thịt, gia vị nước chấm, đồ ngọt và đồ uống." },
      { time: "2:32", title: "09 | Giỏ Mẫu Thông Minh & Nhận Mẫu Thử Nghiệm", description: "Lưu lại danh mục nguyên liệu tối ưu trong quá trình tra cứu và gửi yêu cầu nhận mẫu thử nghiệm thực tế chỉ với một thao tác đơn giản." },
      { time: "2:48", title: "10 | Một Nền Tảng – Đa Dạng Bài Toán R&D", description: "Từ khơi nguồn ý tưởng, chẩn đoán lỗi, thử nghiệm công thức, đến hoàn thiện sản phẩm thương mại. Toàn bộ quy trình R&D được kết nối liền mạch trong một nền tảng." },
      { time: "3:05", title: "Lời Kết: Thấu Hiểu Hương Vị – Nâng Tầm Ẩm Thực", description: "Trợ Lý Vị Ngon giúp bạn hiểu sâu hơn, thử nghiệm thông minh hơn và sáng tạo công thức tốt hơn. Đừng chỉ tìm nguyên liệu, hãy tìm đúng giải pháp cho công thức của bạn!" }
    ],
    audience: "Đầu bếp R&D, Kỹ sư công nghệ thực phẩm, Chuyên gia phát triển gia vị sốt & sản phẩm chế biến.",
    problem: "Một công thức gặp lỗi, nguyên liệu cần thay thế, vấn đề về vị, mùi hay kết cấu khiến đội ngũ R&D mất nhiều tuần thử nghiệm tốn kém.",
    solution: "Nền tảng AI hỗ trợ chẩn đoán sự cố vị giác, đối chiếu bản đồ cảm quan trực quan, thay thế HVP sang Yeast Extract Clean Label và tính toán chi phí công thức tức thì.",
    keyFeatures: [
      "Trợ lý xử lý sự cố R&D: Chẩn đoán nhanh vị, mùi, lên men và kết cấu kèm hướng dẫn liều dùng",
      "Bản đồ cảm quan trực quan: So sánh 5 yếu tố cảm quan trước và sau giải pháp điều vị",
      "Bản đồ thay thế HVP: Chuyển đổi sang Yeast Extract Clean Label, giảm rủi ro 3-MCPD và dị nguyên",
      "Kiểm tra tương thích nguyên liệu: Tìm hiểu cơ chế phối hợp, tỷ lệ tối ưu và cộng hưởng hương vị",
      "Recipe Sandbox: Không gian mô phỏng và thử nghiệm công thức ảo ngay trên nền tảng",
      "Kho tình huống thực tế: Hàng trăm case study xử lý sự cố R&D từ hiện trường sản xuất",
      "Tính toán hiệu quả công thức: Ước tính chi phí sử dụng và đo lường giá trị kinh tế mang lại",
      "Tra cứu sản phẩm & giải pháp: Định vị nhanh nguyên liệu chuẩn xác cho từng nhóm ngành hàng",
      "Giỏ mẫu thông minh: Lưu trữ danh sách nguyên liệu và gửi yêu cầu nhận mẫu thử nghiệm thực tế",
      "Nền tảng R&D toàn diện: Kết nối toàn bộ chu trình từ ý tưởng, thử nghiệm đến hoàn thiện sản phẩm"
    ],
    theme: {
      from: "#ea580c",
      to: "#f97316",
      accent: "#ea580c",
      badgeBg: "bg-orange-50",
      badgeText: "text-orange-800",
      badgeBorder: "border-orange-200"
    }
  },
  {
    id: "vet-aqua-erp",
    logoUrl: '/apps/vet-aqua-erp/app-logo.png',
    name: "Vet & Aqua ERP Lite",
    url: "https://vet-aqua-erp-lite.vercel.app",
    category: "ERP & Nông nghiệp Thủy sản",
    categoryId: "agriculture-htx",
    description: "Hệ thống quản trị tinh gọn cho đại lý kinh doanh thuốc thú y, thủy sản: Quản lý kho FEFO cận date, công nợ vụ mùa, thanh toán VietQR & trợ lý AI.",
    tags: ["Vet ERP", "Thuốc thú y", "Thủy sản", "Quản lý tồn kho", "Công nợ vụ mùa", "VietQR", "Trợ lý AI"],
    coverImage: '/apps/vet-aqua-erp/feature_01_gioi_thieu_tong_quan.jpg',
    placeholderImage: '/apps/vet-aqua-erp/feature_01_gioi_thieu_tong_quan.jpg',
    illustrationImage: '/apps/vet-aqua-erp/feature_17_quan_tri_thau_suot_toan_dien.jpg',
    detailImages: [
      '/apps/vet-aqua-erp/feature_01_gioi_thieu_tong_quan.jpg',
      '/apps/vet-aqua-erp/feature_02_hang_can_date_xuat_truoc.jpg',
      '/apps/vet-aqua-erp/feature_03_chan_ban_hang_het_han.jpg',
      '/apps/vet-aqua-erp/feature_04_thanh_toan_vietqr_nhanh_chong.jpg',
      '/apps/vet-aqua-erp/feature_05_mat_mang_van_ban_hang_offline.jpg',
      '/apps/vet-aqua-erp/feature_06_tro_ly_ai_phac_do_dieu_tri.jpg',
      '/apps/vet-aqua-erp/feature_07_canh_bao_tuong_ky_thuoc.jpg',
      '/apps/vet-aqua-erp/feature_08_kiem_soat_han_muc_cong_no.jpg',
      '/apps/vet-aqua-erp/feature_09_phan_tich_rui_ro_cong_no.jpg',
      '/apps/vet-aqua-erp/feature_10_nhac_no_dung_luc_thu_hoach.jpg',
      '/apps/vet-aqua-erp/feature_11_biet_ro_loi_lo_moi_ngay.jpg',
      '/apps/vet-aqua-erp/feature_12_xuat_excel_so_sach_thong_tu_88.jpg',
      '/apps/vet-aqua-erp/feature_13_canh_bao_hoat_chat_va_giay_phep.jpg',
      '/apps/vet-aqua-erp/feature_14_quan_ly_nhiet_do_vac_xin.jpg',
      '/apps/vet-aqua-erp/feature_15_chup_hoa_don_nhap_kho_ai_ocr.jpg',
      '/apps/vet-aqua-erp/feature_16_hoa_hong_nhan_vien_kho_kien_thuc.jpg',
      '/apps/vet-aqua-erp/feature_17_quan_tri_thau_suot_toan_dien.jpg',
      '/apps/vet-aqua-erp/feature_18_nang_tam_kinh_doanh_thinh_vuong.jpg'
    ],
    imageAlt: "Vet & Aqua ERP Lite - Nền tảng quản lý đại lý thuốc thú y & thủy sản toàn diện",
    featured: true,
    videoDuration: "6:04",
    videoTagline: "Giải pháp số hóa toàn diện cho đại lý thuốc thú y, thủy sản: Quản lý kho FEFO, công nợ vụ mùa & trợ lý AI",
    videoScenes: [
      { time: "0:00", title: "Khó Khăn Quản Lý Hiệu Thuốc Thú Y & Thủy Sản", description: "Sổ sách thủ công, thuốc cận date nằm sâu trong kho và công nợ gối đầu nhiều vụ khiến chủ tiệm thất thoát hàng và tiền." },
      { time: "0:23", title: "01 | Cảnh Báo Hàng Cận Date & Xuất Trước", description: "Hệ thống tự động gắn nhãn màu xanh, vàng, đỏ theo hạn dùng, ưu tiên lô hàng cận date xuất bán trước tránh tồn vốn." },
      { time: "0:45", title: "02 | Tự Động Chặn Bán Hàng Hết Hạn", description: "Khóa xuất bán tức thì với mọi sản phẩm quá hạn dùng, phát cảnh báo đỏ rực trên máy bán hàng bảo vệ uy tín cửa hàng." },
      { time: "1:04", title: "03 | Thanh Toán Mã VietQR Chuẩn Xác, Nhanh Chóng", description: "Tự động tạo mã VietQR động đúng chính xác số tiền đơn hàng, quét mã tức thì qua ngân hàng, tránh nhầm lẫn tiền thối." },
      { time: "1:24", title: "04 | Mất Mạng Vẫn Bán Hàng Trơn Tru Ngoại Tuyến", description: "Chế độ ngoại tuyến (Offline-First): Mưa bão mất điện, đứt mạng Internet vẫn lập hóa đơn, in phiếu và tự đồng bộ khi có sóng." },
      { time: "1:47", title: "05 | Trợ Lý AI Gợi Ý Phác Đồ Điều Trị Gia Súc & Thủy Sản", description: "Nhân viên mới nhập triệu chứng bệnh là trợ lý AI đề xuất ngay phác đồ chuẩn, ưu tiên thuốc sẵn có trong kho." },
      { time: "2:08", title: "06 | Cảnh Báo Tương Kỵ Thuốc Nguy Hiểm", description: "Phát hiện tương tác thuốc tương kỵ ngay khi lên đơn, cảnh báo nguy hiểm kịp thời tránh gây sốc hoặc ngộ độc cho vật nuôi." },
      { time: "2:25", title: "07 | Tự Động Chặn Khách Nợ Quá Hạn Mức", description: "Thiết lập trần công nợ an toàn cho từng hộ nuôi; vượt quá hạn mức hệ thống tự động khóa sổ nợ, chờ chủ tiệm xét duyệt." },
      { time: "2:45", title: "08 | Phân Tích Rủi Ro Tín Dụng Khách Hàng", description: "Chấm điểm uy tín tín dụng dựa trên lịch sử mua bán và thanh toán thực tế, giúp chủ tiệm ra quyết định cho nợ chuẩn xác." },
      { time: "3:04", title: "09 | Nhắc Nợ Tự Động Đúng Lúc Thu Hoạch", description: "Theo dõi sát sao chu kỳ thả giống và lịch thu hoạch tôm cá, tự động tạo tin nhắn đối soát công nợ gửi qua Zalo đúng lúc." },
      { time: "3:25", title: "10 | Biết Rõ Doanh Thu & Lời Lỗ Hằng Ngày", description: "Biểu đồ trực quan nhảy số liên tục theo thời gian thực: Doanh số, giá vốn, chi phí vận hành và lợi nhuận ròng chuẩn xác." },
      { time: "3:45", title: "11 | Xuất Sổ Kế Toán & Báo Cáo Thuế Excel", description: "Một cú chạm xuất toàn bộ báo cáo nhập xuất tồn và sổ sách kế toán ra file Excel chuẩn mẫu Thông tư 88 của Bộ Tài chính." },
      { time: "4:05", title: "12 | Cảnh Báo Hoạt Chất Kiểm Soát & Hạn Giấy Phép", description: "Gắn nhãn kháng sinh kiểm soát đặc biệt và tự động đếm ngược 60 ngày nhắc chủ tiệm gia hạn giấy phép hành nghề thú y." },
      { time: "4:24", title: "13 | Quản Lý Nhiệt Độ Tủ Mát & Truy Xuất Lô Vắc-Xin", description: "Theo dõi nhiệt độ tủ mát 2-8°C chuẩn GSP và truy vết nguồn gốc lô vắc-xin chi tiết theo từng khách hàng mua lẻ." },
      { time: "4:44", title: "14 | Chụp Hóa Đơn Nhập Kho Bằng Công Nghệ OCR", description: "Chụp ảnh hóa đơn giấy nhà cung cấp, công nghệ AI OCR tự động trích xuất mã thuốc, số lượng, đơn giá lưu thẳng vào kho." },
      { time: "5:04", title: "15 | Tự Động Tính Hoa Hồng & Kho Kiến Thức Tra Cứu", description: "Tự động tính hoa hồng khuyến khích nhân viên đẩy hàng và cung cấp cẩm nang bệnh học số hóa tra cứu tức thì tại quầy." },
      { time: "5:23", title: "16 | Quản Trị Thấu Suốt Toàn Diện Cho Cửa Hàng Thú Y", description: "Nắm thấu suốt hàng hóa, dòng tiền, hạn dùng và công nợ trên một nền tảng duy nhất, mang lại sự tin cậy tuyệt đối." },
      { time: "5:46", title: "17 | Nâng Tầm Kinh Doanh & Thịnh Vượng Bền Vững", description: "Đồng hành cùng các chủ đại lý thuốc thú y, thủy sản miền Tây chuyển đổi số thành công, phát triển cơ ngơi vững mạnh." }
    ],
    audience: "Chủ đại lý thuốc thú y & thủy sản, Nhà phân phối thức ăn chăn nuôi, Dược sĩ thú y và Nhân viên bán hàng quầy vật tư nông nghiệp.",
    problem: "Hàng hóa cận date nằm sâu trong kho dễ thất thoát, nhân viên sơ ý bán nhầm thuốc hết hạn gây mất uy tín, bà con nợ gối đầu qua nhiều vụ khó đòi, mất mạng Internet không bán được hàng và cuối tháng cộng sổ thủ công cực nhọc.",
    solution: "Vet-Aqua ERP Lite: Tự động cảnh báo hàng cận date và chặn bán hàng hết hạn, thanh toán VietQR đúng tiền, chế độ ngoại tuyến mất mạng vẫn bán hàng trơn tru, trợ lý AI hỗ trợ phác đồ và cảnh báo tương kỵ thuốc, quản lý trần công nợ, nhắc nợ đúng vụ thu hoạch và xuất báo cáo thuế Excel theo Thông tư 88.",
    keyFeatures: [
      "Quản lý hạn dùng FEFO: Tự động gắn nhãn cảnh báo màu sắc và ưu tiên xuất bán lô hàng cận date",
      "Tự động chặn bán hàng hết hạn: Khóa xuất kho tức thì, bảo vệ an toàn vật nuôi và uy tín cửa hàng",
      "Thanh toán mã VietQR tự động: Tạo mã QR đúng số tiền đơn hàng, thao tác nhanh và không nhầm lẫn tiền thối",
      "Chế độ ngoại tuyến (Offline-First): Mưa bão mất mạng vẫn bán hàng, in hóa đơn và tự động đồng bộ khi có kết nối",
      "Trợ lý AI gợi ý phác đồ điều trị: Tra cứu triệu chứng, đề xuất hướng xử lý và ưu tiên thuốc sẵn có trong kho",
      "Cảnh báo tương kỵ thuốc tức thì: Phát hiện tương tác thuốc nguy hiểm ngay khi lên đơn để điều chỉnh kịp thời",
      "Kiểm soát hạn mức công nợ: Thiết lập trần nợ từng hộ nuôi, tự động chặn bán chịu khi vượt ngưỡng an toàn",
      "Chấm điểm rủi ro tín dụng: Phân tích lịch sử giao dịch và khả năng thanh toán để phân loại khách hàng",
      "Nhắc nợ thông minh qua Zalo: Theo dõi sát sao lịch thu hoạch tôm cá, tạo tin nhắn đối soát công nợ gửi đúng thời điểm",
      "Báo cáo doanh thu & lời lỗ theo thời gian thực: Cập nhật biến động thu chi, giá vốn và biên lợi nhuận ròng hàng ngày",
      "Xuất sổ sách kế toán & báo cáo thuế ra Excel: Chuẩn mẫu Thông tư 88/2021/TT-BTC chỉ với một cú chạm",
      "Quản lý hoạt chất kiểm soát & nhắc hạn giấy phép: Tự động cảnh báo đếm ngược 60 ngày gia hạn giấy phép trạm thú y",
      "Kiểm soát nhiệt độ tủ mát & truy xuất lô vắc-xin: Lưu trữ lịch sử nhiệt độ chuẩn 2-8°C và truy vết nguồn gốc chi tiết",
      "Nhập kho nhanh bằng AI OCR: Chụp ảnh hóa đơn giấy nhà cung cấp, tự động trích xuất sản phẩm lưu thẳng vào hệ thống",
      "Động lực nhân viên & kho kiến thức nội bộ: Tự động tính hoa hồng bán hàng và cẩm nang số hóa hỗ trợ đứng quầy"
    ],
    theme: {
      from: "#0891b2",
      to: "#06b6d4",
      accent: "#0891b2",
      badgeBg: "bg-cyan-50",
      badgeText: "text-cyan-800",
      badgeBorder: "border-cyan-200"
    }
  },
  {
    id: "yeast-extract-test",
    logoUrl: '/apps/yeast-extract-test/app-logo.png',
    name: "Yeast Extract Knowledge Test",
    url: "https://cool-tulumba-fa58d6.netlify.app/",
    category: "Đào tạo & Đánh giá năng lực",
    categoryId: "ai-education",
    description: "Bộ trắc nghiệm số hóa đánh giá chuyên sâu kiến thức công nghệ chiết xuất nấm men Lallemand Savory trong chế biến thực phẩm.",
    tags: ["Assessment", "Yeast Extract", "Lallemand", "Skill Test"],
    coverImage: '/apps/yeast-extract-test/real-cover.jpg',
    placeholderImage: '/apps/yeast-extract-test/real-cover.jpg',
    detailImages: [
      '/apps/yeast-extract-test/real-cover.jpg',
      '/apps/yeast-extract-test/real-screen-2.jpg',
      '/apps/yeast-extract-test/real-screen-3.jpg',
      '/apps/yeast-extract-test/infographic.png',
      '/apps/yeast-extract-test/product-grid.jpg'
    ],
    imageAlt: "Yeast Extract Knowledge Test multiple choice question exam screen",
    featured: false,
    videoDuration: "1:15",
    videoTagline: "Trắc nghiệm đánh giá kiến thức chuyên môn nấm men chiết xuất Lallemand",
    videoScenes: [
      { time: "0:00", title: "Ngân hàng Đề thi Thực tế 100+ Câu hỏi", description: "Bộ câu hỏi tình huống ứng dụng chiết xuất nấm men trong gia vị, nước xốt, mì ăn liền và thực phẩm chay." },
      { time: "0:15", title: "Thi Trực tuyến & Cơ chế Chống Gian lận", description: "Đồng hồ đếm ngược thông minh, tự động đảo câu hỏi và đáp án, tự động nộp bài khi hết giờ." },
      { time: "0:30", title: "Phân tích Cơ chế Hóa sinh & Đáp án", description: "Giải thích cặn kẽ cơ chế tạo vị Umami, phản ứng Maillard và so sánh hiệu quả giữa các cấp độ nấm men." },
      { time: "0:45", title: "Biểu đồ Radar Năng lực & Chứng nhận Điện tử", description: "Đo lường chính xác điểm mạnh yếu theo 5 khía cạnh kỹ thuật và cấp chứng chỉ chuẩn năng lực có mã xác thực." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Nền tảng đánh giá và đào tạo chuyên môn xuất sắc cho nhân sự kỹ thuật ngành công nghệ thực phẩm. Điểm bất ngờ khi thử nghiệm là hệ thống gợi ý tài liệu học bù tương ứng ngay tại những câu trả lời sai, giúp người học củng cố kiến thức lập tức. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như bảng xếp hạng thành tích nhóm và bộ đề ôn tập tình huống lỗi công thức sản phẩm!" }
    ],
    audience: "Kỹ sư công nghệ thực phẩm, Đội ngũ sales nguyên liệu hương vị, Kỹ thuật viên R&D.",
    problem: "Nấm men chiết xuất có nhiều chủng loại phức tạp (tự phân, thủy phân, giàu ribonucleotide), nhân viên thường nhầm lẫn khi tư vấn.",
    solution: "Hệ thống trắc nghiệm phân tầng từ cơ bản đến nâng cao với giải thích cơ chế khoa học chi tiết sau mỗi câu hỏi giúp khắc sâu kiến thức.",
    keyFeatures: [
      "Ngân hàng 100+ câu hỏi tình huống thực tế về ứng dụng nấm men trong súp, sốt, gia vị",
      "Đồng hồ đếm ngược thi trực tuyến kèm cơ chế xáo trộn câu hỏi chống gian lận",
      "Bản phân tích cơ chế hóa sinh giải thích cặn kẽ từng phương án trả lời",
      "Cấp chứng nhận năng lực hoàn thành bài thi tiêu chuẩn kèm mã xác thực trực tuyến"
    ],
    illustrationImage: '/apps/yeast-extract-test/infographic.png',
    theme: {
      from: "#b45309",
      to: "#d97706",
      accent: "#b45309",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-900",
      badgeBorder: "border-amber-200"
    }
  },
  {
    id: "vanderbilt-advisor",
    logoUrl: '/apps/vanderbilt-advisor/app-logo.svg',
    name: "Vanderbilt R&D Advisor",
    url: "https://vanderbiltadvisor.vercel.app",
    category: "R&D & Hóa chất Chuyên dụng",
    categoryId: "rd-cosmetics",
    description: "Cố vấn kỹ thuật số thông minh tra cứu 52 khoáng chất & chất lưu biến chuyên dụng Vanderbilt (Veegum, Vanzan, Vansil, Darvan...): Hướng dẫn xử lý 27 sự cố công thức, phòng mô phỏng SOP hydrat hóa, công cụ tính khối lượng mẻ, thư viện hơn 200 công thức ứng dụng và xuất phiếu yêu cầu A4/PDF chuyên nghiệp.",
    tags: ["Vanderbilt", "Veegum", "Vanzan", "Rheology Modifier", "Suspension AI", "Formulation SOP", "Batch Calculator"],
    coverImage: '/apps/vanderbilt-advisor/cover.jpg',
    placeholderImage: '/apps/vanderbilt-advisor/cover.jpg',
    detailImages: [
      '/apps/vanderbilt-advisor/feature_01_tong_quan.jpg',
      '/apps/vanderbilt-advisor/feature_02_tra_cuu_tieng_viet.jpg',
      '/apps/vanderbilt-advisor/feature_03_tim_dung_san_pham.jpg',
      '/apps/vanderbilt-advisor/feature_04_huong_xu_ly_van_de.jpg',
      '/apps/vanderbilt-advisor/feature_05_mo_phong_sop.jpg',
      '/apps/vanderbilt-advisor/feature_06_tinh_khoi_luong_me.jpg',
      '/apps/vanderbilt-advisor/feature_07_200_cong_thuc_ung_dung.jpg',
      '/apps/vanderbilt-advisor/feature_08_tra_cuu_52_san_pham.jpg',
      '/apps/vanderbilt-advisor/feature_09_chung_nhan_phap_ly.jpg',
      '/apps/vanderbilt-advisor/feature_10_tao_phieu_yeu_cau_pdf.jpg',
      '/apps/vanderbilt-advisor/feature_11_he_sinh_thai_khoang_chat.jpg',
      '/apps/vanderbilt-advisor/feature_12_ket_noi_lab_toan_dien.jpg',
      '/apps/vanderbilt-advisor/feature_13_loi_ket_thong_minh.jpg'
    ],
    imageAlt: "Vanderbilt R&D Advisor intelligent mineral search and rheology formulation advisor interface",
    featured: false,
    videoDuration: "4:13",
    videoTagline: "Trợ lý AI chuyên sâu tra cứu 52 khoáng chất Vanderbilt, xử lý 27 sự cố công thức và mô phỏng SOP",
    videoScenes: [
      { time: "0:00", title: "VANDERBILT ADVISOR: Cố Vấn Kỹ Thuật Số R&D Cho Khoáng Chất & Lưu Biến", description: "Làm R&D, điều khó là khi công thức gặp sự cố thì mất bao lâu để tìm đúng giải pháp? Vanderbilt Advisor đồng hành cùng R&D giải quyết mọi bài toán công thức nhanh và chuẩn xác." },
      { time: "0:25", title: "01 | Tra Cứu Hoàn Toàn Bằng Tiếng Việt", description: "Giao diện và thông số kỹ thuật được Việt hóa trực quan, sử dụng thuận tiện trên máy tính và điện thoại ngay tại phòng Lab hay khi trao đổi với khách hàng." },
      { time: "0:45", title: "02 | Tìm Đúng Sản Phẩm Theo Nhu Cầu", description: "Không cần nhớ hết mã sản phẩm, chỉ cần chọn ngành hàng và nhu cầu công thức, hệ thống gợi ý ngay mã nguyên liệu tối ưu và giải thích lý do lựa chọn." },
      { time: "1:05", title: "03 | Gặp Vấn Đề Công Thức – Có Ngay Hướng Xử Lý", description: "Tổng hợp 27 vấn đề thường gặp trên 8 ngành hàng, chỉ rõ nguyên nhân và đưa ra hướng xử lý bài bản kèm mã khoáng chất phù hợp." },
      { time: "1:23", title: "04 | Mô Phỏng Quy Trình Thử Nghiệm Chuẩn SOP", description: "Phòng SOP mô phỏng các yếu tố cốt lõi: nhiệt độ, lực khuấy shear và thời gian hydrat hóa, cảnh báo rủi ro nếu thao tác sai quy trình." },
      { time: "1:47", title: "05 | Tính Nhanh Khối Lượng Mẻ", description: "Quy đổi mẻ từ 100g phòng Lab lên 10kg, 50kg hay 500kg trong tích tắc, tự động tính lại khối lượng từng thành phần chính xác tuyệt đối." },
      { time: "2:06", title: "06 | Thư Viện Hơn 200 Công Thức Ứng Dụng", description: "Kho hơn 200 công thức khung chuẩn quốc tế cho chăm sóc da, kem chống nắng, trang điểm và dược phẩm, sẵn sàng tham khảo phát triển." },
      { time: "2:24", title: "07 | Tra Cứu 52 Sản Phẩm Với Nhiều Bộ Lọc", description: "Bộ lọc đa tiêu chí theo ngành hàng, tính năng lưu biến, độ nhớt và chứng nhận khắt khe, giúp thu hẹp danh sách nguyên liệu nhanh chóng." },
      { time: "2:42", title: "08 | Hiểu Chứng Nhận Và Hồ Sơ Pháp Lý", description: "Giải thích cặn kẽ các chứng nhận quốc tế (GMP, FSSC 22000, COSMOS...) và cung cấp tài liệu kỹ thuật gốc phục vụ hồ sơ công bố sản phẩm." },
      { time: "3:01", title: "09 | Chọn Sản Phẩm – Tạo Phiếu Yêu Cầu PDF Ngay", description: "Lựa chọn nguyên liệu và công thức rồi xuất ngay phiếu yêu cầu khổ A4 định dạng PDF chuyên nghiệp để xin mẫu hoặc nhận báo giá tức thì." },
      { time: "3:18", title: "10 | Tập Trung Vào Hệ Sinh Thái Khoáng Chất Vanderbilt", description: "Tích hợp toàn diện các dòng khoáng chất danh tiếng: VEEGUM®, VANZAN®, VANSIL®, VAN GEL®, VANATURAL®, DARVAN®, PYRAX®, NACAP®." },
      { time: "3:36", title: "11 | Kết Nối Toàn Diện Từ Ý Tưởng Đến Thực Nghiệm", description: "Kết nối liền mạch từ tìm kiếm, lựa chọn, hiểu ứng dụng, thử nghiệm đến chuẩn bị yêu cầu kỹ thuật, tiết kiệm hàng tuần nghiên cứu." },
      { time: "3:54", title: "12 | Lời Kết: Tìm Đúng Nguyên Liệu – Phát Triển Công Thức Thông Minh Hơn", description: "Tìm đúng nguyên liệu, hiểu đúng ứng dụng, phát triển sản phẩm thông minh và vượt trội cùng Vanderbilt Advisor." }
    ],
    audience: "Kỹ sư R&D mỹ phẩm & dược phẩm, Chuyên viên công thức kem/huyền phù, Chuyên viên phòng Lab và Sales nguyên liệu.",
    problem: "Đất sét khoáng và chất lưu biến đòi hỏi điều kiện hydrat hóa nghiêm ngặt, tài liệu tiếng Anh phức tạp và dễ gặp sự cố vón cục, lắng cặn hoặc tách lớp.",
    solution: "Cố vấn kỹ thuật số Vanderbilt Advisor Việt hóa toàn diện 52 khoáng chất, hướng dẫn xử lý 27 sự cố công thức, mô phỏng SOP và cung cấp hơn 200 công thức ứng dụng.",
    keyFeatures: [
      "Tra cứu hoàn toàn bằng tiếng Việt trên cả điện thoại và máy tính",
      "Tìm đúng sản phẩm theo nhu cầu công thức và giải thích lý do lựa chọn",
      "Bắt bệnh và hướng xử lý cho 27 vấn đề thường gặp trên 8 ngành hàng",
      "Phòng SOP mô phỏng nhiệt độ, lực khuấy và thời gian hydrat hóa",
      "Tính nhanh khối lượng mẻ sản xuất từ 100g đến hàng trăm kilogam",
      "Thư viện hơn 200 công thức ứng dụng chuẩn quốc tế",
      "Bộ lọc thông minh 52 sản phẩm khoáng chất theo ngành và chứng nhận",
      "Hiểu rõ chứng nhận tiêu chuẩn và hồ sơ pháp lý kỹ thuật gốc",
      "Tạo và xuất phiếu yêu cầu khổ A4 định dạng PDF chuyên nghiệp",
      "Hệ sinh thái khoáng chất chuyên dụng: Veegum, Vanzan, Vansil, Darvan..."
    ],
    illustrationImage: '/apps/vanderbilt-advisor/feature_11_he_sinh_thai_khoang_chat.jpg',
    theme: {
      from: "#475569",
      to: "#64748b",
      accent: "#475569",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-800",
      badgeBorder: "border-slate-300"
    }
  },
  {
    id: "algaktiv-advisor",
    logoUrl: '/apps/algaktiv-advisor/app-logo.png',
    name: "Algaktiv R&D Advisor",
    url: "https://algaktivadvisor.vercel.app",
    category: "R&D & Hoạt chất Công nghệ sinh học",
    categoryId: "rd-cosmetics",
    description: "Cố vấn công nghệ sinh học biển ALGAKTIV® Bio-Tech Navigator: Khám phá 4 nhóm vi tảo nền tảng, tra cứu 10 hoạt chất độc quyền có chứng minh lâm sàng, Formulation Decision Wizard 4 bước định hướng công thức và bảng so sánh công nghệ trực quan.",
    tags: ["Algaktiv", "Microalgae", "Blue Biotechnology", "Biotech Actives", "Exosomes", "Retinoid Alternative", "Formulation Wizard"],
    coverImage: '/apps/algaktiv-advisor/cover.jpg',
    placeholderImage: '/apps/algaktiv-advisor/cover.jpg',
    detailImages: [
      '/apps/algaktiv-advisor/feature_01_tong_quan_blue_biotech.jpg',
      '/apps/algaktiv-advisor/feature_02_4_nhom_vi_tao_nen_tang.jpg',
      '/apps/algaktiv-advisor/feature_03_thu_vien_10_hoat_chat_lam_sang.jpg',
      '/apps/algaktiv-advisor/feature_04_formulation_decision_wizard.jpg',
      '/apps/algaktiv-advisor/feature_05_so_sanh_cong_nghe_truc_quan.jpg',
      '/apps/algaktiv-advisor/feature_06_trai_nghiem_mobile_first_claims.jpg'
    ],
    imageAlt: "Algaktiv R&D Advisor Blue Biotechnology ingredient discovery and clinical evidence interface",
    featured: false,
    videoDuration: "3:09",
    videoTagline: "Trợ lý AI chuyên sâu khám phá hoạt chất vi tảo sinh học biển Algaktiv & Định hướng công thức",
    videoScenes: [
      { time: "0:00", title: "ALGAKTIV® Bio-Tech Navigator: Khám Phá Hoạt Chất Vi Tảo Sinh Học Biển", description: "Kết nối liền mạch từ cơ chế sinh học, lựa chọn hoạt chất, định hướng công thức đến luận điểm truyền thông khoa học chuẩn Clean Beauty." },
      { time: "0:40", title: "01 | Nền Tảng Công Nghệ Sinh Học Lam & 4 Nhóm Vi Tảo Đột Phá", description: "Khám phá 4 nhóm vi tảo nền tảng: Chlorophyta, Diatoms, Cyanobacteria, Haptophyta và lọc theo nhu cầu trẻ hóa, săn chắc, phục hồi, dưỡng tóc hoặc từ khóa cơ chế." },
      { time: "1:15", title: "02 | Thư Viện 10 Hoạt Chất Sinh Học Độc Quyền & Chứng Minh Lâm Sàng", description: "Tra cứu chuyên sâu cơ chế tế bào, dữ liệu lâm sàng In-Vivo trên người thật, tỷ lệ nồng độ khuyến nghị, độ tan, khoảng pH và các cặp hoạt chất cộng hưởng sinh học." },
      { time: "1:45", title: "03 | Formulation Decision Wizard – 4 Bước Định Hướng Công Thức", description: "Cố vấn công thức 4 bước: Dạng sản phẩm → Xu hướng → Vấn đề da/tóc → Gợi ý công thức, tỷ lệ phối trộn và luận điểm marketing có cơ sở khoa học." },
      { time: "2:13", title: "04 | Bảng So Sánh Công Nghệ Trực Quan & Minh Bạch Cơ Chế", description: "Bảng so sánh đa chiều: Vegan Exosome vs Liposome vs Chiết xuất truyền thống; Marine Retinoid vs Retinol & Bakuchiol về độ ổn định và an toàn." },
      { time: "2:43", title: "05 | Trải Nghiệm Mobile-First & Lời Kết Kiến Tạo Tương Lai", description: "Trải nghiệm mượt mà trên điện thoại và máy tính. Explore the Science – Formulate the Future cùng Algaktiv Bio-Tech Navigator." }
    ],
    audience: "Chuyên viên phát triển mỹ phẩm thiên nhiên, Kỹ sư R&D dòng sản phẩm cao cấp, Brand Manager, Chuyên viên phòng Lab.",
    problem: "Cần tìm các hoạt chất công nghệ sinh học xanh bền vững có chứng minh lâm sàng (In-Vivo) rõ ràng và cơ chế khoa học thuyết phục để xây dựng câu chuyện sản phẩm.",
    solution: "Cố vấn số ALGAKTIV® Bio-Tech Navigator hệ thống hóa 4 nhóm vi tảo, 10 hoạt chất độc quyền, thuật toán Decision Wizard 4 bước và bảng so sánh công nghệ trực quan.",
    keyFeatures: [
      "Khám phá 4 nhóm vi tảo nền tảng công nghệ sinh học lam Blue Biotechnology",
      "Lọc hoạt chất siêu tốc theo nhu cầu (well-aging, phục hồi...) và từ khóa cơ chế",
      "Thư viện 10 hoạt chất Algaktiv với dữ liệu lâm sàng In-Vivo và tương thích pH",
      "Gợi ý các cặp hoạt chất có khả năng phối hợp cộng hưởng sinh học",
      "Formulation Decision Wizard: 4 bước định hướng công thức và claims marketing",
      "Bảng so sánh công nghệ trực quan: Vegan Exosome, Marine Retinoid, Liposome...",
      "Trải nghiệm Mobile-first tối ưu mượt mà cho mọi thiết bị di động"
    ],
    illustrationImage: '/apps/algaktiv-advisor/feature_05_so_sanh_cong_nghe_truc_quan.jpg',
    theme: {
      from: "#059669",
      to: "#10b981",
      accent: "#059669",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200"
    }
  },
  {
    id: "lanxess-cosmetic-advisor",
    logoUrl: '/apps/lanxess-cosmetic-advisor/app-logo.png',
    name: "LANXESS Cosmetic Advisor",
    url: "https://lanxess-cosmetic-advisor.pages.dev/",
    category: "R&D & Hệ thống Bảo quản",
    categoryId: "rd-cosmetics",
    description: "Hệ thống hỗ trợ lựa chọn giải pháp bảo quản mỹ phẩm, kiểm soát vi sinh an toàn và tuân thủ quy định quốc tế từ tập đoàn LANXESS.",
    tags: ["LANXESS", "Preservatives", "Microbiology", "Regulatory"],
    coverImage: '/apps/lanxess-cosmetic-advisor/real-cover.jpg',
    placeholderImage: '/apps/lanxess-cosmetic-advisor/real-cover.jpg',
    detailImages: [
      '/apps/lanxess-cosmetic-advisor/real-cover.jpg',
      '/apps/lanxess-cosmetic-advisor/real-screen-2.jpg',
      '/apps/lanxess-cosmetic-advisor/real-screen-3.jpg'
    ],
    imageAlt: "LANXESS Cosmetic Advisor preservative selection and microbial control interface",
    featured: false,
    videoDuration: "1:15",
    videoTagline: "Chọn hệ chất bảo quản phổ rộng & kiểm soát nhiễm khuẩn mỹ phẩm",
    videoScenes: [
      { time: "0:00", title: "Bộ lọc Hệ Bảo quản theo pH & Dạng Sản phẩm", description: "Lựa chọn chất bảo quản thay thế Paraben (như Benzyl Alcohol, Benzoic Acid, Dehydroacetic Acid) tương thích theo dải pH 3.0 đến 8.5." },
      { time: "0:15", title: "Mô phỏng Thử nghiệm Vi sinh ISO 11930", description: "Đồ thị đường cong tiêu diệt vi sinh vật mô phỏng bài kiểm tra Challenge Test 28 ngày đối với nấm men, nấm mốc và vi khuẩn." },
      { time: "0:30", title: "Tra cứu Pháp lý Toàn cầu ASEAN, EU & FDA", description: "Đối chiếu giới hạn nồng độ tối đa cho phép trong mỹ phẩm lưu lại (leave-on) và mỹ phẩm rửa trôi (rinse-off) theo quy định quốc tế." },
      { time: "0:45", title: "Tối ưu Hiệu quả Sát khuẩn & Hiệp đồng Tác dụng", description: "Hướng dẫn kết hợp các chất trợ bảo quản (Chelating agents, Caprylyl Glycol) để tăng cường phổ kháng khuẩn và giảm liều lượng hoạt chất chính." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giải pháp kỹ thuật bảo quản mỹ phẩm không Paraben toàn diện và khoa học nhất cho các phòng R&D mỹ phẩm. Điểm bất ngờ khi thử nghiệm là công cụ cảnh báo tương tác vô hiệu hóa chất bảo quản khi công thức có chứa chất hoạt động bề mặt ethoxylated (như Polysorbate). Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như công cụ tính toán chi phí bảo quản cho mỗi kilogam thành phẩm và bảng chứng nhận an toàn cho da nhạy cảm!" }
    ],
    audience: "Kỹ sư R&D mỹ phẩm, Chuyên viên an toàn sản phẩm (Regulatory Affairs), Kỹ thuật viên vi sinh.",
    problem: "Xu hướng loại bỏ Paraben/Phenoxyethanol đòi hỏi phải tìm hệ bảo quản thay thế nhưng vẫn phải vượt qua bài kiểm tra Challenge Test khắt khe.",
    solution: "Thuật toán gợi ý hệ bảo quản phổ rộng dựa trên pH sản phẩm, dạng bào chế và thị trường xuất khẩu mục tiêu (ASEAN, EU, USA).",
    keyFeatures: [
      "Bộ lọc chất bảo quản không Paraben theo khoảng pH ổn định và dạng sản phẩm",
      "Mô phỏng đường cong động học tiêu diệt vi sinh vật bài test 28 ngày ISO 11930",
      "Kiểm tra tính tuân thủ pháp lý theo tiêu chuẩn mỹ phẩm ASEAN, EU và FDA",
      "Giải pháp phối hợp chất trợ bảo quản nâng cao phổ ức chế nấm men nấm mốc"
    ],
    theme: {
      from: "#dc2626",
      to: "#ef4444",
      accent: "#dc2626",
      badgeBg: "bg-red-50",
      badgeText: "text-red-800",
      badgeBorder: "border-red-200"
    }
  },
  {
    id: "htx-rau-cu",
    logoUrl: '/apps/htx-rau-cu/app-logo.png',
    name: "HTX Rau Củ Quả",
    url: "https://htxraucuqua.vercel.app",
    category: "Nông nghiệp & Chuỗi cung ứng HTX",
    categoryId: "agriculture-htx",
    description: "Phần mềm Cánh Đồng Số quản trị toàn diện Hợp tác xã nông nghiệp: Quản lý đơn hàng, xuất nhập kho theo lô, sổ quỹ tiền rau xã viên, dự báo sản lượng và cảnh báo an toàn VietGAP.",
    tags: ["AgriTech", "Cánh Đồng Số", "Hợp Tác Xã", "VietGAP", "Quản Lý Kho", "Sổ Quỹ", "Truy Xuất Nguồn Gốc"],
    coverImage: '/apps/htx-rau-cu/cover.jpg',
    placeholderImage: '/apps/htx-rau-cu/cover.jpg',
    detailImages: [
      '/apps/htx-rau-cu/feature_01_quan_ly_so_tay_that_thoat.jpg',
      '/apps/htx-rau-cu/feature_02_canh_dong_so_tren_dien_thoai.jpg',
      '/apps/htx-rau-cu/feature_03_quan_ly_don_hang_xuat_kho.jpg',
      '/apps/htx-rau-cu/feature_04_kiem_soat_rau_hu_hao_hut.jpg',
      '/apps/htx-rau-cu/feature_05_canh_bao_lo_can_han_xuat_truoc.jpg',
      '/apps/htx-rau-cu/feature_06_du_bao_san_luong_cach_ly_thuoc.jpg',
      '/apps/htx-rau-cu/feature_07_nhat_ky_dong_ruong_bang_giong_noi.jpg',
      '/apps/htx-rau-cu/feature_08_tien_rau_xa_vien_minh_bach.jpg',
      '/apps/htx-rau-cu/feature_09_so_quy_htx_doi_chieu_tien_hang.jpg',
      '/apps/htx-rau-cu/feature_10_xuat_bao_cao_excel_tuc_thi.jpg',
      '/apps/htx-rau-cu/feature_11_hoat_dong_offline_khong_can_mang.jpg',
      '/apps/htx-rau-cu/feature_12_phan_quyen_4_vai_tro_ro_rang.jpg',
      '/apps/htx-rau-cu/feature_13_man_hinh_viec_hom_nay_chu_dong.jpg',
      '/apps/htx-rau-cu/feature_14_ket_noi_toan_dien_tu_ruong_toi_kho.jpg',
      '/apps/htx-rau-cu/feature_15_nong_nghiep_so_ben_vung.jpg'
    ],
    imageAlt: "Cánh Đồng Số - Nền tảng quản trị số hóa Hợp tác xã Rau Củ Quả chuyên nghiệp",
    featured: true,
    videoDuration: "4:44",
    videoTagline: "Cánh đồng số - Quản lý Hợp tác xã bằng dữ liệu rõ ràng và kịp thời",
    videoScenes: [
      { time: "0:00", title: "Quản Lý HTX Bằng Sổ Tay: Thất Thoát Ở Đâu?", description: "Sổ sách thủ công và Excel rời rạc khiến Ban quản trị HTX khó nắm bắt hàng hóa, dòng tiền và nguy cơ thất thoát thực tế." },
      { time: "0:19", title: "Cánh Đồng Số: Trợ Lý Quản Trị HTX Trên Điện Thoại", description: "Nền tảng số hóa toàn diện giúp Ban quản trị HTX theo dõi hàng hóa, dòng tiền và công việc đồng ruộng ngay trên điện thoại." },
      { time: "0:33", title: "01 | Quản Lý Đơn Hàng & Xuất Kho Minh Bạch", description: "Phân loại trạng thái đơn hàng, kiểm tra khớp lô hàng tồn thực tế, chụp ảnh chứng từ và ký xác nhận điện tử trực tiếp." },
      { time: "0:56", title: "02 | Kiểm Soát Rau Hư & Tỷ Lệ Hao Hụt", description: "Ghi nhận tức thì tình trạng rau dập hỏng, phân tích nguyên nhân và tỷ lệ hao hụt theo từng lô để bảo toàn lợi nhuận HTX." },
      { time: "1:15", title: "03 | Cảnh Báo Lô Rau Cận Hạn Xuất Trước", description: "Hệ thống tự động phát hiện và cảnh báo các lô rau thu hoạch trước, cận hạn sử dụng để ưu tiên luân chuyển xuất bán." },
      { time: "1:31", title: "04 | Dự Báo Sản Lượng & An Toàn Cách Ly Phân Thuốc", description: "Theo dõi tiến độ mùa vụ từng xã viên, đếm lùi thời gian cách ly thuốc BVTV đảm bảo an toàn thu hoạch chuẩn VietGAP." },
      { time: "1:51", title: "05 | Nông Dân Ghi Nhật Ký Bằng Giọng Nói", description: "Giao diện thân thiện tối đa: xuống giống, bón phân, tưới tiêu chỉ cần chọn, chụp ảnh hoặc bấm nút nói để tự động ghi chép." },
      { time: "2:10", title: "06 | Tiền Rau Của Từng Xã Viên Sòng Phẳng", description: "Tự động tính toán sản lượng giao, đơn giá và thành tiền; xã viên tra cứu tức thì trên app, ban quản trị đối soát dễ dàng." },
      { time: "2:31", title: "07 | Quản Lý Sổ Quỹ & Đối Chiếu Dòng Tiền", description: "Cập nhật thu - chi và số dư quỹ tức thì, tự động đối chiếu tiền thực tế với hàng nhập, hàng xuất và hàng hao hụt." },
      { time: "2:49", title: "08 | Xuất Báo Cáo Excel Chỉ Trong Một Cú Chạm", description: "Xuất dữ liệu nhập - xuất - tồn và sổ kế toán HTX ra file Excel chuẩn mẫu, tự động quét kiểm tra và cảnh báo lỗi nhập liệu." },
      { time: "3:08", title: "09 | Hoạt Động Offline Khi Mất Sóng Ngoài Đồng", description: "Ghi nhận dữ liệu liên tục dù ngoài ruộng sâu hay trong kho lạnh mất mạng; tự động đồng bộ hóa ngay khi có kết nối trở lại." },
      { time: "3:28", title: "10 | Phân Quyền 4 Vai Trò Đúng Người Đúng Việc", description: "Phân quyền khoa học: Chủ nhiệm giám sát toàn diện, Thủ kho phụ trách xuất nhập, Tài xế theo dõi đơn giao, Xã viên xem tiền rau cá nhân." },
      { time: "3:46", title: "11 | Màn Hình Việc Hôm Nay: Nắm Bắt Tức Thì", description: "Gom các vấn đề nóng cần xử lý ngay lên trang chủ: đơn hàng trễ hạn, lô rau cận date, lượng rau hỏng và ruộng sắp đến kỳ thu hái." },
      { time: "4:06", title: "Số Hóa Liên Mạch: Từ Cánh Đồng Đến Bàn Ăn", description: "Cánh Đồng Số kết nối toàn diện ruộng - kho - giao hàng - tiền rau - sổ quỹ, giảm thiểu thất thoát và nâng cao tính minh bạch." },
      { time: "4:26", title: "Trải Nghiệm HTX Cánh Đồng Số: Nông Nghiệp Bền Vững", description: "Đưa dữ liệu số vào đồng ruộng, đồng hành cùng Hợp tác xã nông sản Việt phát triển bền vững và hội nhập thị trường." }
    ],
    audience: "Ban chủ nhiệm Hợp tác xã, Thủ kho nông sản, Nhân viên giao vận thu mua, Kế toán HTX và Nông dân xã viên.",
    problem: "Ghi chép sổ tay và file Excel thủ công dễ sai sót, không nắm được tỷ lệ rau hư hỏng, khó kiểm soát ngày cách ly thuốc VietGAP và thanh toán tiền rau xã viên dễ xảy ra tranh chấp.",
    solution: "Nền tảng Cánh Đồng Số trên di động: Quản lý xuất nhập kho chuẩn xác, cảnh báo lô cận date, ghi nhật ký bằng giọng nói, hoạt động offline và tự động đối chiếu sổ quỹ minh bạch.",
    keyFeatures: [
      "Quản lý đơn hàng & xuất kho minh bạch, đối chiếu đúng lô thực tế và ký nhận điện tử",
      "Kiểm soát tỷ lệ hao hụt, phát hiện nguyên nhân rau hư hỏng để bảo toàn lợi nhuận HTX",
      "Tự động cảnh báo lô rau cận hạn, ưu tiên luân chuyển xuất bán sớm tránh tồn kho",
      "Dự báo sản lượng thu hoạch và đếm lùi thời gian cách ly phân thuốc an toàn VietGAP",
      "Ghi nhật ký canh tác bằng giọng nói AI và chụp ảnh, nông dân lớn tuổi thao tác dễ dàng",
      "Tự động tính tiền rau của từng xã viên sòng phẳng, rõ ràng, tra cứu trực tiếp trên app",
      "Quản lý sổ quỹ thời gian thực, tự động đối chiếu dòng tiền thu chi với hàng nhập xuất",
      "Xuất báo cáo nhập - xuất - tồn ra file Excel chuẩn mẫu và cảnh báo lỗi dữ liệu",
      "Chế độ ngoại tuyến (Offline-First): Mất mạng ngoài đồng ruộng vẫn nhập liệu bình thường",
      "Phân quyền 4 vai trò rõ ràng: Chủ nhiệm, Thủ kho, Tài xế giao hàng và Xã viên",
      "Màn hình 'Việc hôm nay' đưa ngay đơn trễ hạn, lô cận date và việc gấp lên xử lý tức thì"
    ],
    userManual: {
      url: "/manuals/HTX_Huong_dan_su_dung.pdf",
      fileName: "HTX_Huong_dan_su_dung.pdf",
      fileSize: "8.1 MB",
      title: "Sách Hướng Dẫn Sử Dụng Hợp Tác Xã Nông Nghiệp Số",
      description: "Tài liệu hướng dẫn quản trị mùa vụ, ghi nhật ký canh tác điện tử xã viên và in tem QR truy xuất nguồn gốc nông sản."
    },
    theme: {
      from: "#16a34a",
      to: "#22c55e",
      accent: "#16a34a",
      badgeBg: "bg-green-50",
      badgeText: "text-green-800",
      badgeBorder: "border-green-200"
    }
  }
];

