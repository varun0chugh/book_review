const Review = require('../models/Review');
exports.addReview = async (req, res) => {
    const { title, author, reviewText, rating } = req.body;

    try {
        const review = new Review({
            title,
            author,
            reviewText,
            rating,
            user: req.user.id,
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'username email');
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, author, reviewText, rating } = req.body;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        review.title = title || review.title;
        review.author = author || review.author;
        review.reviewText = reviewText || review.reviewText;
        review.rating = rating || review.rating;

        await review.save();
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get paginated reviews
exports.getPaginatedReviews = async (req, res) => {
    const { page = 1, limit = 3 } = req.query;

    try {
        const reviews = await Review.find()
            .populate('user', 'username email')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Review.countDocuments();

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

// Search reviews
exports.searchReviews = async (req, res) => {
    const { query } = req.query;

    try {
        const reviews = await Review.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') }
            ]
        }).populate('user', 'username email');

        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



