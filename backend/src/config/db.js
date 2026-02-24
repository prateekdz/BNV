import mongoose from 'mongoose';

export const connectDB = async () => {
  if (process.env.USE_MOCK_DB === 'true') {
    return null;
  }

  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MongoDB connection string is missing. Set MONGO_URI or MONGODB_URI.');
    }

    const connection = await mongoose.connect(mongoUri);
    return connection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
