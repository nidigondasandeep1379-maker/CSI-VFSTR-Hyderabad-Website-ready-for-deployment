import { dbAdapter } from '../services/dbAdapter.js';

export function getAllAnnouncements(req, res) {
  try {
    const announcements = dbAdapter.find('announcements');
    announcements.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    return res.json(announcements);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving announcements' });
  }
}

export function createAnnouncement(req, res) {
  try {
    const { title, message, date, priority, link } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const item = dbAdapter.create('announcements', {
      title: title.trim(),
      message: message.trim(),
      date: date || new Date().toISOString().split('T')[0],
      priority: priority || 'normal', // 'high' | 'normal' | 'low'
      link: (link || '').trim(),
      active: true
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating announcement' });
  }
}

export function updateAnnouncement(req, res) {
  try {
    const updated = dbAdapter.findByIdAndUpdate('announcements', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating announcement' });
  }
}

export function deleteAnnouncement(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('announcements', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    return res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting announcement' });
  }
}
