import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify, verifyToken } from '../commonFunctions';
import { setToken } from '../state/action-creaters/authTokenactions';

export default function Login() {
    const [details, setdetails] = useState({ mail: "", password: "" });
    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    }
    let navigate = useNavigate();
    const authToken = useSelector(state => state.authToken)
    const userLogin = async (e) => {
        e.preventDefault();
        let url = `${process.env.REACT_APP_HOST}/api/auth/login`;
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        let response = await res.json();
        if (response.error) {
            notify(response.error, "error");
        }
        else {
            notify("Login Successfull!", "success");
            localStorage.setItem("auth-token", response.authToken);
            setToken(response.authToken);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const checkLoggedIn = () => {
        if (localStorage.getItem('auth-token')) {
            let res = verifyToken(localStorage.getItem('auth-token'));
            if (res) {
                setToken(localStorage.getItem('auth-token'));
                navigate('/');
            }
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [])

    return (
        <div className="flex justify-center items-center mt-10 m-4">
            <ToastContainer
                position="top-right"
                autoClose={1900}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Login To Your Account
                </div>
                <div className="mt-8">
                    <form onSubmit={userLogin} autoComplete="off">
                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input onChange={handleChange} type="text" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" name="mail" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input onChange={handleChange} type="password" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password" name="password" />
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                            <div>
                                <Link to="/" className="inline-flex text-xs font-thin text-blue-500 sm:text-sm dark:text-gray-100 hover:text-blue-700 dark:hover:text-white">
                                    Continue without Login
                                </Link>
                            </div>
                            <div className="flex ml-auto">
                                <Link to="/login" className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                                    Forgot Your Password?
                                </Link>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <Link to="/signup" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                        <span className="ml-2">
                            You don&#x27;t have an account?
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
