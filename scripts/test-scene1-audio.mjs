import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function testScene1() {
  const text = "Bún tươi là món ăn truyền thống quen thuộc của người Việt, nhưng cũng là một trong những sản phẩm dễ chua, nhớt và hư hỏng nhanh nhất do độ ẩm cao. Ứng dụng web Cẩm nang kỹ thuật sử dụng phụ gia bún tươi được biên soạn bởi Nguyễn Đức Duy Anh, chuẩn hóa toàn diện theo Văn bản hợp nhất 09 năm 2024 của Bộ Y tế và Thông tư 24. Nền tảng phân định chính xác bún tươi thuộc nhóm thực phẩm 06.4.3, sản phẩm dạng sợi đã làm chín, giúp các cơ sở sản xuất và kỹ sư R&D tự tin áp dụng công nghệ bảo quản an toàn, hợp chuẩn pháp lý.";

  console.log('Testing text length:', text.length);
  const tts = new MsEdgeTTS();
  await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {});
  
  const { audioStream } = tts.toStream(text);
  const chunks = [];
  
  await new Promise((resolve, reject) => {
    audioStream.on('data', chunk => chunks.push(chunk));
    audioStream.on('end', () => {
      console.log('Stream ended! Chunks:', chunks.length);
      resolve();
    });
    audioStream.on('error', err => {
      console.log('Error caught:', err.message, 'chunks:', chunks.length);
      if (chunks.length > 0) resolve();
      else reject(err);
    });
  });

  const buf = Buffer.concat(chunks);
  console.log('Result buf size:', buf.length);
  fs.writeFileSync('public/apps/bao-quan-bun-tuoi/audio-scene-1.mp3', buf);
  console.log('Saved audio-scene-1.mp3 successfully!');
}

testScene1().catch(e => console.error('Error:', e));
