$imageUrl = "https://images.unsplash.com/photo-1559091169-7d8c3e44115b"
$outputPath = Join-Path $PSScriptRoot "images\hero-ship.jpg"
Write-Host "Downloading hero image..."
Invoke-WebRequest -Uri $imageUrl -OutFile $outputPath
Write-Host "Downloaded hero image"
