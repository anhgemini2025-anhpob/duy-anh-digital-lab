import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    gender: "male",
    title: "UTH SCM NAVIGATOR: Cẩm Nang Điều Hướng Học Tập Logistics UTH",
    narration: "Học đại học bốn năm, nhưng bạn có biết mình cần học gì, học thế nào và phải đạt được những gì để vừa rinh học bổng, vừa ra trường làm được việc ngay? Đừng học theo kiểu môn nào tới thì học môn đó. U-Tê-Hát Ét-Xê-Em Na-vi-gây-tơ chính là người hướng dẫn học tập số một, đồng hành cùng sinh viên Lô-dít-tích và Quản lý Chuỗi cung ứng từ năm nhất đến khi sẵn sàng đi làm."
  },
  {
    idx: 2,
    gender: "female",
    title: "Định Hướng Học Tập Chủ Động Từ Năm Nhất",
    narration: "Thay vì lạc lối giữa hàng chục cuốn giáo trình dày cộm hay hoang mang trước kỳ thi, ứng dụng giúp bạn hệ thống hóa toàn bộ mục tiêu kiến thức. Bạn sẽ luôn biết rõ từng môn học đóng vai trò gì, cần rèn luyện kỹ năng nào và từng bước xây dựng lộ trình học tập vững chắc ngay từ những ngày đầu bước chân vào giảng đường U-Tê-Hát."
  },
  {
    idx: 3,
    gender: "male",
    title: "01 | Hồ Sơ Học Tập Cá Nhân",
    narration: "Tính năng một: Hồ sơ học tập cá nhân. Đăng nhập và theo dõi sát sao hành trình học tập của chính bạn. Từ mục tiêu điểm số Đi-Pi-Ây, tiến độ hoàn thành các tín chỉ, đến những cột mốc thi cử quan trọng, tất cả đều được cá nhân hóa trực quan và khoa học."
  },
  {
    idx: 4,
    gender: "female",
    title: "02 | Bản Đồ Kiến Thức 4 Năm",
    narration: "Tính năng hai: Bản đồ kiến thức bốn năm. Toàn bộ lộ trình môn học chuyên ngành Lô-dít-tích và Quản lý Chuỗi cung ứng được sơ đồ hóa rõ ràng. Giúp bạn nhìn thấy bức tranh tổng thể, nắm chắc môn tiên quyết và chuẩn bị hành trang kỹ lưỡng cho các học kỳ tiếp theo."
  },
  {
    idx: 5,
    gender: "male",
    title: "03 | Học Để Hiểu Bài Sâu Sắc",
    narration: "Tính năng ba: Học để hiểu bài. Những khái niệm chuyên sâu tưởng chừng khô khan như Tư duy hệ thống Xít-tầm Thin-kinh, Hiệu ứng chiếc roi da Bun-quíp Íp-phếch hay bài toán đánh đổi Trết-ọp đều được minh họa sinh động, trực quan và cực kỳ dễ hiểu."
  },
  {
    idx: 6,
    gender: "female",
    title: "04 | Trợ Lý Học Tập AI",
    narration: "Tính năng bốn: Trợ lý học tập Ây-Ai. Bất cứ khi nào gặp bài tập hóc búa hay câu hỏi ôn tập khó, bạn đều có thể trò chuyện cùng trợ lý thông minh. Hệ thống sẽ giải thích cặn kẽ bản chất vấn đề, giúp bạn đào sâu tư duy phản biện thay vì học vẹt đối phó."
  },
  {
    idx: 7,
    gender: "male",
    title: "05 | Công Cụ Tính Toán & Thực Hành",
    narration: "Tính năng năm: Công cụ tính toán và thực hành. Tự động tính toán lượng đặt hàng kinh tế Y-Ô-Quy, mức tồn kho an toàn Xếp-ti Xtốc hay điểm đặt hàng lại R-Ô-Pê. Học lý thuyết song hành cùng bài toán Lô-dít-tích thực tế, biến công thức thành kỹ năng giải quyết vấn đề."
  },
  {
    idx: 8,
    gender: "female",
    title: "06 | Chuẩn Bị Cho Kiểm Tra & Học Bổng",
    narration: "Tính năng sáu: Chuẩn bị kiểm tra và săn học bổng. Ứng dụng cung cấp ngân hàng câu hỏi ôn tập trọng tâm và mẹo làm bài hiệu quả. Giúp sinh viên tự tin làm chủ kỳ thi, bứt phá kết quả học tập và chinh phục những suất học bổng danh giá của trường."
  },
  {
    idx: 9,
    gender: "male",
    title: "07 | Học Nghiệp Vụ Thực Tế",
    narration: "Tính năng bảy: Học nghiệp vụ thực tế. Từng bước làm quen với quy trình vận tải đa phương thức, giao nhận kho cảng và bộ chứng từ ngoại thương như Vận đơn Biu-ọp-Lây-đinh, hợp đồng ngoại thương và các điều kiện In-cô-tơm quốc tế."
  },
  {
    idx: 10,
    gender: "female",
    title: "08 | Làm Quen Công Nghệ Logistics 4.0",
    narration: "Tính năng tám: Làm quen công nghệ Lô-dít-tích bốn chấm không. Khám phá hệ thống quản lý kho Đắp-liu-Em-Ét, quản lý vận tải Tê-Em-Ét, cảng điện tử I-Pót, cùng các giải pháp rô-bốt tự hành A-G-Vê và công nghệ nhận dạng A-R-Ép-Ai-Đi đang làm thay đổi toàn cầu."
  },
  {
    idx: 11,
    gender: "male",
    title: "09 | Chuẩn Bị Đi Thực Tập Tại Doanh Nghiệp",
    narration: "Tính năng chín: Chuẩn bị đi thực tập thực tế. Nắm bắt chính xác những yêu cầu tuyển dụng khắt khe của doanh nghiệp cảng biển và chuỗi cung ứng. Giúp bạn nhận diện kỹ năng còn thiếu để rèn luyện, tự tin ghi điểm trước nhà tuyển dụng ngay trong kỳ thực tập."
  },
  {
    idx: 12,
    gender: "female",
    title: "10 | Xây Dựng Năng Lực Để Đi Làm",
    narration: "Tính năng mười: Xây dựng năng lực nghề nghiệp vững chắc. Mục tiêu cao nhất không chỉ dừng lại ở tấm bằng khá giỏi, mà là giúp bạn thấu hiểu nghề, thạo việc, phát triển kỹ năng mềm và sẵn sàng gia nhập thị trường lao động Lô-dít-tích đầy năng động."
  },
  {
    idx: 13,
    gender: "male",
    title: "11 | Tốt Nghiệp Rạng Rỡ & Vững Vàng Tương Lai",
    narration: "Bốn năm đại học sẽ trôi qua rất nhanh. Nhưng với hành trang vững chắc từ U-Tê-Hát Ét-Xê-Em Na-vi-gây-tơ, bạn sẽ tự tin bước lên bục vinh quang nhận bằng tốt nghiệp, sẵn sàng đón nhận những cơ hội thăng tiến rộng mở trong ngành chuỗi cung ứng."
  },
  {
    idx: 14,
    gender: "female",
    title: "Lời Kết: Chạm Tay Đến Thành Công Cùng UTH SCM Navigator",
    narration: "Lời kết: Đại học là bước đệm cho sự nghiệp cả đời. Hãy học để hiểu bài, đạt mục tiêu và chinh phục công việc mơ ước tại các tập đoàn Lô-dít-tích hàng đầu. Các bạn sinh viên U-Tê-Hát, hãy đăng nhập và trải nghiệm U-Tê-Hát Ét-Xê-Em Na-vi-gây-tơ ngay hôm nay!"
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "uth-scm-navigator");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 14 alternating male/female youthful 20yo Saigon voiceovers for UTH SCM Navigator...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    const isMale = scene.gender === "male";
    const voiceName = isMale ? "vi-VN-NamMinhNeural" : "vi-VN-HoaiMyNeural";
    const voiceSettings = isMale
      ? { rate: "+6%", pitch: "+0Hz" } // Energetic 20yo Saigon male
      : { rate: "+6%", pitch: "+1Hz" }; // Bright 20yo Saigon female

    console.log(`[Scene ${scene.idx}/14] (${isMale ? "MALE" : "FEMALE"}) Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

        const { audioStream } = tts.toStream(scene.narration, voiceSettings);

        await new Promise((resolve, reject) => {
          const fileStream = fs.createWriteStream(targetFile);
          audioStream.pipe(fileStream);
          fileStream.on("finish", () => {
            const size = fs.statSync(targetFile).size;
            console.log(`✓ [Scene ${scene.idx} - ${scene.gender}] Saved ${targetFile} (${size} bytes)`);
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

  console.log("\nAll 14 UTH SCM Navigator voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
