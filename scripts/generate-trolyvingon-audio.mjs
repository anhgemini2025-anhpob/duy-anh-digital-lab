import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "TRỢ LÝ VỊ NGON: Trợ Lý AI Chuyên Sâu Cho R&D & Kỹ Thuật Thực Phẩm",
    narration: "Một công thức đang gặp lỗi. Một nguyên liệu cần thay thế. Một vấn đề nan giải về vị, mùi hay kết cấu... Bạn sẽ mất bao lâu để tìm ra giải pháp? Trợ Lý Vị Ngon ra đời để giúp đội ngũ A en Đi và kỹ thuật thực phẩm tìm câu trả lời nhanh hơn. Từ chẩn đoán sự cố, tối ưu hóa công thức, đến thử nghiệm thông minh và tính toán chi phí chính xác từng mẻ sản phẩm."
  },
  {
    idx: 2,
    title: "01 | Trợ Lý Xử Lý Sự Cố R&D",
    narration: "Tính năng một: Trợ lý xử lý sự cố A en Đi. Chẩn đoán siêu tốc các vấn đề kỹ thuật về vị, mùi lạ, lỗi lên men và kết cấu chưa đạt. Hệ thống tự động truy vết nguyên nhân cốt lõi, đưa ra hướng dẫn khắc phục chi tiết cùng gợi ý liều dùng tối ưu cho từng dòng sản phẩm."
  },
  {
    idx: 3,
    title: "02 | Bản Đồ Thay Thế HVP & Clean Label",
    narration: "Tính năng hai: Bản đồ thay thế Hát Vê Pê. Lộ trình từng bước giúp doanh nghiệp chuyển đổi từ Hát Vê Pê sang chiết xuất nấm men Dít Ích-trắc theo định hướng nhãn sạch Klin Lây-bơn. Loại bỏ hoàn toàn mối lo về độc tố Ba Mờ Xê Pê Đê và chất gây dị ứng, nâng tầm tiêu chuẩn an toàn cho sản phẩm chế biến."
  },
  {
    idx: 4,
    title: "03 | Bản Đồ Cảm Quan Trực Quan",
    narration: "Tính năng ba: Bản đồ cảm quan trực quan. Đồ thị mạng nhện sinh động so sánh năm yếu tố cảm quan cốt lõi: ngọt, mặn, chua, đắng và hậu vị U-ma-mi đậm đà. Giúp bạn nhìn rõ sự khác biệt thuyết phục trước và sau khi ứng dụng giải pháp điều vị chuyên sâu."
  },
  {
    idx: 5,
    title: "04 | Kiểm Tra Tương Thích Nguyên Liệu",
    narration: "Tính năng bốn: Kiểm tra tương thích nguyên liệu. Thấu hiểu sâu sắc cơ chế phối hợp sinh hóa, xác định tỷ lệ vàng và kích hoạt khả năng cộng hưởng hương vị giữa các thành phần. Đảm bảo mọi nguyên liệu khi kết hợp đều tôn lên cấu trúc vị giác hài hòa, trọn vẹn nhất."
  },
  {
    idx: 6,
    title: "05 | Recipe Sandbox – Thử Nghiệm Công Thức",
    narration: "Tính năng năm: Re-xơ-pi Xan-bốc, không gian thử nghiệm công thức ảo. Tự do khám phá kho công thức chuẩn hóa, tinh chỉnh tỷ lệ gia vị và mô phỏng thử nghiệm ý tưởng mới ngay trên nền tảng số trước khi bước vào sản xuất thực tế tại xưởng."
  },
  {
    idx: 7,
    title: "06 | Kho Tình Huống Thực Tế",
    narration: "Tính năng sáu: Kho tình huống thực tế. Không chỉ là lý thuyết hàn lâm, nền tảng tập hợp hàng trăm bài toán hóc búa từ hiện trường A en Đi thực chiến: từ xử lý mùi ngái đạm thực vật, giảm mặn nước mắm, đến cải thiện độ giòn dai. Tất cả đều có phân tích chuyên sâu và giải pháp khả thi."
  },
  {
    idx: 8,
    title: "07 | Tính Toán Hiệu Quả Công Thức",
    narration: "Tính năng bảy: Tính toán hiệu quả công thức. Tự động ước tính chi phí sử dụng trên từng kilôgam thành phẩm và đo lường chính xác giá trị kinh tế mang lại khi tối ưu hóa hoặc thay thế nguyên liệu. Giúp doanh nghiệp vừa nâng cao chất lượng món ăn, vừa tiết kiệm chi phí sản xuất."
  },
  {
    idx: 9,
    title: "08 | Tra Cứu Sản Phẩm & Giải Pháp",
    narration: "Tính năng tám: Tra cứu sản phẩm và giải pháp ứng dụng. Nhanh chóng định vị đúng giải pháp nguyên liệu cho từng ngành hàng đặc thù: từ thủy hải sản chế biến, đồ hộp, gia vị nước chấm, đến đồ ngọt và đồ uống. Mọi thông số kỹ thuật đều được hiển thị rõ ràng, chuẩn xác."
  },
  {
    idx: 10,
    title: "09 | Giỏ Mẫu Thông Minh & Nhận Mẫu Thử Nghiệm",
    narration: "Tính năng chín: Giỏ mẫu thông minh. Trong quá trình tra cứu, bạn dễ dàng lưu lại các nguyên liệu ưng ý vào danh sách riêng và gửi yêu cầu nhận mẫu thử nghiệm thực tế chỉ với một chạm. Rút ngắn tối đa thời gian kết nối từ ý tưởng đến phòng thí nghiệm."
  },
  {
    idx: 11,
    title: "10 | Một Nền Tảng – Đa Dạng Bài Toán R&D",
    narration: "Tính năng mười: Một nền tảng duy nhất cho đa dạng bài toán A en Đi. Từ khơi nguồn ý tưởng, chẩn đoán lỗi, thử nghiệm công thức, đến hoàn thiện sản phẩm thương mại. Toàn bộ quy trình phát triển sản phẩm thực phẩm nay được kết nối liền mạch, thông minh và chuẩn mực."
  },
  {
    idx: 12,
    title: "Lời Kết: Thấu Hiểu Vấn Đề – Thử Nghiệm Thông Minh – Nâng Tầm Hương Vị",
    narration: "Lời kết: Trợ Lý Vị Ngon không chỉ giúp bạn hiểu sâu hơn về nguyên liệu thực phẩm, mà giúp bạn chẩn đoán sự cố nhanh hơn, thử nghiệm thông minh hơn và sáng tạo nên những công thức vượt trội. Đừng chỉ tìm kiếm nguyên liệu đơn thuần, hãy tìm đúng giải pháp đột phá cho công thức của bạn. Khám phá và đăng ký sử dụng Trợ Lý Vị Ngon ngay hôm nay!"
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "tro-ly-vi-ngon");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 12 warm, magnetic Hanoi male voiceovers (vi-VN-NamMinhNeural) for Tro Ly Vi Ngon...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}/12] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

        // Warm, magnetic, seductive & confident 25-30 yo Hanoi male voice
        const { audioStream } = tts.toStream(scene.narration, {
          rate: "+1%",
          pitch: "-2Hz"
        });

        await new Promise((resolve, reject) => {
          const fileStream = fs.createWriteStream(targetFile);
          audioStream.pipe(fileStream);
          fileStream.on("finish", () => {
            const size = fs.statSync(targetFile).size;
            console.log(`✓ [Scene ${scene.idx}] Saved ${targetFile} (${size} bytes)`);
            resolve();
          });
          fileStream.on("error", reject);
          audioStream.on("error", reject);
        });

        const stat = fs.statSync(targetFile);
        if (stat.size > 5000) {
          success = true;
          break;
        } else {
          throw new Error(`File too small (${stat.size} bytes)`);
        }
      } catch (err) {
        console.warn(`Attempt ${attempt} failed for scene ${scene.idx}:`, err.message);
        await new Promise(r => setTimeout(r, 1200 * attempt));
      }
    }

    if (!success) {
      console.error(`FATAL: Failed to generate audio for scene ${scene.idx}`);
      process.exit(1);
    }
  }

  console.log("\nAll 12 Tro Ly Vi Ngon voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
