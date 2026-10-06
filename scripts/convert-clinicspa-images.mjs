import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = 'C:\\Nam 2026\\Web app\\DANH SACH CAC APP WEB DA THUC HIÊN\\Hinh ảnh minh hoa cho ung dung\\Quan ly phong Clinic spa';
const destDir = path.join(process.cwd(), 'public', 'apps', 'clinic-spa');
const tempWorkDir = 'C:\\temp_clinicspa_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying Clinic Spa PNGs to temp directory...');
for (let i = 1; i <= 12; i++) {
  const fullSrc = path.join(srcBase, `anh ${i}.png`);
  const tempSrc = path.join(tempWorkDir, `${i}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..12 | ForEach-Object {
    $src = "C:\\temp_clinicspa_convert\\$_.png"
    $dest = "C:\\temp_clinicspa_convert\\$_.jpg"
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
  'feature_01_mo_hinh_4_trong_1_derma_medical_spa.jpg',
  'feature_02_crm_khach_hang_va_booking_lich_hen.jpg',
  'feature_03_ho_so_da_lieu_dien_tu_emr_before_after.jpg',
  'feature_04_ke_don_duoc_my_pham_routine_cham_soc.jpg',
  'feature_05_quan_ly_lieu_trinh_thong_minh_fifo.jpg',
  'feature_06_pos_ban_hang_thanh_toan_vietqr.jpg',
  'feature_07_quan_ly_kho_duoc_my_pham_lo_han.jpg',
  'feature_08_co_che_tu_dong_tru_kho_tuc_thi.jpg',
  'feature_09_canh_bao_ton_kho_duoi_nguong_an_toan.jpg',
  'feature_10_dashboard_tong_the_phan_quyen_nhan_su.jpg',
  'feature_11_mot_he_thong_mot_du_lieu_khach_hang.jpg',
  'feature_12_nen_tang_responsive_mobile_first_loi_binh.jpg'
];

for (let i = 1; i <= 12; i++) {
  const convertedJpg = path.join(tempWorkDir, `${i}.jpg`);
  const padIdx = String(i).padStart(2, '0');
  
  // 1. Descriptive filename
  const descTarget = path.join(destDir, descriptiveNames[i - 1]);
  fs.copyFileSync(convertedJpg, descTarget);

  // 2. feature_XX.jpg
  const featureTarget = path.join(destDir, `feature_${padIdx}.jpg`);
  fs.copyFileSync(convertedJpg, featureTarget);

  // 3. real-screen-X.jpg
  const realScreenTarget = path.join(destDir, `real-screen-${i}.jpg`);
  fs.copyFileSync(convertedJpg, realScreenTarget);
}

// Cover images
fs.copyFileSync(path.join(tempWorkDir, '1.jpg'), path.join(destDir, 'cover.jpg'));
fs.copyFileSync(path.join(tempWorkDir, '1.jpg'), path.join(destDir, 'real-cover.jpg'));
fs.copyFileSync(path.join(tempWorkDir, '11.jpg'), path.join(destDir, 'illustration-banner.jpg'));

// Clean up temp dir
fs.rmSync(tempWorkDir, { recursive: true, force: true });

console.log('✓ All 12 Clinic Spa images successfully converted and placed in public/apps/clinic-spa/');
