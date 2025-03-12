$imageUrls = @{
    "ship-repair.jpg" = "https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
    "engine-service.jpg" = "https://images.unsplash.com/photo-1569098644584-210bcd375b59"
    "electrical-service.jpg" = "https://images.unsplash.com/photo-1581092921461-eab62e97a780"
    "port-services.jpg" = "https://images.unsplash.com/photo-1577287973870-a13371f323f9"
}

foreach ($image in $imageUrls.GetEnumerator()) {
    $outputPath = Join-Path $PSScriptRoot "images\$($image.Key)"
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
}
