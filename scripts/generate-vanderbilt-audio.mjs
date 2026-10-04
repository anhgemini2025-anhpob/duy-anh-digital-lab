import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "VANDERBILT ADVISOR: Cố Vấn Kỹ Thuật Số R&D Cho Khoáng Chất & Lưu Biến",
    male: "Làm R en Đi, điều khó nhất đôi khi không phải là thiếu nguyên liệu, mà là khi công thức gặp sự cố thì mất bao lâu để tìm đúng giải pháp hả em?",
    female: "Dạ đúng rồi anh! Công thức bị tách lớp, độ nhớt chưa ưng ý, hay lật tung tài liệu tiếng Anh mà vẫn chưa tìm được khoáng chất phù hợp. Đừng lo, đã có Van-đơ-bin Ất-vai-sơ – trợ lý kỹ thuật số đồng hành cùng đội ngũ R en Đi giải quyết mọi bài toán công thức siêu nhanh và chuẩn xác!"
  },
  {
    idx: 2,
    title: "01 | Tra Cứu Hoàn Toàn Bằng Tiếng Việt",
    male: "Điểm cộng đầu tiên mà anh cực kỳ thích: toàn bộ giao diện và tài liệu kỹ thuật đều được Việt hóa một trăm phần trăm, rất trực quan và dễ hiểu!",
    female: "Chuẩn luôn anh ơi! Dù anh đang ở phòng Lab hay đi gặp khách hàng, chỉ cần mở điện thoại hoặc máy tính lên là tra cứu được ngay mọi thông số, không còn phải đau đầu dịch từng trang tài liệu tiếng Anh nữa nhé!"
  },
  {
    idx: 3,
    title: "02 | Tìm Đúng Sản Phẩm Theo Nhu Cầu",
    male: "Khoáng chất của Van-đơ-bin có nhiều mã quá, làm sao người mới nhớ hết được mã nào dùng cho sản phẩm nào em nhỉ?",
    female: "Anh không cần phải nhớ đâu nè! Chỉ cần chọn ngành hàng và nhu cầu mong muốn, ứng dụng sẽ gợi ý ngay mã nguyên liệu tối ưu nhất, kèm giải thích rõ vì sao nên chọn, giúp anh đi từ nhu cầu đến đúng nguyên liệu trong tích tắc!"
  },
  {
    idx: 4,
    title: "03 | Gặp Vấn Đề Công Thức – Có Ngay Hướng Xử Lý",
    male: "Trong lúc pha chế mà sản phẩm bị vón cục, lắng cặn hay chảy lỏng thì xử lý thế nào cho nhanh hả em?",
    female: "Anh chỉ cần mở mục Bắt bệnh công thức! Ứng dụng tổng hợp sẵn hai mươi bảy vấn đề thường gặp trên tám ngành hàng, chỉ rõ nguyên nhân và đưa ra hướng xử lý cực kỳ bài bản, giúp anh tự tin làm chủ công thức nha!"
  },
  {
    idx: 5,
    title: "04 | Mô Phỏng Quy Trình Thử Nghiệm Chuẩn SOP",
    male: "Nhiều khi chọn đúng nguyên liệu rồi mà khuấy sai lực hay sai nhiệt độ là mẻ thử nghiệm hỏng ngay, tiếc công sức lắm!",
    female: "Bởi vậy phòng Ét-Ô-Pê mô phỏng của app cực kỳ hữu ích anh ạ! Hệ thống hướng dẫn chuẩn xác nhiệt độ, tốc độ khuấy và thời gian hydrat hóa, còn cảnh báo cả nguy cơ nếu làm sai quy trình nữa, đảm bảo thử nghiệm là thành công!"
  },
  {
    idx: 6,
    title: "05 | Tính Nhanh Khối Lượng Mẻ",
    male: "Từ công thức phòng thí nghiệm một trăm gam mà muốn nâng quy mô lên mẻ mười ký, năm mươi ký hay nửa tấn thì tính toán có mất công không em?",
    female: "Dễ như ăn kẹo luôn anh! Anh chỉ việc nhập tổng khối lượng mẻ cần sản xuất, hệ thống sẽ tự động quy đổi chính xác từng thành phần theo tỷ lệ phần trăm, không lo nhầm lẫn một mi-li-gam nào đâu ạ!"
  },
  {
    idx: 7,
    title: "06 | Thư Viện Hơn 200 Công Thức Ứng Dụng",
    male: "Mỗi lần lên dự án sản phẩm mới mà phải nghiên cứu từ con số không thì mất nhiều tuần lễ quá!",
    female: "Thế thì kho hơn hai trăm công thức ứng dụng chuẩn quốc tế này sinh ra là dành cho anh rồi! Từ kem chống nắng, kem nền, sữa tắm đến dược phẩm, anh tha hồ tham khảo để phát triển sản phẩm mới nhanh vượt bậc!"
  },
  {
    idx: 8,
    title: "07 | Tra Cứu 52 Sản Phẩm Với Nhiều Bộ Lọc",
    male: "Năm mươi hai sản phẩm khoáng chất chuyên dụng với đủ đặc tính khác nhau, lọc thế nào cho trúng mã cần tìm hả em?",
    female: "Anh cứ dùng bộ lọc đa tiêu chí nhé! Lọc theo ngành hàng, chức năng lưu biến, hay theo từng tiêu chuẩn chứng nhận khắt khe, chỉ vài cú chạm là danh sách nguyên liệu phù hợp hiện ra ngay trước mắt!"
  },
  {
    idx: 9,
    title: "08 | Hiểu Chứng Nhận Và Hồ Sơ Pháp Lý",
    male: "Làm sản phẩm cho thị trường khó tính thì hồ sơ pháp lý và chứng nhận tiêu chuẩn là bắt buộc phải rõ ràng đúng không em?",
    female: "Dạ vâng! Ứng dụng giải thích cặn kẽ từng chứng chỉ như Di-Em-Pi, Ép-Ép-Ét-Xê hai mươi hai nghìn, kèm tài liệu kỹ thuật gốc, giúp anh chuẩn bị hồ sơ công bố sản phẩm nhanh gọn và chuẩn chỉnh tuyệt đối!"
  },
  {
    idx: 10,
    title: "09 | Chọn Sản Phẩm – Tạo Phiếu Yêu Cầu PDF Ngay",
    male: "Sau khi chọn xong nguyên liệu và công thức ưng ý, muốn xin mẫu thử hoặc báo giá thì gửi cho nhà cung ứng thế nào em?",
    female: "Anh chỉ cần bấm tạo phiếu, hệ thống sẽ xuất ngay file Pê-Đê-Ép khổ A-Bốn chuyên nghiệp có đầy đủ tên mã, hàm lượng và thông tin liên hệ, gửi đi là nhận được phản hồi hỗ trợ kỹ thuật ngay lập tức!"
  },
  {
    idx: 11,
    title: "10 | Tập Trung Vào Hệ Sinh Thái Khoáng Chất Vanderbilt",
    male: "Những dòng khoáng chất danh tiếng như Vi-gâm, Van-zan, Van-sil hay Đác-van đều được tích hợp đầy đủ trong hệ sinh thái này phải không em?",
    female: "Đúng thế anh ạ! Tất cả các dòng khoáng chất nổi tiếng của Van-đơ-bin từ kiểm soát lưu biến, chống sa lắng đến ổn định nhũ tương đều được kết nối trọn gói tại một nơi duy nhất!"
  },
  {
    idx: 12,
    title: "11 | Kết Nối Toàn Diện Từ Ý Tưởng Đến Thực Nghiệm",
    male: "Từ khâu tìm kiếm ý tưởng, chọn nguyên liệu, mô phỏng quy trình cho đến chuẩn bị hồ sơ thử nghiệm, mọi thứ đều liền mạch đến bất ngờ!",
    female: "Chính sự đồng bộ này giúp các chuyên gia R en Đi và kỹ thuật viên rút ngắn hàng tuần làm việc, tiết kiệm chi phí thử nghiệm và tăng tỷ lệ thành công của mỗi sản phẩm mới đấy anh!"
  },
  {
    idx: 13,
    title: "12 | Lời Kết: Tìm Đúng Nguyên Liệu – Phát Triển Công Thức Thông Minh Hơn",
    male: "R en Đi không chỉ là tìm một nguyên liệu, mà là tìm đúng giải pháp, hiểu đúng cách dùng và giải quyết triệt để vấn đề công thức.",
    female: "Hãy trải nghiệm Van-đơ-bin Ất-vai-sơ ngay hôm nay để tối ưu hóa công thức của bạn! Tìm đúng nguyên liệu, hiểu đúng ứng dụng, phát triển sản phẩm thông minh và đột phá cùng Van-đơ-bin nhé!"
  }
];

async function synthesizeText(voiceName, text, options = {}) {
  const retries = 6;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, {
        rate: options.rate || "+0%",
        pitch: options.pitch || "+0Hz"
      });

      const chunks = [];
      try {
        for await (const chunk of audioStream) {
          chunks.push(chunk);
        }
      } catch (streamErr) {
        // tolerate stream close without turn.end if chunks collected
      }

      const buf = Buffer.concat(chunks);
      if (buf.length > 2000) {
        return buf;
      }
      throw new Error(`Buffer too small: ${buf.length}`);
    } catch (err) {
      console.warn(`[Attempt ${attempt}/${retries}] TTS error for ${voiceName}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  throw new Error(`Failed to synthesize with ${voiceName} after ${retries} attempts`);
}

async function run() {
  const targetDir = path.join(process.cwd(), "public", "apps", "vanderbilt-advisor");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Giọng Nam ấm áp, phong thái chuyên gia
  const maleVoice = "vi-VN-NamMinhNeural";
  const maleSettings = { rate: "+3%", pitch: "0Hz" };

  // Giọng Nữ ngọt ngào, dễ thương, chuyên nghiệp
  const femaleVoice = "vi-VN-HoaiMyNeural";
  const femaleSettings = { rate: "+3%", pitch: "0Hz" };

  console.log("=== BẮT ĐẦU TẠO LỜI BÌNH ĐỐI THOẠI TƯƠNG TÁC NAM/NỮ CHO VANDERBILT R&D ADVISOR ===");
  console.log(`Nam: ${maleVoice} | Nữ: ${femaleVoice}`);
  console.log(`Tổng cộng: ${scenes.length} cảnh\n`);

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 50000) {
      console.log(`✓ [Cảnh ${scene.idx}] Đã có sẵn: ${targetFile} (${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB), bỏ qua.`);
      continue;
    }
    console.log(`[Cảnh ${scene.idx}/${scenes.length}] Tạo thuyết minh tương tác: "${scene.title}"...`);

    const maleBuf = await synthesizeText(maleVoice, scene.male, maleSettings);
    // Pause buffer: 400ms silence between speakers
    const silence = Buffer.alloc(1920);
    const femaleBuf = await synthesizeText(femaleVoice, scene.female, femaleSettings);

    const combined = Buffer.concat([maleBuf, silence, femaleBuf]);
    fs.writeFileSync(targetFile, combined);

    const stat = fs.statSync(targetFile);
    console.log(`✓ [Cảnh ${scene.idx}] Đã lưu: ${targetFile} (${(stat.size / 1024).toFixed(1)} KB, ~${(stat.size / 6000).toFixed(1)}s)\n`);
  }

  console.log("=== HOÀN TẤT TẠO TOÀN BỘ 13 AUDIO ĐỐI THOẠI CHO VANDERBILT ADVISOR! ===");
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
