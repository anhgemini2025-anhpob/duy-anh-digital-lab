const fs = require('fs');
const path = require('path');

const tempUnzip = path.join(process.env.TEMP || '.', 'vietreal_unzip');
const docXmlPath = path.join(tempUnzip, 'word', 'document.xml');
const xml = fs.readFileSync(docXmlPath, 'utf8');

// Match each paragraph <w:p>...</w:p>
const paragraphs = [];
const pRegex = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
let pMatch;
while ((pMatch = pRegex.exec(xml)) !== null) {
  const pContent = pMatch[1];
  const tRegex = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
  let tMatch;
  let pText = '';
  while ((tMatch = tRegex.exec(pContent)) !== null) {
    pText += tMatch[1];
  }
  const clean = pText
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
  if (clean.length > 0) {
    paragraphs.push(clean);
  }
}

const outPath = path.join(__dirname, 'vietreal-docx.txt');
fs.writeFileSync(outPath, paragraphs.join('\n\n'), 'utf8');
console.log('Saved proper paragraphs:', paragraphs.length);
console.log('\n--- FULL CONTENT ---\n');
console.log(paragraphs.join('\n'));
