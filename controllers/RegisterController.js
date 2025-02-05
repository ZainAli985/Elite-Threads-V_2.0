import User from "../models/user-model.js";
import jwt from 'jsonwebtoken'; 
import pkg from 'dotenv';
const { config } = pkg;
config(); 

const JWT_SECRET = process.env.JWT_SECRET_KEY; 

// Register Controller

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already registered' });
        }

        // If not, create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // JWT payload
        const payload = {
            email: user.email,
            username: user.username
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            username : user.username
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};
