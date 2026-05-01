import React, { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AnomalyData } from './types';
import { processCSVData } from './utils/dataProcessing';
import Login from './components/Login';
import Navigation, { TabId } from './components/Navigation';
import FarmerDashboard from './components/FarmerDashboard';
import FieldMap from './components/FieldMap';
import Analytics from './components/Analytics';
import CropYieldForecast from './components/CropYieldForecast';
import WeatherIntegration from './components/WeatherIntegration';
import FieldHistory from './components/FieldHistory';
import CostROIDashboard from './components/CostROIDashboard';
import FarmerReports from './components/FarmerReports';
import SatelliteImagery from './components/SatelliteImagery';
import CommunityKnowledge from './components/CommunityKnowledge';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Leaf, LogOut, Bell, User, Search, Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [allFields, setAllFields] = useState<AnomalyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedField, setSelectedField] = useState<AnomalyData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = userEmail === 'admin@gmail.com' ? 'ADMIN' : 'FARMER';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await processCSVData('/data/anomaly_results.csv');
        setAllFields(data);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load field data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredFields = useMemo(() => {
    if (userRole === 'ADMIN') return allFields;
    return allFields.filter(f => f.assigned_email === userEmail);
  }, [allFields, userEmail, userRole]);

  useEffect(() => {
    if (filteredFields.length > 0 && !selectedField) {
      setSelectedField(filteredFields[0]);
    }
  }, [filteredFields, selectedField]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    toast.success(`Welcome back, ${email.split('@')[0]}!`);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setSelectedField(null);
    toast.info('Logged out successfully');
  };

  if (!userEmail) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading || filteredFields.length === 0 || !selectedField) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading AgriSpectra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Toaster position="top-right" />
      
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">{t('app.title')}</h1>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest hidden sm:block">{t('app.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-8 w-[1px] bg-gray-200 hidden sm:block" />
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">{userEmail.split('@')[0]}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{userRole}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title={t('action.logout')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <FarmerDashboard 
            fields={filteredFields} 
            selectedField={selectedField} 
            onFieldSelect={setSelectedField}
            userRole={userRole}
          />
        )}

        {activeTab === 'map' && (
          <div className="max-w-[1600px] mx-auto p-4 md:p-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('nav.map')}</h2>
              <p className="text-sm text-gray-500">Interactive satellite monitoring map for {filteredFields.length} fields</p>
            </div>
            <FieldMap 
              fields={filteredFields} 
              selectedField={selectedField} 
              onFieldSelect={(f) => {
                setSelectedField(f);
                setActiveTab('dashboard');
              }} 
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <Analytics fields={filteredFields} selectedField={selectedField} />
        )}

        {activeTab === 'forecast' && (
          <CropYieldForecast selectedField={selectedField} />
        )}

        {activeTab === 'weather' && (
          <WeatherIntegration selectedField={selectedField} />
        )}

        {activeTab === 'history' && (
          <FieldHistory selectedField={selectedField} />
        )}

        {activeTab === 'roi' && (
          <CostROIDashboard selectedField={selectedField} />
        )}

        {activeTab === 'reports' && (
          <FarmerReports selectedField={selectedField} />
        )}

        {activeTab === 'satellite' && (
          <SatelliteImagery selectedField={selectedField} />
        )}

        {activeTab === 'community' && (
          <CommunityKnowledge />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 font-medium">© 2026 AgriSpectra. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-wider">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-wider">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-wider">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
