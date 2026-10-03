import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: 'Dashboard "5 Giây" & Bản Tin Gia Đình Hàng Tuần',
    narration: 'Chức năng 1: Dashboard 5 Giây và Bản Tin Gia Đình Hàng Tuần. Chỉ với 5 giây mỗi sáng, cha mẹ nắm trọn bức tranh tổng quan của con qua 5 mảng sống cốt lõi: Học tập, Định hướng, Kết nối, Sức khỏe và Trưởng thành. Hệ thống tự động phân tích và gợi ý 3 việc thiết thực nhất cha mẹ nên làm trong tuần.'
  },
  {
    idx: 2,
    title: 'Trạm Học Thuật & Ma Trận Tuyển Sinh 2027',
    narration: 'Chức năng 2: Trạm Học Thuật và Ma Trận Tuyển Sinh 2027. Cập nhật chuẩn xác chương trình Giáo dục phổ thông 2018, Thông tư 22 và mô hình thi Tốt nghiệp 2 cộng 2 mới nhất. Trang bị chiến thuật làm bài chống sai ngu, giải mã đề thi Đánh giá năng lực, IELTS, SAT và lộ trình tính điểm học bạ thông minh.'
  },
  {
    idx: 3,
    title: 'La Bàn Định Hướng & 3 Kịch Bản Tương Lai',
    narration: 'Chức năng 3: La Bàn Định Hướng và 3 Kịch Bản Tương Lai. Tích hợp bộ công cụ Holland, Ikigai và Tư duy Thiết kế Design Thinking. Giúp gia đình cùng phác thảo 3 lộ trình 5 năm: An toàn, Khám phá và Đột phá, kết hợp bộ lọc đánh giá độ miễn nhiễm với trí tuệ nhân tạo AI của ngành nghề mục tiêu.'
  },
  {
    idx: 4,
    title: 'Trợ Lý Giao Tiếp "Nói Sao Với Con?"',
    narration: 'Chức năng 4: Trợ Lý Giao Tiếp Nói Sao Với Con. Ứng dụng mô hình Khai vấn GROW và Giao tiếp Không bạo lực NVC. Gợi ý kịch bản ứng xử tinh tế khi con đóng chặt cửa phòng, chán học, thức khuya hay chọn ngành khác với mong muốn của gia đình.'
  },
  {
    idx: 5,
    title: 'Bộ Từ Điển Slang Gen Z & Đời Sống Số',
    narration: 'Chức năng 5: Bộ Từ Điển Slang Gen Z và Đời Sống Số. Xóa bỏ khoảng cách thế hệ bằng việc giải mã các thuật ngữ tuổi teen như Flex, Check var, Overthinking, Slay hay Toxic. Giúp cha mẹ thấu hiểu không gian mạng của con trên Threads, Discord, BeReal hay Instagram Close Friends.'
  },
  {
    idx: 6,
    title: 'Trợ Lý Tạo Thỏa Thuận Gia Đình & Ranh Giới Riêng Tư',
    narration: 'Chức năng 6: Trợ Lý Tạo Thỏa Thuận Gia Đình và Ranh Giới Riêng Tư. Công cụ tạo bản thỏa thuận văn minh hai bên về giờ giấc, điện thoại, chi tiêu và quyền riêng tư phòng ngủ. Chuyển đổi từ sự áp đặt, kiểm soát sang tinh thần tôn trọng, trao quyền và tự giác.'
  },
  {
    idx: 7,
    title: 'Nutri-Calc & Dinh Dưỡng Trí Não Mùa Thi',
    narration: 'Chức năng 7: Nutri-Calc và Dinh Dưỡng Trí Não Mùa Thi. Theo dõi nhu cầu năng lượng chuẩn Viện Dinh dưỡng, thiết lập thực đơn Low GI giải phóng đường chậm giúp não bộ tỉnh táo, bổ sung bộ ba Canxi, D3, K2 bứt phá chiều cao và phát hiện sớm cảnh báo nghiện caffeine, nước tăng lực.'
  },
  {
    idx: 8,
    title: 'Hành Trang Tự Lập & Bứt Phá EQ Tuổi 18',
    narration: 'Chức năng 8: Hành Trang Tự Lập và Bứt Phá EQ Tuổi 18. Lộ trình 5 bước tự phơi nhiễm giúp con vượt qua nhút nhát, tự tin giao tiếp, tự chạy xe an toàn, nấu 15 món ăn sinh tồn và quản lý phòng ở cá nhân trước khi bước vào đời.'
  },
  {
    idx: 9,
    title: 'Cẩm Nang Pháp Lý Tuổi 18 & Định Danh Số',
    narration: 'Chức năng 9: Cẩm Nang Pháp Lý Tuổi 18 và Định Danh Số. Trang bị đầy đủ kiến thức pháp lý về Nghĩa vụ quân sự tuổi 17, Căn cước công dân gắn chip, VNeID Mức 2 và bài học thực tế phòng tránh các bẫy lừa đảo mạng, đòi nợ thuê hay đứng tên tài khoản hộ.'
  },
  {
    idx: 10,
    title: 'Trợ lý AI 24/7 — Người Đồng Hành Không Phán Xét',
    narration: 'Chức năng 10: Trợ lý AI 24 trên 7, Người Đồng Hành Không Phán Xét. Trợ lý AI thấu cảm, điềm tĩnh và giàu tri thức y khoa, tâm lý, giáo dục. Sẵn sàng tháo gỡ mọi băn khoăn của cha mẹ bất kỳ lúc nào với cấu trúc phản hồi 6 bước chuẩn mực, khoa học.'
  },
  {
    idx: 11,
    title: 'Lời bình & Triết lý đồng hành tuổi 16-18',
    narration: 'Phần 11: Lời bình và Triết lý đồng hành Làm Cha Mẹ 4. Khi con đang lớn, cách làm cha mẹ cũng cần lớn cùng con. Hãy để ứng dụng trở thành ngọn hải đăng số, giúp cha mẹ hiểu con hơn, đồng hành đúng cách và vững vàng chuẩn bị cho chặng đường trưởng thành của con!'
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
  const targetDir = path.join("public", "apps", "dinh-huong-thanh-nien-16-18");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Generating 11 voiceovers for Định hướng thanh niên 16-18...`);

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
          audioStream.on("error", reject);
          writable.on("error", reject);
        });

        const stat = fs.statSync(tempPath);
        if (stat.size > 2000) {
          if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
          fs.renameSync(tempPath, targetPath);
          console.log(`  ✓ Scene ${scene.idx} success (${stat.size} bytes)`);
          generated = true;
          break;
        } else {
          throw new Error(`File too small: ${stat.size} bytes`);
        }
      } catch (err) {
        console.warn(`  Attempt ${attempt} failed for Scene ${scene.idx}: ${err.message}`);
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }

    if (!generated) {
      console.error(`FAILED to generate Scene ${scene.idx}`);
    }
  }

  console.log("Audio generation process completed.");
}

run();
