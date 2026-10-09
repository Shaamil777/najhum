# 🚀 Deployment Guide: Dynamic Solutions Admin Console

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- Cloudflare account with R2 bucket

---

## Step 1: Database Setup

### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   ```powershell
   # Windows: Download from postgresql.org
   # Or use Docker:
   docker run --name najhum-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE najhum_db;
   ```

### Option B: Cloud PostgreSQL (Recommended for Production)

**Vercel Postgres:**
1. Go to https://vercel.com/dashboard
2. Create new database → Postgres
3. Copy connection string

**Supabase:**
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database

**Neon:**
1. Go to https://neon.tech
2. Create new project
3. Copy connection string

---

## Step 2: Cloudflare R2 Setup

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com

2. **Create R2 Bucket**
   - Navigate to R2
   - Click "Create bucket"
   - Name: `najhum-images` (or your choice)
   - Click "Create bucket"

3. **Get Account ID**
   - Look in the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/r2`
   - Copy the account ID

4. **Create API Token**
   - Go to R2 → Manage R2 API Tokens
   - Click "Create API token"
   - Permissions: Object Read & Write
   - TTL: Forever (or your preference)
   - Click "Create API token"
   - **Copy Access Key ID and Secret Access Key** (shown only once!)

5. **Configure Public Access**
   - Go to your bucket settings
   - Enable "Public Access" if you want direct image URLs
   - Or set up a custom domain

6. **Get Public URL**
   - Format: `https://pub-{id}.r2.dev` (if using R2.dev subdomain)
   - Or your custom domain: `https://images.yourdomain.com`

---

## Step 3: Environment Variables

1. **Copy Environment Template**
   ```powershell
   cd c:\Users\shibi\Documents\dev\najhum_final\najhum
   Copy-Item .env.example .env
   ```

2. **Edit .env File**
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/najhum_db?schema=public"

   # Admin Credentials (Change These!)
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="YourSecurePassword123!"

   # JWT Secret (Generate a random 32+ character string)
   JWT_SECRET="your-random-32-character-secret-key-here-change-this"

   # Cloudflare R2 Storage
   STORAGE_PROVIDER="r2"
   R2_ACCOUNT_ID="your-cloudflare-account-id"
   R2_ACCESS_KEY_ID="your-r2-access-key-id"
   R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
   R2_BUCKET_NAME="najhum-images"
   R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"

   # Application URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Generate JWT Secret**
   ```powershell
   # PowerShell command to generate random string:
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

---

## Step 4: Install Dependencies

```powershell
cd c:\Users\shibi\Documents\dev\najhum_final\najhum
npm install
```

---

## Step 5: Database Migration

1. **Generate Prisma Client**
   ```powershell
   npx prisma generate
   ```

2. **Run Migrations**
   ```powershell
   npx prisma migrate deploy
   ```

   Or for development:
   ```powershell
   npx prisma migrate dev --name init
   ```

3. **Verify Database**
   ```powershell
   npx prisma studio
   ```
   - Opens browser at http://localhost:5555
   - Check that tables exist (Solution, Section, Image)

---

## Step 6: Test Locally

1. **Start Development Server**
   ```powershell
   npm run dev
   ```

2. **Access Application**
   - Admin: http://localhost:3000/admin/login
   - Login with your ADMIN_USERNAME and ADMIN_PASSWORD

3. **Test Features**
   - ✅ Login works
   - ✅ Dashboard displays
   - ✅ Create a test solution
   - ✅ Add sections
   - ✅ Upload an image (tests R2 connection)
   - ✅ Publish solution
   - ✅ View public page at http://localhost:3000/solutions/[slug]

---

## Step 7: Production Build

1. **Build Application**
   ```powershell
   npm run build
   ```

2. **Test Production Build**
   ```powershell
   npm start
   ```

3. **Verify**
   - Application runs on http://localhost:3000
   - All features work

---

## Production Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```powershell
   npm install -g vercel
   ```

2. **Login**
   ```powershell
   vercel login
   ```

3. **Deploy**
   ```powershell
   vercel
   ```

4. **Add Environment Variables in Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from your .env file
   - Important: Update `NEXT_PUBLIC_APP_URL` to your Vercel URL

5. **Add Build Command Override**
   - Settings → General → Build & Development Settings
   - Build Command: `prisma generate && next build`
   - This ensures Prisma client is generated during build

6. **Redeploy**
   ```powershell
   vercel --prod
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile** (already in project if needed)

2. **Build Docker Image**
   ```powershell
   docker build -t najhum-admin .
   ```

3. **Run Container**
   ```powershell
   docker run -p 3000:3000 --env-file .env najhum-admin
   ```

### Option 3: VPS/VM Deployment

1. **Install Node.js on Server**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd najhum
   ```

4. **Install & Build**
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "najhum-admin" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Step 8: Post-Deployment

### 1. Test Production
- ✅ Admin login works
- ✅ Create solution
- ✅ Upload images to R2
- ✅ Publish solution
- ✅ Public page renders
- ✅ SEO metadata present

### 2. Set Up SSL (If not using Vercel)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 3. Monitor Application
- Check Vercel Analytics (if using Vercel)
- Set up error tracking (Sentry)
- Monitor R2 usage in Cloudflare dashboard

---

## Troubleshooting

### Issue: Build Worker Crash
**Solution**: This happens during static page generation with environment validation.
```powershell
# Try building with increased memory:
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Issue: Database Connection Error
**Solution**: Check DATABASE_URL format
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

### Issue: R2 Upload Fails
**Solution**: Verify R2 credentials
- Check Access Key ID and Secret Access Key
- Ensure bucket exists
- Check bucket permissions

### Issue: Images Don't Display
**Solution**: Check R2_PUBLIC_URL
- Ensure public access enabled on bucket
- Verify URL format
- Check CORS settings in R2 bucket

### Issue: JWT Authentication Fails
**Solution**: 
- JWT_SECRET must be 32+ characters
- Check that JWT_SECRET is set in production
- Clear cookies and try again

---

## Quick Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Cloudflare R2 bucket created
- [ ] All environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Migrations run (`npx prisma migrate deploy`)
- [ ] Application builds successfully (`npm run build`)
- [ ] Local test passed
- [ ] Deployed to production
- [ ] Production environment variables set
- [ ] SSL certificate configured (if not Vercel)
- [ ] Admin login tested
- [ ] Image upload tested
- [ ] Public page tested

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] DATABASE_URL uses SSL in production
- [ ] R2 bucket has proper CORS settings
- [ ] Environment variables never committed to git
- [ ] HTTPS enabled (SSL certificate)
- [ ] Rate limiting working on login
- [ ] Admin routes protected by middleware

---

## Maintenance

### Database Backups
```bash
# PostgreSQL backup
pg_dump -U username -h hostname -d najhum_db > backup.sql

# Restore
psql -U username -h hostname -d najhum_db < backup.sql
```

### R2 Backup
- Cloudflare R2 provides automatic versioning
- Enable object versioning in bucket settings

### Monitoring
- Monitor Vercel deployment logs
- Check Cloudflare R2 analytics
- Set up uptime monitoring (UptimeRobot, etc.)

---

## Support Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Cloudflare R2: https://developers.cloudflare.com/r2

### Your Project Documentation
- `PROJECT_FINAL_COMPLETE.md` - Complete project overview
- `PHASE_*_COMPLETE.md` - Individual phase documentation
- `.env.example` - Environment variable template

---

## Next Steps After Deployment

1. **Create Your First Solution**
   - Login to admin
   - Create a new solution
   - Add sections (Hero, Intro, Features, etc.)
   - Upload images
   - Publish

2. **Customize**
   - Update logo in AdminSidebar
   - Customize colors in Tailwind config
   - Add your branding

3. **Content Strategy**
   - Plan your solution pages
   - Prepare images (optimized for web)
   - Write compelling copy

4. **SEO Optimization**
   - Set proper meta descriptions
   - Use descriptive slugs
   - Add alt text to images

---

**Your Dynamic Solutions Admin Console is ready to launch! 🚀**

For any issues, refer to the troubleshooting section or check the TypeScript compilation with `npx tsc --noEmit`.