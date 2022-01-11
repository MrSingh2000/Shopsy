import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify } from '../commonFunctions';
import { setToken } from '../state/action-creaters/authTokenactions';

export default function Signup() {
    const [details, setdetails] = useState({ firstName: "", lastName: "", mail: "", password: "" });
    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    }
    let navigate = useNavigate();

    // we also verify if any user exists with same credentials (within same api on backend)
    const userRegister = async (e) => {
        e.preventDefault();
        let url = `/api/auth/register`;
        let data = {
            name: details.firstName + " " + details.lastName,
            mail: details.mail,
            password: details.password
        }
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let response = await res.json();
        if (response.error) {
            notify(response.error, "error");
        }
        else {
            notify("Registration Successful!", "success");
            setToken(response.authToken);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }
    }

    return (
        <div className="flex justify-center items-center mt-10 m-4">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account?
                    <Link to="/login" className="ml-1 text-sm text-blue-500 underline hover:text-blue-700">
                        Sign in
                    </Link>
                </span>
                <div className="p-6 mt-8">
                    <form onSubmit={userRegister}>
                        <div className="flex gap-4 mb-2">
                            <div className=" relative ">
                                <input onChange={handleChange} type="text" id="create-account-first-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="firstName" placeholder="First name" required />
                            </div>
                            <div className=" relative ">
                                <input onChange={handleChange} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="lastName" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input onChange={handleChange} type="email" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="mail" placeholder="email" required />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input onChange={handleChange} type="password" id="create-account-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" placeholder="Password" required />
                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
