// src/App.js

import { useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { BookReviewsContext } from './context/Context';
import axios from 'axios';

function App() {
    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(BookReviewsContext);

    useEffect(() => {
        const getAuthUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const resp = await axios.get('http://localhost:4000/api/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setLoggedInUser(resp.data);
                } catch (error) {
                    console.log('Error fetching authorized user:', error);
                    localStorage.removeItem('token');
                    setLoggedInUser(null); // Ensure state is updated
                }
            } else {
                setLoggedInUser(null); // Ensure state is updated
            }
        };

        getAuthUser();
    }, [navigate, setLoggedInUser]);

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
