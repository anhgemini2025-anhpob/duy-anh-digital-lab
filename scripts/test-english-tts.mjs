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
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (tts) { try { tts.close(); } catch {} }
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
}

async function run() {
  // Test 1: Raw English
  await synth("Tính năng SOS và Dashboard xuất file PDF theo phương pháp BLW cùng trí tuệ AI.", "./public/test_raw_en.mp3");

  // Test 2: Spaced letters for acronyms
  await synth("Tính năng S O S và Dashboard xuất file P D F theo phương pháp B L W cùng trí tuệ A I.", "./public/test_spaced_en.mp3");

  // Test 3: Standard English Phonetics for Vietnamese TTS
  // SOS = Es-O-Es, Dashboard = Đét-boóc (or Dashboard), PDF = Pi-Đi-Ép, BLW = Bi-En-Đắp-liu, AI = Ây-Ai
  await synth("Tính năng Es O Es và Đét-boóc xuất file Pi-Đi-Ép theo phương pháp Bi-En-Đắp-liu cùng trí tuệ Ây-Ai.", "./public/test_phonetic_en.mp3");

  console.log("Done testing!");
  process.exit(0);
}

run().catch(console.error);
