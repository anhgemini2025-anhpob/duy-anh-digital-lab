import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcBase = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Quan ly nhom cau long');
const tempWorkDir = 'C:\\temp_badminton_convert';

if (fs.existsSync(tempWorkDir)) {
  fs.rmSync(tempWorkDir, { recursive: true, force: true });
}
fs.mkdirSync(tempWorkDir, { recursive: true });

const rawFiles = [
  'Hinh 1.png',
  'hinh 2.png',
  'Hinh 3.png',
  'hinh 4.png',
  'hinh 5.png',
  'hinh 5-1.png',
  'hinh 6.png',
  'hinh 7.png',
  'hinh 8.png'
];

console.log('Copying badminton images to temp directory...');
rawFiles.forEach((file, idx) => {
  const fullSrc = path.join(srcBase, file);
  const tempSrc = path.join(tempWorkDir, `${idx + 1}.png`);
  fs.copyFileSync(fullSrc, tempSrc);
});

const psScriptContent = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

1..9 | ForEach-Object {
    $src = "C:\\temp_badminton_convert\\$_.png"
    $dest = "C:\\temp_badminton_convert\\$_.jpg"
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

console.log('Done converting to temp.');
