# Upload Images to Imgur (Simpler, no account needed)
# Usage: .\scripts\upload-to-imgur.ps1 -ImagePath "path/to/image.jpg"

param(
    [Parameter(Mandatory=$true)]
    [string]$ImagePath
)

# Imgur API Client ID (anonymous upload)
$ClientID = "546c25a59c58ad7"

# Check if image exists
if (-not (Test-Path $ImagePath)) {
    Write-Host "Error: Image not found: $ImagePath" -ForegroundColor Red
    exit 1
}

Write-Host "Uploading $ImagePath to Imgur..." -ForegroundColor Cyan

# Convert image to base64
$imageBytes = [System.IO.File]::ReadAllBytes($ImagePath)
$base64 = [System.Convert]::ToBase64String($imageBytes)

# Upload to Imgur
$headers = @{
    "Authorization" = "Client-ID $ClientID"
}

$body = @{
    "image" = $base64
    "type" = "base64"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.imgur.com/3/image" -Method Post -Headers $headers -Body $body
    
    if ($response.success) {
        $imageUrl = $response.data.link
        
        Write-Host "Success! Image uploaded to Imgur" -ForegroundColor Green
        Write-Host "URL: $imageUrl" -ForegroundColor Green
        Write-Host ""
        Write-Host "Markdown syntax:" -ForegroundColor Yellow
        Write-Host "![Alt text]($imageUrl)" -ForegroundColor White
        
        # Copy to clipboard
        Set-Clipboard "![]($imageUrl)"
        Write-Host ""
        Write-Host "Markdown syntax copied to clipboard!" -ForegroundColor Cyan
        Write-Host "Delete URL: $($response.data.deletehash)" -ForegroundColor Yellow
        
    } else {
        Write-Host "Upload failed" -ForegroundColor Red
    }
    
} catch {
    Write-Host "Upload failed: $_" -ForegroundColor Red
}
