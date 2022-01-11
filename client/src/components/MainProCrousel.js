import React from 'react';

export default function MainProCrousel(props) {
    let {i, image, change} = props;
    

    return (
        <header className="bg-white dark:bg-gray-800 shadow-xl">
            <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center lg:space-x-6">
                <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
                    <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
                        <button onClick={() => change(0)} className={`w-3 h-3 mx-2 ${i === 0 ? "bg-blue-500" : "bg-gray-300"} rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500`}></button>
                        <button onClick={() => change(1)} className={`w-3 h-3 mx-2 ${i === 1 ? "bg-blue-500" : "bg-gray-300"} rounded-full lg:mx-0 focus:outline-none`}></button>
                        <button onClick={() => change(2)} className={`w-3 h-3 mx-2 ${i === 2 ? "bg-blue-500" : "bg-gray-300"} rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500`}></button>
                        <button onClick={() => change(3)} className={`w-3 h-3 mx-2 ${i === 3 ? "bg-blue-500" : "bg-gray-300"} rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500`}></button>
                    </div>

                    <div className="max-w-lg lg:mx-12 lg:order-2">
                        <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">The best Apple Watch apps</h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia asperiores alias vero magnam recusandae adipisci ad vitae laudantium quod rem voluptatem eos accusantium cumque.</p>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img  className="object-cover w-full h-full max-w-2xl rounded-md shadow-lg" src={image} alt="apple_pic" />
                </div>
            </div>
        </header>
    )
}
