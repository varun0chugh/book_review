const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }

        // Create a new user
        const user = new User({ username: fullName, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        // Return success response
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

module.exports = registerUser;


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
        return res.status(400).send('Invalid Password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.status(200).json({
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}


const getUserProfile = async (req, res) => {
    const {token} = req.body;
    console.log(req.body);
}

module.exports = { loginUser, registerUser, getUserProfile };