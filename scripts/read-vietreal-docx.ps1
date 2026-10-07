Add-Type -AssemblyName System.IO.Compression.FileSystem
$doc = Get-ChildItem -Path ".\Hinh ảnh minh hoa cho ung dung\Vietreal" -Filter "*.docx" | Select-Object -First 1
Write-Host "Found docx: $($doc.FullName)"

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

$text = $xml -replace '<w:p[^>]*>', "`r`n" -replace '<[^>]+>', '' -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&'
$text | Out-File -FilePath "scripts/vietreal-docx.txt" -Encoding utf8
Write-Host "Extracted successfully to scripts/vietreal-docx.txt"
