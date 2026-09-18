# CSI Student Chapter Website — VFSTR Hyderabad

Official modern, responsive, and full-stack website for the **Computer Society of India (CSI) Student Chapter** at **Vignan’s Foundation for Science, Technology and Research (VFSTR), Hyderabad**.

---

## 🏛️ Branding & Identity
- **Society**: Computer Society of India (CSI)
- **Chapter**: CSI VFSTR Hyderabad Student Chapter
- **Institution**: Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus
- **Tagline**: `Connect • Learn • Innovate • Lead`
- **Accreditations**: ABET Accredited • NAAC 'A+' Grade • NIRF 70th Rank • NBA
- **Logos**: Official uploaded VFSTR Hyderabad Campus and CSI VFSTRH emblem logos preserved in original aspect ratio and high resolution.

---

## 🚀 Key Features

### 1. Public Experience
- **Hero Section**: Dual branding logos, high-tech network glow background, chapter tagline, quick action buttons (*Explore Events*, *Join CSI*).
- **Announcements**: Dynamic urgent news banners & tickers managed from the admin panel.
- **Vision & Mission**: Dual interactive cards highlighting chapter purpose.
- **Dynamic Chapter Statistics**: Live counter (Members, Events, Workshops, Projects) linked to the Admin Dashboard (zero fake numbers).
- **About CSI & Chapter**: Comprehensive overview of CSI's 1965 heritage, purpose of student chapters, and editable charter for VFSTR.
- **Team Roster**: Categorized hierarchy (Faculty Coordinators, Leadership, Technical Team, Design, Media, Events). Cards display photo, name, position, department, year, email, LinkedIn, and GitHub.
- **Events Engine**: Filterable by category (*Workshop, Hackathon, Coding Competition, Seminar, Webinar, Technical Event, Other*) and status (*Upcoming, Ongoing, Completed*). Includes dedicated Event Detail pages with highlights, speaker profiles, and winners.
- **Photo Gallery**: Masonry grid layout with album filter and full-screen Lightbox with Next/Prev and keyboard navigation.
- **Student Projects**: Showcase real engineering projects with tech stack pills, contributors, GitHub repo, and live demo links.
- **Magazine & Publications**: Digital library for annual chapter magazines, newsletters, and symposium proceedings with online reading and direct PDF download.
- **Membership Registration**: Comprehensive application form collecting Name, Email, Phone, Roll Number, Department, Academic Year, and statement of intent.
- **Contact & Map**: Official campus address, helpline, social handles (LinkedIn, GitHub, Instagram, YouTube), interactive Google Maps embed, and inquiry form.

### 2. Admin Management System (`/admin`)
- **Secure Authentication**: JWT token authentication with bcrypt password hashing.
- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `csi@vfstr2026`
- **Dashboard Overview**: Metrics overview for total events, upcoming events, team members, gallery albums, projects, publications, pending applications, and unread messages.
- **Import Team from Excel**:
  - Upload `.xlsx` or `.xls` spreadsheet.
  - Automatic column matching (`Name`, `Position/Role`, `Department`, `Year`, `Email`, `LinkedIn`, `GitHub`, `Photo`).
  - Safe preview and verification dialog: *"This will update the current team data. Continue?"*.
- **Full CRUD Modules**:
  - Events (with poster, multiple photo uploads, highlights, winners)
  - Team Members (manual add/edit with photo upload)
  - Gallery (create albums, multi-image upload, image deletion)
  - Projects (add/edit/delete student projects)
  - Publications (upload PDF documents and covers)
  - Announcements (create urgent alerts with priority)
  - Membership Requests (review student applications, toggle status between *Pending, Approved, Contacted, Rejected*)
  - Contact Messages (inbox with read/unread, details modal, reply via email)
  - Website Settings (real-time updating of Statistics, Hero texts, About descriptions, Vision/Mission, Social links, and Address)

---

## 🛠️ Architecture & Tech Stack

```
csi-vfstr-hyderabad/
├── server/
│   ├── config/             # Multer file storage & upload rules
│   ├── controllers/        # REST endpoint controllers
│   ├── middleware/         # JWT auth & Multer upload middleware
│   ├── routes/             # Express API routing under /api/*
│   ├── services/           # DB adapter (JSON persistent / MongoDB) & Excel parser
│   ├── uploads/            # Uploaded photos, event posters, and PDFs
│   ├── data/db.json        # Persistent JSON database
│   └── server.js           # Full-stack Express server
│
├── src/
│   ├── assets/             # Official VFSTR & CSI logos
│   ├── components/         # Reusable UI components (Navbar, Footer, Hero, Stats, etc.)
│   ├── pages/              # Public & Admin pages
│   ├── layouts/            # PublicLayout & AdminLayout
│   ├── services/api.ts     # Axios API service client
│   ├── types/index.ts      # TypeScript interfaces
│   ├── App.tsx             # Client-side router
│   └── index.css           # Tailwind CSS styles & modern gradients
├── public/assets/          # Static logos for browser favicon and root serving
├── dist/                   # Production-optimized build bundle
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 💻 Running the Application

### Option A: Standalone Full-Stack Server (Recommended)
The Express server is configured to serve both the API and the production SPA from port `5000`:
```bash
npm start
```
- Public Website: **http://localhost:5000**
- Admin Portal: **http://localhost:5000/admin/login**
- API Health: **http://localhost:5000/api/health**

### Option B: Vite Development Mode
Run the backend and Vite dev server for hot module reloading:
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Frontend Vite
npm run dev
```
- Vite Dev Server: **http://localhost:3000** (proxies `/api` and `/uploads` to port 5000)

---

## 📥 How to Import Your Team Excel File
1. Log in to the Admin Portal at `/admin/login` using `admin` / `csi@vfstr2026`.
2. Click on **Team Roster** in the sidebar.
3. Click the green **Import Team from Excel** button.
4. Select or drag-and-drop your `.xlsx` or `.xls` spreadsheet.
5. Review the parsed records and click **Commit & Update Team Data**.
6. When prompted with *"This will update the current team data. Continue?"*, click **OK**.
7. Your team will immediately appear on the public `/team` page organized by official role hierarchy!

---

## 🔒 Security & Database Configuration
- By default, the application runs with an embedded atomic JSON database at `server/data/db.json` requiring **zero external database dependencies**.
- To connect to a live MongoDB instance (local or MongoDB Atlas), set the environment variable:
  ```env
  MONGODB_URI=mongodb://localhost:27017/csi_vfstr
  JWT_SECRET=your_production_secret_key
  PORT=5000
  ```
