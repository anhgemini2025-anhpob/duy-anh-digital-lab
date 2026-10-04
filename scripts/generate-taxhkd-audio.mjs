import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "SMARTTAX HKD: Trợ Lý Thuế Số Hóa Cho Hộ Kinh Doanh",
    male: "Làm chủ một cửa hàng kinh doanh, bán buôn mỗi ngày đã bận tối mắt tối mũi. Nhưng cứ hễ đến kỳ kê khai thuế, việc sổ sách, hóa đơn và chứng từ lại khiến các anh chị chủ hộ đau đầu hơn cả việc bán hàng...",
    female: "Đúng thế anh ạ! Hàng nhập, hàng bán, tồn kho có khớp không? Doanh thu thực tế bao nhiêu, tính thuế thế nào? Giờ đây đã có X-mát Tắc Hát-Ca-Đê – trợ lý thuế số hóa thông minh, giúp chủ hộ kinh doanh quản lý mọi việc nhàn tênh ngay trên chiếc điện thoại di động!"
  },
  {
    idx: 2,
    title: "01 | Khởi Tạo Hồ Sơ Kinh Doanh Chỉ Với 3 Bước",
    male: "Tính năng đầu tiên cực kỳ nhanh gọn: Khởi tạo hồ sơ kinh doanh chỉ với ba bước đơn giản. Không cần cài đặt rườm rà hay nhờ kế toán thiết lập phức tạp.",
    female: "Chính xác anh ạ! Chỉ cần chọn ngành nghề và nhập mức doanh thu, hệ thống sẽ tự động xác định ngay thuế suất Giá trị gia tăng và Thu nhập cá nhân tương ứng, giúp cơ sở có ngay một hồ sơ pháp lý rõ ràng, chuẩn chỉnh từ ngày đầu!"
  },
  {
    idx: 3,
    title: "02 | Xác Thực VNeID & Quản Lý Tài Khoản Ngân Hàng",
    male: "Điểm tiện lợi thứ hai là thông tin kinh doanh được liên kết định danh Vê-Nê-Ai-Đi và quản lý tài khoản ngân hàng phục vụ kinh doanh riêng biệt.",
    female: "Rất chuẩn mực anh ạ! Nhờ đó toàn bộ tiền bán hàng và dòng tiền thực tế được đối chiếu minh bạch. Chủ hộ dễ dàng nắm bắt dòng tiền ra vào, hạn chế tối đa rủi ro nhầm lẫn giữa chi tiêu gia đình với hoạt động cửa hàng."
  },
  {
    idx: 4,
    title: "03 | Chụp Ảnh Hóa Đơn Đầu Vào – AI Tự Động Đọc Dữ Liệu",
    male: "Mỗi ngày nhập hàng về có biết bao nhiêu hóa đơn mua sắm, nếu cứ ngồi gõ tay từng dòng vào sổ thì vừa mỏi mắt lại dễ sai sót.",
    female: "Với X-mát Tắc Hát-Ca-Đê, anh chị chỉ cần dùng điện thoại chụp tấm ảnh hóa đơn. Trí tuệ nhân tạo Ây-Ai sẽ tự động nhận diện tên hàng hóa, số lượng, đơn giá và ngày mua rồi đưa thẳng vào hệ thống chỉ trong vài giây!"
  },
  {
    idx: 5,
    title: "04 | Mua Hàng Không Hóa Đơn – Lập Bảng Kê & Ký Điện Tử",
    male: "Nhiều khi hộ kinh doanh mua nông sản, thực phẩm tươi sống hay hàng hóa trực tiếp từ bà con nông dân thì làm gì có hóa đơn hả em?",
    female: "Đừng lo anh nhé! Ứng dụng hỗ trợ tạo ngay Bảng kê mua hàng chuẩn quy định. Người bán ký tên điện tử trực tiếp trên màn hình cảm ứng, hình thành bộ chứng từ kế toán hợp lệ, thuận tiện quản lý và giải trình sau này!"
  },
  {
    idx: 6,
    title: "05 | Quản Lý Kho Xuất Nhập Tồn & Chặn Xuất Âm Kho",
    male: "Quản lý kho hàng luôn là bài toán nan giải. Hàng trên kệ thực tế một đằng, sổ sách ghi một nẻo, lỡ xuất bán âm kho là bị phạt rất nặng.",
    female: "Hệ thống quản lý kho thông minh cập nhật tồn kho theo thời gian thực. Hàng nhập hay bán đến đâu, số tồn nhảy đến đó. Phần mềm tự động chặn xuất bán vượt quá tồn kho thực tế, bảo đảm số liệu luôn chuẩn xác từng món!"
  },
  {
    idx: 7,
    title: "06 | Bán Hàng POS Siêu Tốc Ngay Trên Điện Thoại",
    male: "Chủ hộ không cần đầu tư máy tính tiền đắt đỏ hay thiết bị cồng kềnh. Giao diện máy bán hàng Pê-Ô-Ét được thiết kế tối ưu mượt mà ngay trên điện thoại.",
    female: "Vâng, thao tác chạm chọn món và thanh toán cực kỳ nhanh chóng. Chủ hộ còn có thể phân quyền linh hoạt cho nhân viên bán hàng đứng quầy, vừa tiện lợi lại kiểm soát doanh thu chặt chẽ từng ca!"
  },
  {
    idx: 8,
    title: "07 | Xuất Hóa Đơn Điện Tử Tức Thì Khi Bán Hàng",
    male: "Hiện nay quy định ngành thuế bắt buộc hộ kinh doanh phải xuất hóa đơn điện tử khởi tạo từ máy tính tiền. Khâu này xử lý có nhanh không em?",
    female: "Rất mượt mà anh ạ! Ngay khi hoàn tất đơn bán hàng, hệ thống hỗ trợ tạo hóa đơn điện tử tức thì. Dù khách cần hóa đơn hay khách lẻ không lấy, dữ liệu đều được phân loại đúng chuẩn quy định của cơ quan thuế!"
  },
  {
    idx: 9,
    title: "08 | Thanh Toán Mã Động VietQR – Khách Quét Là Xong",
    male: "Bây giờ khách mua hàng ai cũng thích quét mã chuyển khoản. Nhưng đọc số tài khoản rồi bảo khách tự gõ số tiền thì dễ nhầm lẫn lắm.",
    female: "Đúng vậy ạ! Ứng dụng tự động tạo mã Việt Quy-Rờ động đúng chính xác số tiền của từng đơn hàng. Khách hàng chỉ việc quét mã xác nhận là tiền về ngay tài khoản, không lo chuyển nhầm hay thiếu tiền!"
  },
  {
    idx: 10,
    title: "09 | Tự Động Nhận Diện & Áp Dụng Chính Sách Giảm Thuế",
    male: "Chính sách thuế thường xuyên thay đổi, mặt hàng nào được giảm thuế Giá trị gia tăng, mặt hàng nào giữ nguyên, nhớ từng mã hàng rất đau đầu.",
    female: "Anh yên tâm, X-mát Tắc Hát-Ca-Đê đã cấu hình sẵn danh mục chính sách giảm thuế. Khi bán mặt hàng thuộc diện áp dụng, hệ thống tự động nhận diện và đưa mức ưu đãi lên hóa đơn, giúp chủ hộ không cần phải nhớ thủ công!"
  },
  {
    idx: 11,
    title: "10 | Tự Động Lập Trọn Bộ 7 Sổ Kế Toán Hộ Kinh Doanh",
    male: "Phần mà chủ hộ kinh doanh ngán nhất chính là bảy cuốn sổ kế toán: sổ doanh thu, sổ chi phí, sổ kho, sổ quỹ tiền mặt, tiền gửi ngân hàng...",
    female: "Thay vì hằng đêm phải cặm cụi ghi chép từng cuốn sổ, phần mềm tự động tổng hợp toàn bộ dữ liệu thành trọn bộ bảy cuốn sổ từ Ét một đến Ét bảy theo Thông tư 88 của Bộ Tài chính, tra cứu và đối chiếu cực kỳ nhẹ nhàng!"
  },
  {
    idx: 12,
    title: "11 | Tự Động Tính Thuế & Kết Xuất Tờ Khai 01/CNKD",
    male: "Đến kỳ kê khai thuế mỗi quý, không cần phải lấy máy tính bỏ túi ra bấm bấm cộng cộng từng khoản nữa rồi.",
    female: "Dạ đúng rồi! Hệ thống tự động tạm tính nghĩa vụ thuế Giá trị gia tăng và Thu nhập cá nhân theo đúng doanh thu. Đồng thời hỗ trợ kết xuất bộ hồ sơ tờ khai mẫu không một gạch chéo Cá nhân kinh doanh, sẵn sàng phục vụ nộp thuế!"
  },
  {
    idx: 13,
    title: "12 | Dashboard Thông Minh & Cảnh Báo Ngưỡng Thuế",
    male: "Một rủi ro rất lớn của các chủ hộ là quên hạn nộp thuế hoặc không để ý doanh thu chạm ngưỡng chuyển đổi phương pháp kê khai.",
    female: "Màn hình tổng quan Đát-bo hiển thị trực quan doanh thu lũy kế, theo dõi sát ngưỡng năm trăm triệu và ngưỡng một tỷ đồng. Hệ thống tự động cảnh báo khi gần đến hạn, giúp chủ hộ luôn chủ động, không lo bị phạt chậm nộp!"
  },
  {
    idx: 14,
    title: "13 | SmartTax HKD: Làm Kinh Doanh, Không Phải Làm Kế Toán",
    male: "Các anh chị mở cửa hàng là để kinh doanh, phục vụ khách hàng và kiếm lợi nhuận, chứ không phải để cả ngày ngồi cộng sổ sách kế toán.",
    female: "X-mát Tắc Hát-Ca-Đê kết nối liền mạch từ bán hàng, hóa đơn, thanh toán, quản lý kho, sổ sách đến tính thuế và cảnh báo. Mọi việc gói gọn trong một nền tảng, giải phóng hoàn toàn thời gian và tâm trí cho chủ hộ!"
  },
  {
    idx: 15,
    title: "14 | Lời Bình Thực Tế & Khám Phá Trải Nghiệm SmartTax HKD",
    male: "Lời bình thực tế: X-mát Tắc Hát-Ca-Đê thiết kế rất sát với thực tiễn các cửa hàng tại Việt Nam. Điểm bất ngờ khi thử nghiệm là ứng dụng Pê-Kép-A vẫn bán hàng trơn tru ngay cả khi mất mạng in-tơ-nét.",
    female: "Đừng đợi đến kỳ thuế mới bắt đầu cuống cuồng tìm lại sổ sách. Hãy quản lý chặt chẽ ngay từ giao dịch đầu tiên. Mời quý vị truy cập Tắc Hát-Ca-Đê chấm vơ-xen chấm áp để trải nghiệm ngay hôm nay: Bán hàng dễ hơn, sổ sách rõ hơn, thuế chủ động hơn!"
  }
];

async function synthesizeText(voiceName, text, voiceSettings) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, voiceSettings);
      const chunks = [];
      for await (const chunk of audioStream) {
        chunks.push(chunk);
      }
      const buf = Buffer.concat(chunks);
      if (buf.length > 2000) {
        return buf;
      }
      throw new Error(`Buffer too small: ${buf.length}`);
    } catch (e) {
      console.warn(`[Attempt ${attempt}] TTS error for ${voiceName}: ${e.message}`);
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
  throw new Error(`Failed to synthesize with ${voiceName} after 4 attempts`);
}

async function run() {
  const targetDir = path.join(process.cwd(), "public", "apps", "taxhkd");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Giọng Hà Nội chuẩn Bắc, ấm áp
  const maleVoice = "vi-VN-NamMinhNeural";
  const maleSettings = { rate: "+2%", pitch: "0Hz" };

  const femaleVoice = "vi-VN-HoaiMyNeural";
  const femaleSettings = { rate: "+3%", pitch: "0Hz" };

  console.log("=== BẮT ĐẦU TẠO LỜI BÌNH ĐỐI THOẠI NAM/NỮ GIỌNG HÀ NỘI CHO SMARTTAX HKD ===");
  console.log(`Nam: ${maleVoice} | Nữ: ${femaleVoice}`);
  console.log(`Tổng cộng: ${scenes.length} cảnh\n`);

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Cảnh ${scene.idx}/${scenes.length}] Tạo thuyết minh: "${scene.title}"...`);

    const maleBuf = await synthesizeText(maleVoice, scene.male, maleSettings);
    // Pause buffer: 400ms silence between speakers (approx 1920 bytes of silence)
    const silence = Buffer.alloc(1920);
    const femaleBuf = await synthesizeText(femaleVoice, scene.female, femaleSettings);

    const combined = Buffer.concat([maleBuf, silence, femaleBuf]);
    fs.writeFileSync(targetFile, combined);

    const stat = fs.statSync(targetFile);
    console.log(`✓ [Cảnh ${scene.idx}] Đã lưu: ${targetFile} (${(stat.size / 1024).toFixed(1)} KB, ~${(stat.size / 6000).toFixed(1)}s)\n`);
  }

  console.log("=== HOÀN TẤT TẠO TOÀN BỘ 15 AUDIO ĐỐI THOẠI CHO SMARTTAX HKD! ===");
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
