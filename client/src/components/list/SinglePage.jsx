import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { singlePostData } from "../lib/dumyDatam";


const data = singlePostData;


const SinglePage = () => {
  console.log(data);
    const { id } = useParams();
    const hostel_id = parseInt(id);

    const [currentImage, setCurrentImage] = useState(singlePostData.images[0]);

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    return (
        <div className="py-6">
            <div className="mb-6 h-[500px]  flex justify-start">
                <img
                    src={currentImage}
                    alt="Current Product"
                    className="w-[100%] h-90 object-cover"
                />
            </div>

            <div className="flex justify-center gap-4">
                {singlePostData.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-[100%] h-40 object-cover cursor-pointer transition-transform transform hover:scale-110 ${
                            image === currentImage
                                ? "border-4 border-blue-500"
                                : ""
                        }`}
                        onClick={() => handleThumbnailClick(image)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SinglePage;
