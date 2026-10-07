const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'Hinh ảnh minh hoa cho ung dung', 'Vietreal');
const docxFile = fs.readdirSync(targetDir).find(f => f.endsWith('.docx'));
console.log('Docx file:', docxFile);
const fullDocxPath = path.join(targetDir, docxFile);

const tempZip = path.join(process.env.TEMP || '.', 'vietreal_temp.zip');
const tempUnzip = path.join(process.env.TEMP || '.', 'vietreal_unzip');

fs.copyFileSync(fullDocxPath, tempZip);

if (fs.existsSync(tempUnzip)) {
  fs.rmSync(tempUnzip, { recursive: true, force: true });
}

execSync(`powershell -command "Expand-Archive -LiteralPath '${tempZip}' -DestinationPath '${tempUnzip}' -Force"`);

const docXmlPath = path.join(tempUnzip, 'word', 'document.xml');
const xml = fs.readFileSync(docXmlPath, 'utf8');

const text = xml
  .replace(/<w:p[^>]*>/g, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

const outPath = path.join(__dirname, 'vietreal-docx.txt');
fs.writeFileSync(outPath, text, 'utf8');
console.log('Successfully written to:', outPath);
console.log('Total characters:', text.length);

const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
console.log('Total non-empty lines:', lines.length);
console.log('--- SAMPLE FIRST 50 LINES ---');
console.log(lines.slice(0, 50).join('\n'));
