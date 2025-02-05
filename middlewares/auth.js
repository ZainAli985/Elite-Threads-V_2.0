import jwt from 'jsonwebtoken';
const JWT_SECRET = 'secret';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send(`Access Denied You Don't Have JWT Access Key`);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

 