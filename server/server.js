import express from 'express';
import connectDB from '../config/Dbconnect.js';
import cors from 'cors';
import router from '../routes/router.js';

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Router
app.use(router);
// app.use('/api/createproduct', createproduct);


connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});