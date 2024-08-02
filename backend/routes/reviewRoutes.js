const express = require('express');
const { addReview, getReviews, updateReview, deleteReview, getPaginatedReviews, searchReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getReviews)
    .post(protect, addReview);

router.route('/paginate')
    .get(getPaginatedReviews);

router.route('/search')
    .get(searchReviews);

router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;
