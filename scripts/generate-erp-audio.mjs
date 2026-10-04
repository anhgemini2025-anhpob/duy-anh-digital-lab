import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "Khó Khăn Quản Lý Hiệu Thuốc Thú Y & Thủy Sản",
    male: "Mở tiệm bán thuốc thú y với thuốc thủy sản ven sông ngó bộ tấp nập thiệt, nhưng ngán nhất là cảnh thất thoát hàng hóa, thuốc nằm sâu dưới đáy kệ gần hết hạn mới hay, rồi khách nợ gối đầu từ vụ này sang vụ khác...",
    female: "Dạ đúng rồi anh! Giờ có giải pháp Vét Ác-qua E-Rờ-Pê Lai, như có thêm người quản lý đắc lực phụ quán xuyến từ kho bãi, hạn dùng, sổ nợ cho tới dòng tiền, khỏe re hà anh ơi!"
  },
  {
    idx: 2,
    title: "01 | Cảnh Báo Hàng Cận Date & Xuất Trước",
    male: "Cái hay đầu tiên là quản lý hạn dùng nè em. Trước đây thuốc men chất đầy kho, hổng nhớ nổi chai nào nhập trước, chai nào sắp cận đát.",
    female: "Dạ, giờ trên áp tự động phân loại bằng màu sắc xanh, vàng, đỏ rõ ràng nghen anh. Lô nào gần hết hạn là hệ thống báo động liền, nhắc mình ưu tiên xuất bán trước, không bao giờ lo ứ đọng chôn vốn đâu nè!"
  },
  {
    idx: 3,
    title: "02 | Tự Động Chặn Bán Hàng Hết Hạn",
    male: "Bán thuốc cho tôm cá hay gia súc, lỡ nhân viên sơ ý bán nhầm chai thuốc quá hạn một cái là đền méo mặt, mất hết uy tín tiệm luôn đó em.",
    female: "Bởi vậy áp mới có tính năng tự động khóa, chặn đứng không cho xuất bán sản phẩm đã hết hạn. Dù quét mã vạch hay chọn tay, màn hình đều cảnh báo đỏ rực, an tâm tuyệt đối luôn nha anh!"
  },
  {
    idx: 4,
    title: "03 | Thanh Toán Mã VietQR Chuẩn Xác, Nhanh Chóng",
    male: "Mỗi lần vô mùa cao điểm, bà con ghé tiệm mua đông nghẹt, đếm tiền thối lộn qua lộn lại hoặc khách chuyển khoản thiếu tiền là nhức đầu lắm.",
    female: "Dạ, giờ khách mua món gì là màn hình quầy tự hiện mã Việt Quy-Rờ đúng y bon số tiền. Bà con chỉ cần đưa điện thoại lên quét cái bíp là tiền về tài khoản tức thì, nhanh gọn mà hổng sợ nhầm lẫn đồng nào!"
  },
  {
    idx: 5,
    title: "04 | Mất Mạng Vẫn Bán Hàng Trơn Tru Ngoại Tuyến",
    male: "Mùa mưa bão ở miền Tây mình hay bị đứt cáp, mất mạng in-tơ-nét bất tử. Tiệm không có mạng rồi sao lập hóa đơn bán hàng em?",
    female: "Anh an tâm nghen! Áp Vét Ác-qua chạy mượt mà ngay cả khi ốp-lai mất mạng. Mình vẫn tạo hóa đơn, in phiếu cho khách bình thường. Chừng nào có sóng lại là máy tự động đồng bộ lên hệ thống liền, không gián đoạn phút nào!"
  },
  {
    idx: 6,
    title: "05 | Trợ Lý AI Gợi Ý Phác Đồ Điều Trị Gia Súc & Thủy Sản",
    male: "Nhiều khi nhân viên mới đứng quầy, bà con chạy vô tả heo bị ho, tôm bị đốm trắng, gặp ca bệnh khó đâu biết kê toa sao cho đúng.",
    female: "Dạ, lúc đó mở ngay Trợ lý trí tuệ nhân tạo A-I trên áp ra nghen! Chỉ cần chọn triệu chứng là áp gợi ý phác đồ điều trị chuẩn xác, lại còn ưu tiên chọn những loại thuốc đang có sẵn tại kho tiệm mình nữa đó anh!"
  },
  {
    idx: 7,
    title: "06 | Cảnh Báo Tương Kỵ Thuốc Nguy Hiểm",
    male: "Trong nghề thú y, có những hoạt chất kháng sinh kỵ nhau dữ lắm, phối chung một toa là vật nuôi sốc thuốc ngộ độc liền.",
    female: "Dạ đúng rồi anh Huy! Khi mình lên đơn mà vô tình chọn hai loại thuốc tương kỵ, áp sẽ hú còi cảnh báo nguy hiểm trên màn hình liền, bắt buộc kiểm tra lại trước khi bán ra cho bà con."
  },
  {
    idx: 8,
    title: "07 | Tự Động Chặn Khách Nợ Quá Hạn Mức",
    male: "Bà con nuôi tôm nuôi cá thường mua chịu thuốc men, hẹn chừng nào thu hoạch mới thanh toán. Mà nợ nhiều quá lỡ neo nợ hoài thì tiệm mình đứt vốn.",
    female: "Dạ, trên áp mình cài sẵn hạn mức công nợ cho từng mối lái. Khách nào vượt quá trần nợ cho phép là hệ thống tự động khóa sổ, chặn bán chịu liền, trừ khi anh chủ duyệt mới được xuất tiếp."
  },
  {
    idx: 9,
    title: "08 | Phân Tích Rủi Ro Tín Dụng Khách Hàng",
    male: "Hay quá! Mà làm sao mình biết khách nào làm ăn uy tín, khách nào có nguy cơ nợ khó đòi để quyết định cho thiếu em?",
    female: "Dạ, áp tự động tổng hợp lịch sử mua hàng, thời gian thanh toán rồi chấm điểm uy tín cho từng hộ nuôi luôn anh. Nhìn vô biểu đồ là anh chủ tiệm biết rõ ai uy tín để hợp tác lâu dài."
  },
  {
    idx: 10,
    title: "09 | Nhắc Nợ Tự Động Đúng Lúc Thu Hoạch",
    male: "Đi đòi nợ người ta là ngại nhất trên đời, nhắc sớm thì mất lòng, mà để lâu quá thì hổng biết đường đâu thu.",
    female: "Dạ, áp theo dõi sát sao lịch thả giống và ngày dự kiến bà con kéo lưới thu hoạch tôm cá. Tới đúng ngày là áp tạo sẵn tin nhắn đối soát lịch sự qua Da-lô, bà con vừa bán tôm có tiền là gửi thanh toán cho tiệm mình liền, êm thắm cả đôi bên!"
  },
  {
    idx: 11,
    title: "10 | Biết Rõ Doanh Thu & Lời Lỗ Hằng Ngày",
    male: "Trước đây bán buôn cả tháng, tới cuối tháng ngồi cộng cuốn sổ dầy cui, tính tới tính lui cũng chẳng biết lời lỗ được bao nhiêu.",
    female: "Dạ, giờ mở áp lên là thấy biểu đồ trực quan nhảy số từng ngày, từng giờ! Hôm nay bán được bao nhiêu, tiền vốn bao nhiêu, trừ chi phí ra còn lời ròng bao nhiêu, nắm chắc trong lòng bàn tay luôn nghen anh!"
  },
  {
    idx: 12,
    title: "11 | Xuất Sổ Kế Toán & Báo Cáo Thuế Excel",
    male: "Còn khâu sổ sách kế toán, hóa đơn chứng từ báo cáo thuế thì sao em? Có cực lắm không?",
    female: "Dạ khỏe re luôn anh! Mọi giao dịch xuất, nhập, tồn đều được tổng hợp tự động. Cần nộp báo cáo thuế là bấm một nút xuất ra file Ích-xeo chuẩn mẫu Thông tư 88 của Bộ Tài chính liền, kế toán đỡ cực biết bao nhiêu!"
  },
  {
    idx: 13,
    title: "12 | Cảnh Báo Hoạt Chất Kiểm Soát & Hạn Giấy Phép",
    male: "Cửa hàng thuốc thú y phải tuân thủ nghiêm ngặt các danh mục kháng sinh hạn chế và hạn giấy phép hành nghề của cơ quan quản lý nữa.",
    female: "Dạ, áp tự động gắn nhãn các hoạt chất cần kiểm soát đặc biệt. Đồng thời đếm ngược cảnh báo trước 60 ngày khi giấy phép trạm thú y sắp hết hạn để chủ tiệm kịp thời đi gia hạn, chuẩn chỉnh pháp lý nghen anh."
  },
  {
    idx: 14,
    title: "13 | Quản Lý Nhiệt Độ Tủ Mát & Truy Xuất Lô Vắc-Xin",
    male: "Vắc-xin cho gia súc gia cầm là mặt hàng nhạy cảm nhất, nhiệt độ bảo quản phải luôn giữ chuẩn từ hai đến tám độ C mới giữ được chất lượng.",
    female: "Dạ chuẩn luôn anh! Áp ghi nhận lịch sử nhiệt độ tủ mát và theo dõi từng lô vắc-xin. Khách nào mua lô nào đều lưu vết rõ ràng, lỡ có vấn đề gì là truy xuất nguồn gốc trong một nốt nhạc."
  },
  {
    idx: 15,
    title: "14 | Chụp Hóa Đơn Nhập Kho Bằng Công Nghệ OCR",
    male: "Mỗi đợt xe tải chở mấy chục thùng thuốc về nhập kho, ngồi gõ từng tên thuốc, hàm lượng, số lô vô máy chắc mờ con mắt luôn quá.",
    female: "Hổng cần gõ tay đâu anh ơi! Chỉ cần lấy điện thoại chụp tấm hình hóa đơn nhà cung cấp, công nghệ quét chữ O-C-Rờ của áp sẽ tự động đọc hết số lượng, đơn giá rồi lưu thẳng vô kho chỉ trong vài giây hà!"
  },
  {
    idx: 16,
    title: "15 | Tự Động Tính Hoa Hồng & Kho Kiến Thức Tra Cứu",
    male: "Cửa hàng muốn phát triển thì nhân viên bán hàng phải có động lực và am hiểu chuyên môn mới tư vấn cho bà con được.",
    female: "Dạ đúng rồi anh! Áp có kho cẩm nang kiến thức bệnh học cho nhân viên tra cứu liền tay, lại tự động cộng thưởng hoa hồng cho các mặt hàng cần đẩy mạnh. Tụi em nhìn thấy hoa hồng nhảy số là bán hàng hăng say dữ lắm!"
  },
  {
    idx: 17,
    title: "16 | Quản Trị Thấu Suốt Toàn Diện Cho Cửa Hàng Thú Y",
    male: "Đúng là có áp Vét Ác-qua E-Rờ-Pê Lai, việc kinh doanh hiệu thuốc thú y và thủy sản nhẹ gánh hẳn. Hàng hóa minh bạch, công nợ nằm trong tầm kiểm soát, dòng tiền lưu thông thông suốt.",
    female: "Dạ, một cửa hàng quản lý tốt là biết hàng ở đâu, tiền ở đâu, khách nợ bao nhiêu và chặn trước mọi rủi ro thất thoát. Nhờ vậy bà con nông dân tín nhiệm, mà tiệm mình cũng ngày càng phát tài phát lộc!"
  },
  {
    idx: 18,
    title: "17 | Nâng Tầm Kinh Doanh & Thịnh Vượng Bền Vững",
    male: "Bà con và các anh chị chủ đại lý thuốc thú y, thủy sản miền Tây mình ơi, đừng để sổ sách giấy tờ làm mình đau đầu nhức óc nữa!",
    female: "Dạ, hãy trải nghiệm ngay giải pháp chuyển đổi số thông minh Vét Ác-qua E-Rờ-Pê Lai ngay hôm nay để quản lý nhàn tênh, nâng tầm cơ ngơi và kinh doanh ngày càng khấm khá, ấm no bà con mình nghen!"
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
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  throw new Error(`Failed to synthesize with ${voiceName} after 4 attempts`);
}

async function run() {
  const targetDir = path.join(process.cwd(), "public", "apps", "vet-aqua-erp");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const maleVoice = "vi-VN-NamMinhNeural";
  const maleSettings = { rate: "+3%", pitch: "-1Hz" }; // Giọng nam 25 tuổi miền Tây, khỏe, thật thà

  const femaleVoice = "vi-VN-HoaiMyNeural";
  const femaleSettings = { rate: "+4%", pitch: "+0Hz" }; // Giọng nữ miền Tây dễ thương, chất phác

  console.log("=== BẮT ĐẦU TẠO LỜI BÌNH ĐỐI THOẠI NAM/NỮ MIỀN TÂY CHO VET & AQUA ERP LITE ===");
  console.log(`Nam: ${maleVoice} | Nữ: ${femaleVoice}`);
  console.log(`Tổng cộng: ${scenes.length} cảnh\n`);

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Cảnh ${scene.idx}/${scenes.length}] Tạo thuyết minh: "${scene.title}"...`);

    const maleBuf = await synthesizeText(maleVoice, scene.male, maleSettings);
    const femaleBuf = await synthesizeText(femaleVoice, scene.female, femaleSettings);

    const combined = Buffer.concat([maleBuf, femaleBuf]);
    fs.writeFileSync(targetFile, combined);

    const stat = fs.statSync(targetFile);
    console.log(`✓ [Cảnh ${scene.idx}] Đã lưu: ${targetFile} (${(stat.size / 1024).toFixed(1)} KB, ~${(stat.size / 6000).toFixed(1)}s)\n`);
  }

  console.log("=== HOÀN TẤT TẠO TOÀN BỘ 18 AUDIO ĐỐI THOẠI CHO VET & AQUA ERP LITE! ===");
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
