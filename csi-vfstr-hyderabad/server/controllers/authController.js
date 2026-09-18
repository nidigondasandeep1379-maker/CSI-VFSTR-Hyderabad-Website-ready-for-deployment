import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbAdapter } from '../services/dbAdapter.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'csi_vfstr_super_secure_jwt_token_key_2026_x98f21ba89';

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username/Email and password are required' });
    }

    const admins = dbAdapter.find('admins');
    const admin = admins.find(
      (a) =>
        a.username.toLowerCase() === username.toLowerCase().trim() ||
        (a.email && a.email.toLowerCase() === username.toLowerCase().trim())
    );

    if (!admin) {
      // Prevent timing attacks by dummy comparison
      await bcrypt.compare(password, '$2a$10$abcdefghijklmnopqrstuvwxyz123456');
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Sign token with 24 hour expiration
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      getJwtSecret(),
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name || 'CSI Chapter Admin',
        email: admin.email || 'admin@csivfstr.org',
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error during authentication' });
  }
}

export function getMe(req, res) {
  try {
    const admin = dbAdapter.findById('admins', req.user.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json({
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name || 'CSI Chapter Admin',
        email: admin.email || 'admin@csivfstr.org',
        role: 'admin'
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving administrator profile' });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }

    const admin = dbAdapter.findById('admins', req.user.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    dbAdapter.findByIdAndUpdate('admins', admin.id, {
      passwordHash: newHash,
      passwordChangedAt: new Date().toISOString()
    });

    return res.json({ message: 'Password updated successfully. Please use your new password next time you sign in.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to change password' });
  }
}

export async function initializeDefaultAdmin() {
  const existing = dbAdapter.find('admins');
  if (existing.length === 0) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'csi@vfstr2026';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);
    dbAdapter.create('admins', {
      username: 'admin',
      name: 'VFSTR CSI Administrator',
      email: 'admin@csivfstr.org',
      passwordHash
    });
    console.log('Default administrator initialized: username "admin"');
  }
}
