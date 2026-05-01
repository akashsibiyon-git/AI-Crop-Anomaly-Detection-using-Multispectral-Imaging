import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  LayoutDashboard, Map, BarChart3, TrendingUp, Cloud, 
  History, PieChart, FileText, Satellite, Users 
} from 'lucide-react';

export type TabId = 'dashboard' | 'map' | 'analytics' | 'forecast' | 'weather' | 'history' | 'roi' | 'reports' | 'satellite' | 'community';

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { id: 'map', icon: Map, label: t('nav.map') },
    { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
    { id: 'forecast', icon: TrendingUp, label: t('nav.forecast') },
    { id: 'weather', icon: Cloud, label: t('nav.weather') },
    { id: 'history', icon: History, label: t('nav.history') },
    { id: 'roi', icon: PieChart, label: t('nav.roi') },
    { id: 'reports', icon: FileText, label: t('nav.reports') },
    { id: 'satellite', icon: Satellite, label: t('nav.satellite') },
    { id: 'community', icon: Users, label: t('nav.community') },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 overflow-x-auto no-scrollbar">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as TabId)}
                className={`
                  flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                  ${isActive 
                    ? 'border-green-600 text-green-600 bg-green-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
