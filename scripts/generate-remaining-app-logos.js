import fs from 'node:fs';
import path from 'node:path';

const customLogos = [
  {
    id: 'badminton-management',
    bg1: '#059669', bg2: '#10b981',
    svg: `<path d="M48 24 L52 24 L56 44 L44 44 Z" fill="#ffffff" opacity="0.9"/>
          <circle cx="50" cy="54" r="10" fill="#fef08a"/>
          <path d="M44 44 L34 28 M56 44 L66 28 M50 44 L50 24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M50 64 L50 82 M46 82 L54 82" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`
  },
  {
    id: 'uth-scm-navigator',
    bg1: '#1d4ed8', bg2: '#3b82f6',
    svg: `<path d="M30 65 L50 35 L70 65 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
          <circle cx="30" cy="65" r="5" fill="#67e8f9"/>
          <circle cx="50" cy="35" r="5" fill="#facc15"/>
          <circle cx="70" cy="65" r="5" fill="#a7f3d0"/>
          <path d="M24 75 H76 M32 81 H68" stroke="#93c5fd" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    id: 'foodtech-hub',
    bg1: '#d97706', bg2: '#f59e0b',
    svg: `<path d="M38 32 C38 32 38 48 38 58 C38 68 46 76 56 76 C66 76 74 68 74 58 C74 48 74 32 74 32 Z" fill="none" stroke="#ffffff" stroke-width="4"/>
          <path d="M56 24 V44 M50 32 L56 40 L62 32" stroke="#fef08a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="56" cy="60" r="4" fill="#ffffff"/>`
  },
  {
    id: 'bjc-sales-training',
    bg1: '#b91c1c', bg2: '#ef4444',
    svg: `<circle cx="50" cy="50" r="26" fill="none" stroke="#ffffff" stroke-width="4"/>
          <circle cx="50" cy="50" r="16" fill="none" stroke="#fca5a5" stroke-width="3"/>
          <circle cx="50" cy="50" r="6" fill="#fef08a"/>
          <path d="M68 32 L80 20 M72 20 H80 V28" stroke="#fef08a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    id: 'bjc-sales-pitch',
    bg1: '#7c3aed', bg2: '#8b5cf6',
    svg: `<rect x="32" y="28" width="36" height="44" rx="6" fill="none" stroke="#ffffff" stroke-width="4"/>
          <path d="M40 40 H60 M40 48 H54 M40 56 H50" stroke="#ddd6fe" stroke-width="3" stroke-linecap="round"/>
          <path d="M58 56 L64 62 L74 50" stroke="#facc15" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    id: 'lipoid-advisor',
    bg1: '#0284c7', bg2: '#0ea5e9',
    svg: `<circle cx="50" cy="50" r="14" fill="#ffffff" opacity="0.95"/>
          <circle cx="34" cy="40" r="6" fill="#7dd3fc"/>
          <circle cx="66" cy="40" r="6" fill="#7dd3fc"/>
          <circle cx="34" cy="60" r="6" fill="#7dd3fc"/>
          <circle cx="66" cy="60" r="6" fill="#7dd3fc"/>
          <path d="M38 43 L45 47 M55 47 L62 43 M38 57 L45 53 M55 53 L62 57" stroke="#0284c7" stroke-width="2.5"/>`
  },
  {
    id: 'clinic-spa',
    bg1: '#0d9488', bg2: '#14b8a6',
    svg: `<path d="M50 26 C40 38 32 50 32 60 C32 70 40 76 50 76 C60 76 68 70 68 60 C68 50 60 38 50 26 Z" fill="none" stroke="#ffffff" stroke-width="4"/>
          <path d="M50 42 V62 M40 52 H60" stroke="#99f6e4" stroke-width="4" stroke-linecap="round"/>`
  },
  {
    id: 'spa-landing',
    bg1: '#db2777', bg2: '#ec4899',
    svg: `<path d="M50 28 C50 28 36 42 36 56 C36 64 42 72 50 72 C58 72 64 64 64 56 C64 42 50 28 50 28 Z" fill="#ffffff" opacity="0.9"/>
          <circle cx="50" cy="54" r="6" fill="#fbcfe8"/>
          <path d="M30 40 L34 44 M70 40 L66 44" stroke="#fdf2f8" stroke-width="2.5" stroke-linecap="round"/>`
  },
  {
    id: 'tro-ly-vi-ngon',
    bg1: '#ea580c', bg2: '#f97316',
    svg: `<path d="M34 50 C30 46 30 38 36 34 C40 30 46 32 50 36 C54 32 60 30 64 34 C70 38 70 46 66 50 Z" fill="#ffffff"/>
          <path d="M34 52 H66 V66 H34 Z" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round"/>
          <path d="M40 72 H60" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>`
  },
  {
    id: 'vanderbilt-advisor',
    bg1: '#334155', bg2: '#475569',
    svg: `<polygon points="50,26 72,40 72,64 50,78 28,64 28,40" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
          <circle cx="50" cy="52" r="8" fill="#38bdf8"/>
          <line x1="50" y1="26" x2="50" y2="44" stroke="#94a3b8" stroke-width="2.5"/>
          <line x1="72" y1="64" x2="56" y2="56" stroke="#94a3b8" stroke-width="2.5"/>
          <line x1="28" y1="64" x2="44" y2="56" stroke="#94a3b8" stroke-width="2.5"/>`
  },
  {
    id: 'lanxess-cosmetic-advisor',
    bg1: '#047857', bg2: '#10b981',
    svg: `<polygon points="50,26 70,38 70,62 50,74 30,62 30,38" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
          <circle cx="50" cy="50" r="10" fill="none" stroke="#a7f3d0" stroke-width="3"/>
          <circle cx="50" cy="50" r="4" fill="#fef08a"/>`
  }
];

for (const item of customLogos) {
  const destDir = path.join('public/apps', item.id);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop stop-color="${item.bg1}"/>
      <stop offset="1" stop-color="${item.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#bg)"/>
  ${item.svg}
</svg>`;

  fs.writeFileSync(path.join(destDir, 'app-logo.svg'), svgContent, 'utf-8');
  console.log(`Created app-logo.svg for [${item.id}]`);
}
