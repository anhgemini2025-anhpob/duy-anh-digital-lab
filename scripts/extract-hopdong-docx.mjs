import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = 'C:/Nam 2026/Web app/DANH SACH CAC APP WEB DA THUC HIÊN';
const srcDir = path.join(projectRoot, 'Hinh ảnh minh hoa cho ung dung', 'Quan ly hop dong');
console.log('Source directory:', srcDir);

const files = fs.readdirSync(srcDir);
const docxFileName = files.find(f => f.endsWith('.docx') && !f.startsWith('~$'));
const docxFile = path.join(srcDir, docxFileName);
console.log('Docx file:', docxFile);

const localZip = path.join(projectRoot, 'scripts', 'temp_hopdong.zip');
fs.copyFileSync(docxFile, localZip);

const tmpDir = path.join(projectRoot, 'scripts', 'tmp_hopdong_docx');
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

execSync(`tar -xf "${localZip}" -C "${tmpDir}"`);

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

const outTxt = path.join(projectRoot, 'scripts', 'hopdong-docx.txt');
fs.writeFileSync(outTxt, paragraphs.join('\n'), 'utf8');
console.log(`Extracted ${paragraphs.length} paragraphs to ${outTxt}`);

// cleanup
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.unlinkSync(localZip);
