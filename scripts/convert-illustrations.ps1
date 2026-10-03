Add-Type -AssemblyName System.Drawing

function Save-OptimizedImage {
    param(
        [string]$SourcePath,
        [string]$DestPath,
        [int]$MaxWidth = 1600,
        [int]$Quality = 88
    )

    if (-not (Test-Path $SourcePath)) {
        Write-Warning "Source not found: $SourcePath"
        return $false
    }

    try {
        $img = [System.Drawing.Image]::FromFile($SourcePath)
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

        $size = (Get-Item $DestPath).Length
        Write-Host "Saved: $DestPath ($( [math]::Round($size/1024) ) KB)"
        return $true
    } catch {
        Write-Error "Failed to process $SourcePath: $_"
        return $false
    }
}

$apps = @(
    @{
        id = "cosmederm-ai-academy"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/CosmeDerm AI/anh minh hoa- CosmeDerm 1.jpg",
            "Hinh ảnh minh hoa cho ung dung/CosmeDerm AI/anh minh hoa- CosmeDerm 2.png",
            "Hinh ảnh minh hoa cho ung dung/CosmeDerm AI/anh minh hoa- CosmeDerm 3.png"
        )
    },
    @{
        id = "foodtech-hub"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Food tech Hub/Anh minh hoa Food tech hub-1.png",
            "Hinh ảnh minh hoa cho ung dung/Food tech Hub/Anh minh hoa Food tech hub-2.png",
            "Hinh ảnh minh hoa cho ung dung/Food tech Hub/Anh minh hoa Food tech hub-3.png"
        )
    },
    @{
        id = "uth-scm-navigator"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/SCM  UHT/anh minh hoa cho SCM UHT -1.png",
            "c:/Nam 2026/Web app/SCM edu- UTH/demand_forecast_comparison.png",
            "c:/Nam 2026/Web app/SCM edu- UTH/sensitivity_analysis_csl.png",
            "c:/Nam 2026/Web app/SCM edu- UTH/Sáu_nhân_tố_cung_ứng.png"
        )
    },
    @{
        id = "bjc-sales-training"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Sales training.png")
    },
    @{
        id = "customer-visit"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Customer visit.png")
    },
    @{
        id = "lipoid-advisor"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Lipoid.png")
    },
    @{
        id = "clinic-spa"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Quan ly phòng clinic spa.png", "Hinh ảnh minh hoa cho ung dung/Anh minh hoa Quan ly phong clinic spa.png")
    },
    @{
        id = "spa-landing"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Landing page cosmetic.png")
    },
    @{
        id = "bjc-sales-pitch"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Sales pitch.png")
    },
    @{
        id = "badminton-management"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa quan ly nhom Cau long.png",
            "c:/Nam 2026/Web app/APP CÂU LONG/hinh giao dien app.jpg"
        )
    },
    @{
        id = "tro-ly-vi-ngon"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa tro ly vi ngon.png")
    },
    @{
        id = "vet-aqua-erp"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa ERP thu Y-thuy san.png")
    },
    @{
        id = "yeast-extract-test"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa thu thach vi ngon.png",
            "c:/Nam 2026/Web app/Yeast extract application/Lallemand/Register license/PhotoGrid_1765444407638_resized.jpg"
        )
    },
    @{
        id = "vanderbilt-advisor"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa Vanderbilt.png",
            "c:/Nam 2026/Web app/Vanderbilt advisor/iểu đồ tư duy Sản phẩm và Thị trường ứng dụng Vanderbilt Minerals.png"
        )
    },
    @{
        id = "algaktiv-advisor"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa Algaktiv.png",
            "c:/Nam 2026/Web app/Algaktiv advisor/public/stories/bioskn-01.jpg",
            "c:/Nam 2026/Web app/Algaktiv advisor/public/stories/bioskn-02.jpg",
            "c:/Nam 2026/Web app/Algaktiv advisor/public/stories/bioskn-03.jpg"
        )
    },
    @{
        id = "lanxess-cosmetic-advisor"
        files = @("Hinh ảnh minh hoa cho ung dung/Anh minh hoa Lanxess.png")
    },
    @{
        id = "htx-rau-cu"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa Hop tac xa.png",
            "c:/Nam 2026/Web app/App Quan ly Hop tac xa/Icon HTX/HTX_icon_1024.png"
        )
    },
    @{
        id = "quan-ly-hop-dong-abm"
        files = @(
            "Hinh ảnh minh hoa cho ung dung/Anh minh hoa Quan ly hop dong.png",
            "c:/Nam 2026/Web app/App quan ly hop dong - ab mauri/icon-512.png"
        )
    }
)

Write-Host "Starting batch image conversion..."
foreach ($app in $apps) {
    $targetDir = "public/apps/$($app.id)"
    $idx = 1
    foreach ($file in $app.files) {
        if (Test-Path $file) {
            $dest = "$targetDir/real-screenshot-$idx.jpg"
            Save-OptimizedImage -SourcePath $file -DestPath $dest -MaxWidth 1600 -Quality 88
            if ($idx -eq 1) {
                # Also save as real-cover.jpg
                $coverDest = "$targetDir/real-cover.jpg"
                Save-OptimizedImage -SourcePath $file -DestPath $coverDest -MaxWidth 1600 -Quality 88
            }
            $idx++
        }
    }
}
Write-Host "Completed batch image conversion!"
