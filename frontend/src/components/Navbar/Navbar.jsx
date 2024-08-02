// src/components/Navbar/Navbar.jsx

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookReviewsContext } from '../../context/Context';
import { LogOutHandler } from '../../services/Services';
import Modal from '../Modal/Modal';
import book from '../../assets/book.png';
import '../../index.css';

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { loggedInUser, setLoggedInUser } = useContext(BookReviewsContext);
    const navigate = useNavigate();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleLogout = () => {
        LogOutHandler();
        setLoggedInUser(null);
        localStorage.removeItem('token');
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link className='flex gap-2' to="/">
                    <img src={book} alt="book" height={30} width={30} />
                    <div className='font-mono text-2xl text-blue-800 font-bold text-stylish'>Book Nook</div>
                </Link>
                <div className="flex items-center md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {loggedInUser ? (
                        <>
                            <button
                                type="button"
                                className="text-white focus:outline-none !bg-black rounded text-sm px-5 py-2.5 me-2 font-semibold"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                            <button
                                type="button"
                                className="flex text-sm border-2 border-black rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button"
                                aria-expanded="false"
                                data-dropdown-toggle="user-dropdown"
                                data-dropdown-placement="bottom"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className='w-8 h-8' src="https://img.icons8.com/ios-filled/50/user-male-circle.png" alt="user-male-circle" />
                            </button>
                            <div
                                className="z-50 hidden mx-4 border text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm font-semibold dark:text-white">{loggedInUser.username}</span>
                                    <span className="block text-sm truncate dark:text-gray-400">{loggedInUser.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li className='flex justify-center'>
                                        <Link to="/profile">
                                            <button className="border rounded px-4 my-2 mx-2 py-2 text-sm bg-dark text-white">
                                                Profile
                                            </button>
                                        </Link>
                                    </li>
                                    <li className='flex justify-center'>
                                        <button className="border rounded px-4 my-2 mx-2 py-2 text-sm bg-dark text-white" onClick={openModal}>
                                            Edit Profile
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-white focus:outline-none !bg-black rounded text-sm px-5 py-2.5 me-2 font-semibold">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="text-white focus:outline-none !bg-black rounded text-sm px-5 py-2.5 me-2 font-semibold">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block font-bold py-2 px-3 hover:underline bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500" aria-current="page">
                                Home
                            </Link>
                        </li>
                        {loggedInUser && (
                            <>
                                <li>
                                    <Link to="/add-review" className="block py-2 px-3 font-bold text-gray-900 rounded md:hover:bg-transparent md:hover:text-black hover:underline md:p-0 dark:text-white">
                                        Add Review
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="block py-2 px-3 font-bold text-gray-900 rounded md:hover:bg-transparent md:hover:text-black hover:underline md:p-0 dark:text-white">
                                        Profile
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
    );
};

export default Navbar;
