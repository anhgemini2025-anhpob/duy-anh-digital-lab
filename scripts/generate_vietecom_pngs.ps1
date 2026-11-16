[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Drawing

$destDir = (Join-Path (Get-Location) "public\apps\vietecom")
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

function Create-LogoPng($path, $size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    $brushBg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($size, $size)),
        [System.Drawing.Color]::FromArgb(255, 15, 23, 42),
        [System.Drawing.Color]::FromArgb(255, 30, 27, 75)
    )
    $g.FillRectangle($brushBg, 0, 0, $size, $size)

    $scale = $size / 512.0
    $penCard = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 99, 102, 241), (8 * $scale))
    $g.DrawRectangle($penCard, (20 * $scale), (20 * $scale), (472 * $scale), (472 * $scale))

    $penGold = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200, 245, 158, 11), (4 * $scale))
    $g.DrawRectangle($penGold, (34 * $scale), (34 * $scale), (444 * $scale), (444 * $scale))

    # Shopping bag
    $penCyan = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 56, 189, 248), (12 * $scale))
    $penCyan.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penCyan.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    
    $points = @(
        (New-Object System.Drawing.Point((140 * $scale), (190 * $scale))),
        (New-Object System.Drawing.Point((372 * $scale), (190 * $scale))),
        (New-Object System.Drawing.Point((340 * $scale), (340 * $scale))),
        (New-Object System.Drawing.Point((172 * $scale), (340 * $scale)))
    )
    $fillCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 56, 189, 248))
    $g.FillPolygon($fillCyan, $points)
    $g.DrawPolygon($penCyan, $points)

    # Handle
    $penHandle = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 245, 158, 11), (12 * $scale))
    $penHandle.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penHandle.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawArc($penHandle, (206 * $scale), (110 * $scale), (100 * $scale), (100 * $scale), 180, 180)

    # Growth trendline
    $penTrend = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 52, 211, 153), (14 * $scale))
    $penTrend.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penTrend.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($penTrend, (180 * $scale), (300 * $scale), (240 * $scale), (240 * $scale))
    $g.DrawLine($penTrend, (240 * $scale), (240 * $scale), (280 * $scale), (270 * $scale))
    $g.DrawLine($penTrend, (280 * $scale), (270 * $scale), (345 * $scale), (180 * $scale))
    $g.DrawLine($penTrend, (305 * $scale), (180 * $scale), (345 * $scale), (180 * $scale))
    $g.DrawLine($penTrend, (345 * $scale), (180 * $scale), (345 * $scale), (220 * $scale))

    # Text
    $fontTitle = New-Object System.Drawing.Font("Arial", [float](40 * $scale), [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font("Arial", [float](16 * $scale), [System.Drawing.FontStyle]::Bold)
    $brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $brushGold = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center

    $g.DrawString("VietEcom", $fontTitle, $brushWhite, ($size / 2.0), (370 * $scale), $sf)
    $g.DrawString("AI COMMERCE COPILOT", $fontSub, $brushGold, ($size / 2.0), (435 * $scale), $sf)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Create-LogoPng (Join-Path $destDir "logo.png") 512
Create-LogoPng (Join-Path $destDir "icon-512.png") 512
Create-LogoPng (Join-Path $destDir "icon-192.png") 192
Write-Host "Created logo.png and icons."

# --- CREATE COVER.PNG (1280 x 720) ---
$bmpCover = New-Object System.Drawing.Bitmap(1280, 720)
$g = [System.Drawing.Graphics]::FromImage($bmpCover)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

$bgCover = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(1280, 720)),
    [System.Drawing.Color]::FromArgb(255, 7, 17, 30),
    [System.Drawing.Color]::FromArgb(255, 15, 23, 42)
)
$g.FillRectangle($bgCover, 0, 0, 1280, 720)

# Card Frame
$cardP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 99, 102, 241), 2)
$g.DrawRectangle($cardP, 30, 30, 1220, 660)

$fHeader = New-Object System.Drawing.Font("Arial", 38, [System.Drawing.FontStyle]::Bold)
$fSub = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Regular)
$fSection = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)
$fText = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)
$fNumber = New-Object System.Drawing.Font("Arial", 34, [System.Drawing.FontStyle]::Bold)

$bWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$bGold = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
$bCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
$bEmerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
$bGray = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

$g.DrawString("VietEcom - AI Commerce & Social Selling Viet Nam", $fHeader, $bWhite, 60, 60)
$g.DrawString("He sinh thai AI Business Copilot giai quyet noi dau ban hang online tu goc", $fSub, $bGold, 60, 120)

# Left Box: 5 Key Features
$panelB = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 14, 34, 61))
$panelP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 56, 189, 248), 2)
$g.FillRectangle($panelB, 60, 170, 600, 480)
$g.DrawRectangle($panelP, 60, 170, 600, 480)

$g.DrawString("5 TINH NANG COT LOI NGAN GON", $fSection, $bCyan, 85, 195)

$feats = @(
    "1. Profit Engine: Tinh nguoc tu loi nhuan muc tieu ra so don & ngan sach Ads",
    "2. AI Copilot: Chuoi Keyword -> Nguyen nhan -> Framework -> Prompt -> KPI",
    "3. Compliance Center: Quet sach tu vi pham TikTok Shop, Shopee & Luat VN",
    "4. CRM & Da kenh: Hop thu hoi thoai tap trung, phan khuc RFM & lich noi dung",
    "5. Ads Doctor: Bat benh ROAS/POAS, du bao dong tien & canh bao ton kho ROP"
)

$y = 250
foreach ($f in $feats) {
    $g.DrawString("[v]", $fText, $bEmerald, 85, $y)
    $g.DrawString($f, $fText, $bWhite, 120, $y)
    $y += 75
}

# Right Box 1: Profit Engine Preview
$g.FillRectangle($panelB, 690, 170, 530, 220)
$g.DrawRectangle($panelP, 690, 170, 530, 220)

$g.DrawString("PROFIT ENGINE (TINH NGUOC LOI NHUAN)", $fSection, $bGold, 715, 195)
$g.DrawString("+25.000.000 VND", $fNumber, $bEmerald, 715, 230)
$g.DrawString("Loi nhuan rong thuc nhan sau phi san & thue", $fSub, $bGray, 715, 280)
$g.DrawString("Target: 342 don | Ads: 18.2 tr | Phi san: 14.5% | Hoa von: 186 don", $fText, $bCyan, 715, 320)

# Right Box 2: Official Link & Compliance
$g.FillRectangle($panelB, 690, 420, 530, 230)
$g.DrawRectangle($panelP, 690, 420, 530, 230)

$g.DrawString("KENH HOAT DONG & DOMAIN CHINH THUC", $fSection, $bEmerald, 715, 445)
$g.DrawString("Domain: https://vietecom.vercel.app", $fText, $bGold, 715, 485)
$g.DrawString("Ket noi: TikTok Shop - Shopee - Meta Ads - Messenger", $fText, $bWhite, 715, 525)
$g.DrawString("Kiem duyet 100% noi dung va kich ban theo Nghi dinh 38/2021", $fSub, $bGray, 715, 565)
$g.DrawString("O cho YouTube duoc tich hop san tren landing page", $fText, $bCyan, 715, 600)

$bmpCover.Save((Join-Path $destDir "cover.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmpCover.Dispose()
Write-Host "Created cover.png"

# --- CREATE 4 FEATURE DETAIL IMAGES ---
function Make-Feature($filename, $fTag, $title, $numVal, $numDesc, $points) {
    $bmp = New-Object System.Drawing.Bitmap(1200, 750)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point(1200, 750)),
        [System.Drawing.Color]::FromArgb(255, 7, 17, 30),
        [System.Drawing.Color]::FromArgb(255, 14, 34, 61)
    )
    $g.FillRectangle($bg, 0, 0, 1200, 750)

    $frameP = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 56, 189, 248), 2)
    $g.DrawRectangle($frameP, 40, 40, 1120, 670)

    $fT1 = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)
    $fT2 = New-Object System.Drawing.Font("Arial", 30, [System.Drawing.FontStyle]::Bold)
    $fN1 = New-Object System.Drawing.Font("Arial", 32, [System.Drawing.FontStyle]::Bold)
    $fS1 = New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Regular)
    $fL1 = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)

    $bW = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $bG = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $bC = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
    $bE = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
    $bGr = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

    $g.DrawString($fTag, $fT1, $bG, 70, 70)
    $g.DrawString($title, $fT2, $bW, 70, 105)

    # Metric box
    $bPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 11, 26, 47))
    $pPanel = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 99, 102, 241), 2)
    $g.FillRectangle($bPanel, 70, 175, 450, 120)
    $g.DrawRectangle($pPanel, 70, 175, 450, 120)
    $g.DrawString($numVal, $fN1, $bE, 90, 195)
    $g.DrawString($numDesc, $fS1, $bGr, 90, 245)

    # Bullet points box
    $g.FillRectangle($bPanel, 70, 320, 1060, 310)
    $g.DrawRectangle($pPanel, 70, 320, 1060, 310)
    $g.DrawString("LOI ICH THUC CHIEN:", $fT1, $bG, 95, 345)

    $yP = 395
    foreach ($pt in $points) {
        $g.DrawString("*", $fL1, $bC, 95, $yP)
        $g.DrawString($pt, $fL1, $bW, 125, $yP)
        $yP += 50
    }

    $g.DrawString("VietEcom - AI Business Copilot | https://vietecom.vercel.app", $fS1, $bGr, 70, 650)

    $bmp.Save((Join-Path $destDir $filename), [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $filename"
}

Make-Feature `
    "feature_01_profit_engine.png" `
    "TINH NANG 01" `
    "Profit Engine - Tinh Nguoc Loi Nhuan Thuc Te" `
    "+25.000.000 VND" `
    "Muc tieu loi nhuan rong thuc nhan sau thue" `
    @(
        "Nhap loi nhuan rong mong muon -> Tu dong tinh so don can ban va doanh so.",
        "Boc tach day du phi san (8-14%), phi hoan huy, bao bi va thue TNCN/GTGT.",
        "Xac dinh diem hoa von BEP va nguong ngan sach quang cao Ads an toan.",
        "Khong bao gio roi vao bay 'doanh so tram trieu nhung tui rong tieu'."
    )

Make-Feature `
    "feature_02_ai_solve_painpoint.png" `
    "TINH NANG 02" `
    "AI Copilot - Chuoi Giai Quyet Noi Dau Ban Hang" `
    "6 BUOC LOGIC" `
    "Keyword -> Nguyen nhan -> Framework -> Prompt -> KPI" `
    @(
        "Thu vien framework kinh doanh thuc chien may do cho thi truong Viet Nam.",
        "Tu dong sinh kich ban Livestream, video ngan TikTok va bai dang chuyen doi.",
        "AI Business Chat chuyen sau tu van san pham, dinh gia va ke hoach hanh dong.",
        "Thiet lap KPI ro rang theo tung ngay giup kiem soat tien do de dang."
    )

Make-Feature `
    "feature_03_compliance_checker.png" `
    "TINH NANG 03" `
    "Compliance Center - Quet Sach Tu Ngu Vi Pham" `
    "100% AN TOAN" `
    "Tuan thu chinh sach TikTok Shop, Shopee & Luat VN" `
    @(
        "Quet tu ngu vi pham truoc khi dang bai hoac chay quang cao Ads.",
        "Trich dan can cu dieu luat cu the va quy che san thuong mai.",
        "Goi y tu ngu thay the thong minh giu nguyen tinh hap dan.",
        "Tranh tuyet doi nguy co bi an gay, bop tuong tac hoac khoa gian hang."
    )

Make-Feature `
    "feature_04_omnichannel_crm.png" `
    "TINH NANG 04" `
    "Ads Doctor & CRM Da Kenh - Toi Uu Dong Tien" `
    "ROAS / POAS" `
    "Chuan doan quang cao va canh bao ton kho ROP" `
    @(
        "Bat benh quang cao qua cac chi so CTR, CPC, CVR, ROAS va POAS thoi gian thuc.",
        "Phan nhom khach hang RFM de cham soc va remarketing dung doi tuong.",
        "Hop thu hoi thoai tap trung va quy trinh phe duyet hanh dong an toan.",
        "Canh bao diem dat hang lai (ROP) chong dut gay nguon hang va chay kho."
    )

Write-Host "All VietEcom PNG assets successfully generated!"
