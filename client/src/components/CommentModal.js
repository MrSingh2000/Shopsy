/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BiCommentAdd } from "react-icons/bi"
import { useParams } from 'react-router-dom';
import {commentSentTrue} from "./state/action-creaters/commentSentActions";

export default function CommentModal(props) {
    let { open, setOpen } = props;
    let {id} = useParams();

    const cancelButtonRef = useRef(null);

    const [comment, setcomment] = useState({ title: "", review: "", star: 0 });
    const handleCommentChange = (e) => {
        setcomment({...comment, [e.target.name]: e.target.value});
    }

    const handleStar = (val) => {
        setcomment({...comment, star: val});
    }

    const sendData = async () => {
        let response = await fetch(`/api/comment/submit/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5MjY4ZWVlYmU2MWE1ZTdhMWU5MzEwIn0sImlhdCI6MTYzNzMzODg1OX0.Kn_EyTZNYtYgLxFXciokFSbJ-2jTaktusYcSA1z_pmU',
            },
            body: JSON.stringify(comment)
        });
        // eslint-disable-next-line
        let res = response.json();
        commentSentTrue();
        setOpen(false);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <BiCommentAdd className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            ADD A REVIEW
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="mb-3">
                                                <label className="text-lg font-semibold">Title</label>
                                                <p>
                                                    <input onChange={handleCommentChange} className="border-2 rounded-lg p-1" type="text" name="title" id="title" />
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-lg font-semibold">Review</label>
                                                <p>
                                                    <textarea onChange={handleCommentChange} className="border-2 rounded-lg p-1" name="review" id="review" cols="30" rows="2"></textarea>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-lg font-semibold">Ratings</label>
                                                <div className="flex mb-4">
                                                    <span className="flex items-center">
                                                        <svg onClick={() => {handleStar(1)}} fill={comment.star >= 1 ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="hover:text-red-300 w-6 h-6 text-indigo-500" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                        </svg>
                                                        <svg onClick={() => {handleStar(2)}} fill={comment.star >= 2 ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="hover:text-red-300 w-6 h-6 text-indigo-500" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                        </svg>
                                                        <svg onClick={() => {handleStar(3)}} fill={comment.star >= 3 ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="hover:text-red-300 w-6 h-6 text-indigo-500" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                        </svg>
                                                        <svg onClick={() => {handleStar(4)}} fill={comment.star >= 4 ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="hover:text-red-300 w-6 h-6 text-indigo-500" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                        </svg>
                                                        <svg onClick={() => {handleStar(5)}} fill={comment.star === 5 ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="hover:text-red-300 w-6 h-6 text-indigo-500" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={sendData}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
