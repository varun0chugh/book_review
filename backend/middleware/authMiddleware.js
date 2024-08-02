const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user and attach to the request
            req.user = await User.findById(decoded.id).select('-password');
            
            // If user not found
            if (!req.user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ error: 'Not authorized' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
