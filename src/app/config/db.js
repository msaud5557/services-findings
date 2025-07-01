import mongoose from 'mongoose';

const MONGO_DB_SERVICE = process.env.MONGO_DB_SERVICE;

if (!MONGO_DB_SERVICE) {
  throw new Error('⚠️ Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_DB_SERVICE, {
      dbName: process.env.MONGO_DB_DEV,
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
