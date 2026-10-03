Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIEN\Hinh ?nh minh hoa cho ung dung\Food tech Hub"
# Ensure we find the folder correctly if encoding differs
if (-not (Test-Path -LiteralPath $srcDir)) {
    $folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*Hinh*minh*hoa*" }
    $sub = Get-ChildItem -LiteralPath $folder.FullName -Directory | Where-Object { $_.Name -like "*Food*tech*" }
    $srcDir = $sub.FullName
}

Write-Host "Source directory: $srcDir"

$destDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIEN\public\apps\foodtech-hub"
if (-not (Test-Path -LiteralPath $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$mapping = @(
    @{ SrcName = "ANH 1.png";  DestName = "feature_01_trung_tam_tri_thuc_cong_nghe_thuc_pham.jpg"; IsCover = $true },
    @{ SrcName = "ANH 2.png";  DestName = "feature_02_chan_doan_nguyen_nhan_su_co.jpg"; IsCover = $false },
    @{ SrcName = "Anh 3.png";  DestName = "feature_03_huong_dan_khac_phuc_su_co_nha_may.jpg"; IsCover = $false },
    @{ SrcName = "Anh 4.png";  DestName = "feature_04_bang_thuc_chien_xu_ly_su_co.jpg"; IsCover = $false },
    @{ SrcName = "Anh 5.png";  DestName = "feature_05_he_thong_hoa_kien_thuc_theo_nganh_hang.jpg"; IsCover = $false },
    @{ SrcName = "Anh 6.png";  DestName = "feature_06_tra_cuu_ho_so_phap_ly_xuat_khau.jpg"; IsCover = $false },
    @{ SrcName = "Anh 7.png";  DestName = "feature_07_tra_cuu_ma_phu_gia_e_number.jpg"; IsCover = $false },
    @{ SrcName = "Anh 8.png";  DestName = "feature_08_may_tinh_cong_thuc_rd.jpg"; IsCover = $false },
    @{ SrcName = "Anh 9.png";  DestName = "feature_09_tinh_toan_thong_so_nhiet_f0_d_z.jpg"; IsCover = $false },
    @{ SrcName = "Anh 10.png"; DestName = "feature_10_kiem_tra_thanh_phan_va_noi_dung_nhan.jpg"; IsCover = $false },
    @{ SrcName = "Anh 11.png"; DestName = "feature_11_flashcard_va_tro_choi_ren_phan_xa.jpg"; IsCover = $false },
    @{ SrcName = "Anh 12.png"; DestName = "feature_12_loi_ket_bien_kien_thuc_thanh_cong_cu_hanh_dong.jpg"; IsCover = $false }
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

    $bmp.Dispose()
    $size = (Get-Item -LiteralPath $destPath).Length
    Write-Host "  Saved $destPath ($size bytes)"
    $i++
}

Write-Host "All 12 images converted successfully!"
