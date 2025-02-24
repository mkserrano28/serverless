import React, { useState } from "react";
import "../css/Card.css";

function Carousel({ darkMode }) { 
    const [flippedIndex, setFlippedIndex] = useState(null);

    const images = [
        { front: "/images/iphone1.jpg", back: "/images/iphone2.jpg" },
        { front: "/images/iphone3.jpg", back: "/images/iphone4.jpg" },
        { front: "/images/iphone5.jpg", back: "/images/iphone6.jpg" },
    ];

    return (
        <div className={`card flex flex-col items-center h-auto min-h-screen p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            <h1 className={`text-center font-serif text-4xl sm:text-5xl ${darkMode ? "text-yellow-200" : "text-blue-800"}`}>
                About Ephone
            </h1>
            <div className="flex flex-wrap justify-center gap-6 md:gap-14 mt-5">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-40 sm:w-64 h-56 sm:h-[20rem] perspective-1000 cursor-pointer"
                        onClick={() => setFlippedIndex(index === flippedIndex ? null : index)}
                    >
                        {/* Front Side */}
                        <div
                            className={`absolute w-full h-full rounded-lg transition-transform duration-500 transform-style-3d ${
                                flippedIndex === index ? "rotate-y-180" : ""
                            }`}
                        >
                            <img 
                                className="w-full h-full object-cover rounded-lg " 
                                src={image.front} 
                                alt="Iphone"
                            />
                        </div>
                        {/* Back Side */}
                        <div
                            className={`absolute w-full h-full rounded-lg transition-transform duration-500 transform-style-3d ${
                                flippedIndex === index ? "rotate-y-0" : "rotate-y-180"
                            }`}
                        >
                            <img 
                                className="w-full h-full object-cover rounded-lg" 
                                src={image.back} 
                                alt="Iphone"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
