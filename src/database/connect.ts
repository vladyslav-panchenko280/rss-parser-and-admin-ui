import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from file .env.

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_MONGO as string);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB: ', error.message);
  }
};
