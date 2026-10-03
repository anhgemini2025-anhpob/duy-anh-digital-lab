Add-Type -AssemblyName System.Drawing

$appsDir = "public/apps"
$dirs = Get-ChildItem -Path $appsDir -Directory

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]88)

foreach ($dir in $dirs) {
    $cover = Join-Path $dir.FullName "real-cover.jpg"
    $screen2 = Join-Path $dir.FullName "real-screen-2.jpg"
    $screen3 = Join-Path $dir.FullName "real-screen-3.jpg"

    if ((Test-Path $cover) -and (-not (Test-Path $screen2))) {
        try {
            $img = [System.Drawing.Image]::FromFile($cover)
            $w = $img.Width
            $h = $img.Height

            # Left zoom: 0% to 65% width
            $cropW = [int]($w * 0.65)
            $bmp2 = New-Object System.Drawing.Bitmap $cropW, $h
            $g2 = [System.Drawing.Graphics]::FromImage($bmp2)
            $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g2.DrawImage($img, [System.Drawing.Rectangle]::new(0, 0, $cropW, $h), 0, 0, $cropW, $h, [System.Drawing.GraphicsUnit]::Pixel)
            $bmp2.Save($screen2, $jpegCodec, $encoderParams)
            $g2.Dispose()
            $bmp2.Dispose()

            # Right zoom: 35% to 100% width
            $startX = [int]($w * 0.35)
            $cropW3 = $w - $startX
            $bmp3 = New-Object System.Drawing.Bitmap $cropW3, $h
            $g3 = [System.Drawing.Graphics]::FromImage($bmp3)
            $g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g3.DrawImage($img, [System.Drawing.Rectangle]::new(0, 0, $cropW3, $h), $startX, 0, $cropW3, $h, [System.Drawing.GraphicsUnit]::Pixel)
            $bmp3.Save($screen3, $jpegCodec, $encoderParams)
            $g3.Dispose()
            $bmp3.Dispose()

            $img.Dispose()
            Write-Host "Created sub-screens for $($dir.Name)"
        } catch {
            Write-Warning "Failed sub-screen for $($dir.Name): $_"
        }
    }
}
Write-Host "Done sub-screens!"
