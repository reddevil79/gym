# FREE GitHub Hosting - Quick Setup (5 Minutes)

**Host your gym app for FREE in just 5 minutes using GitHub + Railway!**

## Prerequisites

- GitHub account (free)
- This repository forked/cloned
- Command line access

---

## Step 1: Enable GitHub Pages (2 minutes)

```bash
# 1. Go to your repo settings
# Settings → Pages
# Source: Deploy from a branch
# Branch: main (or develop)
# Click Save

# Result: Your frontend will be at:
# https://YOUR-USERNAME.github.io/gym/
```

---

## Step 2: Create GitHub Actions Workflow (1 minute)

**File: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: cd frontend && npm install && npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
```

---

## Step 3: Deploy Backend to Railway (2 minutes)

### 3.1: Create Railway Account

```bash
# Visit: https://railway.app
# Click "Sign up with GitHub"
# Authorize Railway
```

### 3.2: Create New Project

```bash
# Dashboard → New Project
# Deploy from GitHub repo
# Select: reddevil79/gym
# Confirm
```

### 3.3: Configure Backend Service

```
Railway Dashboard:

1. New Service → GitHub Repo
2. Root Directory: backend
3. Set Variables:
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-secret-key-12345
   CORS_ORIGIN=https://YOUR-USERNAME.github.io
```

### 3.4: Add Database

```
Dashboard → New Service → Database → PostgreSQL

Railway auto-links DATABASE_URL to backend
```

---

## Step 4: Update Frontend (30 seconds)

**File: `frontend/.env.production`**

```env
REACT_APP_API_URL=https://YOUR-RAILWAY-URL/api
REACT_APP_ENVIRONMENT=production
```

Get YOUR-RAILWAY-URL from Railway Dashboard → Backend Service → Domain

---

## Step 5: Deploy (30 seconds)

```bash
# Push code to trigger automatic deployment
git add .
git commit -m "Deploy to free hosting"
git push origin develop

# GitHub Actions will:
# 1. Build frontend
# 2. Deploy to GitHub Pages
# 3. Railway auto-deploys backend

# Watch at: github.com/YOUR-USERNAME/gym/actions
```

---

## Done! ✅

Your app is now LIVE:

```
🌐 Frontend:  https://YOUR-USERNAME.github.io/gym/
🔗 Backend:   https://your-railway-url.railway.app
💾 Database:  PostgreSQL (automatic)
```

### Test Your App

```bash
# Frontend health check
curl https://YOUR-USERNAME.github.io/gym/

# Backend health check
curl https://your-railway-url.railway.app/api/health

# Should return:
# {"status":"OK","timestamp":"2026-06-11T...","environment":"production"}
```

---

## One-Time Setup Commands

```bash
# Clone your repo
git clone https://github.com/YOUR-USERNAME/gym.git
cd gym

# Optional: Install locally to test first
cd frontend
npm install
npm run build
cd ../backend
npm install
npm start

# When ready to push
git add .
git commit -m "Initial deployment"
git push origin develop

# GitHub Actions + Railway auto-deploy from here!
```

---

## Cost Breakdown

| Service | Cost | Why |
|---------|------|-----|
| GitHub Pages | FREE | Frontend hosting |
| Railway | $5/mo (FREE credit) | Backend hosting |
| GitHub Actions | FREE | Automated deployment |
| Supabase | FREE | Database (512MB) |
| **Total** | **$0-5/month** | Sufficient for testing |

---

## What You Get

✅ **Frontend**
- Automatic deployment on every push
- Custom domain support
- HTTPS/SSL included
- Unlimited traffic
- GitHub Pages

✅ **Backend**
- Auto-scaling Node.js
- PostgreSQL database included
- Email notifications on deploy
- Automatic restarts
- $5/month free credit (usually enough)

✅ **Development**
- GitHub version control
- Free CI/CD with Actions
- Automatic testing & builds
- Pull request deployments
- Deploy history

---

## Automatic Deployment Workflow

```
You push code to GitHub
        ↓
GitHub Actions triggered
        ↓
Tests run (if configured)
        ↓
Frontend builds
        ↓
GitHub Pages updated
        ↓
Railway detects new push
        ↓
Backend rebuilds & restarts
        ↓
✅ App updated (2-3 minutes)
```

---

## Monitoring

### Check Deployment Status

```bash
# GitHub
Your Repo → Actions tab
See all deployments with status ✅ or ❌

# Railway
https://railway.app/dashboard
See backend status, logs, resource usage
```

### View Live Logs

```bash
# GitHub Actions logs
Settings → Actions → All workflows → Deploy → Latest run

# Railway logs
Dashboard → Your Project → Deployments → Latest → Logs
```

---

## Troubleshooting

### Frontend won't deploy

```bash
# Check workflow logs
Actions tab → Latest run → deploy job

# Common fix: Ensure build script works
cd frontend
npm install
npm run build
# If this works locally, it'll work in GitHub Actions
```

### Backend won't start

```bash
# Check Railway logs
Railway Dashboard → Your backend service → Logs

# Fix DATABASE_URL
# Railway auto-sets this, but verify in Logs

# Verify PORT=5000 is set
```

### API calls failing (CORS)

```javascript
// In backend .env on Railway
CORS_ORIGIN=https://YOUR-USERNAME.github.io

// In frontend .env.production
REACT_APP_API_URL=https://your-railway-url.railway.app/api
```

---

## Next Steps

1. ✅ Complete 5-minute setup above
2. ✅ Test both frontend and backend
3. ✅ Invite team members to GitHub repo
4. ✅ Setup custom domain (optional)
5. ✅ When ready: Upgrade to paid plans
6. ✅ Add monitoring & logging

---

## Free Tier Limits

| Limit | Details |
|-------|---------|
| GitHub Pages | Unlimited traffic, 1GB storage |
| Railway | $5/month free credit (usually enough for testing) |
| Database | 512MB storage (Supabase free tier) or 10GB (Railway) |
| CI/CD | 2000 minutes/month free |
| Builds | 1 simultaneous build |

**After free credit runs out:**
- Railway charges per usage ($5-20/month typical)
- GitHub Pages remains FREE
- Database storage ($5-25/month depending on size)

---

## Upgrade When You Need

```
Week 1-2: Free tier is enough (0 cost)
         ↓
Month 1: Still free tier (0-5 cost)
         ↓
Month 2+: Upgrade to paid if:
         - Need higher uptime guarantee
         - Database needs >512MB
         - More than 100k API calls/month
         - Need advanced features
```

---

## Quick Command Reference

```bash
# After first setup, your workflow is:

# 1. Make changes
nano frontend/src/pages/Dashboard.js

# 2. Commit and push
git add .
git commit -m "Update feature"
git push origin develop

# 3. GitHub Actions + Railway auto-deploy
# Check status in: github.com/YOUR-USERNAME/gym/actions

# 4. Done! Your changes are LIVE in 2-3 minutes
```

---

**Total Time Investment: 5 minutes setup** ⏱️
**Cost: $0 (or $5/month Railway credit)** 💰
**Result: Fully functional gym app LIVE** 🚀

---

Last Updated: June 2026
