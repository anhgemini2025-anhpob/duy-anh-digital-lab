Add-Type -AssemblyName System.Drawing

function Convert-ToWebJpg {
    param(
        [Parameter(Mandatory=$true)][string]$SrcPath,
        [Parameter(Mandatory=$true)][string]$DestPath,
        [int]$MaxWidth = 1600,
        [int]$Quality = 86
    )

    try {
        $img = [System.Drawing.Image]::FromFile($SrcPath)
        $w = $img.Width
        $h = $img.Height

        $newW = $w
        $newH = $h
        if ($w -gt $MaxWidth) {
            $newW = $MaxWidth
            $newH = [int]($h * ($MaxWidth / $w))
        }

        $bmp = New-Object System.Drawing.Bitmap $newW, $newH
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $newW, $newH)

        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

        $destDir = Split-Path -Parent $DestPath
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }

        $bmp.Save($DestPath, $jpegCodec, $encoderParams)

        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()

        $sz = [math]::Round((Get-Item $DestPath).Length / 1024)
        Write-Host "Created ($sz KB): $DestPath"
        return $true
    } catch {
        Write-Warning "Error processing file: $_"
        return $false
    }
}

$destDir = "public/apps/taxhkd"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$files = Get-ChildItem -Path "Hinh*minh*hoa*" -Recurse -File | Where-Object { $_.FullName -like "*Kinh*doanh*" } | Sort-Object Name
Write-Host "Found $($files.Count) illustration files"

if ($files.Count -ge 1) {
    Convert-ToWebJpg -SrcPath $files[0].FullName -DestPath "$destDir/real-cover.jpg"
    Convert-ToWebJpg -SrcPath $files[0].FullName -DestPath "$destDir/real-screen-1.jpg"
}
if ($files.Count -ge 2) {
    Convert-ToWebJpg -SrcPath $files[1].FullName -DestPath "$destDir/real-screen-2.jpg"
}
if ($files.Count -ge 3) {
    Convert-ToWebJpg -SrcPath $files[2].FullName -DestPath "$destDir/real-screen-3.jpg"
}

Write-Host "Images successfully converted!"
