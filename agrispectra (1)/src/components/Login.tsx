import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Leaf, Mail, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
            <Leaf className="text-green-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
          <p className="text-gray-500 text-center">{t('app.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('login.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
          >
            {t('login.button')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider text-center mb-4">Demo Credentials</p>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => setEmail('admin@gmail.com')}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors text-center py-2 bg-gray-50 rounded-lg"
            >
              {t('login.demo_admin')}
            </button>
            <button 
              onClick={() => setEmail('field1@gmail.com')}
              className="text-sm text-gray-600 hover:text-green-600 transition-colors text-center py-2 bg-gray-50 rounded-lg"
            >
              {t('login.demo_farmer')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
