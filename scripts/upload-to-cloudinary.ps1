# Upload Images to Cloudinary
# Usage: .\scripts\upload-to-cloudinary.ps1 -ImagePath "path/to/image.jpg" -Folder "articles/my-post"

param(
    [Parameter(Mandatory=$true)]
    [string]$ImagePath,
    
    [Parameter(Mandatory=$false)]
    [string]$Folder = "blog"
)

# Load environment variables
$envFile = ".env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

$CLOUDINARY_CLOUD_NAME = $env:CLOUDINARY_CLOUD_NAME
$CLOUDINARY_API_KEY = $env:CLOUDINARY_API_KEY
$CLOUDINARY_API_SECRET = $env:CLOUDINARY_API_SECRET

if (-not $CLOUDINARY_CLOUD_NAME -or -not $CLOUDINARY_API_KEY -or -not $CLOUDINARY_API_SECRET) {
    Write-Host "Error: Cloudinary credentials not found in .env.local" -ForegroundColor Red
    Write-Host "Please add:" -ForegroundColor Yellow
    Write-Host "CLOUDINARY_CLOUD_NAME=your_cloud_name" -ForegroundColor Yellow
    Write-Host "CLOUDINARY_API_KEY=your_api_key" -ForegroundColor Yellow
    Write-Host "CLOUDINARY_API_SECRET=your_api_secret" -ForegroundColor Yellow
    exit 1
}

# Check if image exists
if (-not (Test-Path $ImagePath)) {
    Write-Host "Error: Image not found: $ImagePath" -ForegroundColor Red
    exit 1
}

Write-Host "Uploading $ImagePath to Cloudinary..." -ForegroundColor Cyan

# Prepare upload
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$uploadPreset = "blog_images" # Create this in Cloudinary dashboard

# Create signature
$signatureString = "folder=$Folder&timestamp=$timestamp$CLOUDINARY_API_SECRET"
$signature = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($signatureString))).Replace("-", "").ToLower()

# Upload URL
$uploadUrl = "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload"

# Prepare multipart form data
$boundary = [System.Guid]::NewGuid().ToString()
$fileBytes = [System.IO.File]::ReadAllBytes($ImagePath)
$fileName = [System.IO.Path]::GetFileName($ImagePath)

# Create request
try {
    $response = Invoke-RestMethod -Uri $uploadUrl -Method Post -ContentType "multipart/form-data; boundary=$boundary" -Body @{
        file = $ImagePath
        api_key = $CLOUDINARY_API_KEY
        timestamp = $timestamp
        signature = $signature
        folder = $Folder
    }
    
    Write-Host "Success! Image uploaded" -ForegroundColor Green
    Write-Host "URL: $($response.secure_url)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Markdown syntax:" -ForegroundColor Yellow
    Write-Host "![Alt text]($($response.secure_url))" -ForegroundColor White
    
    # Copy to clipboard
    Set-Clipboard "![]($($response.secure_url))"
    Write-Host ""
    Write-Host "Markdown syntax copied to clipboard!" -ForegroundColor Cyan
    
} catch {
    Write-Host "Upload failed: $_" -ForegroundColor Red
}
