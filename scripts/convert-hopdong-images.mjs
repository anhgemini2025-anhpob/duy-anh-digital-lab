import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Quan ly hop dong');
const destDir = path.join(process.cwd(), 'public', 'apps', 'quan-ly-hop-dong-abm');
const tempWorkDir = 'C:\\temp_hopdong_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying Quan Ly Hop Dong PNGs to temp directory...');
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
    $src = "C:\\temp_hopdong_convert\\$_.png"
    $dest = "C:\\temp_hopdong_convert\\$_.jpg"
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
  'feature_01_tong_quan_quan_ly_hop_dong.jpg',
  'feature_02_theo_doi_hop_dong_toan_dien.jpg',
  'feature_03_dashboard_canh_bao_het_han.jpg',
  'feature_04_uu_tien_khach_hang_doanh_so_cao.jpg',
  'feature_05_kiem_tra_bat_loi_ho_so.jpg',
  'feature_06_quan_ly_file_scan_google_drive.jpg',
  'feature_07_nhap_lieu_excel_xuat_bao_cao.jpg',
  'feature_08_danh_ba_doi_tac_phan_quyen.jpg',
  'feature_09_pwa_offline_sao_luu_dam_may.jpg',
  'feature_10_chuan_hoa_quan_tri_nang_tam_van_hanh.jpg'
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
console.log('All 10 contract images converted and deployed successfully!');
