import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = process.env.DATA_DIR || path.resolve(__dirname, '../data');
const dbFile = path.resolve(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial state schema
const initialSchema = {
  admins: [],
  team: [],
  events: [],
  gallery: [],
  projects: [],
  publications: [],
  announcements: [],
  memberships: [],
  messages: [],
  settings: {
    heroTitle: "COMPUTER SOCIETY OF INDIA",
    heroSubtitle: "VFSTR HYDERABAD STUDENT CHAPTER",
    collegeName: "Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad",
    tagline: "Connect • Learn • Innovate • Lead",
    heroDescription: "Empowering students through technology, innovation, collaboration, and continuous learning.",
    aboutCsi: "The Computer Society of India (CSI) is the premier association for IT and computer professionals in India. Dedicated to the advancement of computer technology, systems science, and information processing, CSI student chapters bridge academic curriculum and industry breakthroughs through specialized workshops, coding challenges, hackathons, and technical symposiums.",
    aboutChapter: "The CSI Student Chapter at Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus provides students with an energetic platform to hone their technical expertise, engage in real-world software and hardware projects, and cultivate leadership in engineering and computing.",
    vision: "Promote technological awareness, innovation, leadership, and collaborative learning among students.",
    mission: "Provide students with opportunities to develop technical skills, participate in events, work on projects, interact with industry, and build a strong technology community.",
    stats: {
      members: 0,
      events: 0,
      workshops: 0,
      projects: 0
    },
    contact: {
      address: "Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus, Telangana, India",
      email: "csi@vfstrhyd.ac.in",
      phone: "+91 80080 00000",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.54578783454!2d78.3308!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMTknNTEuMCJF!5e0!3m2!1sen!2sin!4v1600000000000",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/csi-india",
        github: "https://github.com",
        instagram: "https://www.instagram.com",
        youtube: "https://www.youtube.com"
      }
    }
  }
};

class DatabaseAdapter {
  constructor() {
    this.db = this.loadDatabase();
  }

  loadDatabase() {
    try {
      if (fs.existsSync(dbFile)) {
        const raw = fs.readFileSync(dbFile, 'utf-8');
        const parsed = JSON.parse(raw);
        return { ...initialSchema, ...parsed };
      }
    } catch (err) {
      console.error('Error loading db.json, creating new database state:', err);
    }
    this.saveDatabase(initialSchema);
    return JSON.parse(JSON.stringify(initialSchema));
  }

  saveDatabase(state = this.db) {
    try {
      fs.writeFileSync(dbFile, JSON.stringify(state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  generateId() {
    return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // --- Collection Queries ---

  find(collection, query = {}) {
    const list = this.db[collection] || [];
    return list.filter((item) => {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && item[k] !== v) return false;
      }
      return true;
    });
  }

  findOne(collection, query = {}) {
    const list = this.db[collection] || [];
    return list.find((item) => {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && item[k] !== v) return false;
      }
      return true;
    }) || null;
  }

  findById(collection, id) {
    const list = this.db[collection] || [];
    return list.find((item) => item.id === id || item._id === id) || null;
  }

  create(collection, data) {
    if (!this.db[collection]) {
      this.db[collection] = [];
    }
    const id = this.generateId();
    const doc = {
      id,
      _id: id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db[collection].push(doc);
    this.saveDatabase();
    return doc;
  }

  findByIdAndUpdate(collection, id, updates) {
    const list = this.db[collection] || [];
    const index = list.findIndex((item) => item.id === id || item._id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      _id: existing.id,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    this.saveDatabase();
    return updated;
  }

  findByIdAndDelete(collection, id) {
    const list = this.db[collection] || [];
    const index = list.findIndex((item) => item.id === id || item._id === id);
    if (index === -1) return null;

    const [deleted] = list.splice(index, 1);
    this.saveDatabase();
    return deleted;
  }

  count(collection, query = {}) {
    return this.find(collection, query).length;
  }

  replaceMany(collection, newDocs) {
    const formattedDocs = newDocs.map((doc) => {
      const id = doc.id || this.generateId();
      return {
        id,
        _id: id,
        ...doc,
        createdAt: doc.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });
    this.db[collection] = formattedDocs;
    this.saveDatabase();
    return formattedDocs;
  }

  // --- Settings ---
  getSettings() {
    return this.db.settings || initialSchema.settings;
  }

  updateSettings(updates) {
    this.db.settings = {
      ...this.db.settings,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveDatabase();
    return this.db.settings;
  }
}

export const dbAdapter = new DatabaseAdapter();
