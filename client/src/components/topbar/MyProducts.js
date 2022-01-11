import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../css/myProducts.css";
import img from "../icons/product.jpg";
import { loaderActions } from "../state/action-creaters/actions";
import loaderGif from "../icons/hourglass.gif";
import { bufferToBase64 } from '../commonFunctions';
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function MyProducts() {
    const loader = useSelector(state => state.loader);

    let { setLoader } = loaderActions;

    const [myProducts, setmyProducts] = useState([]);

    const getMyProducts = async () => {
        setLoader(true);
        let url = `/api/item/myItems`;
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5MjY4ZWVlYmU2MWE1ZTdhMWU5MzEwIn0sImlhdCI6MTYzNzMzODg1OX0.Kn_EyTZNYtYgLxFXciokFSbJ-2jTaktusYcSA1z_pmU'
            }
        })
        let data = await res.json();
        setmyProducts(data);
        console.log(data);
        setTimeout(() => {
            setLoader(false);
        }, 500);
    }

    useEffect(() => {
        getMyProducts();
        // eslint-disable-next-line
    }, [])
    return loader ? (
        <div className="flex justify-center items-center h-screen">
            <img src={loaderGif} alt="loading..." />
        </div>
    ) : (
        <>
            <div className="text-center mt-2 mb-1">
                <h1 className="text-xl font-bold">Your Products</h1>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-4">

                {myProducts.map((item) => {
                    return (
                        <div className="shadow-lg rounded-2xl bg-white sm:w-64 m-auto p-2 mt-2" key={item._id}>
                            <img src={item.image ? `data:${item.image.contentType};base64,${bufferToBase64(item.image.data.data)}` : img} alt="adidas" style={{ height: '170px', width: '240px' }} className="p-4 m-auto" />
                            <div className="bg-pink-200 m-3 p-4 rounded-lg">
                                <p className="text-white text-xl font-bold ">
                                    {item.name}
                                </p>
                                <p className="text-white">
                                    ${item.price}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <Link to={`/myProducts/edit/${item._id}`}>
                                        <button className="flex justify-center items-center w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700">
                                            <AiFillEdit size={25} />
                                        </button>
                                    </Link>
                                    <Link to={`/myProducts`}>
                                        <button className="flex justify-center items-center w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700">
                                            <AiTwotoneDelete size={25} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
