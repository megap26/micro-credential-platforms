import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('ℹ️ No MONGODB_URI provided in .env. Running in resilient In-Memory Database Mode with full persistence.');
    isConnectedToMongo = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnectedToMongo = true;
    console.log(`✅ MongoDB Atlas / Local Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error (${error.message}). Falling back gracefully to Resilient In-Memory Database Mode.`);
    isConnectedToMongo = false;
  }
};
