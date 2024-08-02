import React, { useContext, useState } from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { registerHandler } from '../../services/Services';
import toast, { Toaster } from 'react-hot-toast';
import { BookReviewsContext } from '../../context/Context';

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const {setLoggedInUser} = useContext(BookReviewsContext)
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { value, name } = e.target;

        setRegisterData((prev) => {
            const newRegisterData = { ...prev, [name]: value };
            if (name === 'confirmPassword' || name === 'password') {
                if (newRegisterData.password !== newRegisterData.confirmPassword) {
                    setErrorMessage('Password does not match');
                } else {
                    setErrorMessage('');
                }
            }

            return newRegisterData;
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await registerHandler(registerData);
            console.log(resp);
                localStorage.setItem('token', resp.data.token);
                setLoggedInUser(resp.data.user);
                toast.success('Created Successfully');
            navigate('/')
            return;

        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error);
        }
    };

   

    return (
        <div className="flex items-center justify-center bg-black h-screen">
            <form
                onSubmit={submitHandler}
                className="mx-auto bg-gray-100 px-14 py-4 rounded flex flex-col justify-center items-center shadow-md">
                <h1 className='text-black text-stylish drop-shadow-lg text-2xl font-semibold text-center mb-4'>Register</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name='fullName'
                        className="bg-gray-50 border focus:ring-gray-700 border-gray-600 text-sm rounded block w-64 p-2"
                        onChange={changeHandler}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black"> Email</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        className="bg-gray-50 border focus:ring-gray-700 border-gray-600 text-sm rounded block w-64 p-2"
                        onChange={changeHandler}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black"> Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        onChange={changeHandler}
                        className="bg-gray-50 border focus:ring-gray-700 border-gray-600 text-sm rounded block w-64 p-2"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-black">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name='confirmPassword'
                        onChange={changeHandler}
                        className="bg-gray-50 border focus:ring-gray-700 border-gray-600 text-sm rounded block w-64 p-2"
                        required
                    />
                    {errorMessage && <p className="text-red-500 text-xs mb-2">{errorMessage}</p>}
                </div>
                <p className='text-sm my-3'>Already have an account? <span className='hover:underline cursor-pointer font-semibold' onClick={()=> navigate('/login')}>Login</span></p>
                <button type="submit" className="text-white bg-gray-900 hover:bg-black w-24 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2">Register</button>
            </form>
            <Toaster />
        </div>
    );
}

export default Register;
