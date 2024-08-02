import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../index.css';

// Validation schema using Yup
const validationSchema = Yup.object({
    bookTitle: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    reviewText: Yup.string().required('Review text is required'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required'),
});

const AddReview = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.post(
                'http://localhost:4000/api/reviews',
                {
                    title: values.bookTitle,
                    author: values.author,
                    reviewText: values.reviewText,
                    rating: values.rating
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Review added successfully:', response.data);
            resetForm();
        } catch (error) {
            if (error.response) {
                console.error('Failed to add review:', error.response.data);
            } else if (error.request) {
                console.error('Failed to add review: No response received');
            } else {
                console.error('Failed to add review:', error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ bookTitle: '', author: '', reviewText: '', rating: 1 }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="max-w-lg mx-auto">
                    <h1 className='text-stylish font-bold text-center my-5 text-5xl'>Add Book Review</h1>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                            <label htmlFor="bookTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <Field
                                type="text"
                                id="bookTitle"
                                name="bookTitle"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-0 focus:!border-gray-500 block w-full p-2.5"
                            />
                            <ErrorMessage name="bookTitle" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                            <Field
                                type="text"
                                id="author"
                                name="author"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-0 focus:!border-gray-500 block w-full p-2.5"
                            />
                            <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                            <Field
                                type="number"
                                id="rating"
                                name="rating"
                                min={1}
                                max={5}
                                step={0.1}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-0 focus:!border-gray-500 block w-full p-2.5"
                            />
                            <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="reviewText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review Text</label>
                        <Field
                            as="textarea"
                            id="reviewText"
                            name="reviewText"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-0 focus:border-gray-500 block w-full p-2.5'
                        />
                        <ErrorMessage name="reviewText" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="text-white focus:outline-none !bg-black rounded text-sm px-5 py-2.5 me-2 font-semibold w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Review'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddReview;
