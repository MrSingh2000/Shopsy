import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import MainProCrousel from './MainProCrousel';
import cp1 from "../assets/cp1.jpg";
import cp2 from "../assets/cp2.jpg";
import cp3 from "../assets/cp3.jpg";
import cp4 from "../assets/cp4.jpg";


export default function Home() {
    // to import all the product imags from the folder at once
    // function importAll(r) {
    //     return r.keys().map(r);
    //   }
    // let images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)Rs. /));
    // (WAS CAUSING SOME ISSUES TO REMOVED IT AND USED GOOGLE DRIVE)

    let images = ["https://drive.google.com/uc?export=view&id=1cVOgHfMAYG5J7FGn5Vo8Qi0HdjGXL3SE",
        "https://drive.google.com/uc?export=view&id=1TiBiBX0OUE3AbanJZonmVUrPggG2jvXA",
        "https://drive.google.com/uc?export=view&id=1iDqsM12V19D9M9ZWevXlK4pZvzwQXubw",
        "https://drive.google.com/uc?export=view&id=1JqZeANuxhu4kwIVhi0L4_CA9789feU69",
        "https://drive.google.com/uc?export=view&id=18zfgIwSSFn5BtHY-6vVrN2mt2pd2yNyR",
        "https://drive.google.com/uc?export=view&id=1HsS6HB8SVw4FoygRIw8-T5QU_xon2hJn",
        "https://drive.google.com/uc?export=view&id=1-NeFsY2Fem6pdcHehw3lPQCLDoe-yNDu",
        "https://drive.google.com/uc?export=view&id=1JF6dLmVtVBs034QPPcwqF1-d-oKaZ4XW",
        "https://drive.google.com/uc?export=view&id=1lkLNGcMc6C85ASeKOMQfsSwCzK9I5Jm8",
        "https://drive.google.com/uc?export=view&id=1H-f8TDfDVvlHA2De8thZdUBsPa8C5WuD",
        "https://drive.google.com/uc?export=view&id=1UU1uAHuxk3Cq0n1sV8uN-hEmMkiL6zj2",
        "https://drive.google.com/uc?export=view&id=1JsNmPyvcxbFmHOVH18YmHWVo5ey4FkRt",
        "https://drive.google.com/uc?export=view&id=1HUoWd9pqQv5INt6xj7bGtDSNDItiFbSF",
        "https://drive.google.com/uc?export=view&id=10HJcV5As2HiJTkLRGQqhxOt8pCHwn8zp",
        "https://drive.google.com/uc?export=view&id=1oV2GAQE6VfEWpZKadbQ1JZXKVC8RL5Az",
        "https://drive.google.com/uc?export=view&id=1QKSqG771w1yUjS3sT4vZxqC-mjQP5waw",
        "https://drive.google.com/uc?export=view&id=1UhCZG7e4y3o9O7KfWbQ7SfvnKixcvto6",
        "https://drive.google.com/uc?export=view&id=197zso5f-01rdJYB6HH1lNA5yFgHAfI0z",
        "https://drive.google.com/uc?export=view&id=1rlEXJhgbFEqZFjHPjjERtKVy24IZDZHW",
        "https://drive.google.com/uc?export=view&id=1rHHV7FmRxTOKxF6E8dAhke1PXJp4Txqq",
    ];

    let cimages = [cp1, cp2, cp3, cp4];

    const [iPos, setiPos] = useState(0)
    const [cImage, setcImage] = useState(cimages[0]);
    const [once, setonce] = useState(false);

    const changeI = (val) => {
        if (val >= 4) {
            setiPos((prevValue) => {
                return 0;
            });
            setcImage(cimages[0]);
            val = 0;
        }
        else {
            setiPos((prevValue) => {
                return val;
            });
            setcImage(cimages[val]);
        }
        setTimeout(() => {
            changeI(val + 1);
        }, 5000);
    }

    useEffect(() => {
        if (!once) {
            changeI(0);
        }
    }, [])

    const [todayDeal, settodayDeal] = useState([199, 299, 339, 549, 459, 799, 699]);


    return (
        <div className="select-none">
            <MainProCrousel change={changeI} image={cImage} i={iPos} />

            <div>
                <h1 className="text-white bg-black mt-5 p-3 text-2xl text-center font2">Today's Deal</h1>
                <ul className="flex overflow-x-scroll scrollBar2 py-2">
                    {todayDeal.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="shadow-lg rounded-2xl bg-white w-64 m-auto p-2 ml-2">
                                    <img src={images[index]} alt="adidas" style={{ height: '170px', width: '240px' }} className="p-4 m-auto" />
                                    <div className="bg-pink-200 m-3 p-4 rounded-lg">
                                        <div className="flex items-center justify-between ">
                                            <p className="text-white">
                                                Rs. {item}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[18]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">Rs. 1199</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[11]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p className="mt-1">Rs. 2499</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[12]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p className="mt-1">Rs. 1299</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[13]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p className="mt-1">Rs. 2599</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[14]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">Rs. 4599</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[15]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p className="mt-1">Rs. 7599</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[16]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p className="mt-1">Rs. 3499</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={images[17]} />
                            </div>
                            <div className="mt-4">

                                <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p className="mt-1">Rs. 8999</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
