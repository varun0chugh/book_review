import React from 'react';

const ReviewCard = ({ review }) => {
    const { title, author, reviewText, rating, user } = review;

    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700"><strong>Author:</strong> {author}</p>
            <p className="text-gray-700"><strong>Review:</strong> {reviewText}</p>
            <p className="text-yellow-500">{'⭐'.repeat(rating)}</p>
            <p className="text-gray-700"><strong>Reviewed by:</strong> {user.username}</p>
        </div>
    );
};

export default ReviewCard;
