const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const destDir = path.join(__dirname, '..', 'public', 'apps', 'trolybank');
const vidPath = path.join(destDir, 'trolybank.mp4');

const timestamps = [
  { time: '00:00:01', name: 'cover.jpg' },
  { time: '00:00:04', name: 'feature_01_ra_soat_hop_dong.jpg' },
  { time: '00:00:08', name: 'feature_02_phan_tich_tin_dung.jpg' },
  { time: '00:00:12', name: 'feature_03_tra_cuu_phap_ly.jpg' },
  { time: '00:00:16', name: 'feature_04_kiem_toan_rcsa.jpg' },
  { time: '00:00:20', name: 'feature_05_bien_ban_hop_ai.jpg' },
];

for (const item of timestamps) {
  const outPath = path.join(destDir, item.name);
  try {
    execSync(`"${ffmpeg}" -ss ${item.time} -i "${vidPath}" -vframes 1 -q:v 2 "${outPath}" -y`);
    console.log('Saved', item.name);
  } catch (e) {
    console.error('Error saving', item.name, e.message);
  }
}

// Create a professional banking icon SVG
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="bankGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#bankGrad)" stroke="#F59E0B" stroke-width="2.5" />
  <!-- Bank Pillar Architecture & Shield -->
  <path d="M50 16 L80 30 L20 30 Z" fill="url(#goldGrad)" />
  <rect x="22" y="32" width="56" height="4" rx="1.5" fill="#FDE68A" />
  <rect x="27" y="38" width="8" height="28" rx="2" fill="url(#goldGrad)" />
  <rect x="41" y="38" width="8" height="28" rx="2" fill="url(#goldGrad)" />
  <rect x="55" y="38" width="8" height="28" rx="2" fill="url(#goldGrad)" />
  <rect x="69" y="38" width="8" height="28" rx="2" fill="url(#goldGrad)" />
  <rect x="20" y="68" width="60" height="5" rx="2" fill="#FDE68A" />
  <!-- 24/7 Clock Badge -->
  <circle cx="70" cy="74" r="14" fill="#0A192F" stroke="#F59E0B" stroke-width="2" />
  <text x="70" y="78" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#FDE68A" text-anchor="middle">24/7</text>
  <!-- Security Shield Overlay Accent -->
  <path d="M50 48 L60 53 V60 C60 66 50 70 50 70 C50 70 40 66 40 60 V53 Z" fill="#1E3A8A" stroke="#FDE68A" stroke-width="1.5" opacity="0.9" />
  <path d="M47 59 L49 61 L54 56" stroke="#FDE68A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

fs.writeFileSync(path.join(destDir, 'app-logo.svg'), svgLogo, 'utf8');
console.log('Created app-logo.svg');
