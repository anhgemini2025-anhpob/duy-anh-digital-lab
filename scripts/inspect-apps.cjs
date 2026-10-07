const fs = require('fs');

const content = fs.readFileSync('src/data/apps.ts', 'utf8');
const idMatches = [...content.matchAll(/(?:id|"id"):\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total apps:', idMatches.length);
console.log('App list:\n', idMatches);

// Search for parenting / cha me
const parentingMatches = [...content.matchAll(/cha mẹ|nuoi-duong|dinh-huong|thau-hieu|0 - 60/gi)];
console.log('Parenting mentions count:', parentingMatches.length);

const catContent = fs.readFileSync('src/data/categories.ts', 'utf8');
console.log('\n--- CATEGORIES ---');
console.log(catContent);
