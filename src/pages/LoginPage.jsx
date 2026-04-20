import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Mail, Lock, Phone } from 'lucide-react';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(identifier, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
      <div className="w-full flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="/login_image.png" 
            alt="Nature" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-lg opacity-90">Freshness delivered at your doorstep.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 font-medium">Please enter your details</p>
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
                  placeholder="name@example.com or 9876543210"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-green-700 hover:text-green-800">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-yellow-200 disabled:opacity-70"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm font-medium text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-700 font-bold hover:underline">
                Create one
              </Link>
            </p>
            <Link to="/" className="inline-block text-xs font-semibold text-gray-400 hover:text-green-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
