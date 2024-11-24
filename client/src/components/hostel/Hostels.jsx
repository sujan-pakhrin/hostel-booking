import React from "react";

const Hostels = () => {
    return (
        <div className="flex gap-4 mt-8">
            <div className="flex-1 shadow-md shadow-gray-300 px-6 py-5 sticky top-8 rounded-lg h-fit mb-8">
                <p>Header Here</p>
            </div>
            <div className="flex-[2] flex flex-col gap-3">
                <div className="flex gap-3 my-2 rounded-2xl mx-3 border border-gray-300 hover:shadow-lg hover:shadow-gray-200 overflow-hidden">
                    <div className="w-[250px]">
                        <img
                            src="https://thumbs.dreamstime.com/b/young-woman-backpack-youth-hostel-smiling-young-woman-backpack-youth-hostel-171304762.jpg?w=768"
                            className="w-full h-full object-cover rounded-2xl p-3"
                            alt="Hostel"
                        />
                    </div>
                    <div className="flex-1 p-3">
                        <p className="font-bold text-2xl">Hostel Name</p>
                        <p className="text-lg text-gray-700">
                            Price: $50/night
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Description: Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Sed hic autem reiciendis sequi
                            labore dolore, iusto et officia repellendus.
                        </p>
                        <button className="mt-3 w-full bg-purple-800 text-white py-2 rounded-3xl font-semibold hover:bg-purple-700">
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hostels;
