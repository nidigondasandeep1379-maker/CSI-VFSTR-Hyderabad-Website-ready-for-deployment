import jwt from 'jsonwebtoken';
import { dbAdapter } from '../services/dbAdapter.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'csi_vfstr_super_secure_jwt_token_key_2026_x98f21ba89';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Access denied. Valid administrative authentication token required.'
    });
  }

  jwt.verify(token, getJwtSecret(), (err, payload) => {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired administrative session. Please sign in again.'
      });
    }

    // Verify admin user still exists in database
    const admin = dbAdapter.findById('admins', payload.id);
    if (!admin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Administrator account does not exist or has been revoked.'
      });
    }

    req.user = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: 'admin'
    };
    next();
  });
}
