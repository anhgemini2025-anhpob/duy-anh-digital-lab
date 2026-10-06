import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Sales training');
const destDir = path.join(process.cwd(), 'public', 'apps', 'bjc-sales-training');
const tempWorkDir = 'C:\\temp_salestraining_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying Sales Training PNGs to temp directory...');
for (let i = 1; i <= 11; i++) {
  const fullSrc = path.join(srcBase, `anh ${i}.png`);
  const tempSrc = path.join(tempWorkDir, `${i}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..11 | ForEach-Object {
    $src = "C:\\temp_salestraining_convert\\$_.png"
    $dest = "C:\\temp_salestraining_convert\\$_.jpg"
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
  'feature_01_tong_quan_app_dao_tao_b2b.jpg',
  'feature_02_ca_nhan_hoa_theo_nganh_hang.jpg',
  'feature_03_cham_diem_uu_tien_khach_hang.jpg',
  'feature_04_kich_ban_tiep_can_kham_pha_nhu_cau.jpg',
  'feature_05_giai_phap_thay_the_xu_ly_phan_doi.jpg',
  'feature_06_mo_phong_tinh_huong_thuc_te.jpg',
  'feature_07_theo_doi_mau_thu_co_hoi_moi.jpg',
  'feature_08_lo_trinh_dao_tao_chuan_hoa_lms.jpg',
  'feature_09_bao_cao_tien_do_tu_dong.jpg',
  'feature_10_tai_san_tri_thuc_doanh_nghiep.jpg',
  'feature_11_loi_ket_may_do_ung_dung_rieng.jpg'
];

for (let i = 1; i <= 11; i++) {
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
for (let i = 1; i <= 11; i++) {
  const padIdx = String(i).padStart(2, '0');
  fs.copyFileSync(path.join(tempWorkDir, `${i}.jpg`), path.join(srcBase, `feature_${padIdx}.jpg`));
}
fs.copyFileSync(path.join(tempWorkDir, '1.jpg'), path.join(srcBase, 'cover.jpg'));

// Cleanup temp
fs.rmSync(tempWorkDir, { recursive: true, force: true });
console.log('All 11 sales training images converted and deployed successfully!');
