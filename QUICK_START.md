# Quick Start - Deploy to Vercel in 5 Minutes

## Step 1: Clean Your Code
Remove Vite references that are no longer needed:
\`\`\`bash
# These files are no longer needed - can be deleted:
rm -rf src/
rm vite.config.ts
rm index.html
\`\`\`

## Step 2: Verify Environment Variables
Make sure you have MongoDB connection string ready:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
\`\`\`

## Step 3: Push to GitHub
\`\`\`bash
git add .
git commit -m "Clean: Remove Vite, migrate to pure Next.js"
git push origin main
\`\`\`

## Step 4: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Select your GitHub repo
4. Add environment variable: `MONGODB_URI`
5. Click "Deploy"
6. Done! Your app is live in 2-3 minutes

## Step 5: Test Your App
- Visit your Vercel URL
- Login with: `admin@company.com` / `admin123`
- Check that admin dashboard loads
- Test attendance check-in
- Try submitting a task

---

## What's Deployed

✅ **Frontend** - Next.js React app
✅ **Backend** - API routes on Vercel Serverless
✅ **Database** - MongoDB connection
✅ **Authentication** - Email/password login
✅ **Features** - Check-in, tasks, analytics, admin panel

---

## Access Your App

After deployment, your app will be available at:
\`\`\`
https://your-project-name.vercel.app
\`\`\`

Vercel automatically provides:
- HTTPS/SSL
- Global CDN
- Auto-scaling
- 99.9% uptime

---

## File Structure You're Deploying

\`\`\`
app/
├── api/              # All backend routes
├── components/       # React components
├── contexts/         # Auth & Attendance context
├── pages/            # Dashboards
├── login/            # Login page
├── types/            # TypeScript types
├── lib/              # API client & utilities
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── globals.css       # Tailwind styles

No more:
✗ src/ folder (Vite)
✗ vite.config.ts
✗ React Router
✗ Webpack config
\`\`\`

---

## Environment Setup on Vercel

In Vercel Dashboard → Settings → Environment Variables:

| Key | Value | Example |
|-----|-------|---------|
| MONGODB_URI | Your DB connection | `mongodb+srv://...` |

That's it! Everything else is configured.

---

## Local Development

To test before deploying:
\`\`\`bash
npm install
npm run dev
# Visit http://localhost:3000
\`\`\`

---

## Demo Accounts (Always Available)

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | admin123 | Admin |
| john@company.com | john123 | Employee |
| sarah@company.com | sarah123 | Employee |

---

## Common Issues & Fixes

**Issue**: Build fails
**Fix**: Run `npm install` locally, commit, push again

**Issue**: Login page works but dashboard is blank
**Fix**: Check MongoDB URI in Vercel env vars

**Issue**: Cannot check-in
**Fix**: Allow location permission in browser, check API routes deployed

**Issue**: Photos not saving
**Fix**: Verify MongoDB storage quota and connection

---

## Next Steps After Deployment

1. **Share with team**: Give them the Vercel URL
2. **Add employees**: Use admin dashboard to add users
3. **Monitor**: Check Vercel Analytics for performance
4. **Customize**: Update company branding/colors as needed
5. **Scale**: Add more features based on feedback

---

## Support

- Check logs: Vercel Dashboard → Deployments → View logs
- Test API: Visit `/api/health` endpoint
- Monitor: Real-time analytics in Vercel Dashboard

You're all set! Your attendance tracking system is now live and production-ready.
