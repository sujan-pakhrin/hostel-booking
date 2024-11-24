import React from "react";
import { MdOutlineFreeCancellation } from "react-icons/md";

const Home = () => {
    return (
        <div>
            <div className="flex flex-col text-white relative">
                <div className="bg-gradient-to-r from-purple-700 to-purple-500 w-full h-[300px] rounded-lg shadow-lg shadow-gray-400 flex flex-col gap-3 pt-6 pl-6">
                    <span className="text-6xl font-semibold">
                        {" "}
                        Meet your people.{" "}
                    </span>
                    <span className="text-2xl font-semi-bold">
                        Choose where to stay and we'll show you who with!
                    </span>
                </div>

                <div className="bg-white shadow-lg shadow-gray-400 w-2/3 text-gray-700 flex justify-between py-5 px-4 rounded-lg absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                    <input
                        className="outline-none px-3 py-2 rounded-md w-1/4"
                        placeholder="City"
                    />
                    <input
                        className="outline-none px-3 py-2 rounded-md w-1/4"
                        placeholder="Date"
                    />
                    <input
                        className="outline-none px-3 py-2 rounded-md w-1/4"
                        placeholder="Total Person"
                    />
                    <button className="bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition">
                        Search
                    </button>
                </div>
            </div>
            <div className=" mt-14 text-black flex justify-center items-center gap-2">
                <MdOutlineFreeCancellation className="text-2xl" />
                <span className="text-md">
                    <span className="font-bold">Free Cancellation </span>
                    <span>&</span> <span className="font-bold">Flexible Booking</span><span> available</span>
                </span>
            </div>
        </div>
    );
};

export default Home;
