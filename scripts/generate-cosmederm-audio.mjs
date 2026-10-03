import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "COSMEDERM AI ACADEMY: Khoa Học Da Liễu & Công Thức Mỹ Phẩm",
    narration: "Khoa học da liễu và công thức mỹ phẩm là một lĩnh vực rộng lớn với khối lượng kiến thức đồ sộ. Nhưng khi đối diện với một ca lâm sàng hay phát triển một sản phẩm thực tế, bạn có biết phải bắt đầu từ đâu? Cốt-mê-đơm Ây-Ai A-ca-đê-mi ra đời nhằm số hóa và chuyển hóa toàn bộ kiến thức Da liễu, Mỹ phẩm và A en Đi thành một hành trình trải nghiệm trực quan, mang tính tương tác cao và có thể thực hành ngay trên thiết bị di động."
  },
  {
    idx: 2,
    title: "01 | Học Theo Đúng Trình Độ",
    narration: "Tính năng một: Học theo đúng trình độ. Dù bạn là người mới bắt đầu, sinh viên Y Dược hay chuyên gia A en Đi giàu kinh nghiệm, hệ thống sẽ tự động phân luồng lộ trình học tập cá nhân hóa phù hợp với năng lực. Không học dàn trải, tập trung đúng kiến thức trọng tâm bạn đang cần."
  },
  {
    idx: 3,
    title: "02 | Phòng Lab Công Thức Ảo",
    narration: "Tính năng hai: Phòng Láp công thức ảo. Khi muốn thử nghiệm một công thức mỹ phẩm mới, bạn hoàn toàn có thể tự tay phối trộn pha dầu, pha nước, chất nhũ hóa và hoạt chất ngay trên màn hình. Hệ thống tự động tính toán tỷ lệ phần trăm và cảnh báo nguy cơ mất ổn định thể chất. Thử nghiệm công thức trước, thấu hiểu bản chất hóa sinh sâu hơn."
  },
  {
    idx: 4,
    title: "03 | Tra Cứu Thành Phần & Độ An Toàn",
    narration: "Tính năng ba: Tra cứu thành phần và độ an toàn. Chỉ cần nhập tên hoạt chất theo chuẩn In-si, mọi dữ liệu chuyên sâu về cơ chế sinh học, chức năng công thức, mức độ an toàn và giới hạn nồng độ cho phép sẽ hiển thị tức thì. Tiết kiệm hàng giờ đồng hồ tìm kiếm tài liệu rời rạc."
  },
  {
    idx: 5,
    title: "04 | Cây Phác Đồ Thẩm Mỹ",
    narration: "Tính năng bốn: Cây phác đồ thẩm mỹ. Dựa trên tình trạng da và mức độ lão hóa cụ thể, hệ thống dẫn dắt người học qua cây logic chuẩn y khoa để lựa chọn hoạt chất và phương pháp can thiệp tối ưu. Chuyển hóa lý thuyết hàn lâm thành tư duy chẩn đoán và xử lý ca thực tế."
  },
  {
    idx: 6,
    title: "05 | Chẩn Đoán Tóc & Da Đầu",
    narration: "Tính năng năm: Chẩn đoán tóc và da đầu. Không chỉ giới hạn ở làn da, hệ thống mở rộng sang bệnh học tóc và da đầu. Giúp người học phân biệt chính xác các bệnh lý thường gặp như viêm da tiết bã, rụng tóc hay gàu nấm, từ đó xây dựng giải pháp chăm sóc khoa học toàn diện."
  },
  {
    idx: 7,
    title: "06 | Học Qua Tình Huống & Trò Chơi",
    narration: "Tính năng sáu: Học qua tình huống lâm sàng và trò chơi tương tác. Phương pháp học tập tích cực thông qua các câu hỏi tình huống thực tế, minigame thử thách và bộ thẻ ghi nhớ P-lát cạc. Biến những kiến thức hóa dược phức tạp thành bài tập phản xạ nhanh, dễ tiếp thu và nhớ lâu."
  },
  {
    idx: 8,
    title: "07 | Sơ Đồ Tư Duy & Mô Hình 3D",
    narration: "Tính năng bảy: Sơ đồ tư duy và mô hình Ba-Đê tương tác. Hàng rào bảo vệ da, giải phẫu nang tóc hay cơ chế thẩm thấu qua lớp sừng đều được trực quan hóa sinh động. Những khái niệm trừu tượng nay trở nên trực quan, dễ hiểu và khắc sâu vào trí nhớ."
  },
  {
    idx: 9,
    title: "08 | Thư Viện Tri Thức",
    narration: "Tính năng tám: Thư viện tri thức chuyên sâu. Một kho tàng tài liệu chuẩn mực về da liễu, công nghệ bào chế, quy chế quản lý mỹ phẩm và tiêu chuẩn quốc tế được hệ thống hóa bài bản. Thay vì tra cứu hàng nghìn trang sách, bạn dễ dàng tiếp cận nguồn tri thức chuẩn xác chỉ trong vài thao tác."
  },
  {
    idx: 10,
    title: "09 | Thiết Kế Tối Ưu Cho Điện Thoại",
    narration: "Tính năng chín: Thiết kế tối ưu hóa cho thiết bị di động. Không bị bó buộc trước màn hình máy tính, bạn có thể học tập, tra cứu In-si, kiểm tra độ an toàn hoạt chất và thực hành xây dựng công thức mọi lúc, mọi nơi, ngay trong tầm tay."
  },
  {
    idx: 11,
    title: "10 | Trải Nghiệm Hiện Đại, Trực Quan",
    narration: "Tính năng mười: Trải nghiệm người dùng hiện đại và trực quan. Giao diện được thiết kế theo phong cách phòng nghiên cứu y khoa tiên tiến, tinh tế và tối giản. Công nghệ hiện đại không làm kiến thức trở nên phức tạp, mà đóng vai trò chiếc cầu nối giúp tri thức khoa học trở nên gần gũi và dễ tiếp cận hơn."
  },
  {
    idx: 12,
    title: "Lời Kết: Học Khoa Học – Thực Hành Thông Minh – Tạo Ra Giá Trị",
    narration: "Lời kết: Cốt-mê-đơm Ây-Ai A-ca-đê-mi không chỉ đơn thuần là nơi cung cấp kiến thức, mà là một người đồng hành giúp bạn tư duy sâu sắc, tra cứu chuẩn xác và tự tin thực hành. Từ kiến thức nền tảng, thực hành phòng Láp, hình thành phản xạ, đến ứng dụng giá trị thực tế. Cốt-mê-đơm Ây-Ai A-ca-đê-mi: Học khoa học, thực hành thông minh và kiến tạo giá trị bền vững cho ngành làm đẹp."
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "cosmederm-ai-academy");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 12 academic female voiceovers (vi-VN-HoaiMyNeural) for CosmeDerm AI Academy...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}/12] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-HoaiMyNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // Warm, academic, expressive female voice
        const { audioStream } = tts.toStream(scene.narration, {
          rate: "+2%",
          pitch: "-1Hz"
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

  console.log("\n All 12 CosmeDerm AI Academy voiceovers generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
