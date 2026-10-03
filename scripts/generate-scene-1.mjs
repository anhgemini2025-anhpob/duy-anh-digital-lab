import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const targetPath = path.join("public", "apps", "nuoi-duong-be-0-60", "audio-scene-1.mp3");
const rawText = "Ứng dụng Cha Mẹ 0 đến 60 được thiết kế với 10 tính năng cốt lõi nhằm đồng hành cùng gia đình Việt Nam trong việc chăm sóc và theo dõi sự phát triển của trẻ từ 0 đến 60 tháng tuổi. Chức năng 1: Màn hình trung tâm Hôm nay và Ghi chép nhanh. Giải đáp câu hỏi Hôm nay con cần gì bằng cách hiển thị ba việc quan trọng trong ngày, trạng thái sinh hoạt ăn, ngủ, vệ sinh và công cụ ghi nhận nhanh một chạm hoặc nhập bằng giọng nói.";

const cleanText = rawText
  .replace(/&/g, " và ")
  .replace(/</g, " ")
  .replace(/>/g, " ")
  .replace(/["']/g, "")
  .replace(/\s+/g, " ")
  .trim();

console.log(`Generating updated scene 1 with intro: "${cleanText.slice(0, 80)}..."`);

for (let attempt = 1; attempt <= 5; attempt++) {
  let tts = null;
  try {
    tts = new MsEdgeTTS();
    await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(cleanText, { rate: "+10%", pitch: "-5Hz" });
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
      console.log(`SUCCESS: ${targetPath} (${fs.statSync(targetPath).size} bytes)`);
      try { tts.close(); } catch {}
      process.exit(0);
    }
  } catch (err) {
    console.warn(`Attempt ${attempt} failed: ${err.message}`);
    if (tts) { try { tts.close(); } catch {} }
    await new Promise((r) => setTimeout(r, 1200 * attempt));
  }
}
process.exit(1);
