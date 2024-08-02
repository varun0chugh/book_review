import React, { useContext, useState } from 'react';
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import { LoginHandler } from '../../services/Services';
import toast, { Toaster } from 'react-hot-toast'
import { BookReviewsContext } from '../../context/Context';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate()
    const { setLoggedInUser } = useContext(BookReviewsContext);

    const changeHandler = (e) => {
        const { value, name } = e.target
        setLoginData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await LoginHandler(loginData);
            localStorage.setItem('token', resp.data.token);
            setLoggedInUser(resp.data.user);
            navigate('/')
            toast.success('Logged In Successfully')
        } catch (error) {
            toast.error('Invalid Credentials')
            console.log(error);
        }
    }


    return (
        <div className=" flex items-center justify-center bg-black h-screen">
            <form
                className="mx-auto bg-gray-100 p-8 rounded flex flex-col justify-center items-center shadow-md"
                onSubmit={submitHandler}
            >
                <h1 className='text-black text-stylish drop-shadow-lg text-2xl font-semibold text-center my-4'>Login</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        onChange={changeHandler}
                        className="bg-gray-50 border focus:ring-gray-700  border-gray-600  text-sm rounded  block w-64  p-2"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black w-64">Your password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        onChange={changeHandler}
                        className="bg-gray-50 border border-gray-600 focus:ring-gray-700  text-sm rounded  block w-full p-2 "
                        required
                    />
                </div>
                <p className='text-sm my-3'>Don't have an account? <span className='hover:underline cursor-pointer font-semibold' onClick={()=>  navigate('/register')}>Register</span></p>
                <button type="submit" className="text-white bg-gray-900 hover:bg-black w-24 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 ">Login</button>
            </form>
            <Toaster />
        </div>
    );
}

export default Login;
