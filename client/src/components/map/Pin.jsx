import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const Pin = ({ item }) => {
    console.log(item);
    console.log(item.images);
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="flex gap-4">
                    <img
                        src={item.images}
                        alt={item.title}
                        className="object-cover w-[64px] h-[48px] rounded-sm"
                    />
                    <div className="flex flex-col justify-between">
                        <h1 className="font-bold max-w-[300px]">
                            {item.title}
                        </h1>
                        <span className="flex">{item.bedroom} Bedroom</span>
                    <b>${item.price}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default Pin;
