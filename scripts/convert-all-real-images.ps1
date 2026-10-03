Add-Type -AssemblyName System.Drawing

function Convert-ToWebJpg {
    param(
        [Parameter(Mandatory=$true)][System.IO.FileInfo]$FileItem,
        [Parameter(Mandatory=$true)][string]$DestPath,
        [int]$MaxWidth = 1600,
        [int]$Quality = 85
    )

    try {
        $img = [System.Drawing.Image]::FromFile($FileItem.FullName)
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
        Write-Host "OK ($sz KB): $DestPath"
        return $true
    } catch {
        Write-Warning "Error processing $($FileItem.Name): $_"
        return $false
    }
}

$root = Get-Item "Hinh*minh*hoa*"
Write-Host "Found illustration folder: $($root.FullName)"

# Get all files inside illustration folder
$allFiles = Get-ChildItem -Path $root.FullName -Recurse -File | Where-Object { $_.Extension -match "\.(png|jpg|jpeg)$" }
Write-Host "Total illustration files found: $($allFiles.Count)"

# Mapping table by matching keywords in file or parent folder name
$rules = @(
    @{ id = "cosmederm-ai-academy"; key = "CosmeDerm" },
    @{ id = "foodtech-hub"; key = "Food tech hub" },
    @{ id = "uth-scm-navigator"; key = "SCM" },
    @{ id = "customer-visit"; key = "Customer visit" },
    @{ id = "vet-aqua-erp"; key = "ERP thu Y" },
    @{ id = "htx-rau-cu"; key = "Hop tac xa" },
    @{ id = "spa-landing"; key = "Landing page cosmetic" },
    @{ id = "lanxess-cosmetic-advisor"; key = "Lanxess" },
    @{ id = "lipoid-advisor"; key = "Lipoid" },
    @{ id = "quan-ly-hop-dong-abm"; key = "Quan ly hop dong" },
    @{ id = "badminton-management"; key = "Cau long" },
    @{ id = "clinic-spa"; key = "clinic spa" },
    @{ id = "bjc-sales-pitch"; key = "Sales pitch" },
    @{ id = "bjc-sales-training"; key = "Sales training" },
    @{ id = "tro-ly-vi-ngon"; key = "tro ly vi ngon" },
    @{ id = "vanderbilt-advisor"; key = "Vanderbilt" },
    @{ id = "yeast-extract-test"; key = "thu thach vi ngon" },
    @{ id = "algaktiv-advisor"; key = "Algaktiv" }
)

foreach ($r in $rules) {
    $matched = $allFiles | Where-Object { $_.FullName -like "*$($r.key)*" } | Sort-Object Name
    Write-Host "`nMapping for [$($r.id)] -> $($matched.Count) files"
    $idx = 1
    foreach ($m in $matched) {
        $dest = "public/apps/$($r.id)/real-screen-$idx.jpg"
        Convert-ToWebJpg -FileItem $m -DestPath $dest -MaxWidth 1600 -Quality 86
        if ($idx -eq 1) {
            $coverDest = "public/apps/$($r.id)/real-cover.jpg"
            Convert-ToWebJpg -FileItem $m -DestPath $coverDest -MaxWidth 1600 -Quality 86
        }
        $idx++
    }
}

Write-Host "`nAll illustration files converted successfully!"
