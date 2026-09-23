import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, isMongoConnected } from '../config/database.js';
import { Team } from '../models/Team.js';
import { dbAdapter } from '../services/dbAdapter.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const facultyList = [
  {
    name: 'Dr. V. Baby',
    position: 'Head of the Department',
    department: 'Department of CSE',
    year: 'Faculty',
    photo: '/uploads/dr_v_baby.jpg',
  },
  {
    name: 'Dr. C. Kiran Mai',
    position: 'Faculty Advisor',
    department: 'CSI Student Branch Chapter',
    year: 'Faculty',
    photo: '/uploads/dr_c_kiran_mai.jpg',
  },
  {
    name: 'Dr. S. Nagini',
    position: 'Faculty Advisor',
    department: 'CSI Student Branch Chapter',
    year: 'Faculty',
    photo: '/uploads/dr_s_nagini.jpg',
  },
  {
    name: 'Dr. N. Sandeep Chaitanya',
    position: 'Faculty Coordinator',
    department: 'CSI Student Branch Chapter',
    year: 'Faculty',
    photo: '/uploads/dr_n_sandeep_chaitanya.jpg',
  },
  {
    name: 'Mr. SK Saddam Hussain',
    position: 'Faculty Coordinator',
    department: 'CSI Student Branch Chapter',
    year: 'Faculty',
    photo: '/uploads/mr_sk_saddam_hussain.jpg',
  },
];

async function addFaculty() {
  await connectDatabase();

  for (const f of facultyList) {
    // 1. Add to MongoDB Atlas
    if (isMongoConnected()) {
      await Team.findOneAndUpdate(
        { name: f.name },
        { $set: f },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    // 2. Add to dbAdapter / db.json if not already present
    const existing = dbAdapter.findOne('team', { name: f.name });
    if (!existing) {
      dbAdapter.create('team', f);
    } else {
      dbAdapter.findByIdAndUpdate('team', existing.id, f);
    }
  }

  console.log('✅ Added/Updated 5 Faculty Coordinators with real photos into MongoDB Atlas and db.json!');
  await mongoose.disconnect();
}

addFaculty();
