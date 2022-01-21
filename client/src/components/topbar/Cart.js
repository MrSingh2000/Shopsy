import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillTag } from "react-icons/ai";
import { useSelector } from 'react-redux';
import img from "../icons/product.jpg";
import { bufferToBase64, notify } from '../commonFunctions';
import { AiOutlineDelete } from "react-icons/ai";
import { cartRemove } from '../state/action-creaters/cartActions';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    
    // promocode function (just for fun)
    const promoRef = useRef(null);
    const [discount, setdiscount] = useState(0);
    const applyPromo = () => {
        if(promoRef.current.value === ""){
            setdiscount(0);
            notify("Please Enter Valid Promocode", "error");
        }
        else{
            setdiscount(cart.length*20);
            notify("Discount Applied!", "success");
        }
        console.log(promoRef.current.value);
    }

    useEffect(() => {
        console.log(cart);
    }, [])

    return (
        <div>
            <div className="sm:flex sm:justify-around">
                <div className="sm:w-2/5 w-screen mt-10" style={{ backgroundColor: '' }}>
                    <h2 className="text-2xl font-semibold">SHOPPING BAG</h2>
                    <h4 className="text-lg font-semibold mt-5">{cart.length} Items</h4>
                    <p className="w-full h-1 bg-black"></p>

                    <div className="container flex flex-col mx-auto w-ful items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
                        {cart.length === 0 ? (
                            <div className="font1 my-5">
                                Your Cart is Empty!
                            </div>
                        ) : (
                            <ul className="flex flex-col divide divide-y w-full h-96 overflow-y-scroll scrollBar1">
                                {cart.map((product) => {
                                    return (<li className="flex flex-row" key={product._id}>
                                        <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                                            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                                <a href="#" className="block relative">
                                                    <img alt="image" src={product.image ? `data:${product.image.contentType};base64,${bufferToBase64(product.image.data)}` : img} className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                </a>
                                            </div>
                                            <div className="flex-1 pl-1 mr-16">
                                                <div className="font-medium dark:text-white">
                                                    {product.name}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-200 text-sm">
                                                    Rs. {product.price}
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <AiOutlineDelete
                                                    onClick={() => {
                                                        cartRemove(product);
                                                        notify("Item Removed!", "success", "ProductRemoved");
                                                    }}
                                                    onMouseOver={(e) => { e.target.style.color = "red" }}
                                                    onMouseOut={(e) => { e.target.style.color = "black" }}
                                                    size="1.5rem" />
                                                <Link to={`/product/${product._id}`} >
                                                    <button className="w-10 text-right flex justify-end">
                                                        <svg width="20" fill="currentColor" height="20" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        )}
                    </div>

                </div>
                <div className="sm:w-2/5 w-screen mt-10">
                    <h2 className="text-lg font-semibold mt-5">ORDER SUMMARY</h2>
                    <p className="w-full h-1 bg-black"></p>
                    <div className="flex w-full justify-between border-2 border-black rounded-lg p-2 mt-3 border-opacity-50">
                        <div className="flex">
                            <AiFillTag size="1.5rem" />
                            <input ref={promoRef} type="text" placeholder="Have a PromoCode?" className="ml-2" />
                        </div>

                        <button className="px-4 py-1 font-medium text-sm tracking-wide text-white hover:bg-gray-600 focus:ring-gray-500 bg-black focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={applyPromo}
                        >
                            Apply
                        </button>
                    </div>
                    <div className="flex justify-between mt-3">
                        <p>Merchandise</p>
                        <p>Rs. {cart.reduce((total, item) => {
                            console.log(total);
                            return total + parseInt(item.price);
                        }, 0)}</p>
                    </div>
                    <div className="flex justify-between mt-3">
                        <p>Estimated Shipping</p>
                        <p>FREE</p>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-3">
                        <p>Order Total:</p>
                        <p><b>Rs. {cart.reduce((total, item) => {
                            console.log(total);
                            return total + parseInt(item.price) - discount;
                        }, 0)}</b></p>
                    </div>
                    <hr />

                    <button className="py-2 px-4 mt-4 bg-black hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
