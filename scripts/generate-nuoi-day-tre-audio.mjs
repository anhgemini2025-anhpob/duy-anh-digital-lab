import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: 'Trang chủ Đồng hành "2 Phút cùng con" (Home Dashboard)',
    narration: 'Chức năng 1: Trang chủ Đồng hành 2 Phút cùng con. Đóng vai trò là nhịp thở của ứng dụng, trả lời trực tiếp câu hỏi cốt lõi: Hôm nay cha mẹ nên biết gì về con. Trang chủ tổng hợp ba điểm tập trung trong tuần về học tập, cảm xúc và thói quen kèm gợi ý trò chuyện ngắn từ AI, giúp cha mẹ mở đầu buổi tối ấm áp thay vì giục giã.'
  },
  {
    idx: 2,
    title: 'Trợ lý AI Đồng hành Copilot 6 bước',
    narration: 'Chức năng 2: Trợ lý AI Đồng hành Copilot. Người bạn thông thái luôn ngồi bên cạnh để cùng cha mẹ suy ngẫm và tháo gỡ khó khăn nuôi dạy con theo khung 6 bước: tìm nguyên nhân tâm lý, điều cần quan sát, việc nên làm ngay, kịch bản câu nói gợi ý, điều nên tránh và thời điểm cần chuyên gia.'
  },
  {
    idx: 3,
    title: 'Sơ đồ Tri thức Học tập giật lùi (Lớp 1-5)',
    narration: 'Chức năng 3: Sơ đồ Tri thức Học tập giật lùi. Hỗ trợ theo sát chương trình Tiếng Việt, Toán và Tiếng Anh từ Lớp 1 đến Lớp 5. Hệ thống tự động suy ngược sơ đồ tri thức để tìm đúng bước con bị vướng, tuyệt đối không dán nhãn con mất gốc mà gợi ý bài tập 5 phút cùng cha mẹ lấp lỗ hổng kiến thức.'
  },
  {
    idx: 4,
    title: 'Thư viện Kịch bản Giao tiếp thấu hiểu',
    narration: 'Chức năng 4: Thư viện Kịch bản Giao tiếp Cha mẹ có thể nói gì. Bộ sưu tập kịch bản ứng xử trực quan cho các tình huống nóng khi con không chịu học, mê điện thoại hay bùng nổ cảm xúc. Đặt song song câu nói dễ gây căng thẳng và cách nói thay thế thấu hiểu, giúp cha mẹ chuyển đổi ngôn ngữ tức thì.'
  },
  {
    idx: 5,
    title: 'Ghi nhận & Đồ thị Nhịp điệu Cảm xúc',
    narration: 'Chức năng 5: Ghi nhận và Đồ thị Nhịp điệu Cảm xúc. Ghi lại trạng thái tinh thần của con bằng các biểu tượng trực quan, hệ thống tự động phân tích và chỉ ra quy luật cảm xúc theo khung giờ trong tuần, giúp cha mẹ thấu hiểu nhịp sinh học của con để điều chỉnh lịch sinh hoạt phù hợp.'
  },
  {
    idx: 6,
    title: 'Hồ sơ Phát triển – Không KPI & Điểm số',
    narration: 'Chức năng 6: Hồ sơ Bức tranh phát triển. Khắc họa sự trưởng thành của con một cách nhân văn. Tuyên ngôn nói không với điểm số, thứ hạng thi đua hay sự so sánh, chỉ sử dụng các thẻ chỉ số xu hướng như Đang ổn định hay Đang cải thiện cho tập trung, đọc sách, giấc ngủ và giao tiếp.'
  },
  {
    idx: 7,
    title: 'Thỏa thuận Công nghệ Gia đình (Digital Wellbeing)',
    narration: 'Chức năng 7: Thỏa thuận Công nghệ Gia đình. Quản lý thời gian sử dụng tivi, điện thoại và game dựa trên sự tôn trọng và đồng thuận. Hướng dẫn cha mẹ cùng con thảo luận và tạo lập bản thỏa thuận công nghệ, xây dựng thói quen làm chủ thiết bị số tự giác cho trẻ.'
  },
  {
    idx: 8,
    title: 'Dinh dưỡng & Thể chất "Ăn gì cho con?"',
    narration: 'Chức năng 8: Dinh dưỡng và Thể chất Ăn gì cho con. Thiết kế riêng cho nhịp sống gia đình Việt với gợi ý thực đơn bữa sáng 15 phút, nhắc nhở uống nước, bổ sung chất xơ kết hợp biểu đồ dõi theo xu hướng chiều cao, cân nặng và giấc ngủ chuẩn khoa học.'
  },
  {
    idx: 9,
    title: 'Góc Kết nối Gia đình 5–15 Phút',
    narration: 'Chức năng 9: Góc Kết nối Gia đình 5 đến 15 Phút. Thư viện gợi ý các hoạt động gắn kết siêu ngắn nhưng mang lại giá trị cảm xúc cao như ba câu hỏi trước khi đi ngủ, cùng chuẩn bị bữa sáng, chăm cây hay đọc sách phù hợp thời gian rảnh và mức năng lượng của cha mẹ.'
  },
  {
    idx: 10,
    title: 'Nút SOS 60 Giây Hạ nhiệt Phụ huynh',
    narration: 'Chức năng 10: Nút SOS 60 Giây Hạ nhiệt Phụ huynh. Tính năng cấp cứu độc đáo giúp giải quyết cuộc chiến bài tập về nhà lúc 8 giờ tối. Tự động chuyển giao diện sang tông màu Xanh Xám thư thái, kết hợp sóng nhạc Alpha 432Hz, nhịp thở điều hòa 4-7-8 giúp cha mẹ bình tâm trước khi tương tác cùng con.'
  },
  {
    idx: 11,
    title: 'Lời bình & Triết lý đồng hành Duy Anh Lab',
    narration: 'Phần 11: Lời bình và Triết lý đồng hành Duy Anh Lab. Được xây dựng trên triết lý Hiểu con trước, Đồng hành đúng cách, Không tạo áp lực, ứng dụng dành riêng cho cha mẹ giúp chuyển hóa mọi áp lực nuôi dạy con thành những quyết định đồng hành nhỏ nhẹ và ấm áp mỗi ngày.'
  }
];

function sanitizeForTTS(text) {
  return text
    .replace(/&/g, " và ")
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function run() {
  const targetDir = path.join("public", "apps", "nuoi-day-tre-6-11");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Generating 11 voiceovers for Nuôi dạy trẻ 6-11...`);

  for (const scene of scenes) {
    const targetPath = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    const cleanText = sanitizeForTTS(scene.narration);

    console.log(`[Scene ${scene.idx}] Generating: "${cleanText.slice(0, 60)}..."`);
    
    let generated = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      let tts = null;
      try {
        tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(cleanText, {
          rate: "+10%",
          pitch: "-2Hz",
          volume: "+15%"
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
    await new Promise(r => setTimeout(r, 400));
  }

  console.log("Finished generating audio files!");
}

run().catch(console.error);
