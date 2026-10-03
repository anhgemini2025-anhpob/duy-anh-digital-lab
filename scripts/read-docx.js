import fs from 'fs';
import { execSync } from 'child_process';

const ps = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$doc = Get-ChildItem -Filter "*DANH*SACH*DA*THUC*HIEN.docx" | Select-Object -First 1

$fileStream = [System.IO.File]::Open($doc.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
$zip = New-Object System.IO.Compression.ZipArchive($fileStream, [System.IO.Compression.ZipArchiveMode]::Read)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$fileStream.Close()

$text = $xml -replace '<[^>]+>', [System.Environment]::NewLine -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&'
$text | Out-File -FilePath "scripts/docx-text.txt" -Encoding utf8
`;

fs.writeFileSync('scripts/read-doc.ps1', ps, 'utf8');
execSync('powershell -ExecutionPolicy Bypass -File scripts/read-doc.ps1');
fs.unlinkSync('scripts/read-doc.ps1');

const text = fs.readFileSync('scripts/docx-text.txt', 'utf8');
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
console.log(lines.join('\n'));
