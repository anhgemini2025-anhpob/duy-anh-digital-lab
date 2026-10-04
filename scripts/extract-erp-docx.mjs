import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Find the directory
const parentDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung');
// Use readdirSync to find exact matching name if encoding differs
const dirs = fs.readdirSync(process.cwd());
const hinhDirName = dirs.find(d => d.startsWith('Hinh'));
const hinhFullDir = path.join(process.cwd(), hinhDirName);
const subDirs = fs.readdirSync(hinhFullDir);
const erpDirName = subDirs.find(d => d.includes('ERP Thuy'));
const srcDir = path.join(hinhFullDir, erpDirName);

console.log('Source directory:', srcDir);

const files = fs.readdirSync(srcDir);
const docxFileName = files.find(f => f.endsWith('.docx'));
const docxFile = path.join(srcDir, docxFileName);
console.log('Docx file:', docxFile);

const localZip = path.join(process.cwd(), 'scripts', 'temp_erp.zip');
fs.copyFileSync(docxFile, localZip);

const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_erp_docx');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

execSync(`tar -xf "scripts/temp_erp.zip" -C "scripts/tmp_erp_docx"`);

const xmlFile = path.join(tmpDir, 'word', 'document.xml');
const xml = fs.readFileSync(xmlFile, 'utf8');

const paragraphs = [];
const pMatches = xml.match(/<w:p(?:\s|>).*?<\/w:p>/g) || [];

for (const p of pMatches) {
  const tMatches = p.match(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g) || [];
  let pText = '';
  for (const t of tMatches) {
    const textOnly = t.replace(/<w:t(?:\s[^>]*)?>/, '').replace(/<\/w:t>/, '');
    pText += textOnly;
  }
  const clean = pText
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
  if (clean) {
    paragraphs.push(clean);
  }
}

fs.writeFileSync('scripts/erp-docx.txt', paragraphs.join('\n\n'), 'utf8');
console.log('ERP paragraphs count:', paragraphs.length);
paragraphs.forEach((p, idx) => console.log(`[${idx + 1}] ${p}`));

try {
  fs.unlinkSync(localZip);
  fs.rmSync(tmpDir, { recursive: true, force: true });
} catch (e) {}
