import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Customer visit');
const destDir = path.join(process.cwd(), 'public', 'apps', 'customer-visit');
const tempWorkDir = 'C:\\temp_customervisit_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying Customer Visit PNGs to temp directory...');
for (let i = 1; i <= 10; i++) {
  const fullSrc = path.join(srcBase, `anh ${i}.png`);
  const tempSrc = path.join(tempWorkDir, `${i}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..10 | ForEach-Object {
    $src = "C:\\temp_customervisit_convert\\$_.png"
    $dest = "C:\\temp_customervisit_convert\\$_.jpg"
    $bmp = [System.Drawing.Bitmap]::FromFile($src)
    Write-Host "$_ : Width=$($bmp.Width), Height=$($bmp.Height)"
    $bmp.Save($dest, $jpegEncoder, $encoderParams)
    $bmp.Dispose()
    Write-Host "Converted $_.png to $_.jpg"
}
`;

const psScriptPath = path.join(tempWorkDir, 'convert.ps1');
fs.writeFileSync(psScriptPath, psScriptContent, 'ascii');

console.log('Running conversion in temp dir...');
execSync(`powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`, { stdio: 'inherit' });

console.log('Copying converted JPGs to target directory...');
const descriptiveNames = [
  'feature_01_tong_quan_quan_ly_di_khach.jpg',
  'feature_02_check_in_thuc_dia_gps.jpg',
  'feature_03_ghi_nhan_khach_hang_ocr_danh_thiep.jpg',
  'feature_04_bien_ban_lam_viec_xuat_pdf.jpg',
  'feature_05_theo_doi_du_an_pheu_meddic.jpg',
  'feature_06_canh_bao_co_hoi_bo_quen_follow_up.jpg',
  'feature_07_lap_ke_hoach_di_tuyen_thong_minh.jpg',
  'feature_08_dashboard_quan_ly_realtime.jpg',
  'feature_09_bao_cao_tu_dong_pdf_excel.jpg',
  'feature_10_so_hoa_toan_dien_hoat_dong_thi_truong.jpg'
];

for (let i = 1; i <= 10; i++) {
  const convertedJpg = path.join(tempWorkDir, `${i}.jpg`);
  const padIdx = String(i).padStart(2, '0');
  
  // copy to feature_XX.jpg
  const featName = `feature_${padIdx}.jpg`;
  fs.copyFileSync(convertedJpg, path.join(destDir, featName));
  
  // copy to descriptive name
  fs.copyFileSync(convertedJpg, path.join(destDir, descriptiveNames[i - 1]));
  
  // copy to real-screen-X.jpg
  fs.copyFileSync(convertedJpg, path.join(destDir, `real-screen-${i}.jpg`));
  
  if (i === 1) {
    fs.copyFileSync(convertedJpg, path.join(destDir, 'cover.jpg'));
    fs.copyFileSync(convertedJpg, path.join(destDir, 'real-cover.jpg'));
    fs.copyFileSync(convertedJpg, path.join(destDir, 'illustration-banner.jpg'));
  }
}

// Also sync cover and feature images back to source folder
for (let i = 1; i <= 10; i++) {
  const padIdx = String(i).padStart(2, '0');
  fs.copyFileSync(path.join(tempWorkDir, `${i}.jpg`), path.join(srcBase, `feature_${padIdx}.jpg`));
}
fs.copyFileSync(path.join(tempWorkDir, '1.jpg'), path.join(srcBase, 'cover.jpg'));

// Cleanup temp
fs.rmSync(tempWorkDir, { recursive: true, force: true });
console.log('All 10 customer visit images converted and deployed successfully!');
