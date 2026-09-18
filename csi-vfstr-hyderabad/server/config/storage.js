import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = process.env.UPLOADS_DIR || path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine configuration with strict sanitization
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    // Sanitize basename to strictly letters, numbers, and dashes
    const rawBase = path.basename(file.originalname, ext);
    const safeBase = rawBase.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50);
    cb(null, `${safeBase || 'upload'}-${uniqueSuffix}${ext}`);
  },
});

// Allowed extensions and MIME types
const allowedImageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.heif', '.avif', '.bmp', '.tiff', '.tif'];
const allowedDocExts = ['.pdf', '.xlsx', '.xls', '.csv'];

const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
  'image/avif',
  'image/bmp',
  'image/x-ms-bmp',
  'image/tiff',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
  'text/plain',
  'application/octet-stream' // fallback for some spreadsheet uploads & mobile cameras
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Reject dangerous extensions
  const dangerousExts = ['.exe', '.sh', '.bat', '.cmd', '.js', '.mjs', '.php', '.phtml', '.html', '.htm', '.jsp', '.vbs', '.py', '.jar', '.dll', '.scr'];
  if (dangerousExts.includes(ext) || file.originalname.includes('..')) {
    return cb(new Error('Security violation: Dangerous or executable file detected.'), false);
  }

  const isAllowedExt = allowedImageExts.includes(ext) || allowedDocExts.includes(ext);
  const isAllowedMime = allowedMimes.includes(file.mimetype.toLowerCase());

  if (isAllowedExt && isAllowedMime) {
    cb(null, true);
  } else if (isAllowedExt) {
    // Some browsers/OS send generic or blank MIME for heic/csv
    cb(null, true);
  } else {
    cb(new Error(`Security violation: File type '${ext}' is not permitted. Only images (JPG, PNG, WebP, HEIC, etc.), PDFs, and spreadsheets are allowed.`), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB max limit
    files: 300 // allow up to 300 files per multi-upload
  },
});
