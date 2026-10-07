import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = 'C:\\Nam 2026\\Web app\\DANH SACH CAC APP WEB DA THUC HIÊN\\Hinh ảnh minh hoa cho ung dung\\Sales pitch';
const destDir = path.join(process.cwd(), 'public', 'apps', 'bjc-sales-pitch');
const tempWorkDir = 'C:\\temp_salespitch_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying Sales Pitch PNGs to temp directory...');
for (let i = 1; i <= 6; i++) {
  const fullSrc = path.join(srcBase, `anh ${i}.png`);
  const tempSrc = path.join(tempWorkDir, `${i}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..6 | ForEach-Object {
    $src = "C:\\temp_salespitch_convert\\$_.png"
    $dest = "C:\\temp_salespitch_convert\\$_.jpg"
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
  'feature_01_tong_quan_sales_pitch_battlecard.jpg',
  'feature_02_khoi_tao_tuy_bien_ai_gemini_claude.jpg',
  'feature_03_cau_truc_sales_pitch_gia_tri_khac_biet.jpg',
  'feature_04_the_tac_chien_battlecard_doi_dau_doi_thu.jpg',
  'feature_05_xuat_da_dinh_dang_powerpoint_pdf_word_excel.jpg',
  'feature_06_chuan_hoa_quy_trinh_nhan_ban_sales_gioi.jpg'
];

for (let i = 1; i <= 6; i++) {
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
fs.copyFileSync(path.join(tempWorkDir, '4.jpg'), path.join(destDir, 'illustration-banner.jpg'));

// Clean up temp dir
fs.rmSync(tempWorkDir, { recursive: true, force: true });

console.log('✓ All 6 Sales Pitch images successfully converted and placed in public/apps/bjc-sales-pitch/');
