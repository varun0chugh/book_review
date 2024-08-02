// src/components/Modal/Modal.jsx

import React, { useContext, useState, useEffect } from 'react';
import '../../index.css';
import { BookReviewsContext } from '../../context/Context';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Modal = ({ isOpen, onClose }) => {
    const { loggedInUser, setLoggedInUser } = useContext(BookReviewsContext);
    const [editData, setEditData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen && loggedInUser) {
            setEditData({
                fullName: loggedInUser.username || '',
                email: loggedInUser.email || '',
                password: ''
            });
        }
    }, [isOpen, loggedInUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (loggedInUser) {
                const resp = await axios.put('http://localhost:4000/api/users/profile', { ...editData, _id: loggedInUser._id });
                if (resp.status === 200) {
                    setLoggedInUser(resp.data);
                    toast.success('Updated Successfully');
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                    return;
                }
                toast.error('Error while updating');
                return;
            }
            toast.error('User not logged in');
        } catch (error) {
            console.log(error);
            toast.error('Error while updating');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-400 !bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-white text-center w-full text-stylish font-semibold">Edit Information</h2>
                    <button className="text-white" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form className="mt-4" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-white text-sm" htmlFor='fullName'>Name</label>
                        <input type="text" className="mt-1 p-2 border rounded w-full" name='fullName'
                            value={editData.fullName}
                            placeholder="Edit your name" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm" htmlFor='email'>Email</label>
                        <input type="email" className="mt-1 p-2 border rounded w-full"
                            value={editData.email}
                            name='email' placeholder="Edit your email" onChange={handleChange} required />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-white text-sm" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="mt-1 p-2 border rounded w-full"
                            name="password"
                            placeholder="Edit your password"
                            value={editData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-8 text-white"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="bg-white text-black px-4 py-2 rounded" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="!bg-dark !border border-white hover:bg-black text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default Modal;
