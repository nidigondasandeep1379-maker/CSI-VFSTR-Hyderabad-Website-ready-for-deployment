import { dbAdapter } from '../services/dbAdapter.js';

export function getAllPublications(req, res) {
  try {
    const publications = dbAdapter.find('publications');
    publications.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    return res.json(publications);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving publications' });
  }
}

export function createPublication(req, res) {
  try {
    const { title, date, description, category } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    let coverImage = req.body.coverImage || '';
    let fileUrl = req.body.fileUrl || '';

    if (req.files) {
      if (req.files.coverImage && req.files.coverImage[0]) {
        coverImage = `/uploads/${req.files.coverImage[0].filename}`;
      }
      if (req.files.document && req.files.document[0]) {
        fileUrl = `/uploads/${req.files.document[0].filename}`;
      }
    }

    const publication = dbAdapter.create('publications', {
      title: title.trim(),
      date: date || new Date().toISOString().split('T')[0],
      description: (description || '').trim(),
      category: category || 'Magazine',
      coverImage,
      fileUrl
    });

    return res.status(201).json(publication);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating publication', error: err.message });
  }
}

export function deletePublication(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('publications', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    return res.json({ message: 'Publication deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting publication' });
  }
}
