import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      return alert('Please fill in your name and phone number');
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }
    setLoading(true);
    const result = await signup(formData);
    setLoading(false);
    if (result.success) {
      navigate('/login');
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
            <h1 className="text-4xl font-bold mb-2">Join Us</h1>
            <p className="text-lg opacity-90">Start your healthy journey today.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className={`h-2 w-12 rounded-full transition-all duration-300 ${step === 1 ? 'bg-green-600' : 'bg-green-200'}`} />
              <span className={`h-2 w-12 rounded-full transition-all duration-300 ${step === 2 ? 'bg-green-600' : 'bg-green-200'}`} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {step === 1 ? 'Create Account' : 'Set Password'}
            </h2>
            <p className="text-gray-600 font-medium">
              {step === 1 ? 'Join our community' : 'Protect your account'}
            </p>
          </div>

          <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-100 flex items-center justify-center gap-2 group"
                >
                  CONTINUE
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-100 disabled:opacity-70"
                  >
                    {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-gray-500 font-bold py-2 hover:text-gray-800 transition-colors text-sm"
                  >
                    ← BACK TO DETAILS
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm font-medium text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-700 font-bold hover:underline">
                Sign In
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

export default SignupPage;
