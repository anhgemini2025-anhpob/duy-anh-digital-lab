import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "Quản Lý HTX Bằng Sổ Tay: Thất Thoát Ở Đâu?",
    narration: "Dạ, kính chào bà con và quý anh chị! Một Hợp tác xã mỗi ngày biết bao nhiêu lượt xuất hàng, nhập hàng, rau dập, rau hư rồi tiền thu, tiền chi. Nhưng nếu bà con mình vẫn quản lý bằng sổ tay hay cộng Ích-xeo thủ công, liệu Ban chủ nhiệm có thật sự biết mình đang lời lãi ra sao, hay đang bị thất thoát ở khâu nào không ạ?"
  },
  {
    idx: 2,
    title: "Cánh Đồng Số: Trợ Lý Quản Trị HTX Trên Điện Thoại",
    narration: "Dạ thấu hiểu những trăn trở đó của bà con, ứng dụng Cánh Đồng Số ra đời như một người trợ lý đắc lực, giúp Ban quản trị Hợp tác xã nhìn thấy toàn bộ hàng hóa, dòng tiền và công việc mỗi ngày, hiển thị rõ ràng, chuẩn xác ngay trên một chiếc điện thoại thông minh."
  },
  {
    idx: 3,
    title: "01 | Quản Lý Đơn Hàng & Xuất Kho Minh Bạch",
    narration: "Tính năng thứ nhất: Quản lý đơn hàng và xuất kho minh bạch. Mỗi đơn rau đều được chia rõ ràng: đang giao, đã giao hay cần xử lý gấp. Khi xuất kho, hệ thống tự động đối chiếu đúng từng lô và số lượng thực tế, tránh nhầm lẫn. Nhân viên có thể chụp phiếu giao, chụp hóa đơn và lấy chữ ký khách hàng trực tiếp trên điện thoại, vừa tiện lợi vừa hạn chế tranh chấp."
  },
  {
    idx: 4,
    title: "02 | Kiểm Soát Rau Hư & Tỷ Lệ Hao Hụt",
    narration: "Tính năng thứ hai: Biết rau hư ở đâu và hư bao nhiêu. Mọi sự cố rau bị dập, hỏng hay hao hụt trong quá trình thu gom đều được ghi nhận ngay tắp lự. Nhờ đó, Hợp tác xã mình biết chính xác lô nào hao hụt nhiều, do khâu vận chuyển hay thời tiết, từ đó chủ động tìm cách giảm thất thoát và giữ trọn lợi nhuận cho bà con."
  },
  {
    idx: 5,
    title: "03 | Cảnh Báo Lô Rau Cận Hạn Xuất Trước",
    narration: "Tính năng thứ ba: Hàng nào cần bán trước. Bà con mình không cần phải bận tâm ghi nhớ trong đầu nữa đâu nghen! Hệ thống sẽ tự động cảnh báo những lô rau cận hạn, những lô thu hoạch trước để ưu tiên xuất bán sớm, giúp rau luôn tươi mới và không bao giờ bị tồn kho quá lâu."
  },
  {
    idx: 6,
    title: "04 | Dự Báo Sản Lượng & An Toàn Cách Ly Phân Thuốc",
    narration: "Tính năng thứ tư: Biết trước sắp có bao nhiêu rau. Ban chủ nhiệm có thể theo dõi sát sao từng mảnh ruộng của từng xã viên và dự kiến sản lượng sắp thu hoạch. Đặc biệt, hệ thống tự động cảnh báo thời gian cách ly phân thuốc chuẩn Việt-Gáp, biết chính xác lô nào đã đủ điều kiện an toàn, giúp Hợp tác xã tự tin chốt đơn lớn với các siêu thị."
  },
  {
    idx: 7,
    title: "05 | Nông Dân Ghi Nhật Ký Bằng Giọng Nói",
    narration: "Tính năng thứ năm: Nông dân không rành điện thoại vẫn dùng ngon lành! Bác nông dân lớn tuổi ngoài đồng chỉ cần bấm nút micro để nói ghi nhật ký, hoặc chụp tấm hình lúc xuống giống, bón phân hay tưới nước. Dữ liệu được công nghệ Ây-Ai lưu trữ ngay ngắn thành hồ sơ số, sẵn sàng in mã Quy-Rờ Cốt truy xuất nguồn gốc dễ như trở bàn tay."
  },
  {
    idx: 8,
    title: "06 | Tiền Rau Của Từng Xã Viên Sòng Phẳng",
    narration: "Tính năng thứ sáu: Tiền rau của từng xã viên luôn sòng phẳng, rõ ràng. Xã viên giao bao nhiêu ký, đơn giá bao nhiêu, thành tiền bao nhiêu là hệ thống tự động tính chuẩn xác. Bà con chỉ cần mở mục Tiền rau của tôi là xem được liền, Ban quản trị nắm chắc tổng số tiền phải trả, minh bạch ngay từ đầu, vừa vui vẻ vừa bền chặt tình làng nghĩa xóm."
  },
  {
    idx: 9,
    title: "07 | Quản Lý Sổ Quỹ & Đối Chiếu Dòng Tiền",
    narration: "Tính năng thứ bảy: Quản lý sổ quỹ và dòng tiền thông minh. Từng đồng tiền thu vào, chi ra hay số dư quỹ Hợp tác xã đều được cập nhật theo thời gian thực. Đặc biệt, hệ thống tự động đối chiếu dòng tiền với hàng nhập, hàng xuất và hàng hỏng, giúp phát hiện ngay các khoản chênh lệch bất thường mà không lo thất thoát."
  },
  {
    idx: 10,
    title: "08 | Xuất Báo Cáo Excel Chỉ Trong Một Cú Chạm",
    narration: "Tính năng thứ tám: Không còn mất hàng giờ cộng sổ hay nhập Ích-xeo. Tất cả báo cáo nhập hàng, xuất hàng, tồn kho và sổ Hợp tác xã đều có thể xuất ra file Ích-xeo chuẩn mẫu chỉ trong một nốt nhạc. Khi nhập dữ liệu vào, hệ thống còn tự động kiểm tra và báo lỗi trước khi lưu, giúp cán bộ kế toán tiết kiệm rất nhiều công sức."
  },
  {
    idx: 11,
    title: "09 | Hoạt Động Offline Khi Mất Sóng Ngoài Đồng",
    narration: "Tính năng thứ chín: Mất mạng vẫn làm việc trơn tru. Ngoài đồng không có sóng hay trong kho lạnh tín hiệu chập chờn? Bà con mình cứ yên tâm, ứng dụng vẫn ghi nhận bình thường ở chế độ Óp-lai. Ngay khi có mạng trở lại, toàn bộ dữ liệu sẽ tự động đồng bộ lên hệ thống, công việc đồng áng không bao giờ bị gián đoạn."
  },
  {
    idx: 12,
    title: "10 | Phân Quyền 4 Vai Trò Đúng Người Đúng Việc",
    narration: "Tính năng thứ mười: Phân quyền rõ ràng, đúng việc đúng người. Chủ nhiệm theo dõi bức tranh điều hành tổng quan; thủ kho quản lý nhập, xuất và hao hụt; tài xế xe tải quản lý cung đường giao hàng; còn bà con xã viên chỉ xem phần tiền rau của mình. Ai làm việc nấy, chuyên nghiệp và bảo mật thông tin tuyệt đối."
  },
  {
    idx: 13,
    title: "11 | Màn Hình Việc Hôm Nay: Nắm Bắt Tức Thì",
    narration: "Tính năng mười một: Mở áp là biết hôm nay phải làm gì. Không cần lật từng cuốn sổ dầy cộm, màn hình Việc hôm nay sẽ đưa ngay những việc cấp bách lên trên đầu: đơn nào đang trễ hạn, lô rau nào sắp hết hạn, loại rau nào bị dập, ruộng nào sắp thu hoạch. Mọi thông tin nổi bật giúp người quản lý điều hành nhịp nhàng từng phút từng giây."
  },
  {
    idx: 14,
    title: "Số Hóa Liên Mạch: Từ Cánh Đồng Đến Bàn Ăn",
    narration: "Cánh Đồng Số không sinh ra để thay thế người làm nông, mà là công cụ đắc lực giúp Ban quản trị nhìn thấu suốt để đưa ra quyết định nhanh hơn, chuẩn hơn. Từ cánh đồng đến nhà kho, từ khâu giao hàng đến tiền rau, sổ quỹ và báo cáo, tất cả kết nối liền một mạch. Ít sổ sách hơn, ít thất thoát hơn, và nâng tầm giá trị nông sản quê mình."
  },
  {
    idx: 15,
    title: "Trải Nghiệm HTX Cánh Đồng Số: Nông Nghiệp Bền Vững",
    narration: "Dạ, kính mời quý bà con và các Ban chủ nhiệm Hợp tác xã cùng trải nghiệm ngay ứng dụng HTX Rau Củ Quả - Cánh Đồng Số! Để việc quản lý Hợp tác xã không chỉ dựa vào kinh nghiệm, mà được soi sáng bằng dữ liệu rõ ràng, kịp thời, mang lại ấm no và thịnh vượng cho mọi nhà vườn bà con mình nhé!"
  }
];

async function generate() {
  const targetDir = path.join(process.cwd(), "public", "apps", "htx-rau-cu");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const voiceName = "vi-VN-HoaiMyNeural";
  // Warm, natural, authentic 25yo Mekong Delta female tone
  const voiceSettings = { rate: "+2%", pitch: "-1Hz" };

  console.log(`Starting voiceover generation for 15 scenes with ${voiceName} (Warm Mekong Delta Female)...`);

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);

    console.log(`[Scene ${scene.idx}/15] Generating audio: "${scene.title}"...`);

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

  console.log("\nAll 15 HTX Rau Củ Quả voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
