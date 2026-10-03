import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function gen(text, file) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, { rate: "+10%", pitch: "-2Hz", volume: "+15%" });
      const tempFile = file + ".tmp";
      const writable = fs.createWriteStream(tempFile);
      await new Promise((resolve, reject) => {
        audioStream.pipe(writable);
        writable.on("finish", resolve);
        writable.on("error", reject);
        audioStream.on("error", reject);
      });
      if (fs.existsSync(tempFile) && fs.statSync(tempFile).size > 10000) {
        fs.renameSync(tempFile, file);
        console.log(`Generated ${file}, size:`, fs.statSync(file).size);
        try { tts.close(); } catch {}
        return;
      }
    } catch (e) {
      console.log(`Attempt ${attempt} failed: ${e.message}`);
      if (tts) { try { tts.close(); } catch {} }
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

async function test() {
  await gen("Học phần UTH SCM về supply chain và bán hàng B2B trên máy POS theo chuẩn FEFO và R&D.", "test_raw.mp3");
  await gen("Học phần U Tê Hát Ét Xi Em về súp-play chen và bán hàng Bi tu Bi trên máy Pót theo chuẩn Phê Phô và R và D.", "test_phonetic.mp3");
}

test().catch(console.error);
