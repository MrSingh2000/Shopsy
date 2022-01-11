import React from 'react';
import github from "../icons/github.png";
import gmail from "../icons/gmail.png";
import linkedIn from "../icons/linkedin.png";
import instagram from "../icons/instagram.png";

export default function Contact() {
    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Me</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">I'd Love to Hear from You! &#128150;</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <ul className="flex justify-between w-full">
                                <li>
                                    <a target="_blank" referrerPolicy="no-referrer" href="https://www.linkedin.com/in/anshuman-singh-856991201/">
                                        <img src={linkedIn} alt="LinkedIn" height="50px" width="50px" />
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" referrerPolicy="no-referrer" href="https://github.com/MrSingh2000">
                                        <img src={github} alt="Github" height="50px" width="50px" />
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" referrerPolicy="no-referrer" href="https://www.instagram.com/mr_singh2000/">
                                        <img src={instagram} alt="Instagram" height="50px" width="50px" />
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" referrerPolicy="no-referrer" href="mailto:www.anshu2000@gmail.com">
                                        <img src={gmail} alt="Gmail" height="50px" width="50px" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
