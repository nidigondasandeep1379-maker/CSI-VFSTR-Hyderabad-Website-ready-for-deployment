import { dbAdapter } from '../services/dbAdapter.js';

export function submitMembership(req, res) {
  try {
    const { name, email, phone, rollNumber, department, year, reason } = req.body;
    if (!name || !email || !rollNumber) {
      return res.status(400).json({ message: 'Name, Email, and Roll Number are required' });
    }

    const newRequest = dbAdapter.create('memberships', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      rollNumber: rollNumber.trim().toUpperCase(),
      department: (department || '').trim(),
      year: (year || '').trim(),
      reason: (reason || '').trim(),
      status: 'Pending', // Pending | Approved | Contacted | Rejected
      submittedAt: new Date().toISOString()
    });

    return res.status(201).json({
      message: 'Your membership application has been submitted successfully! The CSI executive team will contact you soon.',
      id: newRequest.id
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to submit membership application', error: err.message });
  }
}

export function getAllMemberships(req, res) {
  try {
    const list = dbAdapter.find('memberships');
    list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving membership requests' });
  }
}

export function updateMembershipStatus(req, res) {
  try {
    const { status, notes } = req.body;
    const updated = dbAdapter.findByIdAndUpdate('memberships', req.params.id, {
      status,
      notes: notes !== undefined ? notes : undefined
    });
    if (!updated) {
      return res.status(404).json({ message: 'Membership record not found' });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating membership status' });
  }
}

export function deleteMembership(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('memberships', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Membership record not found' });
    }
    return res.json({ message: 'Membership record deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting membership record' });
  }
}
