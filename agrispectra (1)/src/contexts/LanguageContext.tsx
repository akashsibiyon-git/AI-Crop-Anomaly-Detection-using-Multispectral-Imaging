import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translation } from '../types';

const translations: Translation = {
  'app.title': { en: 'AgriSpectra', ta: 'அக்ரிஸ்பெக்ட்ரா', hi: 'एग्रीस्पेक्ट्रा' },
  'app.subtitle': { en: 'Smart Crop Health Monitoring System', ta: 'ஸ்மார்ட் பயிர் சுகாதார கண்காணிப்பு அமைப்பு', hi: 'स्मार्ट फसल स्वास्थ्य निगरानी प्रणाली' },
  'nav.dashboard': { en: 'Dashboard', ta: 'டாஷ்போர்டு', hi: 'डैशबोर्ड' },
  'nav.map': { en: 'Map View', ta: 'வரைபடக் காட்சி', hi: 'मानचित्र दृश्य' },
  'nav.analytics': { en: 'Analytics', ta: 'பகுப்பாய்வு', hi: 'विश्लेषण' },
  'nav.forecast': { en: 'Yield Forecast', ta: 'மகசூல் முன்னறிவிப்பு', hi: 'उपज पूर्वानुमान' },
  'nav.weather': { en: 'Weather', ta: 'வானிலை', hi: 'मौसम' },
  'nav.history': { en: 'Field History', ta: 'புல வரலாறு', hi: 'क्षेत्र इतिहास' },
  'nav.roi': { en: 'Cost & ROI', ta: 'செலவு மற்றும் ROI', hi: 'लागत और ROI' },
  'nav.reports': { en: 'Reports', ta: 'அறிக்கைகள்', hi: 'रिपोर्ट' },
  'nav.satellite': { en: 'Satellite', ta: 'செயற்கைக்கோள்', hi: 'सैटेलाइट' },
  'nav.community': { en: 'Community', ta: 'சமூகம்', hi: 'समुदाय' },
  'kpi.total_fields': { en: 'Total Fields', ta: 'மொத்த புலங்கள்', hi: 'कुल क्षेत्र' },
  'kpi.healthy': { en: 'Healthy %', ta: 'ஆரோக்கியமான %', hi: 'स्वस्थ %' },
  'kpi.at_risk': { en: 'At-Risk %', ta: 'ஆபத்தில் %', hi: 'जोखिम में %' },
  'kpi.critical': { en: 'Critical Zones', ta: 'முக்கிய மண்டலங்கள்', hi: 'महत्वपूर्ण क्षेत्र' },
  'status.healthy': { en: 'Healthy', ta: 'ஆரோக்கியமானது', hi: 'स्वस्थ' },
  'status.warning': { en: 'Warning', ta: 'எச்சரிக்கை', hi: 'चेतावनी' },
  'status.risk': { en: 'Risk', ta: 'ஆபத்து', hi: 'जोखिम' },
  'action.logout': { en: 'Logout', ta: 'வெளியேறு', hi: 'लॉग आउट' },
  'login.title': { en: 'Welcome to AgriSpectra', ta: 'அக்ரிஸ்பெக்ட்ராவிற்கு வரவேற்கிறோம்', hi: 'एग्रीस्पेक्ट्रा में आपका स्वागत है' },
  'login.email': { en: 'Email Address', ta: 'மின்னஞ்சல் முகவரி', hi: 'ईमेल पता' },
  'login.button': { en: 'Login', ta: 'உள்நுழைய', hi: 'लॉगिन' },
  'login.demo_admin': { en: 'Demo Admin: admin@gmail.com', ta: 'டெமோ நிர்வாகி: admin@gmail.com', hi: 'डेमो एडमिन: admin@gmail.com' },
  'login.demo_farmer': { en: 'Demo Farmer: field1@gmail.com', ta: 'டெமோ விவசாயி: field1@gmail.com', hi: 'डेमो किसान: field1@gmail.com' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
