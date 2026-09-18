# 🚀 Production Deployment Guide - CSI VFSTR Hyderabad Website

This guide walks you through deploying the **CSI VFSTR Hyderabad** Student Chapter website to the cloud.

The project is architected as a **unified full-stack application**:
- The React frontend is compiled into production assets in `dist/`.
- The Express server serves both the **REST API** (`/api/*`), **file uploads** (`/uploads/*`), **brand assets** (`/assets/*`), and the **React application** (`/*`) on a single port.
- This means **zero CORS configuration issues** and **instant 1-click cloud deployment**.

---

## 🌟 Quick Options Summary

| Platform | Best For | Difficulty | Free Tier Available? |
|---|---|---|---|
| **Render.com** | Easiest cloud hosting, Web Service | ⭐ Very Easy | ✅ Yes |
| **Railway.app** | High performance, instant GitHub sync | ⭐ Very Easy | ✅ Free trial credit |
| **Docker / VPS** | University server, AWS, DigitalOcean | ⭐⭐ Moderate | Depends on host |
| **Vercel / Netlify** | Frontend only (needs external backend) | ⭐⭐ Moderate | ✅ Yes |

---

## Option 1: Deploy on Render.com (Recommended)

Render is the simplest and most reliable platform to deploy this project.

### Step 1: Push your Code to GitHub
1. Open terminal in the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for CSI VFSTR Hyderabad Website"
   ```
2. Create a new repository on [GitHub](https://github.com/new) (e.g. `csi-vfstr-hyderabad`).
3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/csi-vfstr-hyderabad.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create a Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `csi-vfstr-hyderabad` (or your preferred name)
   - **Region**: Closest to you (e.g., Singapore or Frankfurt)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build:prod`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Set Environment Variables
Under **Environment Variables**, add:
- `NODE_ENV`: `production`
- `JWT_SECRET`: *(Click 'Generate' or enter a long random string)*
- `ADMIN_PASSWORD`: *(Your secure initial admin password, e.g. `csi@vfstr2026`)*

### Step 4: Deploy
Click **Create Web Service**. Render will automatically:
1. Run `npm run build:prod` (installs backend packages and compiles the React SPA).
2. Start the unified server with `npm start`.
3. Provide you with a live secure URL: `https://csi-vfstr-hyderabad.onrender.com`.

---

## Option 2: Deploy on Railway.app

1. Go to [Railway.app](https://railway.app/) and sign in with GitHub.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select your repository.
4. Railway will automatically detect the `Procfile` and Node.js environment.
5. In **Variables**, add:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = *(Any random string)*
   - `ADMIN_PASSWORD` = `csi@vfstr2026`
6. Under **Settings** -> **Networking**, click **Generate Domain**.
7. Railway will deploy your app instantly!

---

## Option 3: Deploy with Docker (VPS / AWS / DigitalOcean)

If you have a Linux server (Ubuntu/Debian) or want to host it within college infrastructure:

### Step 1: Clone and Run with Docker Compose
```bash
git clone https://github.com/<YOUR_USERNAME>/csi-vfstr-hyderabad.git
cd csi-vfstr-hyderabad

# Build and start container in the background
docker compose up -d --build
```

The application will now be running on port `5000` with:
- Automatic container restart on reboot.
- Persistent volumes for uploads (`csi_uploads`) and database records (`csi_data`).

### Step 2: Nginx Reverse Proxy (with SSL / HTTPS)
If pointing a college domain (e.g., `csi.vignan.ac.in`):

Create `/etc/nginx/sites-available/csi-vfstr`:
```nginx
server {
    server_name csi.vignan.ac.in;

    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site and obtain free Let's Encrypt SSL:
```bash
sudo ln -s /etc/nginx/sites-available/csi-vfstr /etc/nginx/sites-enabled/
sudo certbot --nginx -d csi.vignan.ac.in
```

---

## 🔒 Post-Deployment Checklist

1. **Log in to the Admin Dashboard**:
   - URL: `https://<YOUR-DOMAIN>/admin`
   - Username: `admin`
   - Password: `csi@vfstr2026` (or whatever you set in `ADMIN_PASSWORD`)
2. **Change the Default Password**:
   - In the top bar of the Admin Dashboard, click **Change Password**.
   - Set a strong personal password.
3. **Verify Uploads**:
   - Go to `/admin/gallery` and upload photos to confirm file storage works.
   - Upload your event announcements and member updates.
