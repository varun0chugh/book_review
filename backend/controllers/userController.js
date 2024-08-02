const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Review = require('../models/Review');


exports.getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateUserProfile = async (req, res) => {
    const { fullName, email, password, _id } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                username: fullName,
                email: email,
                password: hashedPassword
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found')
        }

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get paginated user reviews
exports.getUserReviewsPaginated = async (req, res) => {
    const { page = 1, limit = 3 } = req.query;

    try {
        const reviews = await Review.find({ user: req.user._id })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Review.countDocuments({ user: req.user._id });

        res.json({
            reviews,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search user reviews
exports.searchUserReviews = async (req, res) => {
    const { query } = req.query;

    try {
        const reviews = await Review.find({
            user: req.user._id,
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') }
            ]
        });

        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
