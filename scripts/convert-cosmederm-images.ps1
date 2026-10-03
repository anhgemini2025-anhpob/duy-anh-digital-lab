Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIÊN\Hinh ảnh minh hoa cho ung dung\CosmeDerm AI"
if (-not (Test-Path -LiteralPath $srcDir)) {
    $folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*Hinh*minh*hoa*" }
    $sub = Get-ChildItem -LiteralPath $folder.FullName -Directory | Where-Object { $_.Name -like "*CosmeDerm*" }
    $srcDir = $sub.FullName
}

Write-Host "Source directory: $srcDir"

$destDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIÊN\public\apps\cosmederm-ai-academy"
if (-not (Test-Path -LiteralPath $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$mapping = @(
    @{ SrcName = "anh 0.png";  DestName = "feature_01_hoc_thuc_hanh_tra_cuu_da_lieu_my_pham.jpg"; IsCover = $true },
    @{ SrcName = "anh 1.png";  DestName = "feature_02_hoc_theo_dung_trinh_do.jpg"; IsCover = $false },
    @{ SrcName = "anh 2.png";  DestName = "feature_03_phong_lab_cong_thuc_ao.jpg"; IsCover = $false },
    @{ SrcName = "anh 3.png";  DestName = "feature_04_tra_cuu_thanh_phan_do_an_toan.jpg"; IsCover = $false },
    @{ SrcName = "anh 4.png";  DestName = "feature_05_cay_phac_do_tham_my.jpg"; IsCover = $false },
    @{ SrcName = "anh 5.png";  DestName = "feature_06_chan_doan_toc_da_dau.jpg"; IsCover = $false },
    @{ SrcName = "anh 6.png";  DestName = "feature_07_hoc_qua_tinh_huong_tro_choi.jpg"; IsCover = $false },
    @{ SrcName = "anh 7.png";  DestName = "feature_08_so_do_tu_duy_mo_hinh_3d.jpg"; IsCover = $false },
    @{ SrcName = "anh 8.png";  DestName = "feature_09_thu_vien_tri_thuc.jpg"; IsCover = $false },
    @{ SrcName = "anh 9.png";  DestName = "feature_10_thiet_ke_toi_uu_cho_dien_thoai.jpg"; IsCover = $false },
    @{ SrcName = "anh 10.png"; DestName = "feature_11_trai_nghiem_hien_dai_truc_quan.jpg"; IsCover = $false },
    @{ SrcName = "anh 11.png"; DestName = "feature_12_loi_ket_hoc_khoa_hoc_thuc_hanh_thong_minh.jpg"; IsCover = $false }
)

$i = 1
foreach ($item in $mapping) {
    $srcPath = Join-Path $srcDir $item.SrcName
    $destPath = Join-Path $destDir $item.DestName
    $destScreen = Join-Path $destDir "screen-$i.jpg"

    Write-Host "Converting $i : $($item.SrcName) -> $($item.DestName)"
    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $bmp.Save($destPath, $jpegEncoder, $encoderParams)
    $bmp.Save($destScreen, $jpegEncoder, $encoderParams)

    if ($item.IsCover) {
        $coverPath = Join-Path $destDir "cover.jpg"
        $realCoverPath = Join-Path $destDir "real-cover.jpg"
        $bmp.Save($coverPath, $jpegEncoder, $encoderParams)
        $bmp.Save($realCoverPath, $jpegEncoder, $encoderParams)
        Write-Host "  Also saved cover.jpg and real-cover.jpg"
    }
    if ($i -eq 2) {
        $bmp.Save((Join-Path $destDir "real-screen-1.jpg"), $jpegEncoder, $encoderParams)
    }
    if ($i -eq 3) {
        $bmp.Save((Join-Path $destDir "real-screen-2.jpg"), $jpegEncoder, $encoderParams)
    }
    if ($i -eq 4) {
        $bmp.Save((Join-Path $destDir "real-screen-3.jpg"), $jpegEncoder, $encoderParams)
    }

    $bmp.Dispose()
    $size = (Get-Item -LiteralPath $destPath).Length
    Write-Host "  Saved $destPath ($size bytes)"
    $i++
}

Write-Host "All 12 CosmeDerm images converted successfully!"
