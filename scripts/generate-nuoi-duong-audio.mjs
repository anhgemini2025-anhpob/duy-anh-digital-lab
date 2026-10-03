import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: 'Màn hình trung tâm "Hôm nay" & Ghi chép nhanh (Home Dashboard & Smart Logging)',
    narration: 'Ứng dụng Cha Mẹ 0 đến 60 được thiết kế với 10 tính năng cốt lõi nhằm đồng hành cùng gia đình Việt Nam trong việc chăm sóc và theo dõi sự phát triển của trẻ từ 0 đến 60 tháng tuổi. Chức năng 1: Màn hình trung tâm Hôm nay và Ghi chép nhanh, Home Dashboard and Smart Logging. Giải đáp câu hỏi Hôm nay con cần gì bằng cách hiển thị ba việc quan trọng trong ngày, trạng thái sinh hoạt ăn, ngủ, vệ sinh và công cụ ghi nhận nhanh một chạm hoặc nhập bằng giọng nói.'
  },
  {
    idx: 2,
    title: 'Theo dõi tăng trưởng thể chất (Growth Engine)',
    narration: 'Chức năng 2: Theo dõi tăng trưởng thể chất, Growth Engine. Quản lý các chỉ số cân nặng, chiều cao, vòng đầu theo chuẩn tăng trưởng, minh họa xu hướng phát triển trực quan và đưa ra lời khuyên trung lập mà không tự ý chẩn đoán.'
  },
  {
    idx: 3,
    title: 'Trung tâm mốc phát triển (Development Center)',
    narration: 'Chức năng 3: Trung tâm mốc phát triển, Development Center. Theo dõi sự tiến bộ của bé qua năm lĩnh vực: Giao tiếp, Vận động thô, Vận động tinh, Nhận thức, Cá nhân và Xã hội kèm các lưu ý quan sát nhẹ nhàng, giúp cha mẹ bớt lo âu.'
  },
  {
    idx: 4,
    title: 'Gợi ý dinh dưỡng & Quản lý thực đơn (Nutrition & Meal Planner)',
    narration: 'Chức năng 4: Gợi ý dinh dưỡng và Quản lý thực đơn, Nutrition and Meal Planner. Hỗ trợ nhiều phương pháp ăn dặm như Truyền thống, BLW, Kiểu Nhật, cá nhân hóa theo độ tuổi hoặc dị ứng, kết hợp tính năng Tủ lạnh nhà mình có gì để tự động gợi ý món ăn phù hợp với nguyên liệu sẵn có.'
  },
  {
    idx: 5,
    title: 'Nút khẩn cấp SOS ngoại tuyến (Offline Emergency SOS)',
    narration: 'Chức năng 5: Nút khẩn cấp SOS ngoại tuyến, Offline Emergency SOS. Nút floating SOS luôn hiển thị để truy cập tức thì các hướng dẫn xử lý sơ cứu khẩn cấp như hóc dị vật, sốt co giật, bỏng, chấn thương, đảm bảo hoạt động bình thường ngay cả khi không có kết nối internet.'
  },
  {
    idx: 6,
    title: 'Lịch tiêm chủng & Nhắc lịch thông minh (Vaccination & Smart Reminders)',
    narration: 'Chức năng 6: Lịch tiêm chủng và Nhắc lịch thông minh, Vaccination and Smart Reminders. Quản lý lịch tiêm theo Chương trình Mở rộng và Tiêm dịch vụ, đồng thời cài đặt nhắc lịch uống thuốc, khám bệnh, đánh răng và các sinh hoạt hằng ngày.'
  },
  {
    idx: 7,
    title: 'Ví hồ sơ gia đình kỹ thuật số (Digital Family Vault & Document Scanner)',
    narration: 'Chức năng 7: Ví hồ sơ gia đình kỹ thuật số, Digital Family Vault and Document Scanner. Quét, lưu trữ và bảo mật các giấy tờ quan trọng của bé như thẻ Bảo hiểm y tế, phiếu tiêm, đơn thuốc, hỗ trợ xuất file PDF một chạm để mang đi khám bệnh hoặc nhập học.'
  },
  {
    idx: 8,
    title: 'Trợ lý AI đồng hành cùng cha mẹ (AI Parenting Companion)',
    narration: 'Chức năng 8: Trợ lý AI đồng hành cùng cha mẹ, AI Parenting Companion. Trả lời các thắc mắc chăm sóc con, hỗ trợ chuẩn bị câu hỏi cho bác sĩ, giải thích thông tin y tế dễ hiểu và luôn dẫn nguồn minh bạch.'
  },
  {
    idx: 9,
    title: 'Bộ tạo hoạt động "Chơi cùng con 10 phút" (Activity Generator)',
    narration: 'Chức năng 9: Bộ tạo hoạt động Chơi cùng con mười phút, Activity Generator. Gợi ý các trò chơi tương tác phát triển theo độ tuổi từ không đến sáu mươi tháng dựa trên quỹ thời gian rảnh và vật dụng đơn giản có sẵn trong nhà.'
  },
  {
    idx: 10,
    title: 'Dòng thời gian & Nhật ký gia đình (Smart Family Timeline & Journal)',
    narration: 'Chức năng 10: Dòng thời gian và Nhật ký gia đình, Smart Family Timeline and Journal. Tổng hợp dữ liệu sức khỏe, mốc phát triển, tiêm chủng cùng hình ảnh và khoảnh khắc đáng nhớ thành một dòng thời gian dài hạn xuyên suốt quá trình khôn lớn của trẻ.'
  },
  {
    idx: 11,
    title: 'Lời bình: Đồng hành trọn vẹn hành trình 0–60 tháng',
    narration: 'Từ một giấc ngủ, một bữa ăn, một bước chân đầu tiên, đến những khoảnh khắc rất nhỏ mà sau này nhìn lại, cha mẹ sẽ thấy vô cùng đáng nhớ. Cùng con lớn lên từng ngày, và cùng nhau lưu giữ hành trình không đến sáu mươi tháng thật trọn vẹn.'
  }
];

function sanitizeForTTS(text) {
  return text
    .replace(/&/g, " and ")
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    // English pronunciation for abbreviations
    .replace(/\bSOS\b/g, "Es-Oh-Es")
    .replace(/\bPDF\b/g, "Pi-Đi-Ép")
    .replace(/\bAI\b/g, "Ây-Ai")
    .replace(/\bBLW\b/g, "Bi-En-Đắp-liu")
    .replace(/\bBHYT\b/g, "Bảo hiểm y tế")
    .replace(/\s+/g, " ")
    .trim();
}

async function run() {
  const targetDir = path.join("public", "apps", "nuoi-duong-be-0-60");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Generating 11 voiceovers with standard English pronunciation for Nuôi dưỡng bé 0-60 tháng...`);

  for (const scene of scenes) {
    const targetPath = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    const cleanText = sanitizeForTTS(scene.narration);

    console.log(`[Scene ${scene.idx}] Generating: "${cleanText.slice(0, 70)}..."`);
    
    let generated = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      let tts = null;
      try {
        tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(cleanText, {
          rate: "+8%",
          pitch: "-4Hz"
        });

        const tempPath = targetPath + ".tmp";
        const writable = fs.createWriteStream(tempPath);

        await new Promise((resolve, reject) => {
          audioStream.pipe(writable);
          writable.on("finish", resolve);
          writable.on("error", reject);
          audioStream.on("error", reject);
        });

        if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 10000) {
          if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
          fs.renameSync(tempPath, targetPath);
          const sz = fs.statSync(targetPath).size;
          console.log(`  -> SUCCESS: ${targetPath} (${sz} bytes)`);
          generated = true;
          try { tts.close(); } catch {}
          break;
        }
      } catch (err) {
        console.warn(`  Attempt ${attempt} failed:`, err.message);
        if (tts) {
          try { tts.close(); } catch {}
        }
        await new Promise(r => setTimeout(r, 1200 * attempt));
      }
    }

    if (!generated) {
      console.error(`  -> FAILED to generate scene ${scene.idx}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log("Finished generating all 11 audio files with standard English terms!");
  process.exit(0);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
