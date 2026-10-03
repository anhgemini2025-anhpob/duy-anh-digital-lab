import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 4,
    title: "Cầu nối Cha mẹ – Con (Parent–Teen Connection)",
    narration: "Tính năng 4: Cầu nối Cha mẹ và Con, Parent-Teen Connection. Bộ hướng dẫn giúp cải thiện tương tác gia đình, tôn trọng quyền riêng tư và ứng dụng phương pháp Giao tiếp phi bạo lực En-Vi-Si cùng mô hình Gờ-Râu để giải quyết các xung đột tuổi mới lớn."
  },
  {
    idx: 5,
    title: "Trợ lý Giao tiếp AI (\"Nói sao với con?\")",
    narration: "Tính năng 5: Trợ lý Giao tiếp Ây-Ai, Nói sao với con? Công cụ tương tác cho phép cha mẹ nhập tình huống khó khăn thực tế như con khép kín, áp lực thi cử, thức khuya, chọn ngành khác ý muốn gia đình và nhận gợi ý về nguyên nhân, điều nên tránh, cùng câu mở đầu không phán xét."
  },
  {
    idx: 6,
    title: "Thỏa thuận Gia đình (Family Boundary Builder)",
    narration: "Tính năng 6: Thỏa thuận Gia đình, Family Boundary Builder. Hỗ trợ cha mẹ và con cùng xây dựng các thỏa thuận chung tự nguyện về giờ giấc, sử dụng điện thoại, tài chính tiêu vặt và việc nhà dựa trên tinh thần trách nhiệm thay vì quy tắc ép buộc."
  },
  {
    idx: 7,
    title: "Theo dõi Sức khỏe, Giấc ngủ & Dinh dưỡng (Health & Wellness Tracker)",
    narration: "Tính năng 7: Theo dõi Sức khỏe, Giấc ngủ và Dinh dưỡng, Health and Wellness Tracker. Theo dõi xu hướng giấc ngủ, thời lượng dùng màn hình, chế độ dinh dưỡng mùa thi và biểu hiện căng thẳng của con dưới dạng biểu đồ xu hướng để phát hiện sớm các dấu hiệu bất thường."
  },
  {
    idx: 8,
    title: "Đồng hành Đời sống số (Digital Life Guidance)",
    narration: "Tính năng 8: Đồng hành Đời sống số, Digital Life Guidance. Hướng dẫn cha mẹ cách xây dựng năng lực số cho con, thảo luận về an toàn mạng xã hội, bắt nạt trên mạng, lừa đảo trực tuyến và dấu chân kỹ thuật số dựa trên sự tin tưởng."
  },
  {
    idx: 9,
    title: "Hành trang Bước vào Tuổi 18 (Age 18 Citizenship Prep)",
    narration: "Tính năng 9: Hành trang Bước vào Tuổi 18, Age 18 Citizenship Prep. Danh mục kiểm tra và cung cấp kiến thức pháp lý, công dân cơ bản khi con tròn 18 tuổi như giấy tờ cá nhân, Vê-En-e-Ai-Đi, nhận thức pháp luật, an toàn tài chính, tài khoản cá nhân."
  },
  {
    idx: 10,
    title: "Trợ lý đồng hành 24/7 & Nhật ký Đồng hành",
    narration: "Tính năng 10: Trợ lý đồng hành 24 trên 7 và Nhật ký Đồng hành. Trợ lý Ây-Ai trung tâm đóng vai trò người cố vấn bình tĩnh, đưa ra lời khuyên dựa trên bằng chứng, kết hợp với Nhật ký ghi lại các cột mốc, cảm xúc và quyết định quan trọng của gia đình."
  },
  {
    idx: 11,
    title: "Trọn bộ 4 ứng dụng – Hành trình khôn lớn cùng con",
    narration: "Trọn bộ 4 ứng dụng, 4 giai đoạn, một hành trình từ 0 đến 18 tuổi cùng cha mẹ đi qua từng chặng đường lớn lên của con. Nếu 5 năm đầu là chăm sóc, 6 đến 11 tuổi là nuôi dạy, 12 đến 15 tuổi là thấu hiểu, thì 16 đến 18 tuổi là trao quyền và đồng hành. Cha mẹ không phải là giữ con bên mình mãi mãi, mà là giúp con đủ vững vàng để tự bước đi – và luôn biết rằng phía sau mình vẫn có một gia đình để trở về."
  }
];

function sanitizeForTTS(text) {
  return text
    .replace(/&/g, " và ")
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    .replace(/–/g, " đến ")
    .replace(/—/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function generateSingleScene(text, targetPath) {
  const cleanText = sanitizeForTTS(text);
  const tempPath = targetPath + ".tmp";

  for (let attempt = 1; attempt <= 6; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(cleanText, {
        rate: "+8%",
        pitch: "-4Hz"
      });

      const writable = fs.createWriteStream(tempPath);
      audioStream.pipe(writable);

      await new Promise((resolve, reject) => {
        writable.on("finish", resolve);
        writable.on("error", reject);
        audioStream.on("error", reject);
      });

      const stats = fs.statSync(tempPath);
      if (stats.size < 5000) {
        fs.unlinkSync(tempPath);
        throw new Error(`File too small (${stats.size} bytes)`);
      }

      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      fs.renameSync(tempPath, targetPath);
      try { tts.close(); } catch {}
      return stats.size;
    } catch (err) {
      console.warn(`   -> Warning (Attempt ${attempt}/6): ${err.message}. Retrying...`);
      if (tts) {
        try { tts.close(); } catch {}
      }
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch {}
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(`Failed to generate ${targetPath} after 6 attempts!`);
}

async function main() {
  const targetDir = path.join("public", "apps", "dinh-huong-thanh-nien-16-18");

  console.log("Generating remaining scenes 4-11 for dinh-huong-thanh-nien-16-18...");

  for (const scene of scenes) {
    const targetPath = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[dinh-huong-thanh-nien-16-18] Scene ${scene.idx}/11: "${scene.title}"`);

    const size = await generateSingleScene(scene.narration, targetPath);
    console.log(`   -> SUCCESS: ${Math.round(size / 1024)} KB (${targetPath})`);

    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log("\nALL SCENES FOR dinh-huong-thanh-nien-16-18 COMPLETED SUCCESSFULLY!");
}

main().catch(err => {
  console.error("FATAL:", err);
  process.exit(1);
});
