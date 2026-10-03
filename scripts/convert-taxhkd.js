import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const illusDir = path.resolve('Hinh ảnh minh hoa cho ung dung', 'Thuế Hô Kinh Doanh');
const files = fs.readdirSync(illusDir).filter(f => f.endsWith('.png')).sort();
console.log('Found illustration files:', files);

// Copy to ascii temp files
const tempDir = path.resolve('scripts', 'temp_taxhkd');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

fs.copyFileSync(path.join(illusDir, files[0]), path.join(tempDir, 'in1.png'));
fs.copyFileSync(path.join(illusDir, files[1]), path.join(tempDir, 'in2.png'));
fs.copyFileSync(path.join(illusDir, files[2]), path.join(tempDir, 'in3.png'));

const destDir = path.resolve('public', 'apps', 'taxhkd');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const psScript = `
Add-Type -AssemblyName System.Drawing

function Convert-Jpg($src, $dest) {
    $img = [System.Drawing.Image]::FromFile($src)
    $w = $img.Width
    $h = $img.Height
    $maxWidth = 1600
    if ($w -gt $maxWidth) {
        $newW = $maxWidth
        $newH = [int]($h * ($maxWidth / $w))
    } else {
        $newW = $w
        $newH = $h
    }
    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]86)

    $bmp.Save($dest, $jpegCodec, $encoderParams)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Created: $dest"
}

Convert-Jpg "${path.join(tempDir, 'in1.png').replace(/\\/g, '/')}" "${path.join(destDir, 'real-cover.jpg').replace(/\\/g, '/')}"
Convert-Jpg "${path.join(tempDir, 'in1.png').replace(/\\/g, '/')}" "${path.join(destDir, 'real-screen-1.jpg').replace(/\\/g, '/')}"
Convert-Jpg "${path.join(tempDir, 'in2.png').replace(/\\/g, '/')}" "${path.join(destDir, 'real-screen-2.jpg').replace(/\\/g, '/')}"
Convert-Jpg "${path.join(tempDir, 'in3.png').replace(/\\/g, '/')}" "${path.join(destDir, 'real-screen-3.jpg').replace(/\\/g, '/')}"
`;

fs.writeFileSync('scripts/run-convert.ps1', psScript, 'ascii');
execSync('powershell -ExecutionPolicy Bypass -File scripts/run-convert.ps1', { stdio: 'inherit' });

// Clean up
fs.unlinkSync('scripts/run-convert.ps1');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('Successfully generated all 4 JPGs in public/apps/taxhkd/!');
