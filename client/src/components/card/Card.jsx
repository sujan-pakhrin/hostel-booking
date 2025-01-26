import React from "react";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
    return (
        <div className="flex border-gray-100 rounded-sm border border-gray-300 w-full hover:shadow-lg hover:shadow-gray-200 overflow-hidden">
            <Link to={`/list/${item.id}`} className="flex-[2]">
                <img
                    src={item.images}
                    alt=""
                    className="object-cover w-full h-[200px]"
                />
            </Link>
            <div className="flex-[3] px-6 py-4">
                <div className="space-y-4">
                    <Link to={`/list/${item.id}`}>
                        <h1 className="text-[20px] font-semibold text-primary truncate w-[400px]">
                            {item.title}
                        </h1>
                    </Link>
                    <p className="flex gap-2 items-center text-gray-400">
                        <FaLocationDot />
                        <span>{item.address}</span>
                    </p>
                    <p className="text-green-600">${item.price}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-4 bg-gray-100 px-4 rounded-sm">
                        <span className="flex gap-2 items-center">
                            <span>{item.bedroom}</span>
                            <FaBed className="text-[18px]" />
                        </span>
                        <span className="flex gap-2 items-center">
                            <span>{item.bedroom}</span>
                            <FaBath className="text-[18px]" />
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-[18px]">
                            Rating{" "}
                            <span className="text-primary font-medium ">
                                9.8
                            </span>
                        </span>
                        <Link to={`/${item.id}`}>
                            <button className="bg-primary text-white py-3 px-5 rounded-sm">
                                View
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
