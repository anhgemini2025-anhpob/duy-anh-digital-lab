import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "TROPILAB RISKOS: Trung Tâm Điều Hành Số Quản Lý Rủi Ro Xét Nghiệm",
    narration: "Trong bệnh viện, quản lý rủi ro không chỉ là xử lý sự cố, mà là phát hiện sớm, hành động đúng và tuân thủ các yêu cầu của tiêu chuẩn Ai-Ét-Sô cùng quy định chuyên môn của Bộ Y tế. Tro-pi-láp Rít-o-ét là nền tảng số hóa quản lý Rủi ro, Chất lượng, Ai-Ét-Sô, An toàn phòng xét nghiệm, giúp kết nối dữ liệu, con người và quy trình trên một hệ thống. Từ phát hiện sự cố, cảnh báo, xử lý, khắc phục đến truy xuất hồ sơ, mọi bước đều được ghi nhận và kiểm soát."
  },
  {
    idx: 2,
    title: "01 | Báo Lỗi Một Chạm Và Khóa Mẫu Khẩn Cấp",
    narration: "Tính năng một: Báo lỗi một chạm và khóa mẫu khẩn cấp. Kỹ thuật viên chỉ cần chọn mã lỗi, chụp ảnh chứng cứ và gửi ngay trên điện thoại. Hệ thống tự động cảnh báo người liên quan, khóa trạng thái mẫu trên hệ thống quản lý xét nghiệm và bắt đầu tính thời gian xử lý. Phát hiện nhanh, xử lý ngay, không bỏ sót sự cố."
  },
  {
    idx: 3,
    title: "02 | Xác Nhận Người Bệnh Và Kiểm Tra Chống Sai Sót",
    narration: "Tính năng hai: Xác nhận người bệnh và kiểm tra chống sai sót. Điều dưỡng quét mã Kiu-A trên vòng tay người bệnh hoặc phiếu chỉ định. Hệ thống tự động đối chiếu với y lệnh trước khi lấy mẫu. Thêm một bước kiểm tra, thêm một lớp an toàn cho người bệnh."
  },
  {
    idx: 4,
    title: "03 | Bản Đồ Ống Nghiệm Trực Quan Và Trợ Lý Thực Hành Tốt",
    narration: "Tính năng ba: Bản đồ ống nghiệm trực quan và trợ lý thực hành tốt. Không cần ghi nhớ tất cả các loại ống. Hệ thống trực quan hóa màu nắp, loại bệnh phẩm, thứ tự lấy máu và cách xử lý từng loại ống. Giúp nhân viên thao tác thống nhất và giảm sai sót ngay từ khâu lấy mẫu."
  },
  {
    idx: 5,
    title: "04 | Cảnh Báo Dán Nhãn Tự Động",
    narration: "Tính năng bốn: Cảnh báo dán nhãn tự động. Với những chỉ định đặc biệt như sốt xuất huyết hoặc sốt rét, hệ thống tự động nhắc nhân viên dán nhãn phụ. Nhân viên phải xác nhận trước khi hoàn tất. Đúng nhận diện, đúng mẫu, đúng quy trình."
  },
  {
    idx: 6,
    title: "05 | Trợ Lý Kiểm Tra Y Lệnh Thông Minh",
    narration: "Tính năng năm: Trợ lý kiểm tra y lệnh thông minh. Hệ thống tự động đối chiếu y lệnh với thông tin người bệnh, lịch sử khám và mã chẩn đoán. Các chỉ định trùng lặp, bất thường hoặc sai mã được cảnh báo sớm. Phát hiện vấn đề trước khi trở thành sự cố."
  },
  {
    idx: 7,
    title: "06 | Tự Động Hóa Hồ Sơ ISO",
    narration: "Tính năng sáu: Tự động hóa hồ sơ Ai-Ét-Sô. Dữ liệu sự cố và dữ liệu giám sát được tự động tổng hợp để hỗ trợ lập: Phiếu nhận diện nguy cơ, Kế hoạch khắc phục và phòng ngừa Ca-pa, Hồ sơ quản lý chất lượng. Hỗ trợ phê duyệt và ký số ngay trên hệ thống. Giảm giấy tờ, giảm nhập liệu, dễ dàng truy xuất."
  },
  {
    idx: 8,
    title: "07 | Giám Sát Môi Trường 24/7",
    narration: "Tính năng bảy: Giám sát môi trường hai mươi bốn trên bảy. Cảm biến thông minh tự động theo dõi nhiệt độ và độ ẩm tại phòng xét nghiệm và tủ lạnh bảo quản. Khi vượt ngưỡng cho phép, hệ thống lập tức phát cảnh báo. Quản lý không cần chờ đến lúc kiểm tra mới phát hiện vấn đề."
  },
  {
    idx: 9,
    title: "08 | Màn Hình Điều Hành Và Ma Trận Rủi Ro Thời Gian Thực",
    narration: "Tính năng tám: Màn hình điều hành và ma trận rủi ro thời gian thực. Toàn bộ thông tin được tập trung trên một màn hình. Người quản lý có thể theo dõi chỉ số chất lượng, mức độ rủi ro, tỷ lệ ngoại nhiễm và lịch sử xử lý sự cố. Biết rủi ro ở đâu, mức độ nào, ai đang xử lý."
  },
  {
    idx: 10,
    title: "09 | Dự Báo Vật Tư Và Quản Lý Bảo Trì",
    narration: "Tính năng chín: Dự báo vật tư và quản lý bảo trì. Hệ thống phân tích mức tiêu hao hóa chất và sinh phẩm để cảnh báo nhu cầu từ sớm, hạn chế nguy cơ thiếu vật tư. Đồng thời tạo yêu cầu bảo trì và theo dõi thời gian xử lý thiết bị. Chủ động trước khi thiếu vật tư hoặc máy ngừng hoạt động."
  },
  {
    idx: 11,
    title: "10 | Theo Dõi Người Bệnh Và Thông Báo Zalo",
    narration: "Tính năng mười: Theo dõi người bệnh và thông báo qua Da-lô. Người bệnh quét mã Kiu-A trên phiếu hẹn để theo dõi tiến trình xét nghiệm. Khi xảy ra sự cố, hệ thống hỗ trợ gửi thông báo phù hợp và hướng dẫn người bệnh quay lại lấy mẫu ưu tiên khi cần. Minh bạch hơn, giảm chờ đợi, nâng cao trải nghiệm người bệnh."
  },
  {
    idx: 12,
    title: "Lời Kết: Nhìn Thấy Rủi Ro – Hành Động Kịp Thời",
    narration: "Tro-pi-láp Rít-o-ét không chỉ là phần mềm ghi nhận sự cố. Đây là trung tâm điều hành số, kết nối Rủi ro, Chất lượng, Ai-Ét-Sô, Xét nghiệm, Thiết bị, Dữ liệu và Người bệnh trên một nền tảng. Từ phát hiện rủi ro, cảnh báo, hành động, khắc phục đến truy xuất. Quản lý rủi ro bằng dữ liệu. Chuẩn hóa bằng quy trình. Hành động đúng lúc. Tro-pi-láp Rít-o-ét: Nhìn thấy rủi ro, hành động kịp thời."
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "tropilab-riskos");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 12 Southern female (vi-VN-HoaiMyNeural) voiceovers for TROPILAB RISKOS...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-HoaiMyNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // Gentle sweet Southern female voice rate and pitch adjustment
        const { audioStream } = tts.toStream(scene.narration, {
          rate: "+2%",
          pitch: "+1Hz"
        });

        await new Promise((resolve, reject) => {
          const fileStream = fs.createWriteStream(targetFile);
          audioStream.pipe(fileStream);
          fileStream.on("finish", () => {
            console.log(`✓ [Scene ${scene.idx}] Saved to ${targetFile}`);
            resolve();
          });
          fileStream.on("error", reject);
          audioStream.on("error", reject);
        });

        success = true;
        break;
      } catch (err) {
        console.warn(`Attempt ${attempt} failed for scene ${scene.idx}:`, err.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!success) {
      console.error(`Failed to generate audio for scene ${scene.idx}`);
    }
  }

  console.log("All voiceovers generated successfully!");
}

generate();
