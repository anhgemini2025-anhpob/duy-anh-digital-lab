import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function test() {
  const tts = new MsEdgeTTS();
  console.log('Setting metadata with {}...');
  await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {});
  console.log('Metadata set! Calling toStream...');
  
  const { audioStream } = tts.toStream('Chào Hoài My! Rất nhiều bạn bè quốc tế tâm sự với mình rằng, họ học tiếng Việt cả năm trời nhưng bước ra đường vẫn không dám mở lời.');
  const chunks = [];
  
  await new Promise((resolve, reject) => {
    audioStream.on('data', chunk => {
      chunks.push(chunk);
    });
    audioStream.on('end', () => {
      console.log('Stream ended naturally!');
      resolve();
    });
    audioStream.on('error', (err) => {
      console.log('Stream emitted error:', err.message, 'chunks received so far:', chunks.length);
      if (chunks.length > 0) {
        resolve();
      } else {
        reject(err);
      }
    });
  });

  const buf = Buffer.concat(chunks);
  console.log('Buffer total size:', buf.length);
  fs.writeFileSync('test_out.mp3', buf);
  console.log('Saved test_out.mp3!');
  fs.unlinkSync('test_out.mp3');
  console.log('Success!');
  process.exit(0);
}

test().catch(err => {
  console.error('Test catch:', err);
  process.exit(1);
});
