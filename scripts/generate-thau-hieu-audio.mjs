import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: 'Onboarding Đa Nền Tảng & Chế Độ Máy Chiếu',
    narration: 'Chức năng 1: Onboarding Đa Nền Tảng và Chế Độ Máy Chiếu. Dễ dàng truy cập ứng dụng trên mọi thiết bị từ điện thoại, laptop đến máy chiếu gia đình. Trải nghiệm giao diện trực quan, đồng bộ mượt mà, giúp cả nhà cùng theo dõi và đồng hành mọi lúc, mọi nơi.'
  },
  {
    idx: 2,
    title: 'Bứt Phá Tầm Vóc & Dinh Dưỡng Dậy Thì',
    narration: 'Chức năng 2: Bứt Phá Tầm Vóc và Dinh Dưỡng Dậy Thì. Theo dõi sát sao biểu đồ tăng trưởng chiều cao theo thang Tanner. Ứng dụng gợi ý chế độ dinh dưỡng Canxi D3K2, bài tập vận động và giấc ngủ chuẩn khoa học cho tuổi dậy thì.'
  },
  {
    idx: 3,
    title: 'Bộ Sơ Cứu Cảm Xúc & Tạo Kịch Bản NVC',
    narration: 'Chức năng 3: Bộ Sơ Cứu Cảm Xúc và Tạo Kịch Bản NVC. Xóa tan căng thẳng tức thì với 4 bước giao tiếp phi bạo lực NVC: Quan sát, Cảm nhận, Nhu cầu và Đề xuất. Cầu nối giúp cha mẹ và con lắng nghe, xoa dịu cảm xúc chân thành.'
  },
  {
    idx: 4,
    title: 'An Toàn Số & Chống Bẫy Grooming / Sextortion',
    narration: 'Chức năng 4: An Toàn Số và Chống Bẫy Grooming hoặc Sextortion. Tấm khiên bảo vệ kỹ thuật số toàn diện cho con trên không gian mạng. Trang bị bộ quy tắc 4 KHÔNG, cảnh báo bẫy Grooming và kết nối nhanh Tổng đài quốc gia 111.'
  },
  {
    idx: 5,
    title: 'Mốc Pháp Lý Tuổi 14 & Quyền Riêng Tư Số',
    narration: 'Chức năng 5: Mốc Pháp Lý Tuổi 14 và Quyền Riêng Tư Số. Tôn trọng ranh giới cá nhân và quyền riêng tư của con. Cung cấp khung nhận thức pháp lý tuổi 14, giúp cha mẹ ứng xử chuẩn mực và xây dựng niềm tin bền chặt.'
  },
  {
    idx: 6,
    title: 'Hướng Nghiệp Holland RIASEC & Phân Luồng 9+',
    narration: 'Chức năng 6: Hướng Nghiệp Holland RIASEC và Phân Luồng 9+. Khám phá tiềm năng vượt trội của con qua bài test Holland 6 nhóm tính cách. Định hướng rõ ràng hai con đường Cấp 3 hoặc Phân luồng 9+ ngay từ cột mốc 15 tuổi.'
  },
  {
    idx: 7,
    title: 'Ma Trận Cam Kết & Phần Thưởng 2 Chiều',
    narration: 'Chức năng 7: Ma Trận Cam Kết và Phần Thưởng 2 Chiều. Thiết lập thỏa thuận gia đình minh bạch và công bằng. Mở khóa các phần thưởng tự chủ như trang trí phòng, chơi game, sách truyện khi con hoàn thành cam kết.'
  },
  {
    idx: 8,
    title: 'Giả Lập Đối Thoại AI Cố Vấn',
    narration: 'Chức năng 8: Giả Lập Đối Thoại AI Cố Vấn. Không gian thực hành giao tiếp an toàn cho cha mẹ. Trợ lý AI đóng vai trò cố vấn, đưa ra phản hồi thời gian thực giúp cha mẹ luyện tập trước khi đối thoại cùng con.'
  },
  {
    idx: 9,
    title: 'Tổng Hợp Chương Trình Giáo Dục THCS (Lớp 6 – Lớp 9)',
    narration: 'Chức năng 9: Tổng Hợp Chương Trình Giáo Dục THCS Lớp 6 đến Lớp 9. Hệ thống hóa toàn bộ chương trình giáo dục trung học cơ sở. Cung cấp chi tiết các môn học, quy định chuẩn và mục tiêu kiến thức trọng tâm con cần nắm vững ở từng cấp lớp.'
  },
  {
    idx: 10,
    title: 'Cầu Nối Thấu Hiểu & Kết Nối Gia Đình',
    narration: 'Chức năng 10: Cầu Nối Thấu Hiểu và Kết Nối Gia Đình. Chuyển hóa xung đột thành sự gắn kết sâu sắc. Cùng con bước qua tuổi dậy thì rực rỡ, đong đầy yêu thương và sự thấu hiểu trọn vẹn giữa cha mẹ và con cái.'
  },
  {
    idx: 11,
    title: 'Lời bình & Triết lý đồng hành tuổi thiếu niên',
    narration: 'Phần 11: Lời bình và Triết lý đồng hành tuổi thiếu niên. Đồng hành cùng con bước qua tuổi dậy thì là hành trình đòi hỏi sự thấu hiểu, kiên nhẫn và tôn trọng ranh giới. Ứng dụng là người bạn đồng hành tin cậy, giúp gia đình xóa bỏ khoảng cách thế hệ và xây dựng kết nối yêu thương bền vững.'
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
  const targetDir = path.join("public", "apps", "thau-hieu-thieu-nien-12-15");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Generating 11 voiceovers for Thấu hiểu thiếu niên 12-15...`);

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
