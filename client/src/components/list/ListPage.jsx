import React from "react";
import { listData } from "../lib/dumyDatam";
import Filter from "../filter/Filter";
import Card from "../card/Card";
import Map from "../map/Map";

const data = listData;

const ListPage = () => {
    return (
        <div className="flex min-h-screen gap-5">
            {/* Left Column */}
            <div className="flex-[3]">
                <div className="flex flex-col gap-10">
                    <Filter />
                    {data.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="flex-[2] bg-[#fcf5f3] sticky top-[86px] h-[91vh] overflow-y-auto"> 
                <Map items={data}/>
            </div>
        </div>
    );
};

export default ListPage;
