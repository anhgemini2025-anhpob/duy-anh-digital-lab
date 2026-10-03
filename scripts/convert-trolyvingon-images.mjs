import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Tro ly Vi ngon');
const destDir = path.join(process.cwd(), 'public', 'apps', 'tro-ly-vi-ngon');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_trolyvingon_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'anh 1.png', idx: 1, name: 'feature_01_gioi_thieu_tong_quan.jpg', isCover: true },
  { src: 'anh 2.png', idx: 2, name: 'feature_02_tro_ly_xu_ly_su_co_rd.jpg', isCover: false },
  { src: 'anh 3.png', idx: 3, name: 'feature_03_ban_do_thay_the_hvp.jpg', isCover: false },
  { src: 'anh 4.png', idx: 4, name: 'feature_04_ban_do_cam_quan_truc_quan.jpg', isCover: false },
  { src: 'anh 5.png', idx: 5, name: 'feature_05_kiem_tra_tuong_thich_nguyen_lieu.jpg', isCover: false },
  { src: 'anh 6-2.png', idx: 6, name: 'feature_06_recipe_sandbox_thu_nghiem.jpg', isCover: false },
  { src: 'anh 7.png', idx: 7, name: 'feature_07_kho_tinh_huong_thuc_te.jpg', isCover: false },
  { src: 'anh 8.png', idx: 8, name: 'feature_08_tinh_toan_hieu_qua_cong_thuc.jpg', isCover: false },
  { src: 'anh 9.png', idx: 9, name: 'feature_09_tra_cuu_san_pham_giai_phap.jpg', isCover: false },
  { src: 'anh 10.png', idx: 10, name: 'feature_10_gio_mau_thong_minh.jpg', isCover: false },
  { src: 'anh 11.png', idx: 11, name: 'feature_11_mot_nen_tang_da_dang_bai_toan.jpg', isCover: false },
  { src: 'anh 12.png', idx: 12, name: 'feature_12_loi_ket_thau_hieu_huong_vi.jpg', isCover: false }
];

console.log('Copying files to ASCII temp directory...');
for (const item of filesToConvert) {
  const fullSrc = path.join(srcBase, item.src);
  const tempSrc = path.join(tempWorkDir, `${item.idx}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

// Convert via pure ASCII PowerShell script in temp directory
const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..12 | ForEach-Object {
    $src = "C:\\temp_trolyvingon_convert\\$_.png"
    $dest = "C:\\temp_trolyvingon_convert\\$_.jpg"
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

console.log('Moving converted images into public/apps/tro-ly-vi-ngon/...');
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

console.log('\nAll 12 images converted and placed into public/apps/tro-ly-vi-ngon successfully!');
