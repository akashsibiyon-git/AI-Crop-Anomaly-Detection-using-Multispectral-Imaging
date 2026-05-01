import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Layout, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface KPISummaryProps {
  totalFields: number;
  healthyCount: number;
  warningCount: number;
  riskCount: number;
}

const KPISummary: React.FC<KPISummaryProps> = ({ totalFields, healthyCount, warningCount, riskCount }) => {
  const { t } = useLanguage();

  const healthyPct = Math.round((healthyCount / totalFields) * 100) || 0;
  const riskPct = Math.round(((warningCount + riskCount) / totalFields) * 100) || 0;

  const kpis = [
    { 
      label: t('kpi.total_fields'), 
      value: totalFields, 
      icon: Layout, 
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100'
    },
    { 
      label: t('kpi.healthy'), 
      value: `${healthyPct}%`, 
      icon: CheckCircle, 
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-100'
    },
    { 
      label: t('kpi.at_risk'), 
      value: `${riskPct}%`, 
      icon: AlertTriangle, 
      color: 'bg-yellow-50 text-yellow-600',
      borderColor: 'border-yellow-100'
    },
    { 
      label: t('kpi.critical'), 
      value: riskCount, 
      icon: XCircle, 
      color: 'bg-red-50 text-red-600',
      borderColor: 'border-red-100'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-3xl border ${kpi.borderColor} shadow-sm hover:shadow-md transition-all group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${kpi.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default KPISummary;
