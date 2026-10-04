import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync(process.cwd());
const hinhDirName = dirs.find(d => d.startsWith('Hinh'));
const hinhFullDir = path.join(process.cwd(), hinhDirName);
const subDirs = fs.readdirSync(hinhFullDir);
const taxDirName = subDirs.find(d => d.includes('Hô Kinh Doanh') || d.includes('Hộ Kinh Doanh'));
const srcDir = path.join(hinhFullDir, taxDirName);
const destDir = path.join(process.cwd(), 'public', 'apps', 'taxhkd');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log('Source directory:', srcDir);
console.log('Destination directory:', destDir);

const sceneImages = [
  { src: 'anh 0.png', idx: 1, name: 'feature_01_gioi_thieu_tong_quan.jpg', isCover: true },
  { src: 'anh 1.png', idx: 2, name: 'feature_02_khoi_tao_ho_so_3_buoc.jpg' },
  { src: 'anh 2.png', idx: 3, name: 'feature_03_xac_thuc_vneid_tai_khoan_ngan_hang.jpg' },
  { src: 'anh 3.png', idx: 4, name: 'feature_04_chup_hoa_don_ai_nhan_dien.jpg' },
  { src: 'anh 4.png', idx: 5, name: 'feature_05_mua_hang_khong_hoa_don_bang_ke.jpg' },
  { src: 'anh 5.png', idx: 6, name: 'feature_06_quan_ly_kho_hang_chan_xuat_am.jpg' },
  { src: 'anh 6.png', idx: 7, name: 'feature_07_ban_hang_pos_tren_dien_thoai.jpg' },
  { src: 'anh 7.png', idx: 8, name: 'feature_08_xuat_hoa_don_dien_tu_tuc_thi.jpg' },
  { src: 'anh 8.png', idx: 9, name: 'feature_09_thanh_toan_vietqr_dong.jpg' },
  { src: 'anh 9.png', idx: 10, name: 'feature_10_tu_dong_xu_ly_giam_thue.jpg' },
  { src: 'anh 10.png', idx: 11, name: 'feature_11_tu_dong_tong_hop_7_so_ke_toan.jpg' },
  { src: 'anh 11.png', idx: 12, name: 'feature_12_tinh_thue_ket_xuat_to_khai_01_cnkd.jpg' },
  { src: 'anh 12.png', idx: 13, name: 'feature_13_dashboard_canh_bao_nguong_thue.jpg' },
  { src: 'anh 13.png', idx: 14, name: 'feature_14_smarttax_hkd_kinh_doanh_khong_ke_toan.jpg' },
  { src: 'anh 14.png', idx: 15, name: 'feature_15_loi_binh_diem_bat_ngo_khi_thu_nghiem.jpg' }
];

const tempWorkDir = 'C:\\temp_taxhkd_convert';
if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

console.log('Copying taxhkd images to temp directory...');
for (const item of sceneImages) {
  const fullSrc = path.join(srcDir, item.src);
  const tempSrc = path.join(tempWorkDir, `${item.idx}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
}

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 90L)

1..15 | ForEach-Object {
    $src = "C:\\temp_taxhkd_convert\\$_.png"
    $dest = "C:\\temp_taxhkd_convert\\$_.jpg"
    $img = [System.Drawing.Image]::FromFile($src)
    $maxWidth = 1600
    $w = $img.Width
    $h = $img.Height
    if ($w -gt $maxWidth) {
        $newW = $maxWidth
        $newH = [int]($h * ($maxWidth / $w))
        $bmp = New-Object System.Drawing.Bitmap $newW, $newH
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $newW, $newH)
        $bmp.Save($dest, $jpegEncoder, $encoderParams)
        $g.Dispose()
        $bmp.Dispose()
    } else {
        $img.Save($dest, $jpegEncoder, $encoderParams)
    }
    $img.Dispose()
    Write-Host "Converted $_.png to $_.jpg"
}
`;

const psScriptPath = path.join(tempWorkDir, 'convert.ps1');
fs.writeFileSync(psScriptPath, psScriptContent, 'ascii');

console.log('Executing PowerShell image conversion...');
execSync(`powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`, { stdio: 'inherit' });

console.log('Moving converted images to destination...');
for (const item of sceneImages) {
  const convertedJpg = path.join(tempWorkDir, `${item.idx}.jpg`);
  const finalDest = path.join(destDir, item.name);
  fs.copyFileSync(convertedJpg, finalDest);
  console.log(`Saved: ${item.name} (${(fs.statSync(finalDest).size / 1024).toFixed(1)} KB)`);

  if (item.isCover) {
    const coverDest = path.join(destDir, 'real-cover.jpg');
    fs.copyFileSync(convertedJpg, coverDest);
    console.log(`Saved cover: real-cover.jpg`);
  }
}

// Cleanup temp directory
fs.rmSync(tempWorkDir, { recursive: true, force: true });
console.log('Conversion completed successfully!');
