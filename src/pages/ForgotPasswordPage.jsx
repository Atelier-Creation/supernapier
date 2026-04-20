import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { Mail, Phone, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.forgotPassword({ identifier });
      if (data.success) {
        toast.success(data.message || 'OTP sent successfully!');
        // Pass identifier to reset page
        navigate('/reset-password', { state: { identifier } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFCF8] p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Don't worry! Enter your email or phone number and we'll send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email or Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                placeholder="Email or phone"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-yellow-200 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'SENDING...' : (
              <>
                SEND OTP <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100 w-full">
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-800 leading-normal">
                If you have a phone number linked, we will send the OTP via <strong>WhatsApp</strong> for faster verification.
              </p>
            </div>
          </div>
          <Link to="/" className="text-xs font-semibold text-gray-400 hover:text-green-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
