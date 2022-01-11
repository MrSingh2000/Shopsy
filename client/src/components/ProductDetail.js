import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentModal from './CommentModal';
import { bufferToBase64, notify } from './commonFunctions';
import loaderGif from "./icons/hourglass.gif";
import { cartAdd } from './state/action-creaters/cartActions';
import { commentSentFalse } from "./state/action-creaters/commentSentActions";

export default function ProductDetail() {
    // id to send to backend for that particular product
    let { id } = useParams();
    const [productDetails, setproductDetails] = useState(null);
    // fetch data for that product id
    const fetchDetails = async () => {
        let res = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'GET',
        });
        let data = await res.json();
        setproductDetails(data);
    };

    // COMMENT SECTION
    // comment adding popup
    const [open, setOpen] = useState(false);
    // Else things for the comments is done in CommentModal.js
    const commentSent = useSelector(state => state.commentSent);
    const [allComments, setallComments] = useState([]);

    const getComments = async () => {
        let res = await fetch(`http://localhost:5000/api/comment/all/${id}`, {
            method: 'GET',
        });
        let data = await res.json();
        setallComments(data);
    }

    // fetch data when component renders
    useEffect(() => {
        fetchDetails();
        getComments();
        commentSentFalse();
    }, [commentSent]);

    return productDetails === null ? (
        <div className="flex justify-center items-center h-screen">
            <img src={loaderGif} alt="loading..." />
        </div>
    ) : (
        <>
            <CommentModal setOpen={setOpen} open={open} />
            <div>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={productDetails.image ? `data:${productDetails.image.contentType};base64,${bufferToBase64(productDetails.image.data.data)}` : "https://dummyimage.com/400x400"} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productDetails.name}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">{productDetails.rating ? productDetails.rating.toFixed(1) : 0}</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed">{productDetails.info.description ? productDetails.info.description : "No Description"}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    <div className="flex">
                                        <span className="mr-3">Color</span>
                                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                        <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                        <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                                <option>SM</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">Rs. {productDetails.price}</span>
                                    <button onClick={() => {
                                        cartAdd(productDetails);
                                        notify("Product Added to CART!", "success");
                                        }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy</button>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <h1 className="text-2xl mt-2 font-semibold">Comments</h1>
                                    <div className="border-2 border-black mt-1 rounded-xl p-2 h-64">
                                        <ul>
                                            {allComments.length === 0 ?
                                                <div className="text-center font-bold">
                                                    Be the First to add a Comment!
                                                </div> :
                                                allComments.map((cmmnt) => {
                                                    return (
                                                        <li key={cmmnt._id}>
                                                            <p className="font-bold flex justify-between">
                                                                <div>
                                                                    {cmmnt.userName}  <span className="font-semibold italic">({cmmnt.title})</span>
                                                                </div>
                                                                <span className="font-semibold flex items-center">
                                                                    {cmmnt.star}
                                                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ml-1 w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                                    </svg>
                                                                </span>
                                                            </p>
                                                            <p className="text-sm">
                                                                {cmmnt.review}
                                                            </p>
                                                            <hr />
                                                        </li>)
                                                })}
                                        </ul>
                                    </div>

                                    <button onClick={() => { setOpen(true) }} type="button" className="mt-1 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
