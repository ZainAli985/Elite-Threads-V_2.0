import mongoose from 'mongoose';
// Connect to MongoDB

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://zain20061008:oviStHBt1WGgOlf9@elite-threads.o07xq.mongodb.net/elite-threads', {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

// connectToDatabase();

export default connectDB;