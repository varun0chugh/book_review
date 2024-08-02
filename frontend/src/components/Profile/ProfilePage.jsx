import React, { useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BookReviewsContext } from '../../context/Context';
import EditReviewModal from '../EditReviewModal/EditReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
const ProfilePage = () => {
    const { loggedInUser } = useContext(BookReviewsContext);
    const [userReviews, setUserReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const fetchUserReviews = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`http://localhost:4000/api/users/profile/reviews/paginate?page=${page}&limit=3`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserReviews(response.data.reviews);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch user reviews:', error.message);
        }
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`http://localhost:4000/api/users/profile/reviews/search?query=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserReviews(response.data);
        } catch (error) {
            console.error('Failed to search user reviews:', error.message);
        }
    };

    const handleEdit = (review) => {
        setSelectedReview(review);
        setEditModalOpen(true);
    };

    const handleDelete = async (reviewId) => {
            // reviewId.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`http://localhost:4000/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserReviews(userReviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error('Failed to delete review:', error.message);
        }
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setSelectedReview(null);
    };

    useEffect(() => {
        fetchUserReviews();
    }, [fetchUserReviews, page]);

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="mb-6 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold">User Information</h2>
                <p><strong>Username:</strong> {loggedInUser.username}</p>
                <p><strong>Email:</strong> {loggedInUser.email}</p>
            </div>
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
                <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
                {userReviews.length > 0 ? (
                    <ul>
                        {userReviews.map(review => (
                            <li key={review._id} className="mb-4 p-4 bg-white rounded shadow">
                                <h3 className="text-lg font-semibold">{review.title}</h3>
                                <p><strong>Author:</strong> {review.author}</p>
                                <p>{review.reviewText}</p>
                                <p><strong>Rating:</strong> {'⭐'.repeat(review.rating)}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                    <button
                                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                        onClick={() => handleEdit(review)}
                                    >
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
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
                {selectedReview && (
                    <EditReviewModal
                        isOpen={editModalOpen}
                        onClose={handleCloseModal}
                        review={selectedReview}
                        refreshReviews={fetchUserReviews}
                    />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
