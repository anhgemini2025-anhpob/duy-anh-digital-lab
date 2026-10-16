import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function testUtf8() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {});
  const { audioStream } = tts.toStream('Quy trình kỹ thuật bảo quản bún tươi theo tiêu chuẩn Bộ Y tế.');
  const chunks = [];
  await new Promise((resolve, reject) => {
    audioStream.on('data', chunk => chunks.push(chunk));
    audioStream.on('end', resolve);
    audioStream.on('error', err => chunks.length > 0 ? resolve() : reject(err));
  });
  console.log('Success! Chunks size:', Buffer.concat(chunks).length);
}

testUtf8().catch(e => console.error('Error:', e));
