import { dbAdapter } from '../services/dbAdapter.js';
import { normalizeUploadedImage, normalizeUploadedImages } from '../utils/imageProcessor.js';

export function getAllEvents(req, res) {
  try {
    const { category, status } = req.query;
    let events = dbAdapter.find('events');

    if (category && category.toLowerCase() !== 'all') {
      events = events.filter((e) => e.category && e.category.toLowerCase() === category.toLowerCase());
    }

    if (status && status.toLowerCase() !== 'all') {
      events = events.filter((e) => e.status && e.status.toLowerCase() === status.toLowerCase());
    }

    // Sort by date descending
    events.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving events', error: err.message });
  }
}

export function getEventById(req, res) {
  try {
    const event = dbAdapter.findById('events', req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json(event);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving event' });
  }
}

export async function createEvent(req, res) {
  try {
    const {
      title,
      date,
      time,
      venue,
      category,
      description,
      shortDescription,
      registrationLink,
      status,
      speakers,
      highlights,
      winners
    } = req.body;

    if (!title || !date || !category) {
      return res.status(400).json({ message: 'Title, Date, and Category are required' });
    }

    let poster = req.body.poster || '';
    let galleryImages = [];

    if (req.files) {
      if (req.files.poster && req.files.poster[0]) {
        const normPoster = await normalizeUploadedImage(req.files.poster[0]);
        poster = normPoster.url;
      }
      if (req.files.galleryImages) {
        const normGallery = await normalizeUploadedImages(req.files.galleryImages);
        galleryImages = normGallery.map((f) => f.url);
      }
    }

    // Parse array/JSON strings if transmitted via multipart/form-data
    let parsedSpeakers = [];
    if (typeof speakers === 'string') {
      try { parsedSpeakers = JSON.parse(speakers); } catch (e) { parsedSpeakers = speakers.split(',').map(s => s.trim()).filter(Boolean); }
    } else if (Array.isArray(speakers)) {
      parsedSpeakers = speakers;
    }

    let parsedHighlights = [];
    if (typeof highlights === 'string') {
      try { parsedHighlights = JSON.parse(highlights); } catch (e) { parsedHighlights = highlights.split('\n').map(s => s.trim()).filter(Boolean); }
    } else if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    }

    let parsedWinners = [];
    if (typeof winners === 'string') {
      try { parsedWinners = JSON.parse(winners); } catch (e) { parsedWinners = winners.split('\n').map(s => s.trim()).filter(Boolean); }
    } else if (Array.isArray(winners)) {
      parsedWinners = winners;
    }

    const newEvent = dbAdapter.create('events', {
      title: title.trim(),
      date,
      time: time || '10:00 AM',
      venue: venue || 'VFSTR Hyderabad Campus',
      category: category.trim(),
      shortDescription: shortDescription || description?.slice(0, 160) || '',
      description: description || '',
      registrationLink: registrationLink || '',
      status: status || 'Upcoming',
      poster,
      galleryImages,
      speakers: parsedSpeakers,
      highlights: parsedHighlights,
      winners: parsedWinners
    });

    return res.status(201).json(newEvent);
  } catch (err) {
    console.error('Create event error:', err);
    return res.status(500).json({ message: 'Error creating event', error: err.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const existing = dbAdapter.findById('events', req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updates = { ...req.body };

    if (req.files) {
      if (req.files.poster && req.files.poster[0]) {
        const normPoster = await normalizeUploadedImage(req.files.poster[0]);
        updates.poster = normPoster.url;
      }
      if (req.files.galleryImages) {
        const normGallery = await normalizeUploadedImages(req.files.galleryImages);
        const newImgs = normGallery.map((f) => f.url);
        updates.galleryImages = [...(existing.galleryImages || []), ...newImgs];
      }
    }

    if (typeof updates.speakers === 'string') {
      try { updates.speakers = JSON.parse(updates.speakers); } catch (e) { updates.speakers = updates.speakers.split(',').map(s => s.trim()).filter(Boolean); }
    }
    if (typeof updates.highlights === 'string') {
      try { updates.highlights = JSON.parse(updates.highlights); } catch (e) { updates.highlights = updates.highlights.split('\n').map(s => s.trim()).filter(Boolean); }
    }
    if (typeof updates.winners === 'string') {
      try { updates.winners = JSON.parse(updates.winners); } catch (e) { updates.winners = updates.winners.split('\n').map(s => s.trim()).filter(Boolean); }
    }

    const updated = dbAdapter.findByIdAndUpdate('events', req.params.id, updates);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating event', error: err.message });
  }
}

export function deleteEvent(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('events', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting event' });
  }
}
