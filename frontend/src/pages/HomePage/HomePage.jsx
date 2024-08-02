import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const HomePage = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/reviews/paginate?page=${page}&limit=3`);
            setReviews(response.data.reviews);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch reviews:', error.message);
        }
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/reviews/search?query=${searchQuery}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Failed to search reviews:', error.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews, page]);

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Homepage</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded mr-2"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Search
                </button>
            </form>
            <div>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
                <div className="flex justify-between mt-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
