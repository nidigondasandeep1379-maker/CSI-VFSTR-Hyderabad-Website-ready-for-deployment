import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

/**
 * Checks if a file is a HEIC or HEIF image, and converts it to high-quality JPEG
 * so all web browsers can display it without issue.
 * Returns the processed file object with the updated .url and .filename.
 */
export async function normalizeUploadedImage(file) {
  if (!file) return null;
  const ext = path.extname(file.filename).toLowerCase();

  if (ext === '.heic' || ext === '.heif') {
    try {
      const outputFilename = file.filename.replace(/\.(heic|heif)$/i, '.jpg');
      const outputPath = path.resolve(file.destination, outputFilename);

      await sharp(file.path)
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outputPath);

      // Clean up original HEIC file
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch {
        // ignore deletion failure
      }

      return {
        ...file,
        filename: outputFilename,
        path: outputPath,
        url: `/uploads/${outputFilename}`
      };
    } catch (err) {
      console.error(`HEIC conversion note for ${file.originalname}:`, err.message);
      return {
        ...file,
        url: `/uploads/${file.filename}`
      };
    }
  }

  return {
    ...file,
    url: `/uploads/${file.filename}`
  };
}

/**
 * Normalizes an array of uploaded files (converting any HEIC to JPEG in parallel)
 */
export async function normalizeUploadedImages(files) {
  if (!files || !Array.isArray(files)) return [];
  return Promise.all(files.map((file) => normalizeUploadedImage(file)));
}
