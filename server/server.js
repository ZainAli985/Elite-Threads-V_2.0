import express from 'express';
import connectDB from '../config/Dbconnect.js';
import cors from 'cors';
import router from '../routes/router.js';
import path from 'path'

const app = express();
const port = process.env.PORT;


// Middle Ware

app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));



app.use(express.json());

// Router
app.use(router);



connectDB();

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});