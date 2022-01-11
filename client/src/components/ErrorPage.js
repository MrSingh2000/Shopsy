import React from 'react';
import { Link } from 'react-router-dom';
import lost from "../assets/lost.png";

export default function ErrorPage() {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center  bg-gradient-to-b from-gray-300 to-gray-200 p-3 sm:p-20 lg:p-40 rounded-2xl shadow-xl">
                <div className="text-center text-5xl p-3 pb-10 font1 flex justify-evenly items-center">
                    <img src={lost} alt="!" height="30px" width="60px" />
                    Oops!
                </div>
                <div className="text-center text-3xl font2">
                    Looks like you are Lost.
                </div>
                <div className="p-3 text-lg font4">
                    let us help you get
                    <Link to="/">
                        <button className="py-1 px-2 ml-2 bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
