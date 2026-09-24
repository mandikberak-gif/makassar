Add-Type -AssemblyName System.Drawing

$srcPath = "d:\juragan77\images\logo_juragan77.png"
$destPath = "d:\juragan77\images\logo_juragan77_clean.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Corner pixel: $($bmp.GetPixel(0,0))"
Write-Host "Middle pixel: $($bmp.GetPixel(230, 270))"

# Check vertical line through middle
$topY = -1
$bottomY = -1
for ($y = 0; $y -lt $height; $y++) {
    $p = $bmp.GetPixel(230, $y)
    # Check if this pixel is NOT pure white (e.g. R < 245 or G < 245 or B < 245)
    if ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245) {
        if ($topY -eq -1) { $topY = $y }
        $bottomY = $y
    }
}

# Check horizontal line through middle
$midY = [int](($topY + $bottomY) / 2)
$leftX = -1
$rightX = -1
for ($x = 0; $x -lt $width; $x++) {
    $p = $bmp.GetPixel($x, $midY)
    if ($p.R -lt 245 -or $p.G -lt 245 -or $p.B -lt 245) {
        if ($leftX -eq -1) { $leftX = $x }
        $rightX = $x
    }
}

Write-Host "Logo Boundaries: TopY=$topY, BottomY=$bottomY, LeftX=$leftX, RightX=$rightX"
$centerX = ($leftX + $rightX) / 2.0
$centerY = ($topY + $bottomY) / 2.0
$radius = [Math]::Max(($rightX - $leftX), ($bottomY - $topY)) / 2.0

Write-Host "Accurate Center: ($centerX, $centerY), Radius: $radius"

# Now let's create a cropped square transparent bitmap of size 2*radius + 8
$side = [int]($radius * 2 + 10)
$outBmp = New-Object System.Drawing.Bitmap($side, $side, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($oy = 0; $oy -lt $side; $oy++) {
    for ($ox = 0; $ox -lt $side; $ox++) {
        $srcX = [int]($centerX - $radius - 5 + $ox)
        $srcY = [int]($centerY - $radius - 5 + $oy)
        
        $dx = $ox - ($side / 2.0)
        $dy = $oy - ($side / 2.0)
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)
        
        if ($dist -gt $radius + 1.5) {
            $outBmp.SetPixel($ox, $oy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($dist -gt $radius - 1.0) {
            $alpha = [int]([Math]::Max(0, [Math]::Min(255, (1.0 - ($dist - ($radius - 1.0)) / 2.5) * 255)))
            if ($srcX -ge 0 -and $srcX -lt $width -and $srcY -ge 0 -and $srcY -lt $height) {
                $p = $bmp.GetPixel($srcX, $srcY)
                $outBmp.SetPixel($ox, $oy, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
            }
        } else {
            if ($srcX -ge 0 -and $srcX -lt $width -and $srcY -ge 0 -and $srcY -lt $height) {
                $p = $bmp.GetPixel($srcX, $srcY)
                $outBmp.SetPixel($ox, $oy, $p)
            }
        }
    }
}

$outBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Success! Created perfect transparent circular emblem at $destPath ($side x $side px)"

$bmp.Dispose()
$outBmp.Dispose()
