import fs from 'fs';

const content = fs.readFileSync('src/data/apps.ts', 'utf8');

const apps = [];
const blocks = content.split(/\{\s*id:\s*["']/);

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = block.match(/^([^"']+)/);
  const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
  const durationMatch = block.match(/videoDuration:\s*["']([^"']+)["']/);
  const logoMatch = block.match(/logoUrl:\s*["']([^"']+)["']/);
  const coverMatch = block.match(/coverImage:\s*["']([^"']+)["']/);
  const urlMatch = block.match(/url:\s*["']([^"']+)["']/);

  if (idMatch) {
    apps.push({
      id: idMatch[1],
      name: nameMatch ? nameMatch[1] : 'N/A',
      duration: durationMatch ? durationMatch[1] : 'N/A',
      logo: logoMatch ? logoMatch[1] : 'N/A',
      cover: coverMatch ? coverMatch[1] : 'N/A',
      url: urlMatch ? urlMatch[1] : 'N/A',
    });
  }
}

console.log(`Total apps found: ${apps.length}`);
apps.forEach((a, idx) => {
  console.log(`${idx + 1}. [${a.duration}] ${a.name} (${a.id})`);
  console.log(`   URL: ${a.url}`);
  console.log(`   Logo: ${a.logo}`);
  console.log(`   Cover: ${a.cover}`);
});
