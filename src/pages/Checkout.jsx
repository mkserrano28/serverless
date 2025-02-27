import React from "react";

function Checkout({ cartItems = [], darkMode, updateCartQuantity }) {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal >= 79.99 ? 0 : 5.00; // Free shipping for orders above ₱79.99

    return (
        <div className={`min-h-screen p-5 transition-all duration-300 mt-10 ₱{darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <div className="container mx-auto max-w-6xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">YOUR CART</h2>

                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left pb-2">Product</th>
                                        <th className="text-center pb-2">Price</th>
                                        <th className="text-center pb-2">Quantity</th>
                                        <th className="text-right pb-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4 flex items-center">
                                                <img src={item.image} alt={item.model} className="w-16 h-16 object-contain rounded-lg mr-4" />
                                                <div>
                                                    <h3 className="font-semibold">{item.model}</h3>
                                                    <p className="text-gray-500 text-sm">Ram: {item.specifications?.ram || 'N/A'}</p>
                                                    <p className="text-gray-500 text-sm">Storage: {Array.isArray(item.specifications?.storage) ? item.specifications.storage.join(', ') : item.specifications?.storage || 'N/A'}</p>
                                                </div>
                                            </td>
                                            <td className="text-center">₱{item.price.toFixed(2)}</td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center">
                                                    <button 
                                                        className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-md" 
                                                        onClick={() => updateCartQuantity(item.id, "decrease")}
                                                    >-</button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button 
                                                        className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-md" 
                                                        onClick={() => updateCartQuantity(item.id, "increase")}
                                                    >+</button>
                                                </div>
                                            </td>
                                            <td className="text-right font-semibold">₱{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold border-b pb-2">CART TOTALS</h3>
                            <div className="flex justify-between text-lg py-3">
                                <span>Subtotal:</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg pb-3">
                                <span>Shipping:</span>
                                <span className="text-green-500">{shipping === 0 ? "FREE" : `₱{shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold py-3 border-t">
                                <span>Total:</span>
                                <span>₱{(subtotal + shipping).toFixed(2)}</span>
                            </div>
                            <button className="w-full mt-4 bg-slate-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-300 transition">
                                ⚡ CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
