import React, { useState } from 'react';
import { requestOTP, verifyOTP } from '../api/repositories/auth'
import { useCompany } from '../context/CompanyContext';
type AuthStep = 'IDENTIFIER' | 'OTP';

const Login: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('IDENTIFIER');
  const [login, setLogin] = useState(''); // email or phone
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { company } = useCompany();

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestOTP(login).then(() => {
        setStep('OTP');
      })
    } catch (error) {
      console.error("Error requesting code", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOTP(login, code).then((response) => {
        console.log(response)
        //if (data.token) {
        //  localStorage.setItem('token', data.token);
        //  window.location.href = '/dashboard'; // Redirect on success
        //}
      })
    } catch (error) {
      console.error("Invalid code", error);
    } finally {
      setLoading(false);
    }
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

        {step === 'IDENTIFIER' ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full p-2 border rounded"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
            <p className="text-sm text-gray-600">Enter the 6-digit code sent to {login}</p>
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
