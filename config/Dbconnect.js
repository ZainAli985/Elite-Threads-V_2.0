import mongoose from 'mongoose'
import pkg from 'dotenv';
const { config } = pkg;
config(); 


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

// connectToDatabase();

export default connectDB;