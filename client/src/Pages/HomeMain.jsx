import React from "react";
import Home from "../components/home/Home";
import Popular from "../components/home/Popular";
import RecentRooms from "../components/home/RecentRooms";

const HomeMain = () => {
    return (
        <>
            <div className="py-10">
                <Home />
            </div>
            <div className="py-5">
                <div className="py-5">
                    <span className="text-[30px] font-semibold">
                        Popular Rooms
                    </span>
                </div>
                <Popular />
            </div>
            <div className="py-5">
                <div className="py-5">
                    <span className="text-[30px] font-semibold">
                        Recent Rooms
                    </span>
                </div>
                <RecentRooms />
            </div>
        </>
    );
};

export default HomeMain;
