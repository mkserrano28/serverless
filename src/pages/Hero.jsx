import React from "react";

function Hero({ darkMode }) {
    return (
        <div className={`py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center my-12 md:my-24 px-5">
                
                {/* Text Section */}
                <div className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start p-5">
                    <h1 className={`text-5xl md:text-7xl font-serif text-center md:text-left ${darkMode ? "text-yellow-200" : "text-blue-800"}`}>
                        Smart-Ephone
                    </h1>
                    <p className="text-center md:text-left mt-4">
                        "Upgrade your lifestyle with our latest smartphone—sleek design,
                        powerful performance, and a camera that captures every moment in stunning detail.
                        Get yours today and experience the future of mobile technology!"
                    </p>
                    <button className={`mt-4 py-2 px-6 font-semibold border rounded transition-all
                        ${darkMode ? "bg-transparent text-yellow-200 border-yellow-200 hover:bg-yellow-200 hover:text-black" 
                        : "bg-blue-600 text-white border-blue-600 hover:bg-blue-800"}`}>
                        Explore Now
                    </button>
                </div>

                {/* Image Section */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-10 md:mt-0 w-full md:w-1/2">
                    <img className="h-60 md:h-80 rounded-lg hover:scale-105 transition-transform duration-300" src="/images/iphone4.jpg" alt="iPhone 4" />
                    <img className="h-60 md:h-80 rounded-lg hover:scale-105 transition-transform duration-300" src="/images/iphone5.jpg" alt="iPhone 5" />
                    <img className="h-60 md:h-80 rounded-lg hover:scale-105 transition-transform duration-300" src="/images/iphone6.jpg" alt="iPhone 6" />
                </div>
            </div>
        </div>
    );
}

export default Hero;
