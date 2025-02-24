import React, { useState, useEffect } from "react";

function Cart({ addToCart, darkMode }) { // ✅ Receive darkMode as a prop
    const [smartphones, setSmartphones] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        fetch("/smartphones.json")
            .then(response => response.json())
            .then(data => setSmartphones(data.smartphones.map((phone, index) => ({ ...phone, id: index }))))
            .catch(error => console.error("Error loading smartphones:", error));
    }, []);

    const handleCheckboxChange = (brand) => {
        setSelectedBrands(prevSelected =>
            prevSelected.includes(brand) ? prevSelected.filter(b => b !== brand) : [...prevSelected, brand]
        );
    };

    const handleAddToCart = (phone) => {
        setLoading(phone.id);
        setTimeout(() => {
            addToCart(phone);
            setLoading(null);
        }, 1000);
    };

    const filteredSmartphones =
        selectedBrands.length > 0 ? smartphones.filter(phone => selectedBrands.includes(phone.brand)) : smartphones;

    return (
        <div className={`container w-full flex flex-col md:flex-row gap-10 p-5 md:p-10 transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
            {/* Sidebar Filter */}
            <div className={`w-full md:w-1/4 h-auto p-5 shadow-lg rounded-2xl transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}>
                <h2 className="font-bold text-lg mb-5 text-center">Product Options</h2>
                {['Apple', 'Samsung', 'Google'].map((brand, index) => (
                    <div key={index} className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mb-5"
                            checked={selectedBrands.includes(brand)} 
                            onChange={() => handleCheckboxChange(brand)} 
                        />
                        <label className="ml-5 text-sm text-gray-500 dark:text-gray-300 mb-5">{brand}</label>
                    </div>
                ))}
            </div>

            {/* Product Grid */}
            <div className="w-full md:w-3/4">
                <h2 className="font-bold text-lg mb-4">Smartphones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                    {filteredSmartphones.map(phone => (
                        <div key={phone.id} className={`shadow-lg rounded-3xl p-4 hover:scale-105 transition-transform ${
                            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                        }`}>
                            <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-xl">
                                <img src={phone.image} alt={phone.model} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold mt-2">{phone.model}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-base">${phone.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Processor: {phone.specifications.processor}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">RAM: {phone.specifications.ram}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Storage: {phone.specifications.storage.join(", ")}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Battery: {phone.specifications.battery}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">OS: {phone.specifications.os}</p>
                            <p className="font-bold">${phone.price.toFixed(2)}</p>

                            {/* Loading Button with Spinner */}
                            <button
                                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all ${
                                    loading === phone.id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"
                                } text-white mt-2`}
                                onClick={() => handleAddToCart(phone)}
                                disabled={loading === phone.id}
                            >
                                {loading === phone.id ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cart;
