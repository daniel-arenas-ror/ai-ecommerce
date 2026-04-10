import React, { useState } from 'react';
import { requestOTP, verifyOTP } from '../api/repositories/auth'
import { useCompany } from '../context/CompanyContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { GET_CART_DATA } from '../api/queries/cart';
import { useLazyQuery } from "@apollo/client/react";

type AuthStep = 'IDENTIFIER' | 'OTP';

const Login: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('IDENTIFIER');
  const [loginValue, setLoginValue] = useState(''); // email or phone
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { company } = useCompany();
  const { login } = useAuth();
  const { setCart } = useCart();
  const [getCart] = useLazyQuery(GET_CART_DATA);
  const [error, setError] = useState<string | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await requestOTP(loginValue, company?.id)
      .then(() => {
        setStep('OTP');
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.error || 'Something went wrong. Please try again.');
        setLoading(false);
      })
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await verifyOTP(loginValue, code).then(async (response) => {
      login(response.token, response.user);

      const cartResult = await getCart({ variables: { companyId: company?.id } });
      if (cartResult.data?.cart) {
        setCart(cartResult.data.cart);
      }

      window.location.href = '/'; // Redirect on success
    }).catch((error) => {
      setError(error?.response?.data?.error || 'Something went wrong. Please try again.');
      setCode('');
      setLoading(false);
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">        
        <div className="flex justify-center pb-2">
          <img
            src={company?.iconUrl}
            alt={company?.name}
            className="h-12 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {step === 'IDENTIFIER' ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full p-2 border rounded"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              required
            />
            <button 
              disabled={loading}
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {loading ? 'Sending...' : 'Get Login Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <p className="text-sm text-gray-600">Enter the 6-digit code sent to {loginValue}</p>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              className="w-full p-2 text-center border rounded tracking-widest text-xl"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button className="w-full py-2 text-white bg-green-600 rounded">
              Verify & Login
            </button>
            <button 
              type="button" 
              onClick={() => setStep('IDENTIFIER')}
              className="w-full text-sm text-blue-500 underline"
            >
              Edit email/phone
            </button>
          </form>
        )}

        {/* Placeholder for future SSO */}
        <div className="relative flex items-center justify-center py-4">
          <span className="absolute px-3 bg-white text-gray-400 text-sm">Or continue with</span>
          <div className="w-full border-t border-gray-200"></div>
        </div>

        <button 
          onClick={() => alert("Google SSO coming soon!")}
          className="w-full flex items-center justify-center py-2 border rounded hover:bg-gray-50"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 mr-2" alt="G" />
          Google
        </button>
      </div>
    </div>
  );
}

export default Login;
