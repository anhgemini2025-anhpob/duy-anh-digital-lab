import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function synth(text, filename) {
  for (let attempt = 1; attempt <= 4; attempt++) {
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
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

async function run() {
  const tests = [
    {
      name: "scene1",
      text: "Chức năng 1: Màn hình trung tâm Hôm nay và Ghi chép nhanh, Home Dashboard and Smart Logging. Hiển thị ba việc quan trọng trong ngày."
    },
    {
      name: "scene5",
      text: "Chức năng 5: Nút khẩn cấp Es Oh Es ngoại tuyến, Offline Emergency Es Oh Es. Nút floating Es Oh Es luôn hiển thị để truy cập tức thì các hướng dẫn sơ cứu khẩn cấp."
    },
    {
      name: "scene7",
      text: "Chức năng 7: Ví hồ sơ gia đình kỹ thuật số, Digital Family Vault and Document Scanner. Quét, lưu trữ và bảo mật thẻ Bảo hiểm y tế, phiếu tiêm, đơn thuốc, hỗ trợ xuất file Pi-Đi-Ép một chạm."
    },
    {
      name: "scene8",
      text: "Chức năng 8: Trợ lý Ây-Ai đồng hành cùng cha mẹ, AI Parenting Companion. Trả lời các thắc mắc chăm sóc con."
    }
  ];

  for (const t of tests) {
    await synth(t.text, `./public/test_check_${t.name}.mp3`);
  }
  console.log("Check samples generated!");
  process.exit(0);
}

run().catch(console.error);
