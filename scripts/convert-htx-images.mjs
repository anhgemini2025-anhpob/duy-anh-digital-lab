import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Hop tac xa');
const destDir = path.join(process.cwd(), 'public', 'apps', 'htx-rau-cu');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_htx_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'Hinh 0.png', idx: 1, name: 'feature_01_quan_ly_so_tay_that_thoat.jpg' },
  { src: 'Hinh 1.png', idx: 2, name: 'feature_02_canh_dong_so_tren_dien_thoai.jpg', isCover: true },
  { src: 'hinh 2.png', idx: 3, name: 'feature_03_quan_ly_don_hang_xuat_kho.jpg' },
  { src: 'Hinh 3.png', idx: 4, name: 'feature_04_kiem_soat_rau_hu_hao_hut.jpg' },
  { src: 'Hinh 4.png', idx: 5, name: 'feature_05_canh_bao_lo_can_han_xuat_truoc.jpg' },
  { src: 'Hinh 5.png', idx: 6, name: 'feature_06_du_bao_san_luong_cach_ly_thuoc.jpg' },
  { src: 'Hinh 6.png', idx: 7, name: 'feature_07_nhat_ky_dong_ruong_bang_giong_noi.jpg' },
  { src: 'Hinh 7.png', idx: 8, name: 'feature_08_tien_rau_xa_vien_minh_bach.jpg' },
  { src: 'Hinh 8.png', idx: 9, name: 'feature_09_so_quy_htx_doi_chieu_tien_hang.jpg' },
  { src: 'Hinh 9.png', idx: 10, name: 'feature_10_xuat_bao_cao_excel_tuc_thi.jpg' },
  { src: 'hinh 10.png', idx: 11, name: 'feature_11_hoat_dong_offline_khong_can_mang.jpg' },
  { src: 'Hinh 11.png', idx: 12, name: 'feature_12_phan_quyen_4_vai_tro_ro_rang.jpg' },
  { src: 'Hinh 12.png', idx: 13, name: 'feature_13_man_hinh_viec_hom_nay_chu_dong.jpg' },
  { src: 'Hinh 13.png', idx: 14, name: 'feature_14_ket_noi_toan_dien_tu_ruong_toi_kho.jpg' },
  { src: 'Hinh 14.png', idx: 15, name: 'feature_15_nong_nghiep_so_ben_vung.jpg' }
];

console.log('Copying HTX files to ASCII temp directory...');
for (const item of filesToConvert) {
  const fullSrc = path.join(srcBase, item.src);
  if (!fs.existsSync(fullSrc)) {
    throw new Error(`File not found: ${fullSrc}`);
  }
  const tempSrc = path.join(tempWorkDir, `${item.idx}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..15 | ForEach-Object {
    $src = "C:\\temp_htx_convert\\$_.png"
    $dest = "C:\\temp_htx_convert\\$_.jpg"
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

console.log('Moving converted images into public/apps/htx-rau-cu/...');
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

console.log('\nAll 15 HTX images converted and placed into public/apps/htx-rau-cu successfully!');
