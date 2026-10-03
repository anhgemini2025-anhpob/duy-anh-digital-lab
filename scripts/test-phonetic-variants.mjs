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
  // Option A: Raw English text directly with full English terms in parentheses
  const textA = 'Chức năng 1: Màn hình trung tâm Hôm nay và Ghi chép nhanh, Home Dashboard và Smart Logging. Giải đáp câu hỏi Hôm nay con cần gì bằng cách hiển thị ba việc quan trọng trong ngày, trạng thái sinh hoạt ăn, ngủ, vệ sinh và công cụ ghi nhận nhanh một chạm hoặc nhập bằng giọng nói.';
  await synth(textA, "./public/test_opt_a.mp3");

  // Option B: Testing abbreviations pronunciation
  // SOS: "S.O.S" vs "Es Oh Es" vs "SOS"
  const testSOS_1 = 'Nút khẩn cấp SOS ngoại tuyến, chế độ floating SOS luôn hiển thị.';
  await synth(testSOS_1, "./public/test_sos_raw.mp3");

  const testSOS_2 = 'Nút khẩn cấp S.O.S ngoại tuyến, chế độ floating S.O.S luôn hiển thị.';
  await synth(testSOS_2, "./public/test_sos_dots.mp3");

  const testSOS_3 = 'Nút khẩn cấp Es-Oh-Es ngoại tuyến, chế độ floating Es-Oh-Es luôn hiển thị.';
  await synth(testSOS_3, "./public/test_sos_phonetic.mp3");

  // PDF & AI & BLW
  const testPDF_1 = 'Xuất file PDF một chạm cùng trợ lý AI và phương pháp BLW.';
  await synth(testPDF_1, "./public/test_pdf_raw.mp3");

  const testPDF_2 = 'Xuất file P.D.F một chạm cùng trợ lý A.I và phương pháp B.L.W.';
  await synth(testPDF_2, "./public/test_pdf_dots.mp3");

  const testPDF_3 = 'Xuất file Pi-Đi-Ép một chạm cùng trợ lý Ây-Ai và phương pháp Bi-En-Đắp-liu.';
  await synth(testPDF_3, "./public/test_pdf_phonetic.mp3");

  console.log("All test variations generated!");
  process.exit(0);
}

run().catch(console.error);
