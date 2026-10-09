const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'Hinh ảnh minh hoa cho ung dung', 'Tro ly giam doc ngan hang 247');
const vidName = 'Tro_ly_Giam_doc_Ngan_hang_24-7_v2.mp4';
const srcVid = path.join(srcDir, vidName);
const destDir = path.join(__dirname, '..', 'public', 'apps', 'trolybank');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const destVid = path.join(destDir, 'trolybank.mp4');
console.log('Copying video to', destVid);
fs.copyFileSync(srcVid, destVid);

// Inspect metadata
try {
  const result = execSync(`"${ffmpeg}" -i "${destVid}" 2>&1`).toString();
  console.log('Video Info:\n', result);
} catch (e) {
  console.log('Exec result:\n', e.stdout ? e.stdout.toString() : e.message);
}

// Also extract a poster image at 2s
const posterPath = path.join(destDir, 'poster.jpg');
try {
  execSync(`"${ffmpeg}" -ss 00:00:03 -i "${destVid}" -vframes 1 -q:v 2 "${posterPath}" -y`);
  console.log('Extracted poster image to', posterPath);
} catch (e) {
  console.error('Poster extraction error:', e.message);
}
