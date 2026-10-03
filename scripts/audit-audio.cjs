const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/apps.ts', 'utf8');

// Match apps
const appMatches = [...content.matchAll(/id:\s*["']([^"']+)["'],[\s\S]*?name:\s*["']([^"']+)["']/g)];
console.log('Total detected apps:', appMatches.length);

const summary = [];
for (const match of appMatches) {
  const id = match[1];
  const name = match[2];
  const dir = path.join('public', 'apps', id);
  const a1 = path.join(dir, 'audio-scene-1.mp3');
  const a2 = path.join(dir, 'audio-scene-2.mp3');
  const a3 = path.join(dir, 'audio-scene-3.mp3');

  const s1 = fs.existsSync(a1) ? fs.statSync(a1).size : 0;
  const s2 = fs.existsSync(a2) ? fs.statSync(a2).size : 0;
  const s3 = fs.existsSync(a3) ? fs.statSync(a3).size : 0;

  summary.push({ id, name, s1, s2, s3 });
}

console.log('--- AUDIO STATUS FOR ALL APPS ---');
let missingCount = 0;
summary.forEach(s => {
  const missing = [];
  if (s.s1 < 1000) missing.push('Scene 1');
  if (s.s2 < 1000) missing.push('Scene 2');
  if (s.s3 < 1000) missing.push('Scene 3');
  if (missing.length > 0) {
    missingCount++;
    console.log(`[MISSING] ${s.id.padEnd(25)} (${s.name}): Thiếu ${missing.join(', ')} (s1:${s.s1}, s2:${s.s2}, s3:${s.s3})`);
  } else {
    console.log(`[OK]      ${s.id.padEnd(25)} (${s.name})`);
  }
});
console.log(`Total apps with missing scenes: ${missingCount} / ${summary.length}`);
