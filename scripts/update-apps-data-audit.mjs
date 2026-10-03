import fs from "fs";

const appsUpdates = {
  "taxhkd": {
    videoScenes: [
      { time: "0:00", title: "Tổng quan & Cảnh báo Ngưỡng thuế", description: "Theo dõi quỹ tiền mặt, tiền gửi ngân hàng, thuế tạm tính và cảnh báo ngưỡng miễn thuế 500 triệu / HĐĐT máy tính tiền 1 tỷ." },
      { time: "0:15", title: "Máy bán hàng POS & Hóa đơn VietQR", description: "Bán lẻ tạo hóa đơn máy tính tiền siêu tốc, tự động tính thuế GTGT và TNCN chuẩn xác theo từng ngành nghề kinh doanh, sinh mã thanh toán VietQR động." },
      { time: "0:30", title: "Quản lý Kho hàng & Phân loại Thuế suất", description: "Kiểm soát xuất nhập tồn kho, cảnh báo xuất âm kho và tự động phân loại tỷ lệ thuế suất GTGT và TNCN chuẩn xác theo danh mục mặt hàng kinh doanh." },
      { time: "0:45", title: "Hệ thống 7 Sổ sách & Tờ khai 01/CNKD", description: "Tự động kết chuyển đầy đủ 7 sổ kế toán S1 đến S7 và kết xuất hồ sơ tờ khai thuế quý 01/CNKD định dạng chuẩn sẵn sàng nộp cho cơ quan thuế." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Hệ thống trợ lý thuế hộ kinh doanh thiết kế rất sát với thực tế vận hành cửa hàng. Điểm bất ngờ khi thử nghiệm là chế độ Offline PWA vẫn bán hàng mượt mà khi mất mạng và bảng tra cứu mức phạt thuế minh bạch. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như in hóa đơn mini và thiết lập thông tin cơ sở kinh doanh!" }
    ],
    keyFeatures: [
      "Bảng điều khiển theo dõi ngưỡng miễn thuế 500 triệu và ngưỡng bắt buộc HĐĐT 1 tỷ",
      "Máy bán hàng POS tạo hóa đơn điện tử và mã thanh toán VietQR động",
      "Quản lý kho hàng xuất nhập tồn và tự động phân loại thuế suất theo ngành nghề",
      "Hệ thống 7 sổ kế toán chuẩn hóa (S1-S7) và kết xuất hồ sơ tờ khai 01/CNKD"
    ]
  },

  "cosmederm-ai-academy": {
    videoScenes: [
      { time: "0:00", title: "Tổng quan Học viện R&D Mỹ phẩm", description: "Hệ thống tri thức số hóa chuyên sâu hỗ trợ nghiên cứu da liễu và xây dựng công thức mỹ phẩm chuẩn quốc tế." },
      { time: "0:15", title: "Safety Checker & Tra cứu An toàn CIR", description: "Tra cứu an toàn thành phần mỹ phẩm chuẩn CIR Hoa Kỳ, tính điểm rủi ro kích ứng và kiểm tra tương thích hoạt chất." },
      { time: "0:30", title: "Virtual Lab & Mô phỏng Công thức", description: "Phòng lab ảo thử nghiệm phối trộn công thức, mô phỏng độ ổn định nhũ tương, tương thích pH và phác đồ điều chế hoàn chỉnh." },
      { time: "0:45", title: "Routine Builder & Phác đồ Khoa học", description: "Xây dựng routine trị liệu cá nhân hóa theo từng tình trạng da, tối ưu thứ tự thoa layer và ngăn ngừa xung đột hoạt chất." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Hệ thống học viện mỹ phẩm số hóa cực kỳ bài bản và chuyên sâu. Điểm bất ngờ khi thử nghiệm là Virtual Lab phát hiện ngay xung đột khi kết hợp hoạt chất và cảnh báo chênh lệch pH. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như thư viện 10 đầu sách kinh điển, báo cáo xu hướng hoạt chất và 11 minigame kiến thức!" }
    ],
    keyFeatures: [
      "Virtual Lab: Phòng lab tạo công thức ảo và mô phỏng độ ổn định nhũ tương",
      "Safety Checker: Tra cứu mức độ an toàn thành phần mỹ phẩm theo chuẩn CIR",
      "Routine Builder: Xây dựng routine và phác đồ chăm sóc da khoa học cá nhân hóa",
      "Thư viện lõi 10 đầu sách kinh điển và lộ trình học tập 3 tiến trình chuyên sâu"
    ]
  },

  "foodtech-hub": {
    videoScenes: [
      { time: "0:00", title: "Cổng dữ liệu 850+ Phụ gia", description: "Tra cứu danh mục phụ gia, cơ chế hóa sinh và giới hạn an toàn ADI theo chuẩn Codex và Bộ Y Tế." },
      { time: "0:15", title: "Chẩn đoán sự cố QA/QC dây chuyền", description: "Hệ thống hóa 165 nỗi đau sản xuất theo biểu đồ xương cá, xử lý triệt để sự cố tách lớp, biến màu và nhớt hỏng." },
      { time: "0:30", title: "Thực hành R&D & Phụ gia thay thế", description: "Khám phá 42 giải pháp công thức và danh bạ 22 nhà cung ứng phụ gia sạch Clean Label uy tín." },
      { time: "0:45", title: "Quy chuẩn Kỹ thuật & Hồ sơ Pháp lý", description: "Thẩm định hồ sơ công bố, kiểm soát hạn dùng và tối ưu giá thành công thức sản phẩm mới theo thời gian thực." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cứu cánh đắc lực cho đội ngũ kỹ sư R&D và QA/QC nhà máy thực phẩm. Điểm bất ngờ khi thử nghiệm là bộ thẻ Flashcard ôn luyện thuật ngữ SM-2 và 17 minigame thực chiến cực kỳ lôi cuốn. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như chế độ trình chiếu cho máy chiếu và cẩm nang giải quyết nỗi đau sản xuất!" }
    ],
    keyFeatures: [
      "Cổng dữ liệu tra cứu 850+ phụ gia theo chuẩn Codex và Bộ Y Tế",
      "Chẩn đoán 165 sự cố dây chuyền sản xuất theo biểu đồ xương cá",
      "Thực hành R&D với 42 giải pháp phụ gia sạch Clean Label và 22 nhà cung ứng",
      "Công cụ tối ưu chi phí công thức và thẩm định hồ sơ pháp lý kỹ thuật"
    ]
  },

  "uth-scm-navigator": {
    videoScenes: [
      { time: "0:00", title: "Lộ trình 4 năm Logistics & SCM", description: "Bản đồ sơ đồ môn học chuyên ngành Logistics & Vận tải đa phương thức Đại học GTVT TP.HCM." },
      { time: "0:15", title: "Trung tâm điều hành SCM số", description: "Bản đồ logistics toàn cầu, tối ưu tồn kho đa chặng và phân tích chuỗi cung ứng thời gian thực." },
      { time: "0:30", title: "Công cụ tính cước Door to Door", description: "Tính toán cước tàu biển FCL/LCL, phụ phí local charges và thời gian lưu kho cảng bãi." },
      { time: "0:45", title: "Tra cứu tương tác Incoterms 2020", description: "Trực quan hóa điểm chuyển giao rủi ro 11 điều kiện Incoterms 2020 và mô hình hóa chuỗi cung ứng SCOR đa tầng." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Nền tảng điều hướng học tập và mô phỏng chuỗi cung ứng SCM rất trực quan và toàn diện. Điểm bất ngờ khi thử nghiệm là mô hình phân tích độ nhạy (Sensitivity Analysis) và dự báo nhu cầu bằng thuật toán chuỗi thời gian cực kỳ chuẩn xác. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như sơ đồ tư duy Mindmap SCM toàn diện và kho bài tập tình huống thực tế!" }
    ],
    keyFeatures: [
      "Bản đồ điều hướng 4 năm học chuyên ngành Logistics & Quản lý Chuỗi cung ứng",
      "Tra cứu tương tác quy tắc Incoterms và phân định rủi ro vận chuyển",
      "Mô hình chuỗi cung ứng SCOR và công cụ tính toán chi phí cước biển Door to Door",
      "Mô hình phân tích độ nhạy, dự báo nhu cầu và kho bài tập tình huống thực tiễn"
    ]
  },

  "bjc-sales-training": {
    videoScenes: [
      { time: "0:00", title: "Dashboard Tiến độ Học tập", description: "Theo dõi lộ trình hoàn thành các khóa học nguyên liệu hóa chất và chỉ số kỹ năng của nhân viên kinh doanh." },
      { time: "0:15", title: "Module Kiến thức Kỹ thuật Sản phẩm", description: "Học tập tương tác về tính năng, ứng dụng thực tế và thư viện tài liệu TDS/MSDS chi tiết." },
      { time: "0:30", title: "Kiểm tra Trắc nghiệm & Sát hạch", description: "Ngân hàng đề thi đánh giá năng lực nghiệp vụ và hệ thống chấm điểm tự động." },
      { time: "0:45", title: "Lộ trình Hội nhập 30-60-90 & Vinh danh", description: "Khung đào tạo nhân sự mới bám sát KPI thực tế và bảng xếp hạng Gamification khích lệ tinh thần thi đua." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Nền tảng học tập nội bộ chuẩn mực tập đoàn đa quốc gia. Điểm bất ngờ khi thử nghiệm là hệ thống tự động sinh chứng chỉ PDF có chữ ký số và mã QR xác thực ngay sau khi vượt qua bài thi 80%. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như mô phỏng tình huống đàm phán B2B và thư viện kịch bản xử lý phản hồi khách hàng!" }
    ],
    keyFeatures: [
      "Dashboard theo dõi tiến độ học tập và cấp độ kỹ năng nhân sự",
      "Hệ thống module kiến thức nguyên liệu kèm tài liệu kỹ thuật chuẩn",
      "Cơ chế kiểm tra trắc nghiệm chấm điểm tự động chống gian lận",
      "Khung hội nhập 30-60-90 ngày và bảng vinh danh thành tích học tập"
    ]
  },

  "quan-ly-hop-dong-abm": {
    videoScenes: [
      { time: "0:00", title: "Danh bạ Hợp đồng Thương mại", description: "Quản lý tập trung toàn bộ danh sách hợp đồng mua bán khách hàng niên độ 2026-2027." },
      { time: "0:15", title: "Mở File Scan PDF Trực tiếp", description: "Liên kết lưu trữ đám mây Google Drive, xem tức thì bản cứng scan có dấu mộc đỏ." },
      { time: "0:30", title: "Cảnh báo Hết hạn & Chế độ Offline PWA", description: "Tự động phát hiện và cảnh báo hợp đồng sắp hết hạn trong 30 ngày, hoạt động mượt mà khi mất mạng nhờ bộ nhớ IndexedDB." },
      { time: "0:45", title: "Nhập liệu Excel & Báo cáo Lũy kế", description: "Tự động đồng bộ hàng trăm dòng dữ liệu từ file Excel và tổng hợp doanh thu lũy kế theo từng nhóm đối tác." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giải pháp số hóa hồ sơ pháp lý hợp đồng thương mại cực kỳ tiện lợi và bảo mật. Điểm bất ngờ khi thử nghiệm là tốc độ tìm kiếm tức thì theo số hợp đồng, tên đối tác và mở thẳng file scan PDF gốc chỉ trong một giây. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như bộ lọc thông minh đa tiêu chí và tính năng xuất dữ liệu báo cáo nghiệm thu!" }
    ],
    keyFeatures: [
      "Danh bạ hợp đồng kinh tế niên độ 2026-2027 kèm liên kết file scan gốc",
      "Mở xem trực tiếp hợp đồng PDF trên Google Drive không qua bước tải trung gian",
      "Hệ thống cảnh báo gia hạn hợp đồng tự động và hỗ trợ PWA offline",
      "Nhập dữ liệu tự động từ file Excel và tổng hợp giá trị theo nhóm khách hàng"
    ]
  },

  "customer-visit": {
    videoScenes: [
      { time: "0:00", title: "Lập Kế hoạch Lịch trình Viếng thăm", description: "Sắp xếp lịch hẹn gặp đối tác theo tuyến đường và cụm khu công nghiệp tối ưu." },
      { time: "0:15", title: "Route Planner & Định vị GPS Thực địa", description: "Số hóa lộ trình di chuyển, hỗ trợ check-in thực tế tại nhà máy khách hàng bằng GPS." },
      { time: "0:30", title: "Biên bản Cuộc họp & Ghi nhận Nhu cầu", description: "Ghi nhanh nội dung trao đổi (Minute of Meeting), lưu yêu cầu gửi mẫu thử nghiệm và thông số kỹ thuật." },
      { time: "0:45", title: "Phân tích Độ phủ & Phân loại Lead", description: "Báo cáo tần suất chăm sóc khách hàng theo tuần và xếp hạng khách hàng tiềm năng theo chu kỳ mua sắm." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Trợ lý đắc lực giúp tối ưu hóa năng suất thực địa cho đội ngũ kinh doanh kỹ thuật B2B. Điểm bất ngờ khi thử nghiệm là tính năng đo khoảng cách và gợi ý tuyến đường kế tiếp trên Google Maps chỉ bằng một cú chạm. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như theo dõi lịch sử cấp mẫu thử nghiệm và báo cáo phân tích tỷ lệ chuyển đổi dự án!" }
    ],
    keyFeatures: [
      "Bản đồ số hóa kế hoạch di chuyển và lịch trình viếng thăm theo khu công nghiệp",
      "Tính năng check-in GPS tại cổng nhà máy khách hàng và lưu nhật ký thực địa",
      "Ghi nhanh biên bản cuộc họp Minute of Meeting kèm nhu cầu mẫu thử nghiệm",
      "Báo cáo phân tích tần suất ghé thăm và độ phủ thị trường theo tuần"
    ]
  },

  "lipoid-advisor": {
    videoScenes: [
      { time: "0:00", title: "Tra cứu Hoạt chất Phospholipid", description: "Phân loại các dòng nguyên liệu Phospholipon, Phosal theo công dụng dưỡng ẩm, chống lão hóa và phục hồi hàng rào da." },
      { time: "0:15", title: "Kỹ thuật Nhũ hóa Liposome Chuẩn Đức", description: "Hướng dẫn chi tiết thông số nhiệt độ, tốc độ khuấy shear và quy trình đồng hóa áp suất cao." },
      { time: "0:30", title: "Xuất Tài liệu Kỹ thuật TDS & COA", description: "Truy cập nhanh chứng chỉ chất lượng quốc tế, bảng kiểm định vi sinh và tài liệu nguồn gốc tự nhiên." },
      { time: "0:45", title: "Tương thích Hệ Làm đặc & Công thức Mẫu", description: "Kiểm tra độ bền thể gel khi phối hợp phospholipid với Carbomer, Xanthan Gum và truy cập kho công thức serum chuẩn châu Âu." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Kho tri thức màng bao Phospholipid và Liposome hàng đầu thế giới. Điểm bất ngờ khi thử nghiệm là công cụ dự báo kích thước hạt nano dựa trên áp suất máy đồng hóa cực kỳ chuẩn xác. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như công cụ tính toán tỷ lệ màng phospholipid và ma trận tương thích hoạt chất chống oxy hóa!" }
    ],
    keyFeatures: [
      "Cơ sở dữ liệu danh mục hoạt chất Phospholipid tinh khiết theo tiêu chuẩn Đức",
      "Thông số kỹ thuật chuẩn hóa cho quy trình nhũ hóa hạt nano và liposome",
      "Tra cứu độ tương thích với chất làm đặc sinh học và các dung môi mỹ phẩm",
      "Kho công thức mẫu được thẩm định từ trung tâm R&D Thụy Sĩ và Đức"
    ]
  },

  "clinic-spa": {
    videoScenes: [
      { time: "0:00", title: "Lịch hẹn Điều phối Trực quan", description: "Đặt lịch theo phòng, giường và chuyên viên trị liệu, tự động gửi nhắc hẹn tránh trùng ca." },
      { time: "0:15", title: "Hồ sơ Bệnh án & Soi da Y khoa", description: "Lưu trữ phác đồ điều trị đa buổi, hình ảnh theo dõi tiến trình hồi phục và lịch sử sử dụng mỹ phẩm." },
      { time: "0:30", title: "Định mức Tiêu hao Kho Dược mỹ phẩm", description: "Tự động trừ kho nguyên phụ liệu, serum, ampoule theo từng bước kỹ thuật của gói dịch vụ." },
      { time: "0:45", title: "Báo cáo Doanh thu & Tính Hoa hồng Tự động", description: "Tổng hợp doanh số dịch vụ, bán lẻ và tự động tính tỷ lệ hoa hồng cho bác sĩ, điều dưỡng, kỹ thuật viên." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Trợ thủ vận hành chuẩn y khoa giúp số hóa toàn diện quy trình phòng khám da liễu và spa chuyên sâu. Điểm bất ngờ khi thử nghiệm là thanh trượt so sánh Before-After hình ảnh da thực tế của khách hàng trực quan và tính năng cảnh báo tồn kho dược mỹ phẩm chạm ngưỡng an toàn. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như hệ thống phân quyền nhân sự đa cấp và quản lý thẻ thành viên tích điểm!" }
    ],
    keyFeatures: [
      "Lịch hẹn thông minh kéo thả trực quan theo phòng, giường và chuyên viên",
      "Hồ sơ bệnh án điện tử lưu trữ hình ảnh soi da Before-After và phác đồ điều trị",
      "Quản lý định mức tiêu hao kho dược mỹ phẩm theo từng buổi trị liệu",
      "Báo cáo tài chính doanh thu và tính toán hoa hồng kỹ thuật viên tự động"
    ]
  },

  "spa-landing": {
    videoScenes: [
      { time: "0:00", title: "Hero Trải nghiệm Thẩm mỹ Y khoa", description: "Định vị thương hiệu cao cấp, thông điệp cá nhân hóa phác đồ điều trị và video clip trải nghiệm không gian viện thẩm mỹ." },
      { time: "0:15", title: "Bảng giá Minh bạch & Gói Dịch vụ", description: "Trình bày chi tiết từng bước liệu trình trẻ hóa da, bảng giá niêm yết rõ ràng và thời lượng thực hiện." },
      { time: "0:30", title: "Đặt hẹn Thông minh & Khảo sát Da Nhanh", description: "Form đăng ký tư vấn trực tuyến tích hợp câu hỏi trắc nghiệm nhanh tình trạng da để chuẩn bị trước hồ sơ thăm khám." },
      { time: "0:45", title: "Bảo chứng Y khoa & Đội ngũ Chuyên gia", description: "Hồ sơ năng lực bác sĩ da liễu, chứng nhận an toàn thiết bị y tế quốc tế và thư viện kết quả điều trị thực tế." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giao diện chuẩn y khoa sang trọng, tối ưu tỷ lệ chuyển đổi khách hàng tiềm năng trên thiết bị di động. Điểm bất ngờ khi thử nghiệm là popup ưu đãi khung giờ vàng thông minh xuất hiện đúng thời điểm khách hàng chuẩn bị thoát trang, giúp tăng mạnh số lượng cuộc gọi tư vấn. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như tính năng ước tính chi phí liệu trình và cổng kết nối tư vấn chuyên viên 24/7!" }
    ],
    keyFeatures: [
      "Giao diện chuẩn y khoa cao cấp với tỷ lệ chuyển đổi khách hàng tiềm năng tối ưu",
      "Bảng giá dịch vụ và phác đồ trị liệu da công khai minh bạch",
      "Form đăng ký tư vấn thông minh tích hợp trắc nghiệm tình trạng da ban đầu",
      "Khu vực bảo chứng uy tín bác sĩ da liễu và chứng nhận công nghệ chuẩn quốc tế"
    ]
  },

  "bjc-sales-pitch": {
    videoScenes: [
      { time: "0:00", title: "Ma trận So sánh Sản phẩm & Đối thủ", description: "Đối chiếu trực diện thông số kỹ thuật, xuất xứ và hiệu quả công nghệ giữa sản phẩm công ty và đối thủ cạnh tranh." },
      { time: "0:15", title: "Thẻ Chiến lược Battle Card", description: "Bộ luận điểm phản biện sắc bén, vạch rõ điểm yếu của đối thủ và định vị giá trị khác biệt cốt lõi." },
      { time: "0:30", title: "Công cụ Tính toán ROI & Tổng Chi phí", description: "Nhập sản lượng và quy mô sản xuất của khách hàng để tính toán chính xác số tiền tiết kiệm nguyên liệu hàng năm." },
      { time: "0:45", title: "Kịch bản SPIN Selling & Xử lý Từ chối", description: "Cung cấp lộ trình câu hỏi gợi mở nhu cầu ngầm định, hóa giải lo ngại về đơn giá cao và chốt thỏa thuận hợp tác." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cẩm nang đàm phán di động cực kỳ thực chiến, giúp nhân viên kinh doanh tự tin tư vấn ngay trước mặt đối tác. Điểm bất ngờ khi thử nghiệm là khả năng kết xuất bản báo cáo đề xuất giá trị định dạng PDF chuyên nghiệp chỉ trong 5 giây để gửi ngay sau cuộc họp. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như thư viện mẫu thử nghiệm kỹ thuật và kho tài liệu chứng minh lâm sàng!" }
    ],
    keyFeatures: [
      "Ma trận so sánh thông số kỹ thuật và tính năng trực diện với sản phẩm đối thủ",
      "Thẻ chiến lược Battle Card cung cấp luận điểm phản biện sắc bén khi gặp trở ngại giá",
      "Bảng tính kinh tế ROI và tổng chi phí sở hữu TCO theo thời gian thực",
      "Bộ kịch bản câu hỏi SPIN Selling và kết xuất bản đề xuất giá trị PDF tức thì"
    ]
  },

  "badminton-management": {
    videoScenes: [
      { time: "0:00", title: "Bảng Xếp hạng Elo & Hồ sơ Tay vợt", description: "Hệ thống tính điểm trình độ Elo tự động cập nhật sau mỗi séc đấu, phân nhóm hạng thi đấu công bằng." },
      { time: "0:15", title: "Thuật toán Ghép cặp Thông minh", description: "Tự động bắt cặp đôi nam nữ, đôi nam cân bằng điểm số, đảm bảo mọi thành viên đều có số trận ra sân đồng đều." },
      { time: "0:30", title: "Điểm danh Mã QR & Quản lý Thành viên", description: "Quét mã QR tại sân nhận diện thành viên cố định hoặc khách vãng lai, tự động chia sẻ tiền sân và tiền cầu tức thì." },
      { time: "0:45", title: "Sổ quỹ Tài chính & Quyết toán Minh bạch", description: "Theo dõi thu chi tiền thuê sân, mua cầu, nước uống và kết xuất báo cáo quỹ câu lạc bộ công khai theo từng buổi sinh hoạt." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giải pháp hoàn hảo giúp các nhóm cầu lông giải quyết triệt để bài toán xếp sân và nhập nhằng tài chính. Điểm bất ngờ khi thử nghiệm là biểu đồ phân tích phong độ cá nhân và tỷ lệ phối hợp ăn ý giữa các cặp đấu qua từng tháng rất chi tiết. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như tính năng bình chọn tay vợt xuất sắc và bảng thông báo giải đấu nội bộ!" }
    ],
    keyFeatures: [
      "Thuật toán tính điểm Elo tự động và xếp hạng trình độ thành viên chuẩn xác",
      "Cơ chế ghép cặp thi đấu công bằng cân bằng điểm số tránh chênh lệch trình độ",
      "Điểm danh mã QR tại sân và tự động phân bổ chi phí tiền sân/tiền cầu",
      "Sổ quỹ tài chính câu lạc bộ minh bạch thu chi công khai theo thời gian thực"
    ]
  },

  "tro-ly-vi-ngon": {
    videoScenes: [
      { time: "0:00", title: "Bản đồ Vị giác 6 Chiều Chuyên sâu", description: "Phân tích khoa học cường độ và tương tác giữa 6 vị cơ bản: Ngọt, Mặn, Chua, Đắng, Umami và độ dày vị Kokumi." },
      { time: "0:15", title: "Trợ lý Phối cặp Hương vị AI", description: "Gợi ý kết hợp các cặp nguyên liệu tương đồng phân tử mùi (Flavor Pairing), tạo nên tầng hương độc đáo cho sản phẩm F&B." },
      { time: "0:30", title: "Cân bằng Vị & Giải pháp Giảm Muối", description: "Chỉ dẫn công thức ứng dụng chiết xuất nấm men tự nhiên giúp cắt giảm 20% đến 30% lượng muối natri mà vẫn giữ trọn vị đậm đà." },
      { time: "0:45", title: "Khử Mùi Lạ & Chuẩn hóa Nước xốt 3 Miền", description: "Xử lý triệt để mùi tanh thủy sản và vị ngái đạm thực vật, kèm thư viện công thức xốt cốt chuẩn hóa cho bếp trung tâm." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cẩm nang bảo bối cho các đầu bếp R&D và chuyên viên phát triển sản phẩm thực phẩm công nghiệp. Điểm bất ngờ khi thử nghiệm là biểu đồ Radar cảm quan biến đổi trực quan theo thời gian thực khi tinh chỉnh từng miligram phụ gia vị giác. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như tính toán giá thành nguyên liệu mẻ xốt và công cụ chuyển đổi khẩu phần linh hoạt!" }
    ],
    keyFeatures: [
      "Bản đồ radar phân tích 6 chiều vị giác chuyên sâu (Ngọt, Mặn, Chua, Đắng, Umami, Kokumi)",
      "Thuật toán Flavor Pairing đề xuất các cặp nguyên liệu tương thích phân tử hương",
      "Giải pháp công nghệ giảm muối từ 20-30% bằng chiết xuất nấm men tự nhiên",
      "Kho công thức chuẩn hóa nước xốt 3 miền và giải pháp khử mùi lạ đạm thực vật"
    ]
  },

  "vet-aqua-erp": {
    videoScenes: [
      { time: "0:00", title: "Máy Bán lẻ POS & Quét mã Vật tư", description: "Giao diện bán hàng cảm ứng nhanh chóng, tạo hóa đơn xuất kho thuốc thú y, hóa chất và thức ăn chăn nuôi." },
      { time: "0:15", title: "Quản lý Tồn kho FEFO & Cảnh báo Cận hạn", description: "Kiểm soát xuất nhập tồn theo nguyên tắc cận hạn xuất trước (FEFO), tự động cảnh báo thuốc thủy sản và vaccine sắp hết hạn dùng." },
      { time: "0:30", title: "Quản lý Hộ Nuôi & Sổ nợ Vụ mùa Từng Ao", description: "Theo dõi chi tiết trần nợ, lịch cấp thức ăn và thuốc xử lý nước cho từng ao tôm, ao cá riêng biệt của bà con nông dân." },
      { time: "0:45", title: "Đối soát Thu hoạch & Báo cáo Lãi gộp", description: "Khấu trừ công nợ vụ mùa ngay khi xuất bán thủy sản và phân tích biên lợi nhuận gộp theo từng nhóm ngành hàng vật tư." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Phần mềm được may đo chuẩn xác cho các đại lý kinh doanh thuốc thú y và thức ăn thủy sản tại các vùng nuôi trọng điểm. Điểm bất ngờ khi thử nghiệm là chế độ sao lưu dữ liệu tự động và khả năng in phiếu công nợ khổ nhỏ gửi trực tiếp qua Zalo cho chủ đầm rất tiện lợi. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như nhật ký theo dõi dịch bệnh ao nuôi và thống kê hiệu quả của từng loại thuốc xử lý nước!" }
    ],
    keyFeatures: [
      "Máy bán hàng POS tối ưu màn hình cảm ứng và quét mã vạch vật tư nông nghiệp",
      "Kiểm soát tồn kho theo phương pháp FEFO và cảnh báo cận hạn 60 ngày",
      "Sổ theo dõi công nợ chi tiết gắn liền với từng ao nuôi tôm cá của từng hộ dân",
      "Hệ thống đối soát thanh toán khi thu hoạch và báo cáo tỷ suất lợi nhuận gộp"
    ]
  },

  "yeast-extract-test": {
    videoScenes: [
      { time: "0:00", title: "Ngân hàng Đề thi Thực tế 100+ Câu hỏi", description: "Bộ câu hỏi tình huống ứng dụng chiết xuất nấm men trong gia vị, nước xốt, mì ăn liền và thực phẩm chay." },
      { time: "0:15", title: "Thi Trực tuyến & Cơ chế Chống Gian lận", description: "Đồng hồ đếm ngược thông minh, tự động đảo câu hỏi và đáp án, tự động nộp bài khi hết giờ." },
      { time: "0:30", title: "Phân tích Cơ chế Hóa sinh & Đáp án", description: "Giải thích cặn kẽ cơ chế tạo vị Umami, phản ứng Maillard và so sánh hiệu quả giữa các cấp độ nấm men." },
      { time: "0:45", title: "Biểu đồ Radar Năng lực & Chứng nhận Điện tử", description: "Đo lường chính xác điểm mạnh yếu theo 5 khía cạnh kỹ thuật và cấp chứng chỉ chuẩn năng lực có mã xác thực." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Nền tảng đánh giá và đào tạo chuyên môn xuất sắc cho nhân sự kỹ thuật ngành công nghệ thực phẩm. Điểm bất ngờ khi thử nghiệm là hệ thống gợi ý tài liệu học bù tương ứng ngay tại những câu trả lời sai, giúp người học củng cố kiến thức lập tức. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như bảng xếp hạng thành tích nhóm và bộ đề ôn tập tình huống lỗi công thức sản phẩm!" }
    ],
    keyFeatures: [
      "Ngân hàng 100+ câu hỏi tình huống thực tế về ứng dụng nấm men trong súp, sốt, gia vị",
      "Đồng hồ đếm ngược thi trực tuyến kèm cơ chế xáo trộn câu hỏi chống gian lận",
      "Bản phân tích cơ chế hóa sinh giải thích cặn kẽ từng phương án trả lời",
      "Cấp chứng nhận năng lực hoàn thành bài thi tiêu chuẩn kèm mã xác thực trực tuyến"
    ]
  },

  "vanderbilt-advisor": {
    videoScenes: [
      { time: "0:00", title: "Bộ chọn Cấp độ Khoáng Veegum", description: "Lựa chọn chính xác giữa Veegum HV, Veegum K và Veegum Ultra theo yêu cầu độ nhớt và tính chất sản phẩm." },
      { time: "0:15", title: "Quy trình Hydrat hóa & Phân tán Chuẩn Lab", description: "Hướng dẫn chi tiết nhiệt độ nước, tốc độ khuấy shear và thời gian ngậm nước để kích hoạt cấu trúc thixotropic tối đa." },
      { time: "0:30", title: "Chống Sa lắng Hạt Vô cơ & Tách lớp", description: "Kỹ thuật bền vững hóa huyền phù, giữ hạt màu khoáng và màng chống nắng Zinc Oxide / Titanium Dioxide phân tán đồng đều." },
      { time: "0:45", title: "Tương thích Điện giải & Kho Công thức Khung", description: "Đánh giá độ ổn định của gel khi phối hợp với muối khoáng, cồn và truy cập kho công thức mẫu kem nền, mặt nạ đất sét chuẩn Vanderbilt." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cẩm nang không thể thiếu cho các kỹ sư điều chế mỹ phẩm trang điểm và kem chống nắng khoáng vật lý. Điểm bất ngờ khi thử nghiệm là mô phỏng động học hồi phục độ nhớt Thixotropic giúp người làm công thức hình dung rõ ràng độ dàn trải trên da. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như bảng tra cứu sự cố vón cục khoáng chất và hướng dẫn phối hợp chất làm đặc sinh học!" }
    ],
    keyFeatures: [
      "Bộ chọn cấp độ Veegum (Veegum HV, K, Ultra) theo độ nhớt và cấu trúc mong muốn",
      "Quy trình kỹ thuật hydrat hóa và kiểm soát cấu trúc hồi biến Thixotropic chuẩn lab",
      "Giải pháp chống sa lắng hạt vô cơ cho kem chống nắng khoáng và mỹ phẩm màu",
      "Kho công thức khung được kiểm chứng từ trung tâm kỹ thuật Hoa Kỳ"
    ]
  },

  "algaktiv-advisor": {
    videoScenes: [
      { time: "0:00", title: "Danh mục Hoạt chất Vi tảo Sinh học Biển", description: "Khám phá các dòng hoạt chất độc quyền Algaktiv BioSKN, GenoFix, Zen và Densidyl hỗ trợ phục hồi da và chống lão hóa." },
      { time: "0:15", title: "Báo cáo Thử nghiệm Lâm sàng In-Vivo", description: "Dữ liệu nghiên cứu trên người thật có biểu đồ đo lường giảm sắc tố melanin, củng cố hàng rào lipid và phục hồi tế bào." },
      { time: "0:30", title: "Hướng dẫn Pha chế & Tương thích Công thức", description: "Khuyến nghị tỷ lệ nồng độ hiệu quả, khoảng pH ổn định và khả năng kết hợp an toàn với các nền mỹ phẩm hiện đại." },
      { time: "0:45", title: "Kỹ thuật Gia nhiệt & Câu chuyện Clean Beauty", description: "Hướng dẫn kiểm soát nhiệt độ quy trình sản xuất để bảo toàn enzyme vi tảo và cung cấp bộ tài liệu truyền thông mỹ phẩm bền vững." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Cổng thông tin công nghệ sinh học biển chuẩn mực quốc tế dành cho các thương hiệu mỹ phẩm thiên nhiên cao cấp. Điểm bất ngờ khi thử nghiệm là mô phỏng cơ chế enzyme Photo-Lyase tự kích hoạt sửa chữa ADN tổn thương dưới ánh sáng xanh cực kỳ ấn tượng. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như công cụ lọc hoạt chất theo cơ chế sinh học và thư viện hồ sơ pháp lý chuẩn Ecocert!" }
    ],
    keyFeatures: [
      "Bộ sưu tập hoạt chất vi tảo: BioSKN, GenoFix, Zen, Densidyl theo công dụng da liễu",
      "Báo cáo thử nghiệm lâm sàng In-Vivo có biểu đồ đo lường giảm sắc tố khoa học",
      "Hướng dẫn điều kiện ổn định pH và nhiệt độ gia nhiệt trong quá trình sản xuất",
      "Hỗ trợ tư vấn thông điệp marketing khoa học Clean & Sustainable Beauty chuẩn quốc tế"
    ]
  },

  "lanxess-cosmetic-advisor": {
    videoScenes: [
      { time: "0:00", title: "Bộ lọc Hệ Bảo quản theo pH & Dạng Sản phẩm", description: "Lựa chọn chất bảo quản thay thế Paraben (như Benzyl Alcohol, Benzoic Acid, Dehydroacetic Acid) tương thích theo dải pH 3.0 đến 8.5." },
      { time: "0:15", title: "Mô phỏng Thử nghiệm Vi sinh ISO 11930", description: "Đồ thị đường cong tiêu diệt vi sinh vật mô phỏng bài kiểm tra Challenge Test 28 ngày đối với nấm men, nấm mốc và vi khuẩn." },
      { time: "0:30", title: "Tra cứu Pháp lý Toàn cầu ASEAN, EU & FDA", description: "Đối chiếu giới hạn nồng độ tối đa cho phép trong mỹ phẩm lưu lại (leave-on) và mỹ phẩm rửa trôi (rinse-off) theo quy định quốc tế." },
      { time: "0:45", title: "Tối ưu Hiệu quả Sát khuẩn & Hiệp đồng Tác dụng", description: "Hướng dẫn kết hợp các chất trợ bảo quản (Chelating agents, Caprylyl Glycol) để tăng cường phổ kháng khuẩn và giảm liều lượng hoạt chất chính." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Giải pháp kỹ thuật bảo quản mỹ phẩm không Paraben toàn diện và khoa học nhất cho các phòng R&D mỹ phẩm. Điểm bất ngờ khi thử nghiệm là công cụ cảnh báo tương tác vô hiệu hóa chất bảo quản khi công thức có chứa chất hoạt động bề mặt ethoxylated (như Polysorbate). Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như công cụ tính toán chi phí bảo quản cho mỗi kilogam thành phẩm và bảng chứng nhận an toàn cho da nhạy cảm!" }
    ],
    keyFeatures: [
      "Bộ lọc chất bảo quản không Paraben theo khoảng pH ổn định và dạng sản phẩm",
      "Mô phỏng đường cong động học tiêu diệt vi sinh vật bài test 28 ngày ISO 11930",
      "Kiểm tra tính tuân thủ pháp lý theo tiêu chuẩn mỹ phẩm ASEAN, EU và FDA",
      "Giải pháp phối hợp chất trợ bảo quản nâng cao phổ ức chế nấm men nấm mốc"
    ]
  },

  "htx-rau-cu": {
    videoScenes: [
      { time: "0:00", title: "Nhật ký Đồng ruộng Điện tử Chuẩn VietGAP", description: "Xã viên ghi nhận ngày xuống giống, tưới tiêu, bón phân và lịch cách ly thuốc bảo vệ thực vật ngay tại ruộng." },
      { time: "0:15", title: "Dự báo Sản lượng & Điều độ Thu hoạch", description: "Thống kê diện tích canh tác và dự báo chính xác sản lượng rau củ sẵn sàng thu hái theo từng tuần để liên kết bao tiêu." },
      { time: "0:30", title: "In Tem Mã QR Truy xuất Nguồn gốc", description: "Tạo mã QR minh bạch cho từng sọt nông sản, giúp người tiêu dùng và siêu thị quét xem trọn vẹn nhật ký canh tác." },
      { time: "0:45", title: "Điều vận Thu gom & Đối soát Thanh toán", description: "Tối ưu lộ trình xe tải vận chuyển nông sản về kho trung tâm và tự động quyết toán tiền bán rau trừ vật tư cho bà con." },
      { time: "1:00", title: "Lời bình & Tính năng bất ngờ khi thử nghiệm", description: "Lời bình thực tế: Ứng dụng nông nghiệp số hóa gần gũi và cực kỳ thực tế, hỗ trợ bà con nông dân và hợp tác xã kết nối thẳng vào siêu thị lớn. Điểm bất ngờ khi thử nghiệm là giao diện bàn phím số lớn dễ bấm bằng một tay ngoài trời nắng và tính năng cảnh báo thời gian cách ly thuốc an toàn tự động. Hãy khám phá và bạn sẽ phát hiện thêm nhiều chức năng khác như sổ theo dõi kho phân bón hữu cơ và bảng theo dõi giá cả thị trường rau củ hàng ngày!" }
    ],
    keyFeatures: [
      "Sổ nhật ký đồng ruộng điện tử ghi nhận ngày gieo trồng, bón phân, cách ly thuốc",
      "Dự báo sản lượng rau củ sẵn sàng xuất vườn theo từng ô thửa canh tác",
      "Tạo tem mã QR truy xuất nguồn gốc nông sản cho từng lô hàng siêu thị",
      "Quản lý lịch giao nhận xe tải và tự động đối soát thanh toán cho bà con xã viên"
    ]
  }
};

let appsContent = fs.readFileSync("src/data/apps.ts", "utf8");

for (const [appId, data] of Object.entries(appsUpdates)) {
  // Regex to match app object
  const appRegex = new RegExp(`(id:\\s*["']${appId}["'][\\s\\S]*?videoScenes:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?keyFeatures:\\s*\\[)([\\s\\S]*?)(\\])`);
  
  const match = appsContent.match(appRegex);
  if (!match) {
    console.warn(`Could not match app [${appId}] in apps.ts`);
    continue;
  }

  // Format new videoScenes
  const scenesFormatted = data.videoScenes
    .map(s => `\n      { time: "${s.time}", title: "${s.title}", description: "${s.description}" }`)
    .join(",") + "\n    ";

  // Format new keyFeatures
  const featsFormatted = data.keyFeatures
    .map(f => `\n      "${f}"`)
    .join(",") + "\n    ";

  appsContent = appsContent.replace(appRegex, `$1${scenesFormatted}$3${featsFormatted}$5`);
  console.log(`[OK] Updated data for [${appId}]`);
}

fs.writeFileSync("src/data/apps.ts", appsContent, "utf8");
console.log("\nSuccessfully updated all 19 apps in src/data/apps.ts!");
