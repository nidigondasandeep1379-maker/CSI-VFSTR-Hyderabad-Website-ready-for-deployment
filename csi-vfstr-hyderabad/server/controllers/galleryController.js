import { dbAdapter } from '../services/dbAdapter.js';
import { normalizeUploadedImages } from '../utils/imageProcessor.js';

export function getAllAlbums(req, res) {
  try {
    const albums = dbAdapter.find('gallery');
    // Sort by date descending
    albums.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    return res.json(albums);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving gallery albums' });
  }
}

export function getAlbumById(req, res) {
  try {
    const album = dbAdapter.findById('gallery', req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    return res.json(album);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving album' });
  }
}

export async function createAlbum(req, res) {
  try {
    const { title, eventName, date, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Album title is required' });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      const processedFiles = await normalizeUploadedImages(req.files);
      images = processedFiles.map((file, idx) => ({
        id: 'img-' + Date.now() + '-' + idx,
        url: file.url,
        title: file.originalname,
        uploadedAt: new Date().toISOString()
      }));
    }

    const coverImage = images.length > 0 ? images[0].url : (req.body.coverImage || '');

    const newAlbum = dbAdapter.create('gallery', {
      title: title.trim(),
      eventName: (eventName || '').trim(),
      date: date || new Date().toISOString().split('T')[0],
      description: (description || '').trim(),
      coverImage,
      images
    });

    return res.status(201).json(newAlbum);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating album', error: err.message });
  }
}

export async function addImagesToAlbum(req, res) {
  try {
    const album = dbAdapter.findById('gallery', req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    let newImages = [];
    if (req.files && req.files.length > 0) {
      const processedFiles = await normalizeUploadedImages(req.files);
      newImages = processedFiles.map((file, idx) => ({
        id: 'img-' + Date.now() + '-' + idx,
        url: file.url,
        title: file.originalname,
        uploadedAt: new Date().toISOString()
      }));
    }

    const currentImages = album.images || [];
    const updatedImages = [...currentImages, ...newImages];
    const coverImage = album.coverImage || (updatedImages[0] ? updatedImages[0].url : '');

    const updated = dbAdapter.findByIdAndUpdate('gallery', req.params.id, {
      images: updatedImages,
      coverImage
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error adding images to album' });
  }
}

export function deleteImageFromAlbum(req, res) {
  try {
    const album = dbAdapter.findById('gallery', req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    const imageId = req.params.imageId;
    const currentImages = album.images || [];
    const filteredImages = currentImages.filter((img) => img.id !== imageId && img.url !== imageId);

    const updated = dbAdapter.findByIdAndUpdate('gallery', req.params.id, {
      images: filteredImages,
      coverImage: filteredImages.length > 0 ? filteredImages[0].url : ''
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting image' });
  }
}

export function deleteAlbum(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('gallery', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Album not found' });
    }
    return res.json({ message: 'Album deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting album' });
  }
}
