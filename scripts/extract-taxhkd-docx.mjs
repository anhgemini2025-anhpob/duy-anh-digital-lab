import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync(process.cwd());
const hinhDirName = dirs.find(d => d.startsWith('Hinh'));
const hinhFullDir = path.join(process.cwd(), hinhDirName);
const subDirs = fs.readdirSync(hinhFullDir);
const taxDirName = subDirs.find(d => d.includes('Hô Kinh Doanh') || d.includes('Hộ Kinh Doanh'));
const srcDir = path.join(hinhFullDir, taxDirName);

console.log('Source directory:', srcDir);

const files = fs.readdirSync(srcDir);
const docxFileName = files.find(f => f.endsWith('.docx'));
const docxFile = path.join(srcDir, docxFileName);
console.log('Docx file:', docxFile);

const localZip = path.join(process.cwd(), 'scripts', 'temp_taxhkd.zip');
fs.copyFileSync(docxFile, localZip);

const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_taxhkd_docx');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

execSync(`tar -xf "scripts/temp_taxhkd.zip" -C "scripts/tmp_taxhkd_docx"`);

const xmlFile = path.join(tmpDir, 'word', 'document.xml');
const xml = fs.readFileSync(xmlFile, 'utf8');

const paragraphs = [];
const pMatches = xml.match(/<w:p(?:\s|>).*?<\/w:p>/g) || [];

for (const p of pMatches) {
  const tMatches = p.match(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g) || [];
  let pText = '';
  for (const t of tMatches) {
    const textContent = t.replace(/<w:t(?:\s[^>]*)?>/, '').replace(/<\/w:t>/, '');
    pText += textContent;
  }
  if (pText.trim()) {
    paragraphs.push(pText.trim());
  }
}

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'taxhkd-docx.txt'), paragraphs.join('\n'), 'utf8');
console.log(`Extracted ${paragraphs.length} paragraphs to scripts/taxhkd-docx.txt`);

// cleanup
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.unlinkSync(localZip);
