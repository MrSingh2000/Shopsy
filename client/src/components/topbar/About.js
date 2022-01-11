import React, { useState } from 'react';
import shopIcon from "../../assets/shopicon2.png";

const Item = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border rounded shadow-sm">
            <button
                type="button"
                aria-label="Open item"
                title="Open item"
                className="flex items-center justify-between w-full p-4 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="text-lg font-medium">{title}</p>
                <div className="flex items-center justify-center w-8 h-8 border rounded-full">
                    <svg
                        viewBox="0 0 24 24"
                        className={`w-3 text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                            }`}
                    >
                        <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            points="2,7 12,17 22,7"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="p-4 pt-0">
                    <p className="text-gray-700">{children}</p>
                </div>
            )}
        </div>
    );
};

export default function About() {
    return (
        <div>
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                    <div className="flex flex-col mb-16 sm:text-center">
                        <a href="/" className="mb-6 sm:mx-auto">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                                <img
                                    className="w-10 h-10 text-deep-purple-accent-400"
                                    src={shopIcon}
                                />
                            </div>
                        </a>
                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                                Shopsy, the stop for unique shopping
                            </h2>
                            <p className="text-base text-gray-700 md:text-lg">
                                An e-commerce web-application based on MERN stack.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Item title="About the Application">
                            This e-commerce application is entirely based on MERN stack. I tried to include various features of the
                            modern environment application although there is always a lot of scope for development. 
                        </Item>
                        <Item title="Tech Stack Used">
                            <ul className="list-disc mx-6">
                                <li>MERN stack</li>
                                <li>Tailwind CSS</li>
                                <li>Express-validator</li>
                                <li>Redux</li>
                                <li>Fetch API</li>
                                <li>Mongoose</li>
                                <li>Multer</li>
                            </ul>
                        </Item>
                    </div>
                </div>
            </div>
        </div>
    )
}
