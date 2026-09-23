import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, isMongoConnected } from '../config/database.js';
import { Team } from '../models/Team.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importTeamToMongo() {
  console.log('🚀 Starting Team Data Import from db.json into MongoDB Atlas...');

  const connected = await connectDatabase();
  if (!connected) {
    console.error('❌ Failed to connect to MongoDB Atlas. Aborting import.');
    process.exit(1);
  }

  try {
    const dbJsonPath = path.resolve(__dirname, '../data/db.json');
    if (!fs.existsSync(dbJsonPath)) {
      console.error(`❌ db.json not found at: ${dbJsonPath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(dbJsonPath, 'utf-8');
    const parsed = JSON.parse(rawData);
    const teamMembers = parsed.team || [];

    console.log(`📋 Found ${teamMembers.length} team members in db.json.`);

    if (teamMembers.length === 0) {
      console.log('⚠️ No team members to import.');
      process.exit(0);
    }

    let inserted = 0;
    let updated = 0;

    for (const member of teamMembers) {
      const filter = { name: member.name, position: member.position };
      const docData = {
        name: member.name,
        position: member.position,
        department: member.department || '',
        year: member.year || '',
        rollNumber: member.rollNumber || '',
        email: member.email || '',
        linkedin: member.linkedin || '',
        github: member.github || '',
        phone: member.phone || '',
        photo: member.photo || '',
      };

      const result = await Team.findOneAndUpdate(
        filter,
        { $set: docData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (result) {
        inserted++;
      }
    }

    const totalCount = await Team.countDocuments();
    console.log(`\n🎉 Import Complete!`);
    console.log(`📊 Total documents now in MongoDB Atlas 'team' collection: ${totalCount}`);

    // Verify and list all documents from MongoDB Atlas
    const allAtlasTeam = await Team.find({}).sort({ name: 1 }).lean();
    console.log('\n--- VERIFIED TEAM IN MONGO DB ATLAS ---');
    allAtlasTeam.forEach((m, idx) => {
      console.log(`${idx + 1}. ${m.name} - ${m.position} (${m.department || 'N/A'}) [ID: ${m._id}]`);
    });

  } catch (err) {
    console.error('❌ Error during import:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas.');
  }
}

importTeamToMongo();
