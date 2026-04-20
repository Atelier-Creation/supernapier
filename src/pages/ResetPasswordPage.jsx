import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { Lock, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(location.state?.identifier || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      const { data } = await authApi.resetPassword({ identifier, otp, newPassword });
      if (data.success) {
        toast.success('Password reset successfully! Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFCF8] p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <div className="mb-8">
          <Link to="/forgot-password" size="sm" className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600 font-medium">
            Enter the 6-digit OTP sent to your device.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!location.state?.identifier && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email or Phone Number
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                placeholder="Email or phone"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              6-Digit OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 transition-all outline-none tracking-[0.5em] text-center font-bold text-xl"
                placeholder="000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-yellow-200 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'RESETTING...' : (
              <>
                RESET PASSWORD <KeyRound className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="text-sm font-medium text-gray-600">
            Didn't receive code?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/forgot-password')}
              className="text-green-700 font-bold hover:underline"
            >
              Resend
            </button>
          </p>
          <Link to="/" className="inline-block text-xs font-semibold text-gray-400 hover:text-green-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
