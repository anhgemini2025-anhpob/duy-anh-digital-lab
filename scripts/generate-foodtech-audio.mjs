import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "VIETNAM FOODTECH HUB: Trung Tâm Tri Thức Và Công Cụ Thực Chiến Cho Ngành Công Nghệ Thực Phẩm",
    narration: "Trong sản xuất thực phẩm, một sự cố nhỏ cũng có thể làm gián đoạn cả dây chuyền. Thế nhưng việc tìm đúng nguyên nhân gốc, tìm ra giải pháp khả thi và tra cứu đúng tài liệu kỹ thuật lại không hề đơn giản. Việt Nam Fút-tếch Hắp được xây dựng như một trung tâm tri thức số hóa và bộ công cụ thực chiến, tích hợp kiến thức chuyên ngành, công cụ A en Đi, xử lý sự cố nhà máy, hồ sơ pháp lý và đào tạo vào một nền tảng duy nhất. Không chỉ để tra cứu thuần túy, mà giúp kỹ sư và nhà quản lý giải quyết công việc nhanh hơn, tự tin ra quyết định chính xác hơn mỗi ngày."
  },
  {
    idx: 2,
    title: "01 | Chẩn Đoán Nguyên Nhân Sự Cố",
    narration: "Tính năng một: Chẩn đoán nguyên nhân sự cố. Sản phẩm bị đổi màu, tách lớp, lắng cặn, mất cấu trúc hay không đạt chỉ tiêu vi sinh? Đừng lo lắng. Chỉ cần tìm kiếm hiện tượng, hệ thống sẽ tự động hỗ trợ truy vết nguyên nhân gốc rễ và phân tích các yếu tố gây ra sự cố trên dây chuyền. Đi thẳng từ triệu chứng, đến nguyên nhân cốt lõi và hướng xử lý kịp thời."
  },
  {
    idx: 3,
    title: "02 | Hướng Dẫn Khắc Phục Sự Cố Nhà Máy",
    narration: "Tính năng hai: Hướng dẫn khắc phục sự cố nhà máy. Không dừng lại ở việc biết nguyên nhân, hệ thống đưa ra các bước kiểm tra chi tiết và phương án khắc phục cụ thể để kỹ thuật viên có thể tham khảo và áp dụng ngay tại hiện trường sản xuất. Giúp bạn luôn biết rõ vấn đề nằm ở đâu, cần kiểm tra yếu tố gì và nên bắt đầu xử lý từ công đoạn nào."
  },
  {
    idx: 4,
    title: "03 | Bảng Thực Chiến Xử Lý Sự Cố",
    narration: "Tính năng ba: Bảng thực chiến xử lý sự cố. Mọi kiến thức hóa sinh thực phẩm phức tạp được chuyển đổi thành bảng hành động trực quan và khoa học. Khi sự cố phát sinh, người vận hành có thể nhanh chóng đối chiếu bốn bước: hiện tượng, nguyên nhân, kiểm tra và hành động. Biến kiến thức sách vở thành phản xạ xử lý sự cố chuẩn xác trong thực tế."
  },
  {
    idx: 5,
    title: "04 | Hệ Thống Hóa Kiến Thức Theo Ngành Hàng",
    narration: "Tính năng bốn: Hệ thống hóa kiến thức theo từng ngành hàng. Mỗi lĩnh vực thực phẩm như đồ uống, sữa, bánh kẹo hay chế biến thịt đều có những bài toán công nghệ hoàn toàn khác biệt. Việt Nam Fút-tếch Hắp phân loại kiến thức và giải pháp chuyên biệt theo từng nhóm sản phẩm, giúp kỹ sư đi thẳng vào đúng lĩnh vực chuyên môn mà không mất thời gian tìm kiếm lan man."
  },
  {
    idx: 6,
    title: "05 | Tra Cứu Hồ Sơ Pháp Lý Xuất Khẩu",
    narration: "Tính năng năm: Tra cứu hồ sơ pháp lý xuất khẩu. Muốn đưa sản phẩm vươn ra thị trường quốc tế, doanh nghiệp không chỉ cần sản phẩm thơm ngon mà phải tuân thủ nghiêm ngặt mọi quy định an toàn và hoàn thiện đầy đủ hồ sơ pháp lý. Hệ thống hỗ trợ tra cứu nhanh chóng các yêu cầu pháp lý, tiêu chuẩn kỹ thuật và thủ tục xuất khẩu, giúp tiết kiệm thời gian và đảm bảo hồ sơ đi đúng hướng ngay từ đầu."
  },
  {
    idx: 7,
    title: "06 | Tra Cứu Mã Phụ Gia E-Number",
    narration: "Tính năng sáu: Tra cứu mã phụ gia I Nâm-bơ. Bạn đang băn khoăn về tính an toàn hay liều lượng của một chất phụ gia? Chỉ cần gõ tên hoặc mã số I Nâm-bơ, hệ thống sẽ hiển thị tức thì công dụng, cơ chế hoạt động, giới hạn an toàn và các quy định cho phép của Bộ Y tế cùng tiêu chuẩn quốc tế. Tra cứu siêu tốc, kiểm tra minh bạch, giúp bạn đưa ra quyết định công thức chuẩn xác."
  },
  {
    idx: 8,
    title: "07 | Máy Tính Công Thức R&D",
    narration: "Tính năng bảy: Máy tính công thức A en Đi. Từ tỷ lệ thành phần nguyên liệu trong phòng thí nghiệm cho đến việc mở rộng quy mô mẻ sản xuất hàng loạt, hệ thống hỗ trợ tính toán tự động và quy đổi công thức một cách nhanh chóng. Giúp đội ngũ nghiên cứu phát triển loại bỏ hoàn toàn việc tính toán thủ công, giảm thiểu rủi ro sai số và đẩy nhanh tiến độ ra mắt sản phẩm mới."
  },
  {
    idx: 9,
    title: "08 | Tính Toán Thông Số Nhiệt F₀ – D – Z",
    narration: "Tính năng tám: Tính toán thông số nhiệt Ép không, Dê và Dét. Trong quy trình thanh trùng và tiệt trùng nhiệt, kiểm soát chuẩn xác các chỉ số vi sinh là yếu tố sống còn cho chất lượng và độ an toàn sản phẩm. Công cụ hỗ trợ tính toán khoa học các giá trị Ép không, Dê và Dét, cung cấp cơ sở dữ liệu vững chắc để kỹ sư đánh giá và tối ưu hóa chế độ nhiệt một cách hoàn hảo."
  },
  {
    idx: 10,
    title: "09 | Kiểm Tra Thành Phần Và Nội Dung Nhãn",
    narration: "Tính năng chín: Kiểm tra thành phần và nội dung ghi nhãn. Trước khi một mẻ sản phẩm chính thức xuất xưởng, việc rà soát kỹ lưỡng bao bì là vô cùng quan trọng. Công cụ thông minh hỗ trợ kiểm tra đối chiếu danh mục thành phần, chất gây dị ứng và các quy định ghi nhãn bắt buộc theo luật hiện hành. Tạo thêm một lớp bảo vệ vững chắc cho uy tín thương hiệu trước khi sản phẩm đến tay người tiêu dùng."
  },
  {
    idx: 11,
    title: "10 | Flashcard Và Trò Chơi Rèn Phản Xạ",
    narration: "Tính năng mười: P-lát cạc và trò chơi rèn phản xạ. Việc đào tạo nghiệp vụ và nâng cao tay nghề không hề khô khan. Nền tảng ứng dụng phương pháp lặp lại ngắt quãng qua bộ thẻ ghi nhớ P-lát cạc kết hợp cùng các trò chơi tương tác hấp dẫn. Giúp nhân viên và sinh viên thực phẩm ghi nhớ kiến thức sâu sắc, hào hứng học tập và rèn luyện phản xạ xử lý tình huống cực kỳ nhạy bén."
  },
  {
    idx: 12,
    title: "Lời Kết: Biến Kiến Thức Thành Công Cụ Để Hành Động",
    narration: "Lời kết: Việt Nam Fút-tếch Hắp không chỉ đơn thuần là một kho dữ liệu tĩnh, mà là bộ công cụ thực chiến đồng hành đắc lực cùng các kỹ sư A en Đi, chuyên viên Kiu A, Kiu Xi và nhà quản lý công nghệ thực phẩm. Từ việc phát hiện sự cố, truy tìm nguyên nhân, lựa chọn giải pháp, hoàn thiện công thức đến thẩm định pháp lý xuất khẩu, mọi quy trình đều trở nên thông suốt và hiệu quả. Việt Nam Fút-tếch Hắp – Biến tri thức công nghệ thực phẩm thành sức mạnh hành động thực tiễn."
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "foodtech-hub");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 12 Southern warm voiceovers (vi-VN-NamMinhNeural) for Vietnam FoodTech Hub...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}/12] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // Warm, natural, clear Southern voice setting
        const { audioStream } = tts.toStream(scene.narration, {
          rate: "+4%",
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

  console.log("\n All 12 FoodTech Hub voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
