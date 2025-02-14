import express from 'express';
import connectDB from '../config/Dbconnect.js';
import cors from 'cors';
import router from '../routes/router.js';
import path from 'path';
import loggerMiddleware from '../middlewares/LoggerMiddleWare.js';

const app = express();
const port = process.env.PORT || 3000; // Ensure there's a default port

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware)

const __dirname = path.resolve();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve API routes **before** handling frontend OTHERWISE WEBSITE WILL BUG SPECIFICALLY INSIDE PRODUCTS PAGE
app.use('/api', router);


app.use(express.static(path.join(__dirname, 'dist')));

// Serve React frontend for all other routes (MUST BE LAST)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

connectDB();

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
