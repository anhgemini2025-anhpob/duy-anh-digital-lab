import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function synth(text, filename) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, { rate: "+8%", pitch: "-4Hz" });
      const tempFile = filename + ".tmp";
      const writable = fs.createWriteStream(tempFile);
      await new Promise((resolve, reject) => {
        audioStream.pipe(writable);
        writable.on("finish", resolve);
        writable.on("error", reject);
        audioStream.on("error", reject);
      });
      if (fs.existsSync(tempFile) && fs.statSync(tempFile).size > 5000) {
        if (fs.existsSync(filename)) fs.unlinkSync(filename);
        fs.renameSync(tempFile, filename);
        console.log(`Saved ${filename}: ${fs.statSync(filename).size} bytes`);
        try { tts.close(); } catch {}
        return;
      }
    } catch (err) {
      if (tts) { try { tts.close(); } catch {} }
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
}

async function run() {
  await synth("Nút khẩn cấp SOS ngoại tuyến, màn hình Dashboard, trí tuệ AI và tài liệu PDF theo chuẩn BLW.", "./public/test_compare_1.mp3");
  await synth("Nút khẩn cấp S.O.S ngoại tuyến, màn hình Dashboard, trí tuệ A.I và tài liệu P.D.F theo chuẩn B.L.W.", "./public/test_compare_2.mp3");
  console.log("Finished comparison!");
  process.exit(0);
}

run().catch(console.error);
