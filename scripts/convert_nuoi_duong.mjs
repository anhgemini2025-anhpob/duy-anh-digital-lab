import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Find source dir
const rootItems = fs.readdirSync('.');
const hinhDir = rootItems.find(f => f.toLowerCase().startsWith('hinh'));
console.log('hinhDir:', hinhDir);
const subItems = fs.readdirSync(hinhDir);
const nuoiDuongFolder = subItems.find(f => f.includes('0') && f.includes('60'));
console.log('nuoiDuongFolder:', nuoiDuongFolder);
const srcDir = path.resolve(hinhDir, nuoiDuongFolder);
console.log('srcDir:', srcDir);

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.png'));
console.log('All PNG files in source folder:', files);

const destDir = path.resolve('public', 'apps', 'nuoi-duong-be-0-60');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy Logo-lamchame1.png as app-logo.png
const logoFile = files.find(f => f.toLowerCase().includes('logo'));
if (logoFile) {
  const logoSrc = path.resolve(srcDir, logoFile);
  const logoDest = path.resolve(destDir, 'app-logo.png');
  fs.copyFileSync(logoSrc, logoDest);
  console.log(`Copied logo: ${logoSrc} -> ${logoDest}`);
}

const namedFiles = [
  '',
  'feature_01_home_dashboard_smart_logging.jpg',
  'feature_02_growth_engine.jpg',
  'feature_03_development_center.jpg',
  'feature_04_nutrition_meal_planner.jpg',
  'feature_05_offline_emergency_sos.jpg',
  'feature_06_vaccination_smart_reminders.jpg',
  'feature_07_digital_family_vault.jpg',
  'feature_08_ai_parenting_companion.jpg',
  'feature_09_activity_generator.jpg',
  'feature_10_smart_family_timeline_journal.jpg'
];

let psItems = [];
for (let num = 1; num <= 10; num++) {
  // STRICT matching for Tinh nang N.png
  const regex = new RegExp(`^tinh\\s*nang\\s*${num}\\.png$`, 'i');
  const f = files.find(name => regex.test(name));
  if (!f) {
    console.error(`FATAL: Could not find exact file for feature ${num} with regex: ${regex}`);
    process.exit(1);
  }
  console.log(`Feature ${num} matched EXACTLY to: "${f}"`);
  
  const numStr = String(num).padStart(2, '0');
  const src = path.resolve(srcDir, f).replace(/\\/g, '\\\\');
  const destFeature = path.resolve(destDir, `feature_${numStr}_screen.jpg`).replace(/\\/g, '\\\\');
  const destNamed = path.resolve(destDir, namedFiles[num]).replace(/\\/g, '\\\\');
  const destScreen = path.resolve(destDir, `screen-${num}.jpg`).replace(/\\/g, '\\\\');
  psItems.push(`  @{ Src = '${src}'; DestFeature = '${destFeature}'; DestNamed = '${destNamed}'; DestScreen = '${destScreen}'; Num = ${num} }`);
}

const psScript = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$files = @(
${psItems.join(',\n')}
)

foreach ($item in $files) {
    Write-Host ("Processing " + $item.Num + ": " + $item.Src)
    $bmp = [System.Drawing.Bitmap]::FromFile($item.Src)
    $bmp.Save($item.DestNamed, $jpegEncoder, $encoderParams)
    $bmp.Save($item.DestFeature, $jpegEncoder, $encoderParams)
    $bmp.Save($item.DestScreen, $jpegEncoder, $encoderParams)
    if ($item.Num -eq 1) {
        $bmp.Save('${path.resolve(destDir, 'cover.jpg').replace(/\\/g, '\\\\')}', $jpegEncoder, $encoderParams)
        $bmp.Save('${path.resolve(destDir, 'real-cover.jpg').replace(/\\/g, '\\\\')}', $jpegEncoder, $encoderParams)
    }
    $bmp.Dispose()
    Write-Host ("  Saved " + $item.DestNamed)
}
Write-Host "All 10 feature images converted successfully with 100% accuracy!"
`;

fs.writeFileSync('scripts/run_convert.ps1', '\ufeff' + psScript, 'utf8');
console.log('Wrote scripts/run_convert.ps1 with BOM');

const res = execSync('powershell -ExecutionPolicy Bypass -File scripts/run_convert.ps1', { encoding: 'utf8' });
console.log(res);
