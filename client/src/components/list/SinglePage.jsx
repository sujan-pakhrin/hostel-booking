import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { singlePostData } from "../lib/dumyDatam";


const data = singlePostData;


const SinglePage = () => {
  console.log(data);
    const { id } = useParams();
    const hostel_id = parseInt(id);

    console.log("Item ID from URL:", id);
    // const productImages = [
    //     "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/6e61b/MainAfter.avif",
    //     "https://img.freepik.com/free-photo/view-chameleon-with-bright-neon-colors_23-2151682728.jpg?semt=ais_hybrid",
    //     "https://img.freepik.com/free-photo/beautiful-chameleon-wild_23-2151731209.jpg?semt=ais_hybrid",
    //     "https://img.freepik.com/free-photo/view-chameleon-with-bright-neon-colors_23-2151682750.jpg?semt=ais_hybrid",
    // ];

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
