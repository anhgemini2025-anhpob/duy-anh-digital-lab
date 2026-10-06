import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Lanxess');
console.log('Source directory:', srcDir);

const files = fs.readdirSync(srcDir);
const docxFileName = files.find(f => f.endsWith('.docx'));
const docxFile = path.join(srcDir, docxFileName);
console.log('Docx file:', docxFile);

const localZip = path.join(process.cwd(), 'scripts', 'temp_lanxess.zip');
fs.copyFileSync(docxFile, localZip);

const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_lanxess_docx');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

execSync(`tar -xf "scripts/temp_lanxess.zip" -C "scripts/tmp_lanxess_docx"`);

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

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'lanxess-docx.txt'), paragraphs.join('\n'), 'utf8');
console.log(`Extracted ${paragraphs.length} paragraphs to scripts/lanxess-docx.txt`);

// cleanup
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.unlinkSync(localZip);
