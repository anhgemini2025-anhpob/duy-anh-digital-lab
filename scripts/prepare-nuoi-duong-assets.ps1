[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIÊN\Hinh ảnh minh hoa cho ung dung\Nuoi duong be 0 -60 tháng"
$destDir = (Join-Path (Get-Location) "public\apps\nuoi-duong-be-0-60")

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$mapping = @(
    @{ Id = 1; Pattern = "1"; Name = "feature_01_home_dashboard_smart_logging.jpg" },
    @{ Id = 2; Pattern = "2"; Name = "feature_02_growth_engine.jpg" },
    @{ Id = 3; Pattern = "3"; Name = "feature_03_development_center.jpg" },
    @{ Id = 4; Pattern = "4"; Name = "feature_04_nutrition_meal_planner.jpg" },
    @{ Id = 5; Pattern = "5"; Name = "feature_05_offline_emergency_sos.jpg" },
    @{ Id = 6; Pattern = "6"; Name = "feature_06_vaccination_smart_reminders.jpg" },
    @{ Id = 7; Pattern = "7"; Name = "feature_07_digital_family_vault.jpg" },
    @{ Id = 8; Pattern = "8"; Name = "feature_08_ai_parenting_companion.jpg" },
    @{ Id = 9; Pattern = "9"; Name = "feature_09_activity_generator.jpg" },
    @{ Id = 10; Pattern = "10"; Name = "feature_10_smart_family_timeline_journal.jpg" }
)

$srcFiles = Get-ChildItem -Path $srcDir -Filter "*.png"
Write-Host "Found $($srcFiles.Count) PNG files in $srcDir"

foreach ($item in $mapping) {
    $num = $item.Id
    $pattern = "^tinh\s*nang\s*" + $num + "\.png$"
    $matched = $srcFiles | Where-Object { $_.Name -match $pattern }
    
    if ($matched) {
        Write-Host "Converting $($matched.Name) -> $($item.Name)..."
        $bmp = [System.Drawing.Bitmap]::FromFile($matched.FullName)
        
        $destPath = Join-Path $destDir $item.Name
        $bmp.Save($destPath, $jpegEncoder, $encoderParams)
        
        # Also copy to screen-N.jpg and feature_0N_screen.jpg for backward compatibility
        $screenPath = Join-Path $destDir "screen-$num.jpg"
        $oldFeaturePath = Join-Path $destDir ("feature_{0:D2}_screen.jpg" -f $num)
        Copy-Item -Path $destPath -Destination $screenPath -Force
        Copy-Item -Path $destPath -Destination $oldFeaturePath -Force
        
        if ($num -eq 1) {
            Copy-Item -Path $destPath -Destination (Join-Path $destDir "cover.jpg") -Force
            Copy-Item -Path $destPath -Destination (Join-Path $destDir "real-cover.jpg") -Force
        }
        
        $bmp.Dispose()
        Write-Host "  -> Successfully wrote $destPath and $screenPath"
    } else {
        Write-Error "Could not find file matching $pattern in $srcDir"
    }
}

Write-Host "Done converting all 10 feature images!"
