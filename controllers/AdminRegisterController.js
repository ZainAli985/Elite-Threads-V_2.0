import Admin from "../models/admin-model.js";
import jwt from 'jsonwebtoken'; // Make sure you import jwt
const JWT_SECRET = 'secret'; // Set your JWT secret

// Register Controller

export const AdminRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'You Are Already Admin' });
        }

        // Generate a unique 5-digit random ID
        let admin_id;
        do {
            admin_id = Math.floor(10000 + Math.random() * 90000);
        } while (await Admin.findOne({ admin_id }));
        

        // Create a new admin
        const newAdmin = new Admin({ username, email, password, admin_id });
        await newAdmin.save();

        res.status(201).json({ 
            message: 'Admin registered successfully', 
            adminInfo: {
                admin_id: newAdmin.admin_id, // Send ID back to the frontend
                username: newAdmin.username,
                email: newAdmin.email,
                password: newAdmin.password
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering Admin', error: error.message });
    }
};


// Login Controller


export const Adminlogin = async (req, res) => {
    try {
        const { email, password, admin_id } = req.body;

        // Find admin by email or admin ID
        const admin = await Admin.findOne( {email ,  admin_id}  );
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Admin credentials' });
        }

        // Verify the password
        if (admin.password !== password) {
            return res.status(400).json({ message: 'Invalid Admin credentials' });
        }

        // JWT payload
        const payload = {
            email: admin.email,
            username: admin.username,
            admin_id: admin.admin_id,
        };


        // Generate token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' });

        // ADMIN INFO FOR PANEL 
        const adminInfo = {
            admin_id: admin.admin_id,
            username: admin.username,
            email: admin.email,
            password: admin.password
        }
        res.status(200).json({
            message: 'Login successful',
            token,
            adminInfo
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};

