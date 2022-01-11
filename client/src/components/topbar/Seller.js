import React, { useState, useEffect } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { TiImage } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { notify } from '../commonFunctions';
import noImg from '../icons/no_card.jpg';

export default function Seller() {
    let navigate = useNavigate();

    const [product, setproduct] = useState({ title: "", seller: "", description: "", price: 0, currency: "", category: "" });

    const onChange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    }
    const [img, setimg] = useState(null);
    const [tempImg, settempImg] = useState(null);

    const submitProduct = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("image", img);
        let sendProduct = {
            name: product.title,
            price: product.price,
            info: { description: product.description },
            seller: product.seller,
            category: product.category
        }
        data.append("product", JSON.stringify(sendProduct));
        let url = `/api/item/add`;
        fetch(url, {
            method: 'POST',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5MjY4ZWVlYmU2MWE1ZTdhMWU5MzEwIn0sImlhdCI6MTYzNzMzODg1OX0.Kn_EyTZNYtYgLxFXciokFSbJ-2jTaktusYcSA1z_pmU',
            },
            body: data
        }).then((response) => {
            notify("Product Submitted Successfully!", "success");
            navigate("/");
        }).catch((err) => {
            console.log('error: ', err);
            notify(err, "error");
        })
    }

    return (
        <div className="flex justify-around items-center mt-5">
            <div className="bg-gradient-to-b from-blue-600 to-pink-100">
                <div className="w-full">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-400 h-96"></div>
                    <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
                        <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
                            <p className="text-3xl font3 leading-7 text-center">Sell Your Product</p>
                            <form onSubmit={submitProduct}  className="font4">
                                <div className="md:flex items-center mt-12">
                                    <div className="w-full md:w-1/2 flex flex-col">
                                        <label className="font-semibold leading-none">Product Title</label>
                                        <input type="text" name="title" value={product.title} onChange={onChange} className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                        <label className="font-semibold leading-none">Seller Name</label>
                                        <input type="text" name="seller" value={product.seller} onChange={onChange} className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full flex flex-col mt-8">
                                        <label className="font-semibold leading-none">Category</label>
                                        <select className="mt-3 border-2 border-black-300 rounded-xl" onChange={onChange} name="category" id="category">
                                            <option value="none" selected disabled hidden>Select an Option</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="household">Household</option>
                                            <option value="shoes">Electronics</option>
                                            <option value="shoes">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="w-full flex flex-col mt-8">
                                        <label className="font-semibold leading-none">Description</label>
                                        <textarea type="text" name="description" value={product.description} onChange={onChange} className="h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"></textarea>
                                    </div>
                                </div>
                                <div className="md:flex items-center mt-8">
                                    <div className="w-full flex flex-col">
                                        <label className="font-semibold leading-none">Product Images</label>
                                        <label className="w-64 mt-3 flex flex-row items-center px-4 py-1 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                                            <IoMdCloudUpload size="5rem" />
                                            <span className="mt-2 text-base leading-normal ml-2">Select a file</span>
                                            <input type="file" name="image" className="hidden" onChange={(e) => { setimg(e.target.files[0]) }} />
                                        </label>
                                    </div>

                                </div>

                                <div className="mt-8">
                                    <label for="price" className="font-semibold leading-none ">
                                        Price
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">
                                                Rs. 
                                            </span>
                                        </div>
                                        <input type="number" name="price" value={product.price === 0 ? "" : product.price} onChange={onChange} id="price" className="focus:ring-indigo-500 border-l border-b border-t border-gray-300 py-2 px-4 ml-1 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md" placeholder="0.00" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full">
                                    <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                                        Submit Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {product.title ? (<div>
                <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 hidden lg:block">
                    <div className="px-4 py-2">
                        <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">{product.title}</h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                    </div>
                    {img ?
                        <img alt="product_Image" className="object-cover w-full h-48 mt-2" src={URL.createObjectURL(img)} /> :
                        <TiImage size="8rem" color="blue" style={{ margin: 'auto' }} />}
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                        <h1 className="text-lg font-bold text-white">{product.price}</h1>
                        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Add to cart</button>
                    </div>
                </div>
            </div>) :
                (<div className="text-2xl text-center max-w-xs bg-gray-600 text-white h-72 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 hidden lg:block">
                    <div className="mt-20">
                        Start Creating Your Product By adding Product Name
                    </div>
                </div>)
            }

        </div>
    )
}
