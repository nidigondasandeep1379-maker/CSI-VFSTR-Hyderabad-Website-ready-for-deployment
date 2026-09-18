import { dbAdapter } from '../services/dbAdapter.js';

export function getAllProjects(req, res) {
  try {
    const projects = dbAdapter.find('projects');
    return res.json(projects);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving projects' });
  }
}

export function createProject(req, res) {
  try {
    const { title, description, techStack, teamMembers, githubUrl, demoUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    let image = req.body.image || '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    let parsedTech = [];
    if (typeof techStack === 'string') {
      parsedTech = techStack.split(',').map((t) => t.trim()).filter(Boolean);
    } else if (Array.isArray(techStack)) {
      parsedTech = techStack;
    }

    let parsedMembers = [];
    if (typeof teamMembers === 'string') {
      parsedMembers = teamMembers.split(',').map((m) => m.trim()).filter(Boolean);
    } else if (Array.isArray(teamMembers)) {
      parsedMembers = teamMembers;
    }

    const project = dbAdapter.create('projects', {
      title: title.trim(),
      description: description.trim(),
      techStack: parsedTech,
      teamMembers: parsedMembers,
      githubUrl: (githubUrl || '').trim(),
      demoUrl: (demoUrl || '').trim(),
      image
    });

    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating project', error: err.message });
  }
}

export function updateProject(req, res) {
  try {
    const existing = dbAdapter.findById('projects', req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    if (typeof updates.techStack === 'string') {
      updates.techStack = updates.techStack.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (typeof updates.teamMembers === 'string') {
      updates.teamMembers = updates.teamMembers.split(',').map((m) => m.trim()).filter(Boolean);
    }

    const updated = dbAdapter.findByIdAndUpdate('projects', req.params.id, updates);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating project' });
  }
}

export function deleteProject(req, res) {
  try {
    const deleted = dbAdapter.findByIdAndDelete('projects', req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting project' });
  }
}
