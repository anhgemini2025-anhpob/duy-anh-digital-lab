import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function main() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  console.log("Synthesizing audio...");
  
  const text = "Chào bạn! Đây là hệ thống ứng dụng web chuyên sâu của Duy Anh Lab. Sau đây là video giới thiệu các chức năng cốt lõi.";
  const { audioStream } = tts.toStream(text, { rate: "+10%", pitch: "-5Hz" });
  const target = "./public/test-voice.mp3";
  const writable = fs.createWriteStream(target);

  await new Promise((resolve, reject) => {
    audioStream.pipe(writable);
    writable.on("finish", () => {
      console.log("Audio successfully written to", target);
      resolve();
    });
    writable.on("error", reject);
    audioStream.on("error", reject);
  });

  const stats = fs.statSync(target);
  console.log("File size:", stats.size, "bytes");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
