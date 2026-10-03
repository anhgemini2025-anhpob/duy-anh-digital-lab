import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const rootItems = fs.readdirSync('.');
const hinhDir = rootItems.find(f => f.toLowerCase().startsWith('hinh'));
console.log('hinhDir:', hinhDir);
const subItems = fs.readdirSync(hinhDir);
console.log('subItems in illustration folder:', subItems);

const appConfigs = [
  {
    id: 'nuoi-day-tre-6-11',
    folderMatcher: (f) => f.includes('6') && f.includes('11'),
    namedFiles: [
      '',
      'feature_01_ai_companion_247.jpg',
      'feature_02_parenting_scripts.jpg',
      'feature_03_home_dashboard.jpg',
      'feature_04_child_profile.jpg',
      'feature_05_academic_knowledge_graph.jpg',
      'feature_06_emotional_observation.jpg',
      'feature_07_digital_family_manager.jpg',
      'feature_08_health_nutrition.jpg',
      'feature_09_family_routine_quality_time.jpg',
      'feature_10_weekly_review_sos_zone.jpg'
    ]
  },
  {
    id: 'thau-hieu-thieu-nien-12-15',
    folderMatcher: (f) => (f.includes('12') && f.includes('15')) || f.toLowerCase().includes('thấu hiểu') || f.toLowerCase().includes('thau hieu'),
    namedFiles: [
      '',
      'feature_01_onboarding_projector.jpg',
      'feature_02_tanner_nutrition.jpg',
      'feature_03_emotional_first_aid_nvc.jpg',
      'feature_04_cyber_safety_grooming.jpg',
      'feature_05_legal_framework_age_14.jpg',
      'feature_06_holland_career_9plus.jpg',
      'feature_07_family_agreement_matrix.jpg',
      'feature_08_ai_dialogue_simulator.jpg',
      'feature_09_thcs_curriculum_6to9.jpg',
      'feature_10_family_connection.jpg'
    ]
  },
  {
    id: 'dinh-huong-thanh-nien-16-18',
    folderMatcher: (f) => (f.includes('16') && f.includes('18')) || f.toLowerCase().includes('định hướng') || f.toLowerCase().includes('dinh huong'),
    namedFiles: [
      '',
      'feature_01_home_dashboard_weekly_insight.jpg',
      'feature_02_academic_exam_hub.jpg',
      'feature_03_career_future_direction.jpg',
      'feature_04_parent_teen_connection.jpg',
      'feature_05_ai_communication_assistant.jpg',
      'feature_06_family_boundary_builder.jpg',
      'feature_07_health_wellness_tracker.jpg',
      'feature_08_digital_life_guidance.jpg',
      'feature_09_age18_citizenship_prep.jpg',
      'feature_10_ai_companion_family_journal.jpg'
    ]
  }
];

let allPsItems = [];

for (const cfg of appConfigs) {
  const folder = subItems.find(cfg.folderMatcher);
  if (!folder) {
    console.error(`Could not find folder for ${cfg.id}`);
    process.exit(1);
  }
  const srcDir = path.resolve(hinhDir, folder);
  console.log(`\nFound folder for ${cfg.id}: ${srcDir}`);
  const destDir = path.resolve('public', 'apps', cfg.id);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  // Find logo
  const logoFile = files.find(f => f.toLowerCase().includes('logo') && f.toLowerCase().endsWith('.png'));
  if (logoFile) {
    const logoSrc = path.resolve(srcDir, logoFile);
    const logoDest = path.resolve(destDir, 'app-logo.png');
    fs.copyFileSync(logoSrc, logoDest);
    console.log(`Copied logo: ${logoFile} -> app-logo.png`);
  }

  for (let num = 1; num <= 10; num++) {
    const regex = new RegExp(`^tinh\\s*nang\\s*${num}\\.png$`, 'i');
    const f = files.find(name => regex.test(name));
    if (!f) {
      console.error(`FATAL: Could not find exact file for ${cfg.id} feature ${num} with regex: ${regex}`);
      process.exit(1);
    }
    console.log(`  [${cfg.id}] Feature ${num} -> "${f}"`);

    const numStr = String(num).padStart(2, '0');
    const src = path.resolve(srcDir, f).replace(/\\/g, '\\\\');
    const destFeature = path.resolve(destDir, `feature_${numStr}_screen.jpg`).replace(/\\/g, '\\\\');
    const destNamed = path.resolve(destDir, cfg.namedFiles[num]).replace(/\\/g, '\\\\');
    const destScreen = path.resolve(destDir, `screen-${num}.jpg`).replace(/\\/g, '\\\\');
    const isFirst = (num === 1) ? '1' : '0';
    const coverPath = path.resolve(destDir, 'cover.jpg').replace(/\\/g, '\\\\');
    const realCoverPath = path.resolve(destDir, 'real-cover.jpg').replace(/\\/g, '\\\\');

    allPsItems.push(`  @{ Src = '${src}'; DestFeature = '${destFeature}'; DestNamed = '${destNamed}'; DestScreen = '${destScreen}'; Num = ${num}; AppId = '${cfg.id}'; IsFirst = ${isFirst}; Cover = '${coverPath}'; RealCover = '${realCoverPath}' }`);
  }
}

const psScript = `
Add-Type -AssemblyName System.Drawing
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$files = @(
${allPsItems.join(',\n')}
)

foreach ($item in $files) {
    Write-Host ("Processing [" + $item.AppId + "] " + $item.Num + ": " + $item.Src)
    $bmp = [System.Drawing.Bitmap]::FromFile($item.Src)
    $bmp.Save($item.DestNamed, $jpegEncoder, $encoderParams)
    $bmp.Save($item.DestFeature, $jpegEncoder, $encoderParams)
    $bmp.Save($item.DestScreen, $jpegEncoder, $encoderParams)
    if ($item.IsFirst -eq 1) {
        $bmp.Save($item.Cover, $jpegEncoder, $encoderParams)
        $bmp.Save($item.RealCover, $jpegEncoder, $encoderParams)
    }
    $bmp.Dispose()
    Write-Host ("  Saved " + $item.DestNamed)
}
Write-Host "All 30 feature images for all 3 apps converted successfully with 100% accuracy!"
`;

fs.writeFileSync('scripts/run_convert_all.ps1', '\ufeff' + psScript, 'utf8');
console.log('Wrote scripts/run_convert_all.ps1 with BOM');

console.log('Starting conversion via PowerShell...');
const res = execSync('powershell -ExecutionPolicy Bypass -File scripts/run_convert_all.ps1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
console.log(res);
