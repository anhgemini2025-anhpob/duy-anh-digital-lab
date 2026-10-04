import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Vanderbilt');
const destDir = path.join(process.cwd(), 'public', 'apps', 'vanderbilt-advisor');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_vanderbilt_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'anh 0.png', idx: 1, name: 'feature_01_tong_quan.jpg', isCover: true },
  { src: 'anh 1.png', idx: 2, name: 'feature_02_tra_cuu_tieng_viet.jpg', isCover: false },
  { src: 'anh 2.png', idx: 3, name: 'feature_03_tim_dung_san_pham.jpg', isCover: false },
  { src: 'anh 3.png', idx: 4, name: 'feature_04_huong_xu_ly_van_de.jpg', isCover: false },
  { src: 'anh 4.png', idx: 5, name: 'feature_05_mo_phong_sop.jpg', isCover: false },
  { src: 'anh 5.png', idx: 6, name: 'feature_06_tinh_khoi_luong_me.jpg', isCover: false },
  { src: 'anh 6.png', idx: 7, name: 'feature_07_200_cong_thuc_ung_dung.jpg', isCover: false },
  { src: 'anh 7.png', idx: 8, name: 'feature_08_tra_cuu_52_san_pham.jpg', isCover: false },
  { src: 'anh 8.png', idx: 9, name: 'feature_09_chung_nhan_phap_ly.jpg', isCover: false },
  { src: 'anh 9.png', idx: 10, name: 'feature_10_tao_phieu_yeu_cau_pdf.jpg', isCover: false },
  { src: 'anh 10.png', idx: 11, name: 'feature_11_he_sinh_thai_khoang_chat.jpg', isCover: false },
  { src: 'anh 11.png', idx: 12, name: 'feature_12_ket_noi_lab_toan_dien.jpg', isCover: false },
  { src: 'anh 12.png', idx: 13, name: 'feature_13_loi_ket_thong_minh.jpg', isCover: false }
];

console.log('Copying Vanderbilt files to ASCII temp directory...');
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

1..13 | ForEach-Object {
    $src = "C:\\temp_vanderbilt_convert\\$_.png"
    $dest = "C:\\temp_vanderbilt_convert\\$_.jpg"
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

console.log('Moving converted images into public/apps/vanderbilt-advisor/...');
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

console.log('\nAll 13 Vanderbilt Advisor images converted and placed into public/apps/vanderbilt-advisor successfully!');
