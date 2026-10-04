import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "LIPOID ADVISOR: Trợ Lý Số Chuyên Sâu Cho R&D & Nguyên Liệu Phospholipid",
    narration: "Bạn đang tìm kiếm một nguyên liệu hoàn hảo cho công thức mỹ phẩm, nhưng chưa biết bắt đầu từ đâu? Giữa hơn năm trăm ba mươi lăm nguyên liệu cùng hàng chục tiêu chí kỹ thuật khắt khe, liệu bạn có thể chọn đúng sản phẩm chỉ trong vài phút? Đó chính là lý do Li-pô-ít Ất-vai-sơ ra đời. Một trợ lý thông minh giúp đội ngũ A en Đi tìm kiếm, chọn lọc và tra cứu nguyên liệu Li-pô-ít nhanh hơn, chuẩn xác hơn bao giờ hết."
  },
  {
    idx: 2,
    title: "01 | Bộ Lọc Thông Minh 535 Nguyên Liệu",
    narration: "Tính năng một: Bộ lọc thông minh. Dễ dàng sàng lọc hơn năm trăm ba mươi lăm nguyên liệu chuyên biệt theo từng nhóm sản phẩm, mục tiêu chăm sóc da hay tóc, dạng bào chế mong muốn và vai trò sinh học của Phốt-pho-li-pít. Tiết kiệm tối đa thời gian tìm kiếm thông tin."
  },
  {
    idx: 3,
    title: "02 | Kiểm Tra Tương Kỵ Tự Động",
    narration: "Tính năng hai: Kiểm tra tương kỵ tự động. Hệ thống thông minh tự động phát hiện ngay những kết hợp nguyên liệu chưa tương thích, giải thích rõ nguyên nhân hóa sinh và đưa ra các cảnh báo kỹ thuật chuẩn xác, giúp bảo vệ độ ổn định của công thức ngay từ đầu."
  },
  {
    idx: 4,
    title: "03 | Tính Năng 'Chọn Giúp Tôi'",
    narration: "Tính năng ba: Tính năng Chọn giúp tôi. Bạn chưa rõ nên bắt đầu từ dòng sản phẩm nào? Chỉ cần trả lời vài câu hỏi định hướng ngắn gọn, thuật toán sẽ phân tích nhu cầu và gợi ý ngay nhóm nguyên liệu tối ưu nhất cho bài toán của bạn."
  },
  {
    idx: 5,
    title: "04 | Thư Viện 81 Công Thức Mẫu Đột Phá",
    narration: "Tính năng bốn: Thư viện tám mươi mốt công thức mẫu. Tự do khám phá kho công thức mẫu chuẩn quốc tế cho da mặt, chăm sóc cơ thể và dưỡng tóc chuyên sâu. Bạn có thể tra cứu chi tiết thành phần và truy cập trực tiếp thông số kỹ thuật của từng nguyên liệu có trong công thức."
  },
  {
    idx: 6,
    title: "05 | Tìm Kiếm Thông Minh Toàn Năng",
    narration: "Tính năng năm: Tìm kiếm thông minh toàn năng. Tra cứu siêu tốc theo tên thương mại, mã số nguyên liệu hay tên công thức. Hệ thống hỗ trợ tìm kiếm linh hoạt, chuẩn xác ngay cả khi bạn gõ tiếng Việt không dấu."
  },
  {
    idx: 7,
    title: "06 | Tạo Phiếu Yêu Cầu Khổ A4 Chuyên Nghiệp",
    narration: "Tính năng sáu: Tạo phiếu yêu cầu khổ A-Bốn chuyên nghiệp. Chỉ với một cú nhấp chuột, hệ thống sẽ tự động tổng hợp và tạo ngay phiếu xin báo giá, phiếu đề xuất mẫu thử, bảng công thức hoặc yêu cầu hỗ trợ kỹ thuật bài bản."
  },
  {
    idx: 8,
    title: "07 | Xem Trước & Xuất File PDF Tiêu Chuẩn",
    narration: "Tính năng bảy: Xem trước và lưu tệp Pê Đê Ép. Bạn có thể kiểm tra trực quan, in ấn trực tiếp hoặc tải phiếu yêu cầu định dạng Pê Đê Ép tiêu chuẩn về máy tính hay điện thoại một cách cực kỳ mượt mà trên mọi trình duyệt."
  },
  {
    idx: 9,
    title: "08 | Danh Sách My List Cá Nhân Hóa",
    narration: "Tính năng tám: Danh mục Mai Lít cá nhân hóa. Gom tất cả những nguyên liệu bạn quan tâm vào một không gian lưu trữ riêng biệt để thuận tiện theo dõi tiến độ nghiên cứu, so sánh đặc tính kỹ thuật và quản lý dự án hiệu quả."
  },
  {
    idx: 10,
    title: "09 | Chia Sẻ Trực Tiếp Qua Đường Dẫn Riêng",
    narration: "Tính năng chín: Chia sẻ trực tiếp nhanh chóng. Mỗi nguyên liệu và mỗi công thức mẫu đều được trang bị đường dẫn chia sẻ chuyên biệt, giúp bạn gửi chính xác thông tin kỹ thuật đến đồng nghiệp và đối tác trong tích tắc."
  },
  {
    idx: 11,
    title: "10 | Minh Bạch Nguồn Thông Tin & Dẫn Chứng Gốc",
    narration: "Tính năng mười: Minh bạch nguồn thông tin. Mọi mã nguyên liệu cần lưu ý đều được gắn cảnh báo kỹ thuật rõ ràng và liên kết trực tiếp tới tài liệu kỹ thuật gốc từ nhà sản xuất Li-pô-ít, đảm bảo độ chuẩn xác và tin cậy tuyệt đối."
  },
  {
    idx: 12,
    title: "Lời Kết: Tìm Đúng Nguyên Liệu – Phát Triển Công Thức Thông Minh Hơn",
    narration: "Lời kết: Từ hơn năm trăm ba mươi lăm nguyên liệu đến đúng giải pháp tối ưu cho sản phẩm của bạn, giờ đây không còn là bài toán mất nhiều tuần lễ. Li-pô-ít Ất-vai-sơ: Tìm đúng nguyên liệu, hiểu đúng thông tin, phát triển công thức mỹ phẩm thông minh và vượt trội. Hãy khám phá và trải nghiệm Li-pô-ít Ất-vai-sơ ngay hôm nay!"
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "lipoid-advisor");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 12 energetic, strong 25yo Saigon male voiceovers for Lipoid Advisor...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}/12] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

        // Strong, energetic, punchy 25yo male voice
        const { audioStream } = tts.toStream(scene.narration, {
          rate: "+5%",
          pitch: "+0Hz"
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

  console.log("\nAll 12 Lipoid Advisor voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
