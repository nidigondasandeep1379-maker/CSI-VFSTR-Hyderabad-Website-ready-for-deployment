import mongoose from 'mongoose';
import dns from 'dns';

// Ensure SRV records for MongoDB Atlas resolve cleanly on Windows and local networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('DNS server setting skipped:', e.message);
}

let isConnected = false;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ No MONGODB_URI provided. Running on local persistent JSON store.');
    return false;
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    const dbName = mongoose.connection.name;
    const host = mongoose.connection.host;
    console.log(`✅ MongoDB Atlas connected successfully to database "${dbName}" on ${host}`);
    return true;
  } catch (err) {
    isConnected = false;
    console.error('❌ MongoDB Atlas connection error:', err.message);
    console.log('⚠️ Falling back to local persistent store for resilience.');
    return false;
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('✅ MongoDB reconnected.');
});

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export default {
  connectDatabase,
  isMongoConnected,
};
