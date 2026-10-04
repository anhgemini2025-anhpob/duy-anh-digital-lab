import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'SCM  UHT');
const destDir = path.join(process.cwd(), 'public', 'apps', 'uth-scm-navigator');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_scm_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'anh 0.png', idx: 1, name: 'feature_01_gioi_thieu_tong_quan.jpg', isCover: true },
  { src: 'anh 1.png', idx: 2, name: 'feature_02_dinh_huong_hoc_tap.jpg', isCover: false },
  { src: 'anh 2.png', idx: 3, name: 'feature_03_ho_so_hoc_tap_ca_nhan.jpg', isCover: false },
  { src: 'anh 3.png', idx: 4, name: 'feature_04_ban_do_kien_thuc_4_nam.jpg', isCover: false },
  { src: 'anh 4.png', idx: 5, name: 'feature_05_hoc_de_hieu_bai.jpg', isCover: false },
  { src: 'anh 5.png', idx: 6, name: 'feature_06_tro_ly_hoc_tap_ai.jpg', isCover: false },
  { src: 'anh 6.png', idx: 7, name: 'feature_07_cong_cu_tinh_toan_thuc_hanh.jpg', isCover: false },
  { src: 'anh 7.png', idx: 8, name: 'feature_08_chuan_bi_kiem_tra_hoc_bong.jpg', isCover: false },
  { src: 'anh 8.png', idx: 9, name: 'feature_09_hoc_nghiep_vu_thuc_te.jpg', isCover: false },
  { src: 'anh 9.png', idx: 10, name: 'feature_10_lam_quen_cong_nghe_logistics.jpg', isCover: false },
  { src: 'anh 10.png', idx: 11, name: 'feature_11_chuan_bi_di_thuc_tap.jpg', isCover: false },
  { src: 'anh 11.png', idx: 12, name: 'feature_12_xay_dung_nang_luc_di_lam.jpg', isCover: false },
  { src: 'anh 12.png', idx: 13, name: 'feature_13_tot_nghiep_rang_ro.jpg', isCover: false },
  { src: 'anh 13.png', idx: 14, name: 'feature_14_loi_ket_chinh_phuc_nghe_nghiep.jpg', isCover: false }
];

console.log('Copying SCM files to ASCII temp directory...');
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

1..14 | ForEach-Object {
    $src = "C:\\temp_scm_convert\\$_.png"
    $dest = "C:\\temp_scm_convert\\$_.jpg"
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

console.log('Moving converted images into public/apps/uth-scm-navigator/...');
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

console.log('\nAll 14 SCM UTH images converted and placed into public/apps/uth-scm-navigator successfully!');
