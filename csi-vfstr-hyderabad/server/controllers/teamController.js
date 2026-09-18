import { dbAdapter } from '../services/dbAdapter.js';
import { parseTeamExcel } from '../services/excelParser.js';
import { normalizeUploadedImage } from '../utils/imageProcessor.js';
import fs from 'fs';

// Helper to determine role order
export function getRolePriority(position = '') {
  const p = position.toLowerCase();
  if (p.includes('faculty') || p.includes('counselor') || (p.includes('coordinator') && !p.includes('event'))) return 1;
  if ((p.includes('chairperson') || p.includes('president')) && !p.includes('vice')) return 2;
  if (p.includes('vice chairperson') || p.includes('vice president')) return 3;
  if (p.includes('secretary') && !p.includes('joint')) return 4;
  if (p.includes('joint secretary')) return 5;
  if (p.includes('treasurer')) return 6;
  if (p.includes('event')) return 7;
  if (p.includes('executive')) return 8;
  if (p.includes('technical') || p.includes('tech lead')) return 9;
  if (p.includes('design') || p.includes('creative')) return 10;
  if (p.includes('media') || p.includes('pr')) return 11;
  if (p.includes('outreach')) return 12;
  if (p.includes('volunteer')) return 13;
  return 20;
}

export function getAllTeam(req, res) {
  try {
    const team = dbAdapter.find('team');
    // Sort logically by role hierarchy
    team.sort((a, b) => {
      const orderA = getRolePriority(a.position);
      const orderB = getRolePriority(b.position);
      if (orderA !== orderB) return orderA - orderB;
      return (a.name || '').localeCompare(b.name || '');
    });
    return res.json(team);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to retrieve team members', error: err.message });
  }
}

export function getTeamMember(req, res) {
  try {
    const member = dbAdapter.findById('team', req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    return res.json(member);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving team member' });
  }
}

export async function createTeamMember(req, res) {
  try {
    const { name, position, department, year, email, linkedin, github, phone } = req.body;
    if (!name || !position) {
      return res.status(400).json({ message: 'Name and Position are required' });
    }

    let photo = req.body.photo || '';
    if (req.file) {
      const norm = await normalizeUploadedImage(req.file);
      photo = norm.url;
    }

    const member = dbAdapter.create('team', {
      name: name.trim(),
      position: position.trim(),
      department: (department || '').trim(),
      year: (year || '').trim(),
      email: (email || '').trim(),
      linkedin: (linkedin || '').trim(),
      github: (github || '').trim(),
      phone: (phone || '').trim(),
      photo
    });

    return res.status(201).json(member);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating team member', error: err.message });
  }
}

export async function updateTeamMember(req, res) {
  try {
    const existing = dbAdapter.findById('team', req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    const updates = { ...req.body };
    if (req.file) {
      const norm = await normalizeUploadedImage(req.file);
      updates.photo = norm.url;
    }

    const updated = dbAdapter.findByIdAndUpdate('team', req.params.id, updates);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating team member', error: err.message });
  }
}

export function deleteTeamMember(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('team', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    return res.json({ message: 'Team member deleted successfully', member: deleted });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting team member' });
  }
}

export function importTeamExcel(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an Excel (.xlsx/.xls) or CSV file.' });
    }

    const filePath = req.file.path;
    const parsedMembers = parseTeamExcel(filePath);

    // Clean up temporary uploaded file if desired, or keep it in uploads
    if (parsedMembers.length === 0) {
      return res.status(400).json({ message: 'No valid team members found in the uploaded file.' });
    }

    // Check if user is asking for preview or direct commit
    const isPreview = req.query.preview === 'true';
    if (isPreview) {
      return res.json({
        message: `Successfully parsed ${parsedMembers.length} team members from spreadsheet.`,
        count: parsedMembers.length,
        preview: parsedMembers
      });
    }

    // Direct commit / replace with confirmation flag
    const updatedTeam = dbAdapter.replaceMany('team', parsedMembers);

    return res.json({
      message: `Successfully imported ${updatedTeam.length} team members.`,
      count: updatedTeam.length,
      team: updatedTeam
    });
  } catch (err) {
    console.error('Excel import error:', err);
    return res.status(500).json({ message: 'Failed to process Excel file', error: err.message });
  }
}
