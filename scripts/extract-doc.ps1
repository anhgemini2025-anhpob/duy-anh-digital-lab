Add-Type -AssemblyName System.IO.Compression.FileSystem
$doc = Get-ChildItem -Filter "*DANH SACH*.docx" | Select-Object -First 1
Write-Host "Target doc: $($doc.FullName)"
$zip = [System.IO.Compression.ZipFile]::OpenRead($doc.FullName)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$text = $xml -replace '<w:p[^>]*>', "`r`n" -replace '<[^>]+>', '' -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&'
[System.IO.File]::WriteAllText("scripts/danhsach-docx.txt", $text, [System.Text.Encoding]::UTF8)
Write-Host "Success, wrote $($text.Length) characters to scripts/danhsach-docx.txt"
