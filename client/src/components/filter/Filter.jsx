import React from "react";
import { IoSearch } from "react-icons/io5";

const Filter = () => {
    return (
        <div className="flex flex-col gap-2 sticky">
            <h1 className="font-md text-[24px]">
                Search result for <b>Helllo</b>
            </h1>
            <div>
                <div className="flex flex-col w-full">
                    <label htmlFor="">Location</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City Location"
                        className="p-3 border rounded-sm text-[14px] outline-none"
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="">
                    <label htmlFor="type" className="text-[14px]">
                        Type
                    </label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        placeholder="Type"
                        className="p-3 border rounded-sm text-[14px] outline-none w-full"
                    />
                </div>
                <div>
                    <label htmlFor="" className="text-[14px]">
                        Min Price
                    </label>
                    <input
                        type="minPrice"
                        id="minPrice"
                        name="minPrice"
                        placeholder="any"
                        className="p-3 border rounded-sm text-[14px] outline-none w-full"
                    />
                </div>
                <div>
                    <label htmlFor="" className="text-[14px]">
                        Max Price
                    </label>
                    <input
                        type="text"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="any"
                        className="p-3 border rounded-sm text-[14px] outline-none w-full"
                    />
                </div>
                <div>
                    <label htmlFor="" className="text-[14px]">
                        Total Person
                    </label>
                    <input
                        type="text"
                        id="totalPerson"
                        name="totalPerson"
                        placeholder="any"
                        className="p-3 border rounded-sm text-[14px] outline-none w-full"
                    />
                </div>
                <div className="flex items-end text-white">
                    <button className="flex items-center gap-2 justify-between rounded-sm px-5 bg-primary py-3">
                        <span>Search</span>
                        <IoSearch className="text-[23px] " />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
