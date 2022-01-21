import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bufferToBase64, notify } from './commonFunctions';
import img from "./icons/product.jpg";
import { setLoader } from './state/action-creaters/loaderActions';
import loaderGif from "./icons/hourglass.gif";
import { useSelector } from 'react-redux';
import { cartAdd } from './state/action-creaters/cartActions';

export default function Products() {
    const [allProducts, setallProducts] = useState([]);
    const loader = useSelector(state => state.loader);


    useEffect(() => {
        const getData = async () => {
            setLoader(true);
            let response = await fetch(`${process.env.REACT_APP_HOST}/api/products/allproducts`, {
                method: 'GET',
            }
            )
            let data = await response.json();
            setallProducts(data.products);
            setLoader(false);
        }
        getData();
    }, []);

    return loader ? (
        <div className="flex justify-center items-center h-screen">
            <img src={loaderGif} alt="loading..." />
        </div>
    ) : (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {allProducts.map((product, index) => {
                    return (
                        <div key={product._id} className="shadow-lg rounded-2xl bg-white sm:w-64 m-auto p-2 mt-2">
                            <Link to={`/product/${product._id}`} >
                                <img src={product.image ? `data:${product.image.contentType};base64,${bufferToBase64(product.image.data)}` : img} alt="adidas" style={{ height: '170px', width: '240px' }} className="p-4 m-auto" />
                            </Link>

                            <div className="bg-pink-200 m-3 p-4 rounded-lg">
                                <p className="text-white text-xl font-bold ">
                                    {product.name}
                                </p>
                                <div className="flex items-center justify-between ">
                                    <p className="text-white">
                                        ${product.price}
                                    </p>
                                    <button onClick={() => {
                                        cartAdd(product);
                                        notify("Product Added to CART!", "success");
                                    }} type="button" className="w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="white" viewBox="0 0 1792 1792">
                                            <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
