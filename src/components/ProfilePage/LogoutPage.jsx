import React from 'react';

const LogoutPage = () => {
    const handleLogout = () => {
        console.log("Logging out...");
        // Add your logout logic here
    };

    return (
        <div className="">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Logout
            </h1>

            {/* Subtext */}
            <p className="text-gray-500 text-lg mb-4">
                Are you sure you want to log out?
            </p>

            {/* Button */}
                <button
                    onClick={handleLogout}
                    className="px-8 py-3 bg-[#1B3C20] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-sm"
                >
                    Yes, Logout
                </button>
        </div>
    );
};

export default LogoutPage;