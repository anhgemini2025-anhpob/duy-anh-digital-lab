import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function run() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const tests = [
    { text: 'Nút khẩn cấp <say-as interpret-as="characters">SOS</say-as> ngoại tuyến', file: 'public/test_sayas_sos.mp3' },
    { text: 'Màn hình Dashboard Hôm nay', file: 'public/test_sayas_dash.mp3' },
    { text: 'Nút khẩn cấp Es Oh Es ngoại tuyến', file: 'public/test_es_oh_es.mp3' },
    { text: 'Nút khẩn cấp S.O.S ngoại tuyến', file: 'public/test_dots_sos.mp3' }
  ];

  for (const item of tests) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const { audioStream } = tts.toStream(item.text, { rate: "+8%", pitch: "-4Hz" });
        const writable = fs.createWriteStream(item.file);
        await new Promise((res, rej) => {
          audioStream.pipe(writable);
          writable.on("finish", res);
          writable.on("error", rej);
          audioStream.on("error", rej);
        });
        console.log(`Success: ${item.file} (${fs.statSync(item.file).size} bytes)`);
        break;
      } catch (e) {
        console.log(`Attempt ${attempt} for ${item.file} failed:`, e.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }
  try { tts.close(); } catch {}
  process.exit(0);
}

run().catch(console.error);
