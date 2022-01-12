import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdCloudUpload } from "react-icons/io";
import { setLoader } from './state/action-creaters/loaderActions';
import { bufferToBase64 } from './commonFunctions';
import loaderGif from "./icons/loader1.gif";
import { useSelector } from 'react-redux';

function EditProduct() {
    const loader = useSelector(state => state.loader);
    const authToken = useSelector(state => state.authToken);
    let navigate = useNavigate();
    let { id } = useParams();
    const [product, setproduct] = useState({ title: "", description: "", price: 0 });
    const [media, setmedia] = useState(null);
    const [prevImg, setprevImg] = useState(null);

    const getDetails = async () => {
        setLoader(true);
        let url = `/api/products/${id}`;
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': authToken,
            }
        });
        let data = await res.json();
        setproduct({
            title: data.name,
            description: data.info.description,
            price: data.price
        });
        setprevImg(`data:${data.image.contentType};base64,${bufferToBase64(data.image.data.data)}`);
        setTimeout(() => {
            setLoader(false);
        }, 500);
    }

    useEffect(() => {
        getDetails();
    }, [])

    const handleChange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    }

    const editProduct = (e) => {
        e.preventDefault();
        setLoader(true);
        let url = `${process.env.REACT_APP_HOST}/api/item/edit/${id}`;
        if (media) {
            console.log("here");
            let data = new FormData();
            data.append("image", media);
            let sendProduct = {
                name: product.title,
                price: product.price,
                info: { description: product.description },
            }
            data.append("product", JSON.stringify(sendProduct));
            fetch(url, {
                method: 'POST',
                headers: {
                    'auth-token': authToken,
                },
                body: data
            }).then((response) => {
                setLoader(false);
                navigate('/myProducts')
                console.log("data: ", data);
                console.log('response: ', response);
            }).catch((err) => {
                console.log('error: ', err);
            })
        }
        else {
            let sendProduct = {
                name: product.title,
                price: product.price,
                info: { description: product.description },
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify(sendProduct)
            }).then((response) => {
                setLoader(false);
                navigate('/myProducts')
                console.log('response: ', response);
            }).catch((err) => {
                console.log('error: ', err);
            })
        }
    }


    return loader ? (
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-full">
                <img src={loaderGif} alt="Loading..." height="100px" width="100px"/>
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center">
            <div className="flex w-full max-w-sm space-x-3">
                <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-gray-100 rounded-lg shadow dark:bg-gray-800">
                    <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                        Edit Your Product
                    </div>
                    <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                        <div className="col-span-2 lg:col-span-1">
                            <div className=" relative ">
                                <label htmlFor="title" className="font-semibold ml-1">Title</label><br />
                                <input onChange={handleChange} name="title" type="text" id="title" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Title" value={product.title} />
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <div className=" relative ">
                                <label htmlFor="price" className="font-semibold ml-1">Price</label><br />
                                <input onChange={handleChange} name="price" type="number" id="price" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Rs.0.00" value={product.price} />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-700" htmlFor="name">
                                <label htmlFor="description" className="font-semibold ml-1">Description</label>
                                <textarea name="description" onChange={handleChange} value={product.description} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="description" placeholder="Enter your Product Details" rows="5" cols="40">
                                </textarea>
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="w-64 mt-3 flex flex-row items-center px-4 py-1 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                                <IoMdCloudUpload size="5rem" />
                                <span className="mt-2 text-base leading-normal ml-2">Select a file</span>
                                <input type="file" name="image" className="hidden" onChange={(e) => { setmedia(e.target.files[0]) }} />
                            </label>
                            <div className="mt-2">
                                <img className="rounded-xl" src={media ? URL.createObjectURL(media) : prevImg} alt="PrevImage" />
                            </div>
                        </div>
                        <div className="col-span-2 text-right flex">
                            <button onClick={editProduct} className="mr-1 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Update
                            </button>
                            <button onClick={() => { navigate(-1) }} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditProduct
