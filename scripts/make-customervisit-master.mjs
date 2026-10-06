import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const appDir = path.join(process.cwd(), 'public', 'apps', 'customer-visit');
const docDir = 'C:\\Nam 2026\\Web app\\DANH SACH CAC APP WEB DA THUC HIÊN\\Hinh ảnh minh hoa cho ung dung\\Customer visit';
const listFile = path.join(appDir, 'list.txt');

const lines = [];
for (let i = 1; i <= 10; i++) {
  lines.push(`file '${path.join(appDir, `audio-scene-${i}.mp3`).replace(/\\/g, '/')}'`);
}
fs.writeFileSync(listFile, lines.join('\n'));

const master = path.join(appDir, 'audio.mp3');
execSync(`"${ffmpegExe}" -y -f concat -safe 0 -i "${listFile}" -c:a libmp3lame -b:a 128k -ar 48000 "${master}"`, { stdio: 'inherit' });
fs.unlinkSync(listFile);

fs.copyFileSync(master, path.join(docDir, 'audio.mp3'));
fs.copyFileSync(path.join(appDir, 'timestamps.json'), path.join(docDir, 'timestamps.json'));
console.log('✓ Created master audio.mp3 for customer-visit');
