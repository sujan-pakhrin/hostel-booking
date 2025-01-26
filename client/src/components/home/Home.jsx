import React from "react";
import { MdOutlineFreeCancellation } from "react-icons/md";
import hostelImg from "../../assets/public/svg/hostel.svg";

const Home = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col text-white relative">
                <div className="bg-gradient-to-r from-primary to-primary w-full h-[300px] rounded-sm flex flex-col gap-3 pt-6 pl-6">
                    <span className="text-6xl font-semibold">
                        {" "}
                        Meet your people.{" "}
                    </span>
                    <span className="text-2xl font-semi-bold">
                        Choose where to stay and we'll show you who with!
                    </span>
                </div>

                <div className="bg-white shadow-lg shadow-gray-400 w-2/3 text-gray-700 flex justify-between py-5 px-4 rounded-sm absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
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
                    <button className="bg-primary text-white py-2 px-4 rounded-sm hover:bg-primary transition">
                        Search
                    </button>
                </div>
            </div>
            <div className=" mt-14 text-black flex justify-center items-center gap-2">
                <MdOutlineFreeCancellation className="text-2xl" />
                <span className="text-md">
                    <span className="font-bold">Free Cancellation </span>
                    <span>&</span>{" "}
                    <span className="font-bold">Flexible Booking</span>
                    <span> available</span>
                </span>
            </div>
            <div className=" w-full flex items-center gap-5">
                <div className="flex-1">
                    <h2 className="text-4xl font-semibold my-6">
                        Discover Our Hostels
                    </h2>
                    <p className="text-gray-500 my-5">
                        Our world-class hostels cater to the most demanding<br/>
                        travelers, providing a comfortable, safe, and welcoming
                        experience.
                    </p>
                    <button className="bg-primary text-white py-3 px-4 rounded-sm hover:bg-primary transition">
                        Explore Now
                    </button>
                </div>
                <div className="flex-1">
                    <img src={hostelImg} alt="" className="" />
                </div>
            </div>
        </div>
    );
};

export default Home;
