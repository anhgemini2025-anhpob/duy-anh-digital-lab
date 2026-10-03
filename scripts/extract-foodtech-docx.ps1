Add-Type -AssemblyName System.IO.Compression.FileSystem

$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*Hinh*minh*hoa*" }
$subFolder = Get-ChildItem -LiteralPath $folder.FullName -Directory | Where-Object { $_.Name -like "*Food*tech*" }
$doc = Get-ChildItem -LiteralPath $subFolder.FullName -Filter "*.docx" | Select-Object -First 1
Write-Host "Found folder: $($subFolder.FullName)"
Write-Host "Reading $($doc.FullName)"

$tempFile = [System.IO.Path]::GetTempFileName() + ".docx"
[System.IO.File]::Copy($doc.FullName, $tempFile, $true)

$zip = [System.IO.Compression.ZipFile]::OpenRead($tempFile)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
Remove-Item $tempFile -Force

$text = $xml -replace '<w:p[ >]', "`n`n" -replace '<[^>]+>', "" -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&' -replace '&quot;', '"'
$text | Out-File -FilePath "scripts/foodtech-hub-docx.txt" -Encoding utf8
Write-Host "Extracted successfully"
