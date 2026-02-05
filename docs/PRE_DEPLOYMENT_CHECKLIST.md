# Pre-Deployment Checklist

Script để check lỗi trước khi deploy lên Vercel/Netlify

## Quick Check

```bash
# Chạy tất cả checks
npm run build && npm run lint
```

---

## Detailed Checklist

### 1. TypeScript Type Check

```bash
# Check TypeScript errors
npx tsc --noEmit
```

**Các lỗi thường gặp:**
- Missing type declarations → Tạo `.d.ts` file
- Type mismatch → Fix types trong components
- Module not found → Check imports

---

### 2. Build Production

```bash
# Test production build
npm run build
```

**Kiểm tra:**
- ✅ All pages compiled successfully
- ✅ No build errors
- ✅ Check bundle size
- ✅ Verify static pages generated

**Các lỗi thường gặp:**

#### a) Module not found
```
Error: Module 'xyz' not found
```
**Fix:**
```bash
npm install xyz
```

#### b) Type errors
```
Type error: Property 'x' does not exist
```
**Fix:** Add type declarations hoặc fix types

#### c) Runtime errors during build
```
Error: Failed to collect page data
```
**Fix:** Check component logic, getStaticProps, generateStaticParams

---

### 3. Lint Check

```bash
# Check code quality
npm run lint
```

**Fix lint errors:**
```bash
npm run lint -- --fix
```

---

### 4. Test Production Build Locally

```bash
# Build
npm run build

# Start production server (if not static export)
npm start

# Or preview static export
npx serve out
```

**Test:**
- ✅ Homepage loads
- ✅ Article pages work
- ✅ Category pages work
- ✅ Navigation works
- ✅ Images load
- ✅ Links work

---

### 5. Check Environment Variables

**Local (.env.local):**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GISCUS_REPO=username/repo
...
```

**Production (Vercel):**
- Go to Settings → Environment Variables
- Ensure all `NEXT_PUBLIC_*` variables are set
- Update `NEXT_PUBLIC_SITE_URL` to production URL

---

### 6. Check Dependencies

```bash
# Check for vulnerabilities
npm audit

# Update dependencies (carefully!)
npm update

# Check outdated packages
npm outdated
```

---

### 7. Test Static Export (Next.js)

```bash
# Ensure output: 'export' in next.config.js
cat next.config.js

# Build and check /out directory
npm run build
ls out/
```

---

## Common Vercel Deployment Errors

### Error 1: Build Failed - TypeScript

```
Type error: Cannot find module 'xyz'
```

**Fix:**
1. Add type declarations: `src/types/xyz.d.ts`
2. Or install types: `npm i -D @types/xyz`
3. Test: `npx tsc --noEmit`
4. Commit and push

---

### Error 2: Module Not Found

```
Error: Cannot find module './component'
```

**Fix:**
1. Check file paths (case-sensitive on Linux!)
2. Check imports: `import X from '@/components/X'`
3. Verify file exists in repo
4. Check `.gitignore` (make sure not ignoring needed files)

---

### Error 3: Environment Variable Missing

```
Error: process.env.NEXT_PUBLIC_X is undefined
```

**Fix:**
1. Add in Vercel → Settings → Environment Variables
2. Ensure starts with `NEXT_PUBLIC_` for client-side
3. Redeploy after adding

---

### Error 4: Page Data Collection Failed

```
Error: Failed to collect page data for /page
```

**Fix:**
1. Check `generateStaticParams()` function
2. Check async data fetching
3. Ensure files exist (content/articles/*.md)
4. Test locally: `npm run build`

---

### Error 5: Image Optimization

```
Error: Image optimization not supported with output: 'export'
```

**Fix in next.config.js:**
```js
images: {
  unoptimized: true,
}
```

---

## Debugging on Vercel

### View Build Logs

1. Vercel Dashboard → Project
2. Deployments tab
3. Click failed deployment
4. View **"Building"** logs
5. Scroll to red error messages

### Common Log Sections

```
Installing dependencies...     ← npm install
Running "vercel build"        ← next build starts
Compiled successfully         ← TypeScript check
Linting and checking...       ← ESLint + tsc
Collecting page data          ← generateStaticParams
Generating static pages       ← Static HTML generation
```

---

## Pre-Push Checklist Script

Create `scripts/pre-deploy.sh`:

```bash
#!/bin/bash

echo "🔍 Running pre-deployment checks..."

# 1. Type check
echo "📝 Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found"
  exit 1
fi

# 2. Lint
echo "🧹 Running linter..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint errors found"
  exit 1
fi

# 3. Build
echo "🔨 Building production..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ All checks passed! Ready to deploy."
```

**Usage:**
```bash
bash scripts/pre-deploy.sh && git push deploy main
```

---

## PowerShell Version (Windows)

Create `scripts/pre-deploy.ps1`:

```powershell
Write-Host "🔍 Running pre-deployment checks..." -ForegroundColor Cyan

# Type check
Write-Host "📝 Checking TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript errors found" -ForegroundColor Red
    exit 1
}

# Lint
Write-Host "🧹 Running linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Lint errors found" -ForegroundColor Red
    exit 1
}

# Build
Write-Host "🔨 Building production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All checks passed! Ready to deploy." -ForegroundColor Green
```

**Usage:**
```powershell
.\scripts\pre-deploy.ps1; if ($?) { git push deploy main }
```

---

## Automated Git Hooks (Optional)

Install husky for pre-commit checks:

```bash
npm install -D husky
npx husky init
```

Add to `.husky/pre-commit`:
```bash
npm run lint
npx tsc --noEmit
```

---

## Quick Reference

| Check | Command | Fix |
|-------|---------|-----|
| Types | `npx tsc --noEmit` | Add types/declarations |
| Build | `npm run build` | Fix errors shown |
| Lint | `npm run lint` | `npm run lint -- --fix` |
| Deps | `npm audit` | `npm audit fix` |
| Test | `npm run build && npx serve out` | Manual testing |

---

## When to Run Checks

✅ **Always before pushing:**
```bash
npm run build  # Must pass!
```

✅ **Before major changes:**
```bash
npx tsc --noEmit
npm run lint
npm run build
```

✅ **After updating dependencies:**
```bash
npm install
npm run build
```

---

## Pro Tips

1. **Always test build locally first** - Vercel build = your local build
2. **Check Vercel logs** - They show exact same errors as local
3. **Use TypeScript strict mode** - Catch errors early
4. **Keep dependencies updated** - But test after updates
5. **Use environment variables properly** - `NEXT_PUBLIC_` for client-side

---

## Emergency Rollback

Nếu deployment fail và cần rollback ngay:

1. Vercel Dashboard → Deployments
2. Find last successful deployment
3. Click "..." → **"Promote to Production"**
4. Fix issue locally
5. Push again

---

**🎯 Bottom line:** Nếu `npm run build` pass locally → sẽ pass trên Vercel!
