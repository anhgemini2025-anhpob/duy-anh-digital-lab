import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'SCM  UHT');
const docxFile = path.join(srcDir, 'loi binh tinh nang cua app SCM UHT.docx');

const localZip = path.join(process.cwd(), 'scripts', 'temp_scm.zip');
fs.copyFileSync(docxFile, localZip);

const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_scm_docx');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

execSync(`tar -xf "scripts/temp_scm.zip" -C "scripts/tmp_scm_docx"`);

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

fs.writeFileSync('scripts/scm-docx.txt', paragraphs.join('\n\n'), 'utf8');
console.log('SCM paragraphs count:', paragraphs.length);
paragraphs.forEach((p, idx) => console.log(`[${idx + 1}] ${p}`));

try {
  fs.unlinkSync(localZip);
  fs.rmSync(tmpDir, { recursive: true, force: true });
} catch (e) {}
