import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const appsVoiceData = [
  {
    appId: "nuoi-day-tre-6-11",
    name: "Nuôi dạy con 6 đến 11 tuổi",
    scenes: [
      {
        idx: 1,
        title: "Trợ lý AI 24/7 đồng hành cùng cha mẹ",
        narration: "5 năm đầu đời trôi qua thật nhanh. Khi con bước vào Tiểu học, cha mẹ cũng bước sang một hành trình mới: đồng hành cùng con học tập, quản lý thời gian, công nghệ và cảm xúc. Thấu hiểu giai đoạn chuyển giao này, mảnh ghép thứ 2 trong Trọn Bộ 4 Ứng Dụng Đồng Hành Làm Cha Mẹ và Trẻ Em từ 0 đến 18 Tuổi chính thức ra mắt: Nuôi Dạy Con 6 đến 11 Tuổi, người bạn đồng hành giúp cha mẹ tự tin cùng con từ lớp 1 đến hết Tiểu học, với 10 tính năng cốt lõi được thiết kế chuyên biệt. Tính năng 1: Trợ lý Ây-Ai 24 trên 7 đồng hành cùng cha mẹ. Trợ lý hội thoại Ây-Ai chuyên biệt giúp giải đáp các tình huống nuôi dạy con thực tế theo khung cấu trúc chuẩn mực: phân tích nguyên nhân, điều cần quan sát, gợi ý câu nói, việc nên làm hoặc nên tránh và gợi ý hoạt động 5 đến 10 phút mà không đưa ra chẩn đoán y khoa hay tâm lý."
      },
      {
        idx: 2,
        title: "Thư viện kịch bản giao tiếp (Parenting Scripts)",
        narration: "Tính năng 2: Thư viện kịch bản giao tiếp Parenting Scripts. Cung cấp danh mục câu nói tình huống khi con không chịu học, nổi nóng, dùng điện thoại nhiều hay trì hoãn, với sự so sánh trực quan giữa câu nói dễ gây căng thẳng và cách nói thay thế tích cực, thấu hiểu."
      },
      {
        idx: 3,
        title: "Trang tổng quan & Điểm tin hàng ngày (Home Dashboard & AI Daily Briefing)",
        narration: "Tính năng 3: Trang tổng quan và Điểm tin hàng ngày Home Dashboard và Ây-Ai Daily Briefing. Trả lời câu hỏi: Hôm nay cha mẹ nên biết gì về con? Hiển thị 3 trọng tâm đồng hành trong tuần, gợi ý hành động thực tế từ Ây-Ai và khung kết nối 2 phút cùng con vào mỗi buổi sáng hoặc buổi tối."
      },
      {
        idx: 4,
        title: "Hồ sơ phác họa bức tranh phát triển của con (Child Profile)",
        narration: "Tính năng 4: Hồ sơ phác họa bức tranh phát triển của con Child Profile. Phản ánh toàn diện sự phát triển của con qua các chỉ số mô tả như độ tự tin học tập, mức độ tập trung, thói quen đọc sách, giấc ngủ, cảm xúc thay vì chấm điểm hay so sánh, xếp hạng giữa các trẻ."
      },
      {
        idx: 5,
        title: "Hỗ trợ học tập & Đồ thị kiến thức (Academic Support Engine & Knowledge Graph)",
        narration: "Tính năng 5: Hỗ trợ học tập và Đồ thị kiến thức Academic Support Engine và Knowledge Graph. Bám sát chương trình từ Lớp 1 đến Lớp 5 cho các môn Toán, Tiếng Việt, Tiếng Anh; tự động truy vết các lỗ hổng kiến thức nền tảng để gợi ý hoạt động ngắn giúp cha mẹ đồng hành cùng con."
      },
      {
        idx: 6,
        title: "Nhật ký quan sát Cảm xúc & Hành vi (Emotional & Behavior Observation)",
        narration: "Tính năng 6: Nhật ký quan sát Cảm xúc và Hành vi Emotional and Behavior Observation. Cho phép cha mẹ ghi nhận trạng thái cảm xúc hàng ngày của con như vui, lo lắng, bực bội; hệ thống tự động nhận diện mẫu hình quy luật theo thời gian, phát hiện khung giờ con thường dễ căng thẳng."
      },
      {
        idx: 7,
        title: "Quản lý Thói quen Số & Thiết bị (Digital Family Manager)",
        narration: "Tính năng 7: Quản lý Thói quen Số và Thiết bị Digital Family Manager. Giúp thiết lập Thỏa thuận công nghệ gia đình Family Digital Agreement, theo dõi thời gian sử dụng màn hình, chơi game và cung cấp kịch bản trò chuyện thay vì cấm đoán cứng nhắc."
      },
      {
        idx: 8,
        title: "Theo dõi Sức khỏe, Thể chất & Dinh dưỡng (Health & Nutrition)",
        narration: "Tính năng 8: Theo dõi Sức khỏe, Thể chất và Dinh dưỡng Health and Nutrition. Biểu đồ theo dõi chiều cao, cân nặng, giấc ngủ, vận động cùng tính năng Ăn gì cho con, gợi ý thực đơn tuần và bữa sáng nhanh 15 phút phù hợp với gia đình Việt."
      },
      {
        idx: 9,
        title: "Thiết lập Nhịp sống & Hoạt động kết nối gia đình (Family Routine & Quality Time)",
        narration: "Tính năng 9: Thiết lập Nhịp sống và Hoạt động kết nối gia đình Family Routine and Quality Time. Xây dựng thói quen sinh hoạt cân bằng và cung cấp thư viện gợi ý các hoạt động kết nối 5 đến 15 phút như đọc sách, nấu ăn, đi dạo, trò chuyện được cá nhân hóa theo độ tuổi và năng lượng của gia đình."
      },
      {
        idx: 10,
        title: "Báo cáo nhìn lại hàng tuần & Zone hạ nhiệt SOS (Weekly Family Review & SOS Cool-down Zone)",
        narration: "Tính năng 10: Báo cáo nhìn lại hàng tuần và Zone hạ nhiệt Es-Oh-Es, Weekly Family Review and Es-Oh-Es Cool-down Zone. Tổng kết 5 đến 7 điểm sáng tiến bộ và xu hướng phát triển hàng tuần qua góc nhìn Ngọn Hải Đăng, kết hợp nút hạ nhiệt Es-Oh-Es 60 giây cùng nhạc Alpha và bài tập thở giúp cha mẹ giải tỏa căng thẳng khi dạy con học."
      },
      {
        idx: 11,
        title: "Lời bình & Đồng hành ý nghĩa bên con",
        narration: "Hy vọng ứng dụng sẽ trở thành một người bạn đồng hành nhỏ, giúp cha mẹ có thêm góc nhìn, thêm công cụ và thêm những phút kết nối ý nghĩa bên con."
      }
    ]
  },
  {
    appId: "thau-hieu-thieu-nien-12-15",
    name: "Thấu hiểu thiếu niên 12 đến 15 tuổi",
    scenes: [
      {
        idx: 1,
        title: "Onboarding Đa Nền Tảng & Chế Độ Máy Chiếu",
        narration: "12 đến 15 tuổi, con không còn là một đứa trẻ, nhưng cũng chưa thực sự là một người lớn. Sau Nuôi dưỡng bé 0 đến 60 tháng và Nuôi dạy con 6 đến 11 tuổi, đây là giai đoạn con thay đổi rất nhanh: cơ thể, cảm xúc, suy nghĩ, bạn bè, công nghệ và cả cách con nhìn về chính mình. Thấu hiểu thiếu niên 12 đến 15 tuổi được xây dựng để giúp hiểu con hơn, giao tiếp tốt hơn, bảo vệ con tốt hơn và từng bước trao cho con sự tự chủ phù hợp. Hãy cùng khám phá 10 tính năng cốt lõi của ứng dụng. Tính năng 1: Onboarding Đa Nền Tảng và Chế Độ Máy Chiếu. Dễ dàng truy cập ứng dụng trên mọi thiết bị từ điện thoại, laptop đến máy chiếu gia đình. Trải nghiệm giao diện trực quan, đồng bộ mượt mà, giúp cả nhà cùng theo dõi và đồng hành mọi lúc, mọi nơi."
      },
      {
        idx: 2,
        title: "Bứt Phá Tầm Vóc & Dinh Dưỡng Dậy Thì",
        narration: "Tính năng 2: Bứt Phá Tầm Vóc và Dinh Dưỡng Dậy Thì. Theo dõi sát sao biểu đồ tăng trưởng chiều cao theo thang Tanner. Ứng dụng gợi ý chế độ dinh dưỡng Can-xi, Đê ba, Ca hai, bài tập vận động và giấc ngủ chuẩn khoa học cho tuổi dậy thì."
      },
      {
        idx: 3,
        title: "Bộ Sơ Cứu Cảm Xúc & Tạo Kịch Bản NVC",
        narration: "Tính năng 3: Bộ Sơ Cứu Cảm Xúc và Tạo Kịch Bản En-Vi-Si. Xóa tan căng thẳng tức thì với 4 bước giao tiếp phi bạo lực En-Vi-Si: Quan sát, Cảm nhận, Nhu cầu và Đề xuất. Cầu nối giúp cha mẹ và con lắng nghe, xoa dịu cảm xúc chân thành."
      },
      {
        idx: 4,
        title: "An Toàn Số & Chống Bẫy Grooming / Sextortion",
        narration: "Tính năng 4: An Toàn Số và Chống Bẫy Grooming, Sextortion. Tấm khiên bảo vệ kỹ thuật số toàn diện cho con trên không gian mạng. Trang bị bộ quy tắc 4 KHÔNG, cảnh báo bẫy Grooming và kết nối nhanh Tổng đài quốc gia 1 1 1."
      },
      {
        idx: 5,
        title: "Mốc Pháp Lý Tuổi 14 & Quyền Riêng Tư Số",
        narration: "Tính năng 5: Mốc Pháp Lý Tuổi 14 và Quyền Riêng Tư Số. Tôn trọng ranh giới cá nhân và quyền riêng tư của con. Cung cấp khung nhận thức pháp lý tuổi 14, giúp cha mẹ ứng xử chuẩn mực và xây dựng niềm tin bền chặt."
      },
      {
        idx: 6,
        title: "Hướng Nghiệp Holland RIASEC & Phân Luồng 9+",
        narration: "Tính năng 6: Hướng Nghiệp Holland Ria-sếch và Phân Luồng 9+. Khám phá tiềm năng vượt trội của con qua bài test Holland 6 nhóm tính cách. Định hướng rõ ràng 2 con đường Cấp 3 hoặc Phân luồng 9+ ngay từ cột mốc 15 tuổi."
      },
      {
        idx: 7,
        title: "Ma Trận Cam Kết & Phần Thưởng 2 Chiều",
        narration: "Tính năng 7: Ma Trận Cam Kết và Phần Thưởng 2 Chiều. Thiết lập thỏa thuận gia đình minh bạch và công bằng. Mở khóa các phần thưởng tự chủ như decor phòng, chơi game, sách truyện khi con hoàn thành cam kết."
      },
      {
        idx: 8,
        title: "Giả Lập Đối Thoại AI",
        narration: "Tính năng 8: Giả Lập Đối Thoại Ây-Ai. Không gian thực hành giao tiếp an toàn cho cha mẹ. Trợ lý Ây-Ai đóng vai trò cố vấn, đưa ra phản hồi thời gian thực giúp cha mẹ luyện tập trước khi đối thoại cùng con."
      },
      {
        idx: 9,
        title: "Tổng Hợp Chương Trình Giáo Dục THCS (Lớp 6 – Lớp 9)",
        narration: "Tính năng 9: Tổng Hợp Chương Trình Giáo Dục Trung học cơ sở, từ Lớp 6 đến Lớp 9. Hệ thống hóa toàn bộ chương trình giáo dục từ lớp 6 đến lớp 9. Cung cấp chi tiết các môn học, quy định chuẩn và mục tiêu kiến thức trọng tâm con cần nắm vững ở từng cấp lớp."
      },
      {
        idx: 10,
        title: "Cầu Nối Thấu Hiểu & Kết Nối Gia Đình",
        narration: "Tính năng 10: Cầu Nối Thấu Hiểu và Kết Nối Gia Đình. Chuyển hóa xung đột thành sự gắn kết sâu sắc. Cùng con bước qua tuổi dậy thì rực rỡ, đong đầy yêu thương và sự thấu hiểu trọn vẹn giữa cha mẹ và con cái."
      },
      {
        idx: 11,
        title: "Thấu hiểu để đồng hành – Cùng con tự tin lớn lên",
        narration: "Hy vọng Thấu hiểu thiếu niên 12 đến 15 tuổi sẽ trở thành một cây cầu nhỏ, giúp cha mẹ và con gần nhau hơn giữa những thay đổi của tuổi dậy thì. Thấu hiểu để đồng hành, đồng hành để con tự tin lớn lên."
      }
    ]
  },
  {
    appId: "dinh-huong-thanh-nien-16-18",
    name: "Định hướng thanh niên 16 đến 18 tuổi",
    scenes: [
      {
        idx: 1,
        title: "Trạm Tổng quan Gia đình (Home Dashboard & Weekly Insight)",
        narration: "Sau Nuôi dưỡng bé 0 đến 60 tháng, Nuôi dạy con 6 đến 11 tuổi và Thấu hiểu thiếu niên 12 đến 15 tuổi, đây là mảnh ghép cuối cùng: Định hướng thanh niên 16 đến 18 tuổi, được thiết kế với mục đích thay đổi quan điểm, chuyển từ quản lý sang đồng hành cùng con, từ kiểm soát sang tin tưởng, từ quyết định thay con sang cùng con chuẩn bị cho tương lai. Hãy cùng khám phá 10 tính năng cốt lõi của chặng đường này. Tính năng 1: Trạm Tổng quan Gia đình, Home Dashboard và Weekly Insight. Cung cấp bức tranh tổng thể hàng tuần của con trên 5 khía cạnh: Học tập, Định hướng, Kết nối, Sức khỏe và Thói quen, Trưởng thành, và gợi ý 3 việc cụ thể cha mẹ có thể làm ngay trong tuần."
      },
      {
        idx: 2,
        title: "Bản đồ Học tập & Trạm Thi/Tuyển sinh (Academic & Exam Hub)",
        narration: "Tính năng 2: Bản đồ Học tập và Trạm Thi, Tuyển sinh, Academic and Exam Hub. Giúp cha mẹ nắm bắt chương trình Giáo dục phổ thông 2018 lớp 10 đến 12, tổ hợp môn học, xu hướng tiến bộ, cùng các mốc thời gian thi tốt nghiệp Trung học phổ thông và xét tuyển đại học mà không biến cha mẹ thành người giám sát điểm số."
      },
      {
        idx: 3,
        title: "La bàn Định hướng & Kịch bản Tương lai (Career & Future Direction)",
        narration: "Tính năng 3: La bàn Định hướng và Kịch bản Tương lai, Career and Future Direction. Tích hợp các công cụ khám phá năng lực, sở thích như Holland Ria-sếch, Ikigai và gợi ý 3 kịch bản tương lai: An toàn, Khám phá, Đột phá để gia đình cùng thảo luận hướng đi thay vì áp đặt ngành học."
      },
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
    ]
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

let sharedTTS = null;

async function getTTS(forceNew = false) {
  if (forceNew && sharedTTS) {
    try { sharedTTS.close(); } catch {}
    sharedTTS = null;
    await new Promise(r => setTimeout(r, 2000));
  }
  if (!sharedTTS) {
    sharedTTS = new MsEdgeTTS();
    await sharedTTS.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  }
  return sharedTTS;
}

async function generateSingleScene(text, targetPath) {
  const cleanText = sanitizeForTTS(text);
  const tempPath = targetPath + ".tmp";

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const tts = await getTTS(attempt > 1);
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
      return stats.size;
    } catch (err) {
      console.warn(`   -> Warning (Attempt ${attempt}/6): ${err.message}. Retrying...`);
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch {}
      }
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error(`Failed to generate ${targetPath} after 6 attempts!`);
}

async function main() {
  console.log("=== STARTING STABLE BATCH VOICEOVER GENERATION FOR 3 APPS ===");

  for (const app of appsVoiceData) {
    const targetDir = path.join("public", "apps", app.appId);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`\n======================================================`);
    console.log(`Generating 11 voiceovers for: ${app.name} (${app.appId})`);
    console.log(`======================================================`);

    for (const scene of app.scenes) {
      const targetPath = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
      console.log(`[${app.appId}] Scene ${scene.idx}/11: "${scene.title}"`);

      const size = await generateSingleScene(scene.narration, targetPath);
      console.log(`   -> SUCCESS: ${Math.round(size / 1024)} KB (${targetPath})`);

      // Gentle pause between scenes to respect rate limits
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("\nALL 33 AUDIO SCENES FOR ALL 3 APPS GENERATED SUCCESSFULLY WITH 100% QUALITY!");
  process.exit(0);
}

main().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
