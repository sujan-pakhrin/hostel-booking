import React from "react";

const Popular = () => {
    return (
        <div className="flex justify-between gap-6">
            <div className="flex flex-col border-gray-100 rounded-sm border w-full hover:shadow-lg hover:shadow-gray-200">
                <img
                    src={
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a9/c5/1a/corner-hostel.jpg?w=700&h=-1&s=1"
                    }
                    alt=""
                    className="w-full h-[230px] object-cover rounded-sm"
                />
                <div className="flex flex-col px-4 py-5 gap-3">
                    <span className="font-semibold text-[20px] leading-[28px] tracking-[-0.4px]">
                        Name
                    </span>
                    <span className="text-[16px] leading-[24px] tracking-[-0.1px] text-[#5F6D7E]">
                        This hostel is best fo the hostel and the rating is good
                        too
                    </span>
                    <span className="text-green-600">Rs. 200</span>
                    <div className="flex justify-end">

                    <button className="px-5 py-3 bg-primary rounded-sm text-white">Book Now</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-gray-100 rounded-sm border w-full hover:shadow-lg hover:shadow-gray-200">
                <img
                    src={
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a9/c5/1a/corner-hostel.jpg?w=700&h=-1&s=1"
                    }
                    alt=""
                    className="w-full h-[230px] object-cover rounded-sm"
                />
                <div className="flex flex-col px-4 py-5 gap-3">
                    <span className="font-semibold text-[20px] leading-[28px] tracking-[-0.4px]">
                        Name
                    </span>
                    <span className="text-[16px] leading-[24px] tracking-[-0.1px] text-[#5F6D7E]">
                        This hostel is best fo the hostel and the rating is good
                        too
                    </span>
                    <span className="text-green-600">Rs. 200</span>
                    <div className="flex justify-end">

                    <button className="px-5 py-3 bg-primary rounded-sm text-white">Book Now</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-gray-100 rounded-sm border w-full hover:shadow-lg hover:shadow-gray-200">
                <img
                    src={
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a9/c5/1a/corner-hostel.jpg?w=700&h=-1&s=1"
                    }
                    alt=""
                    className="w-full h-[230px] object-cover rounded-sm"
                />
                <div className="flex flex-col px-4 py-5 gap-3">
                    <span className="font-semibold text-[20px] leading-[28px] tracking-[-0.4px]">
                        Name
                    </span>
                    <span className="text-[16px] leading-[24px] tracking-[-0.1px] text-[#5F6D7E]">
                        This hostel is best fo the hostel and the rating is good
                        too
                    </span>
                    <span className="text-green-600">Rs. 200</span>
                    <div className="flex justify-end">

                    <button className="px-5 py-3 bg-primary rounded-sm text-white">Book Now</button>
                    </div>
                </div>
            </div>
            
            {/* <div className="w-full flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                    <span className="flex flex-col">
                        <span className=" font-semibold text-[20px] leading-[28px] tracking-[-0.4px]">
                            Morgan Drew
                        </span>
                        <span className="text-[16px] leading-[24px] tracking-[-0.1px] text-[#5F6D7E]">
                            Manager
                        </span>
                    </span>
                    <div className="flex gap-[16px] ">
                        <FaTwitter className='w-[20px] h-[20px]' />
                <FaFacebook className='w-[20px] h-[20px]' />
                <FaLinkedin className='w-[20px] h-[20px]' />
                <FaTelegram className='w-[20px] h-[20px]' />
                    </div>
                </div>
            </div> */}

            
        </div>
    );
};

export default Popular;
