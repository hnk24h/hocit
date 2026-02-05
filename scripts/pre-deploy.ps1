Write-Host "🔍 Running pre-deployment checks..." -ForegroundColor Cyan

# Type check
Write-Host "`n📝 Checking TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript errors found" -ForegroundColor Red
    exit 1
}

# Build
Write-Host "`n🔨 Building production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ All checks passed! Ready to deploy." -ForegroundColor Green
Write-Host "Run: git push deploy main" -ForegroundColor Cyan
