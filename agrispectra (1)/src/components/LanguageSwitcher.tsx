import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
          language === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ta')}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
          language === 'ta' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        தமிழ்
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
          language === 'hi' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
