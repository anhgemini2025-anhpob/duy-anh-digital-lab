import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync(process.cwd());
const hinhDir = path.join(process.cwd(), dirs.find(d => d.startsWith('Hinh')));
const erpSubDir = fs.readdirSync(hinhDir).find(d => d.includes('ERP Thuy'));
const srcBase = path.join(hinhDir, erpSubDir);
const destDir = path.join(process.cwd(), 'public', 'apps', 'vet-aqua-erp');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const tempWorkDir = 'C:\\temp_erp_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const filesToConvert = [
  { src: 'anh 0.png', idx: 1, name: 'feature_01_gioi_thieu_tong_quan.jpg', isCover: true },
  { src: 'anh 1.png', idx: 2, name: 'feature_02_hang_can_date_xuat_truoc.jpg' },
  { src: 'anh 2.png', idx: 3, name: 'feature_03_chan_ban_hang_het_han.jpg' },
  { src: 'anh 3.png', idx: 4, name: 'feature_04_thanh_toan_vietqr_nhanh_chong.jpg' },
  { src: 'anh 5-1.png', idx: 5, name: 'feature_05_mat_mang_van_ban_hang_offline.jpg' },
  { src: 'anh 6.png', idx: 6, name: 'feature_06_tro_ly_ai_phac_do_dieu_tri.jpg' },
  { src: 'anh 4.png', idx: 7, name: 'feature_07_canh_bao_tuong_ky_thuoc.jpg' },
  { src: 'anh 8.png', idx: 8, name: 'feature_08_kiem_soat_han_muc_cong_no.jpg' },
  { src: 'anh 9.png', idx: 9, name: 'feature_09_phan_tich_rui_ro_cong_no.jpg' },
  { src: 'anh 10.png', idx: 10, name: 'feature_10_nhac_no_dung_luc_thu_hoach.jpg' },
  { src: 'anh 11.png', idx: 11, name: 'feature_11_biet_ro_loi_lo_moi_ngay.jpg' },
  { src: 'anh 12.png', idx: 12, name: 'feature_12_xuat_excel_so_sach_thong_tu_88.jpg' },
  { src: 'anh 13.png', idx: 13, name: 'feature_13_canh_bao_hoat_chat_va_giay_phep.jpg' },
  { src: 'anh 14.png', idx: 14, name: 'feature_14_quan_ly_nhiet_do_vac_xin.jpg' },
  { src: 'anh 15.png', idx: 15, name: 'feature_15_chup_hoa_don_nhap_kho_ai_ocr.jpg' },
  { src: 'anh 16.png', idx: 16, name: 'feature_16_hoa_hong_nhan_vien_kho_kien_thuc.jpg' },
  { src: 'anh 17.png', idx: 17, name: 'feature_17_quan_tri_thau_suot_toan_dien.jpg' },
  { src: 'anh 17-1.png', idx: 18, name: 'feature_18_nang_tam_kinh_doanh_thinh_vuong.jpg' }
];

console.log('Copying ERP files to ASCII temp directory...');
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

1..18 | ForEach-Object {
    $src = "C:\\temp_erp_convert\\$_.png"
    $dest = "C:\\temp_erp_convert\\$_.jpg"
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

console.log('Moving converted images into public/apps/vet-aqua-erp/...');
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
  if (item.idx === 17) fs.copyFileSync(tempJpg, path.join(destDir, 'illustration-banner.jpg'));

  console.log(`✓ Processed scene ${item.idx}: ${item.name} (${(fs.statSync(tempJpg).size / 1024).toFixed(1)} KB)`);
}

// Cleanup temp directory
try {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
} catch (e) {}

console.log('\nAll 18 Vet & Aqua ERP Lite images converted and placed into public/apps/vet-aqua-erp successfully!');
