import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = 'C:/Nam 2026/Web app/DANH SACH CAC APP WEB DA THUC HIÊN';
const hinhDir = path.join(projectRoot, 'Hinh ảnh minh hoa cho ung dung', 'Quan ly hop dong');
const destDir = path.join(projectRoot, 'public', 'apps', 'quan-ly-hop-dong-abm');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Generate a PowerShell script to convert using System.Drawing
// We'll write the script with UTF-8 BOM so PowerShell reads non-ASCII characters perfectly
let psScript = `
Add-Type -AssemblyName System.Drawing
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 90L)

function Convert-Image($src, $dest, $maxWidth = 1600) {
    if (-not (Test-Path $src)) {
        Write-Warning "Source not found: $src"
        return
    }
    $img = [System.Drawing.Image]::FromFile($src)
    $w = $img.Width
    $h = $img.Height
    $newW = $w
    $newH = $h
    if ($w -gt $maxWidth) {
        $newW = $maxWidth
        $newH = [int]($h * ($maxWidth / $w))
    }
    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)

    $bmp.Save($dest, $jpegCodec, $encoderParams)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Converted: $(Split-Path -Leaf $src) -> $(Split-Path -Leaf $dest) ($newW x $newH)"
}
`;

for (let i = 1; i <= 10; i++) {
  const src = path.join(hinhDir, `anh ${i}.png`);
  const pad = String(i).padStart(2, '0');
  const destFeat = path.join(destDir, `feature_${pad}.jpg`);
  const destScreen = path.join(destDir, `real-screen-${i}.jpg`);
  
  psScript += `Convert-Image "${src.replace(/\\/g, '\\\\')}" "${destFeat.replace(/\\/g, '\\\\')}"\n`;
  psScript += `Copy-Item "${destFeat.replace(/\\/g, '\\\\')}" "${destScreen.replace(/\\/g, '\\\\')}" -Force\n`;
}

// Cover
const feat1 = path.join(destDir, 'feature_01.jpg');
const cover = path.join(destDir, 'cover.jpg');
const realCover = path.join(destDir, 'real-cover.jpg');
psScript += `Copy-Item "${feat1.replace(/\\/g, '\\\\')}" "${cover.replace(/\\/g, '\\\\')}" -Force\n`;
psScript += `Copy-Item "${feat1.replace(/\\/g, '\\\\')}" "${realCover.replace(/\\/g, '\\\\')}" -Force\n`;

// Write with UTF-8 BOM
const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
const scriptBuffer = Buffer.concat([bom, Buffer.from(psScript, 'utf8')]);
const psPath = path.join(projectRoot, 'scripts', 'temp_convert.ps1');
fs.writeFileSync(psPath, scriptBuffer);

console.log('Running PowerShell conversion...');
const out = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
console.log(out);

fs.unlinkSync(psPath);
console.log('Conversion complete!');
