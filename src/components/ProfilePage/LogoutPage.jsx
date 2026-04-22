import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleConfirmLogout = () => {
        setIsLoggingOut(true);
        logout();
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    if (isLoggingOut) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-pulse">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <LogOut className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                    Logging Out...
                </h1>
                <p className="text-gray-500 font-medium">
                    We're securely closing your session.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto my-10 text-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <LogOut className="w-10 h-10" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                Ready to leave?
            </h1>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                We're sorry to see you go. Are you sure you want to log out of your Super Napier account?
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-4 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={18} /> No, Stay
                </button>
                <button
                    onClick={handleConfirmLogout}
                    className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    Yes, Logout
                </button>
            </div>
        </div>
    );
};

export default LogoutPage;