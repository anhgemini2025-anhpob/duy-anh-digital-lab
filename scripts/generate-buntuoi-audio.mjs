import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "BẢO QUẢN BÚN TƯƠI: Hướng Dẫn Kỹ Thuật Sử Dụng Phụ Gia An Toàn & Chuẩn Pháp Lý Nhóm 06.4.3",
    narration: "Bún tươi là món ăn truyền thống quen thuộc của người Việt, nhưng cũng là một trong những sản phẩm dễ chua, nhớt và hư hỏng nhanh nhất do độ ẩm cao. Ứng dụng web Cẩm nang kỹ thuật sử dụng phụ gia bún tươi được biên soạn bởi Nguyễn Đức Duy Anh, chuẩn hóa toàn diện theo Văn bản hợp nhất 09 năm 2024 của Bộ Y tế và Thông tư 24. Nền tảng phân định chính xác bún tươi thuộc nhóm thực phẩm không sáu chấm bốn chấm ba, sản phẩm dạng sợi đã làm chín, giúp các cơ sở sản xuất và kỹ sư R&D tự tin áp dụng công nghệ bảo quản an toàn, hợp chuẩn pháp lý."
  },
  {
    idx: 2,
    title: "01 | Căn Cứ Pháp Lý, 4 Hóa Chất Cấm & Đính Chính 7 Sai Lầm Kỹ Thuật",
    narration: "Tính năng một: Căn cứ pháp lý, cảnh báo hóa chất cấm và đính chính bảy sai lầm kỹ thuật. Hệ thống nêu rõ bốn hóa chất cấm tuyệt đối: Hàn the, Formol, Tinopal và Javel. Đồng thời đính chính các quan niệm sai lệch phổ biến như: nhầm mã nhóm bột, cố hòa tan acid sorbic vào nước lạnh gây vón cục, ngộ nhận STPP tạo mạng gluten trong bột gạo, hay lạm dụng quá nhiều tinh bột biến tính làm bún bở nát khi chan nước lèo nóng."
  },
  {
    idx: 3,
    title: "02 | Danh Mục Phụ Gia Tiêu Chuẩn & Giới Hạn ML Bộ Y Tế",
    narration: "Tính năng hai: Danh mục phụ gia tiêu chuẩn và giới hạn sử dụng tối đa. Tra cứu tức thì các phụ gia được phép dùng cho bún tươi: hệ Sorbate INS 200, 202 với mức giới hạn hai nghìn miligram trên một kilogam bún; hệ Polyphosphat STPP giữ nước và tăng dai ở mức hai nghìn năm trăm miligram; cùng các phụ gia GMP an toàn như Acid Lactic INS 270, Tinh bột biến tính và Gum liên kết cấu trúc."
  },
  {
    idx: 4,
    title: "03 | Quy Trình Công Nghệ 4 Bước: Gia Nhiệt & Xử Lý Bề Mặt",
    narration: "Tính năng ba: Sơ đồ quy trình công nghệ bốn bước kết hợp hai phương pháp bổ sung phụ gia. Bước một: phối trộn phụ gia cấu trúc và hạ pH khối bột xuống năm chấm không đến năm chấm năm. Bước hai: đùn sợi và luộc chín một trăm độ C để hồ hóa tinh bột. Bước ba: xử lý bề mặt bằng dung dịch Kali Sorbat hai phần trăm sau khi vớt ráo. Và bước bốn: làm nguội nhanh, đóng gói kín và bảo quản mát bốn đến tám độ C để đạt hạn dùng tối ưu."
  },
  {
    idx: 5,
    title: "04 | Máy Tính Mẻ Bột Thông Minh & Tối Ưu Tỷ Lệ Thực Chiến",
    narration: "Tính năng bốn: Máy tính mẻ bột thông minh. Chỉ cần nhập khối lượng bột gạo mẻ sản xuất, hệ thống tự động tính toán chính xác số gram Kali Sorbat, STPP, Acid Lactic và Tinh bột biến tính cần phối trộn. Giúp xưởng sản xuất loại bỏ hoàn toàn việc ước lượng thủ công, kiểm soát chi phí nguyên liệu và đảm bảo hàm lượng tồn dư luôn trong ngưỡng an toàn cho phép."
  },
  {
    idx: 6,
    title: "05 | Xử Lý Sự Cố Dây Chuyền & Cẩm Nang Kỹ Thuật Toàn Diện",
    narration: "Tính năng năm: Xử lý sự cố thực chiến và tải cẩm nang chuyên sâu. Hướng dẫn khắc phục triệt để các sự cố như bún nhanh chua, sợi bở nát, đốm trắng do sorbic không tan, sợi dính bết hay rỉ nước khi bảo quản. Người dùng có thể đọc trực tuyến hoặc tải ngay cẩm nang kỹ thuật định dạng PDF hai trăm chín mươi kilobyte để lưu trữ và tập huấn kỹ thuật viên dây chuyền sản xuất."
  }
];

async function generate() {
  const targetDir = path.join("public", "apps", "bao-quan-bun-tuoi");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log("Generating 6 warm voiceovers (vi-VN-NamMinhNeural) for Bao Quan Bun Tuoi...");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Scene ${scene.idx}/6] Generating audio: "${scene.title}"...`);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {});

        const { audioStream } = tts.toStream(scene.narration);
        const chunks = [];

        await new Promise((resolve, reject) => {
          audioStream.on("data", chunk => chunks.push(chunk));
          audioStream.on("end", resolve);
          audioStream.on("error", err => {
            if (chunks.length > 0) resolve();
            else reject(err);
          });
        });

        const buf = Buffer.concat(chunks);
        if (buf.length > 5000) {
          fs.writeFileSync(targetFile, buf);
          console.log(`✓ [Scene ${scene.idx}] Saved ${targetFile} (${buf.length} bytes)`);
          success = true;
          break;
        } else {
          throw new Error(`Buffer too small: ${buf.length} bytes`);
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

  console.log("\nAll 6 voiceovers for Bao Quan Bun Tuoi generated successfully!");
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
