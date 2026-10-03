
Add-Type -AssemblyName System.Drawing

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)

$baseDir = "C:\Nam 2026\Web app\DANH SACH CAC APP WEB DA THUC HIÊN"

$apps = @(
  @{
    Id = "nuoi-day-tre-6-11"
    SrcDir = "$baseDir\Hinh ảnh minh hoa cho ung dung\Nuoi day be tu 6 den 11 tuổi"
    DestDir = "$baseDir\public\apps\nuoi-day-tre-6-11"
    LogoSrc = "$baseDir\Hinh ảnh minh hoa cho ung dung\Nuoi day be tu 6 den 11 tuổi\Logo-lamchame2.png"
    Names = @(
      "feature_01_ai_companion_247.jpg",
      "feature_02_parenting_scripts.jpg",
      "feature_03_home_dashboard.jpg",
      "feature_04_child_profile.jpg",
      "feature_05_academic_knowledge_graph.jpg",
      "feature_06_emotional_observation.jpg",
      "feature_07_digital_family_manager.jpg",
      "feature_08_health_nutrition.jpg",
      "feature_09_family_routine_quality_time.jpg",
      "feature_10_weekly_review_sos_zone.jpg"
    )
  },
  @{
    Id = "thau-hieu-thieu-nien-12-15"
    SrcDir = "$baseDir\Hinh ảnh minh hoa cho ung dung\Thấu hiểu thiếu niên 12 đến 15 tuổi"
    DestDir = "$baseDir\public\apps\thau-hieu-thieu-nien-12-15"
    LogoSrc = "$baseDir\Hinh ảnh minh hoa cho ung dung\Thấu hiểu thiếu niên 12 đến 15 tuổi\Logo-lamchame3.png"
    Names = @(
      "feature_01_onboarding_projector.jpg",
      "feature_02_tanner_nutrition.jpg",
      "feature_03_emotional_first_aid_nvc.jpg",
      "feature_04_cyber_safety_grooming.jpg",
      "feature_05_legal_framework_age_14.jpg",
      "feature_06_holland_career_9plus.jpg",
      "feature_07_family_agreement_matrix.jpg",
      "feature_08_ai_dialogue_simulator.jpg",
      "feature_09_thcs_curriculum_6to9.jpg",
      "feature_10_family_connection.jpg"
    )
  },
  @{
    Id = "dinh-huong-thanh-nien-16-18"
    SrcDir = "$baseDir\Hinh ảnh minh hoa cho ung dung\Định hướng thanh niên 16 đến 18 tuổi"
    DestDir = "$baseDir\public\apps\dinh-huong-thanh-nien-16-18"
    LogoSrc = "$baseDir\Hinh ảnh minh hoa cho ung dung\Định hướng thanh niên 16 đến 18 tuổi\Logo-lamchame4.png"
    Names = @(
      "feature_01_home_dashboard_weekly_insight.jpg",
      "feature_02_academic_exam_hub.jpg",
      "feature_03_career_future_direction.jpg",
      "feature_04_parent_teen_connection.jpg",
      "feature_05_ai_communication_assistant.jpg",
      "feature_06_family_boundary_builder.jpg",
      "feature_07_health_wellness_tracker.jpg",
      "feature_08_digital_life_guidance.jpg",
      "feature_09_age18_citizenship_prep.jpg",
      "feature_10_ai_companion_family_journal.jpg"
    )
  }
)

foreach ($app in $apps) {
    Write-Host "`n==============================================="
    Write-Host "Converting app: $($app.Id)"
    Write-Host "==============================================="

    if (-not (Test-Path $app.DestDir)) {
        New-Item -ItemType Directory -Path $app.DestDir -Force | Out-Null
    }

    # Copy logo
    if (Test-Path $app.LogoSrc) {
        Copy-Item -Path $app.LogoSrc -Destination "$($app.DestDir)\app-logo.png" -Force
        Write-Host "Copied logo to $($app.DestDir)\app-logo.png"
    }

    for ($i = 1; $i -le 10; $i++) {
        $srcFile = "$($app.SrcDir)\Tinh nang $i.png"
        if (-not (Test-Path $srcFile)) {
            $srcFile = "$($app.SrcDir)\tinh nang $i.png"
        }
        if (-not (Test-Path $srcFile)) {
            Write-Error "Source file not found: $srcFile"
            continue
        }

        $destNamed = "$($app.DestDir)\$($app.Names[$i - 1])"
        $destScreen = "$($app.DestDir)\screen-$i.jpg"
        $destFeature = "$($app.DestDir)\feature_$("{0:D2}" -f $i)_screen.jpg"

        Write-Host "Processing [$i/10]: $srcFile"
        $bmp = [System.Drawing.Bitmap]::FromFile($srcFile)
        $bmp.Save($destNamed, $jpegEncoder, $encoderParams)
        $bmp.Save($destScreen, $jpegEncoder, $encoderParams)
        $bmp.Save($destFeature, $jpegEncoder, $encoderParams)

        if ($i -eq 1) {
            $bmp.Save("$($app.DestDir)\cover.jpg", $jpegEncoder, $encoderParams)
            $bmp.Save("$($app.DestDir)\real-cover.jpg", $jpegEncoder, $encoderParams)
        }
        $bmp.Dispose()
        Write-Host "  -> Saved: $($app.Names[$i - 1]) (and screen-$i.jpg)"
    }
}

Write-Host "`nAll images converted and saved successfully!"
