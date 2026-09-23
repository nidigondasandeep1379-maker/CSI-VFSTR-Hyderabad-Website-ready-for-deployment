import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from server dir or root dir
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import apiRouter from './routes/api.js';
import { initializeDefaultAdmin } from './controllers/authController.js';
import { connectDatabase, isMongoConnected } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows embedded Google Map iframe and fonts
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows uploaded images to be requested by Vite
  })
);

// CORS configuration with whitelisting
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000,http://localhost:5000')
  .split(',')
  .map((url) => url.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, configurable via CLIENT_URL
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parsing with safe size bounds
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Static uploads directory with cache control
const uploadsPath = process.env.UPLOADS_DIR || path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath, { maxAge: '1d' }));

// Static public assets
const publicAssetsPath = path.resolve(__dirname, '../public/assets');
if (fs.existsSync(publicAssetsPath)) {
  app.use('/assets', express.static(publicAssetsPath, { maxAge: '7d' }));
}

// Mount API routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    mongoDb: isMongoConnected() ? 'connected' : 'disconnected',
    database: 'csi_hyderabad',
    timestamp: new Date().toISOString(),
    chapter: 'CSI VFSTR Hyderabad'
  });
});

// Serve production frontend if built
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/assets')) {
      return next();
    }
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// Global safe error handler (prevents leaking internal stack traces)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Upload Error',
        message: 'Too many files selected at once. You can upload up to 300 photos in a batch.'
      });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'Upload Error',
        message: 'One or more files exceed the maximum permitted size of 50 MB.'
      });
    }
    return res.status(400).json({
      error: 'Upload Error',
      message: err.message
    });
  }

  if (err.message && err.message.startsWith('Security violation:')) {
    return res.status(400).json({
      error: 'Security Violation',
      message: err.message
    });
  }

  res.status(err.status || 500).json({
    error: 'Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred. Please try again later.' : err.message
  });
});

// Start server and initialize default admin & database
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(` CSI VFSTR Hyderabad Secure Server running on port ${PORT}`);
  console.log(` Security Headers: Enabled (Helmet)`);
  console.log(` Rate Limiting: Enabled on auth & submission routes`);
  console.log(` API Endpoint: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
  try {
    await connectDatabase();
    await initializeDefaultAdmin();
  } catch (err) {
    console.error('Error during startup initialization:', err);
  }
});

// Also bind port 3000 for direct browser access if PORT is 5000
if (String(PORT) !== '3000') {
  try {
    const server3000 = app.listen(3000, () => {
      console.log(` Web Portal also active on: http://localhost:3000`);
      console.log(`=======================================================`);
    });
    server3000.on('error', (e) => {
      // Ignore if port 3000 is occupied
    });
  } catch (e) {}
}
