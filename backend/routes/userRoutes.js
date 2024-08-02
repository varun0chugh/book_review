const express = require('express');
const { getUserProfile, updateUserProfile, getUserReviewsPaginated, searchUserReviews } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(updateUserProfile);

router.route('/profile/reviews/paginate')
    .get(protect, getUserReviewsPaginated);

router.route('/profile/reviews/search')
    .get(protect, searchUserReviews);

module.exports = router;
