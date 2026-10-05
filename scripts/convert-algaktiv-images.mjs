import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Algaktiv');
const destDir = path.join(process.cwd(), 'public', 'apps', 'algaktiv-advisor');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_algaktiv_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'anh 1.png', idx: 1, name: 'feature_01_tong_quan_blue_biotech.jpg', isCover: true },
  { src: 'anh 2.png', idx: 2, name: 'feature_02_4_nhom_vi_tao_nen_tang.jpg', isCover: false },
  { src: 'anh 3.png', idx: 3, name: 'feature_03_thu_vien_10_hoat_chat_lam_sang.jpg', isCover: false },
  { src: 'anh 4.png', idx: 4, name: 'feature_04_formulation_decision_wizard.jpg', isCover: false },
  { src: 'anh 5.png', idx: 5, name: 'feature_05_so_sanh_cong_nghe_truc_quan.jpg', isCover: false },
  { src: 'anh 6.png', idx: 6, name: 'feature_06_trai_nghiem_mobile_first_claims.jpg', isCover: false }
];

console.log('Copying Algaktiv files to ASCII temp directory...');
for (const item of filesToConvert) {
  const fullSrc = path.join(srcBase, item.src);
  const tempSrc = path.join(tempWorkDir, `${item.idx}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..6 | ForEach-Object {
    $src = "C:\\temp_algaktiv_convert\\$_.png"
    $dest = "C:\\temp_algaktiv_convert\\$_.jpg"
    $bmp = [System.Drawing.Bitmap]::FromFile($src)
    $bmp.Save($dest, $jpegEncoder, $encoderParams)
    $bmp.Dispose()
    Write-Host "Converted $_.png to $_.jpg"
}
`;

const psScriptPath = path.join(tempWorkDir, 'convert.ps1');
fs.writeFileSync(psScriptPath, psScriptContent, 'ascii');

console.log('Running conversion in temp dir...');
execSync(`powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`, { stdio: 'inherit' });

console.log('Moving converted images into public/apps/algaktiv-advisor/...');
for (const item of filesToConvert) {
  const tempJpg = path.join(tempWorkDir, `${item.idx}.jpg`);
  
  // 1. Save feature image
  const targetFeature = path.join(destDir, item.name);
  fs.copyFileSync(tempJpg, targetFeature);
  
  // 2. Save screen-X.jpg
  const targetScreen = path.join(destDir, `screen-${item.idx}.jpg`);
  fs.copyFileSync(tempJpg, targetScreen);
  
  // 3. Save cover and real-cover if cover
  if (item.isCover) {
    fs.copyFileSync(tempJpg, path.join(destDir, 'cover.jpg'));
    fs.copyFileSync(tempJpg, path.join(destDir, 'real-cover.jpg'));
    console.log(`Saved cover.jpg and real-cover.jpg from scene ${item.idx}`);
  }
  
  // 4. Save real-screen-1, 2, 3 for modal carousel
  if (item.idx === 2) fs.copyFileSync(tempJpg, path.join(destDir, 'real-screen-1.jpg'));
  if (item.idx === 3) fs.copyFileSync(tempJpg, path.join(destDir, 'real-screen-2.jpg'));
  if (item.idx === 4) fs.copyFileSync(tempJpg, path.join(destDir, 'real-screen-3.jpg'));

  console.log(`✓ Processed scene ${item.idx}: ${item.name} (${(fs.statSync(tempJpg).size / 1024).toFixed(1)} KB)`);
}

// Cleanup temp directory
try {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
} catch (e) {}

console.log('\nAll 6 Algaktiv Advisor images converted and placed into public/apps/algaktiv-advisor successfully!');
