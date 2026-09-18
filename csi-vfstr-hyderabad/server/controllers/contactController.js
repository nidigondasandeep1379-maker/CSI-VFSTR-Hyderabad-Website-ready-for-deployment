import { dbAdapter } from '../services/dbAdapter.js';

export function submitContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newMessage = dbAdapter.create('messages', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      isRead: false,
      receivedAt: new Date().toISOString()
    });

    return res.status(201).json({
      message: 'Thank you! Your message has been sent to the CSI Chapter administration.',
      id: newMessage.id
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
}

export function getAllMessages(req, res) {
  try {
    const messages = dbAdapter.find('messages');
    messages.sort((a, b) => new Date(b.receivedAt || 0) - new Date(a.receivedAt || 0));
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving messages' });
  }
}

export function markMessageRead(req, res) {
  try {
    const { isRead } = req.body;
    const updated = dbAdapter.findByIdAndUpdate('messages', req.params.id, {
      isRead: isRead !== undefined ? isRead : true
    });
    if (!updated) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating message status' });
  }
}

export function deleteMessage(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('messages', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json({ message: 'Message deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting message' });
  }
}
