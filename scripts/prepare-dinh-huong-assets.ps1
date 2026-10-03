Add-Type -AssemblyName System.Drawing

$srcDirItem = Get-ChildItem -Path "Hinh*" -Directory | Get-ChildItem -Directory | Where-Object { $_.Name -like "*16*" } | Select-Object -First 1
$srcDir = $srcDirItem.FullName
Write-Host "Found source directory: $srcDir"

$destDir = (Join-Path (Get-Location) "public\apps\dinh-huong-thanh-nien-16-18")
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88L)

$mapping = @{
    "Tinh nang 1.png" = "feature_01_dashboard_5s.jpg"
    "Tinh nang 2.png" = "feature_02_tram_hoc_thuat_2027.jpg"
    "Tinh nang 3.png" = "feature_03_la_ban_dinh_huong_ikigai.jpg"
    "Tinh nang 4.png" = "feature_04_tro_ly_giao_tiep_grow_nvc.jpg"
    "Tinh nang 5.png" = "feature_05_slang_gen_z_digital_life.jpg"
    "Tinh nang 6.png" = "feature_06_thoa_thuan_gia_dinh_ranh_gioi.jpg"
    "Tinh nang 7.png" = "feature_07_nutri_calc_dinh_duong_mua_thi.jpg"
    "Tinh nang 8.png" = "feature_08_hanh_trang_tu_lap_eq18.jpg"
    "Tinh nang 9.png" = "feature_09_phap_ly_18_dinh_danh_so.jpg"
    "Tinh nang 10.png" = "feature_10_ai_companion_247.jpg"
}

for ($i = 1; $i -le 10; $i++) {
    $pngName = "Tinh nang $i.png"
    $srcPath = Join-Path $srcDir $pngName
    $destFileName = $mapping[$pngName]
    $destPath = Join-Path $destDir $destFileName
    $screenPath = Join-Path $destDir "screen-$i.jpg"

    if (Test-Path -LiteralPath $srcPath) {
        Write-Host "Converting $pngName -> $destFileName..."
        $img = [System.Drawing.Bitmap]::FromFile((Get-Item -LiteralPath $srcPath).FullName)
        $img.Save($destPath, $jpegEncoder, $encoderParams)
        $img.Dispose()

        Copy-Item -Path $destPath -Destination $screenPath -Force
    } else {
        Write-Warning "File not found: $srcPath"
    }
}

$coverSrc = Join-Path $destDir "feature_01_dashboard_5s.jpg"
if (Test-Path $coverSrc) {
    Copy-Item -Path $coverSrc -Destination (Join-Path $destDir "cover.jpg") -Force
    Copy-Item -Path $coverSrc -Destination (Join-Path $destDir "real-cover.jpg") -Force
}

Write-Host "Image conversion complete!"
