import express from 'express';
import connectDB from '../config/Dbconnect.js';
import cors from 'cors';
import router from '../routes/router.js';
import path from 'path'

const app = express();
const port = process.env.PORT;


// Middle Ware

app.use(cors());

const __dirname = path.resolve();
console.log(__dirname);

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all unknown routes (for React Router)
app.get('/reactapp', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.use(express.json());

// Router
app.use(router);



connectDB();

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});