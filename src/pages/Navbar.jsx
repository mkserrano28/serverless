import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Trash2, Menu, X } from "lucide-react";

function Navbar({ cartItems, updateCartQuantity, removeFromCart, darkMode, setDarkMode }) { // Receive darkMode & setDarkMode from App.jsx
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < lastScrollY.current);
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className={`fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="container mx-auto flex justify-between items-center">

                    {/* Logo */}
                    <a href="#" className="text-3xl font-bold text-slate-700 dark:text-white">Ephone</a>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 text-lg dark:text-white">
                        <li><a href="#" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400">About</a></li>
                        <li><a href="#" className="hover:text-gray-400">Services</a></li>
                        <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={30} className="text-black dark:text-white" /> : <Menu size={30} className="text-black dark:text-white" />}
                    </button>

                    <div class="w-full max-w-sm min-w-[150px]">
                        <div class="relative flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>

                            <input
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search Ephone..."
                            />

                            <button
                                class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                type="button"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Shopping Cart Icon */}
                    <div className="relative cursor-pointer ml-4" onClick={() => setCartOpen(!cartOpen)}>
                        <ShoppingCart size={32} className="text-slate-700 dark:text-white" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </div>


                    {/* ✅ Dark Mode Toggle (Uses setDarkMode from App.jsx) */}
                    <button className="text-black dark:text-white ml-4" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black shadow-lg">
                        <ul className="flex flex-col items-center p-4 text-lg dark:text-white">
                            <li className="py-2"><a href="#" className="hover:text-gray-400">Home</a></li>
                            <li className="py-2"><a href="#" className="hover:text-gray-400">About</a></li>
                            <li className="py-2"><a href="#" className="hover:text-gray-400">Services</a></li>
                            <li className="py-2"><a href="#" className="hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>
                )}

                {/* Cart Dropdown */}
                {cartOpen && cartItems.length > 0 && (
                    <div className="absolute right-5 top-16 bg-gray-200 dark:bg-gray-800 shadow-lg p-4 rounded-lg w-80">
                        <h2 className="font-bold mb-2 dark:text-white">Shopping Cart</h2>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center gap-3 border-b p-2">
                                    <img src={item.image} alt={item.model} className="w-12 h-12 object-cover rounded" />
                                    <div className="flex-1">
                                        <p className="font-medium dark:text-white">{item.model}</p>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    {/* Quantity Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button className="bg-gray-300 px-2 rounded" onClick={() => updateCartQuantity(item.id, "decrease")}>-</button>
                                        <p className="dark:text-white">{item.quantity}</p>
                                        <button className="bg-gray-300 px-2 rounded" onClick={() => updateCartQuantity(item.id, "increase")}>+</button>
                                    </div>

                                    {/* Remove Item Button */}
                                    <button onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} className="text-red-500" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-3 w-full bg-[#185baa] text-white py-2 rounded">Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
