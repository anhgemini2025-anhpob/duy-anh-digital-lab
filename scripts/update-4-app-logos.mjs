import fs from 'fs';
import path from 'path';

const lamChaMeRoot = 'C:\\Nam 2026\\Web app\\Lam Cha me';
const minhHoaRoot = 'Hinh ảnh minh hoa cho ung dung';
const publicAppsRoot = path.join('public', 'apps');

const appConfigs = [
  {
    id: 'nuoi-duong-be-0-60',
    folderMinhHoa: 'Nuoi duong be 0 -60 tháng',
    srcLogo: path.join(lamChaMeRoot, 'Logo-lamchame1.png'),
    logoFilename: 'Logo-lamchame1.png'
  },
  {
    id: 'nuoi-day-tre-6-11',
    folderMinhHoa: 'Nuoi day be tu 6 den 11 tuổi',
    srcLogo: path.join(lamChaMeRoot, 'Logo-lamchame2.png'),
    logoFilename: 'Logo-lamchame2.png'
  },
  {
    id: 'thau-hieu-thieu-nien-12-15',
    folderMinhHoa: 'Thấu hiểu thiếu niên 12 đến 15 tuổi',
    // Check if 1024x1024 exists first for max quality, fallback to Logo-lamchame3.png
    srcLogo: fs.existsSync(path.join(lamChaMeRoot, 'Thấu hiểu thiếu niên 12 đến 15 tuổi', 'public', 'icons', 'icon-source-1024.png'))
      ? path.join(lamChaMeRoot, 'Thấu hiểu thiếu niên 12 đến 15 tuổi', 'public', 'icons', 'icon-source-1024.png')
      : path.join(lamChaMeRoot, 'Logo-lamchame3.png'),
    logoFilename: 'Logo-lamchame3.png'
  },
  {
    id: 'dinh-huong-thanh-nien-16-18',
    folderMinhHoa: 'Định hướng thanh niên 16 đến 18 tuổi',
    srcLogo: fs.existsSync(path.join(lamChaMeRoot, 'Định hướng thanh niên 16 đến 18 tuổi', 'public', 'icons', 'icon-source-1024.png'))
      ? path.join(lamChaMeRoot, 'Định hướng thanh niên 16 đến 18 tuổi', 'public', 'icons', 'icon-source-1024.png')
      : path.join(lamChaMeRoot, 'Logo-lamchame4.png'),
    logoFilename: 'Logo-lamchame4.png'
  }
];

console.log('--- UPDATING LOGOS FOR 4 APPS ---');

for (const cfg of appConfigs) {
  console.log(`\n[App: ${cfg.id}]`);
  console.log(`Source logo: ${cfg.srcLogo}`);

  if (!fs.existsSync(cfg.srcLogo)) {
    console.error(`ERROR: Source logo not found at ${cfg.srcLogo}`);
    continue;
  }

  const logoBuffer = fs.readFileSync(cfg.srcLogo);
  console.log(`Source logo size: ${Math.round(logoBuffer.length / 1024)} KB`);

  // 1. Copy into public/apps/<id>/app-logo.png
  const destPublicDir = path.join(publicAppsRoot, cfg.id);
  if (!fs.existsSync(destPublicDir)) {
    fs.mkdirSync(destPublicDir, { recursive: true });
  }

  const destPublicLogo = path.join(destPublicDir, 'app-logo.png');
  fs.writeFileSync(destPublicLogo, logoBuffer);
  console.log(` -> Copied to: ${destPublicLogo}`);

  // Also copy alias logo.png in public folder
  const destPublicLogoAlias = path.join(destPublicDir, 'logo.png');
  fs.writeFileSync(destPublicLogoAlias, logoBuffer);
  console.log(` -> Copied to: ${destPublicLogoAlias}`);

  // 2. Copy into Hinh ảnh minh hoa cho ung dung/<folderMinhHoa>/
  const destMinhHoaDir = path.join(minhHoaRoot, cfg.folderMinhHoa);
  if (fs.existsSync(destMinhHoaDir)) {
    const destMinhHoaLogoOriginal = path.join(destMinhHoaDir, cfg.logoFilename);
    fs.writeFileSync(destMinhHoaLogoOriginal, logoBuffer);
    console.log(` -> Copied to: ${destMinhHoaLogoOriginal}`);

    const destMinhHoaAppLogo = path.join(destMinhHoaDir, 'app-logo.png');
    fs.writeFileSync(destMinhHoaAppLogo, logoBuffer);
    console.log(` -> Copied to: ${destMinhHoaAppLogo}`);

    const destMinhHoaLogo = path.join(destMinhHoaDir, 'logo.png');
    fs.writeFileSync(destMinhHoaLogo, logoBuffer);
    console.log(` -> Copied to: ${destMinhHoaLogo}`);
  }
}

console.log('\n--- ALL 4 APP LOGOS COPIED AND SYNCHRONIZED SUCCESSFULLY ---');
