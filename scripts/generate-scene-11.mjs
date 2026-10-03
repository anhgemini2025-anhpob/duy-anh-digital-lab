import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const targetPath = path.join("public", "apps", "nuoi-duong-be-0-60", "audio-scene-11.mp3");
const rawText = "Từ một giấc ngủ, một bữa ăn, một bước chân đầu tiên, đến những khoảnh khắc rất nhỏ mà sau này nhìn lại, cha mẹ sẽ thấy vô cùng đáng nhớ. Cùng con lớn lên từng ngày, và cùng nhau lưu giữ hành trình không đến sáu mươi tháng thật trọn vẹn.";

const cleanText = rawText
  .replace(/&/g, " và ")
  .replace(/</g, " ")
  .replace(/>/g, " ")
  .replace(/["']/g, "")
  .replace(/\s+/g, " ")
  .trim();

console.log(`Generating final scene 11: "${cleanText.slice(0, 80)}..."`);

for (let attempt = 1; attempt <= 5; attempt++) {
  let tts = null;
  try {
    tts = new MsEdgeTTS();
    await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(cleanText, { rate: "+8%", pitch: "-4Hz" });
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
