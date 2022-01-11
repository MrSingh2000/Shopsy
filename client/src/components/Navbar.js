import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './commonFunctions';
import logOutIcon from "./icons/logout.png";
import { removeToken } from './state/action-creaters/authTokenactions';

export default function Navbar() {
    const authToken = useSelector(state => state.authToken);
    const [display, setdisplay] = useState("");
    const showShop = () => {
        if (display === "hidden") {
            setdisplay("");
        }
        else {
            setdisplay("hidden");
        }
    }

    const [mobileMenu, setmobileMenu] = useState(false);
    const handleMobile = () => {
        if (mobileMenu) {
            setmobileMenu(false);
            return;
        }
        setmobileMenu(true);
    }

    // logout function
    const handleLogout = () => {
        localStorage.clear();
        removeToken();
        notify("Logout SuccessFul!", "success");
    }

    return (
        <>
            <nav className="bg-white shadow dark:bg-gray-800">
                <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between">

                        {/* <!-- Mobile menu button --> */}
                        <div className="flex justify-center items-center md:hidden">
                            <button onClick={handleMobile} className="text-gray-500 mr-3 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                            <div className="flex justify-center md:block">
                                <Link className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" to="/home/cart">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span>
                                </Link>
                            </div>
                            {authToken ? (
                                <button onClick={handleLogout} className={`text-white ml-4 text-sm leading-5`} to="products/household">
                                    <img src={logOutIcon} alt="logOut" width="25px" />
                                </button>
                            ) : null}
                        </div>
                        <div>
                            <Link className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" to="/">Shopsy</Link>
                        </div>
                    </div>

                    {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                    <div className={`items-center md:flex ${!mobileMenu ? 'hidden' : ''}`}>
                        <div className="flex flex-col md:flex-row md:mx-6">
                            <NavLink style={({ isActive }) => {
                                return {
                                    borderBottom: isActive ? "2px solid black" : ""
                                }
                            }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/">Home</NavLink>
                            <NavLink style={({ isActive }) => {
                                return {
                                    borderBottom: isActive ? "2px solid black" : ""
                                }
                            }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/contact">Contact</NavLink>
                            {authToken ? (<>
                                <NavLink style={({ isActive }) => {
                                    return {
                                        borderBottom: isActive ? "2px solid black" : ""
                                    }
                                }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/sell">Sell</NavLink>
                                <NavLink style={({ isActive }) => {
                                    return {
                                        borderBottom: isActive ? "2px solid black" : ""
                                    }
                                }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/myProducts">My Products</NavLink>
                            </>) : (
                                <NavLink style={({ isActive }) => {
                                    return {
                                        borderBottom: isActive ? "2px solid black" : ""
                                    }
                                }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/login">Login</NavLink>
                            )}
                            <NavLink style={({ isActive }) => {
                                return {
                                    borderBottom: isActive ? "2px solid black" : ""
                                }
                            }} className="my-1 text-sm font-medium text-black dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0" to="/about">About</NavLink>
                        </div>
                        <div className="md:flex hidden">
                            <div className="flex justify-center md:block">
                                <Link className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" to="/home/cart">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span>
                                </Link>
                            </div>
                            {authToken ? (
                                <button onClick={handleLogout} className={`text-white ml-4 text-sm leading-5`} to="products/household">
                                    <img src={logOutIcon} alt="logOut" width="25px" />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>


                <div className={`py-3 mt-3 mx-3 overflow-scroll bg-black md:overflow-hidden whitespace-nowrap ${display}`}>
                    <NavLink style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "#4B5563" : "black",
                            borderBottom: isActive ? "2px solid white" : ""
                        }
                    }} className={`text-white p-3 text-sm leading-5 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-gray-600`} to="/allproducts">
                        All Products
                    </NavLink>
                    <NavLink style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "#4B5563" : "black",
                            borderBottom: isActive ? "2px solid white" : ""
                        }
                    }} className={`text-white p-3 text-sm leading-5 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-gray-600`} to="products/electronics">
                        Electronics
                    </NavLink>
                    <NavLink style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "#4B5563" : "black",
                            borderBottom: isActive ? "2px solid white" : ""
                        }
                    }} className={`text-white p-3 text-sm leading-5 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-gray-600`} to="products/clothing">
                        Clothing
                    </NavLink>
                    <NavLink style={({ isActive }) => {
                        return {
                            backgroundColor: isActive ? "#4B5563" : "black",
                            borderBottom: isActive ? "2px solid white" : ""
                        }
                    }} className={`text-white p-3 text-sm leading-5 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-gray-600`} to="products/household">
                        Household
                    </NavLink>
                </div>
            </nav>
            <Outlet />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
