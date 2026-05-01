import React from 'react';
import { AnomalyData } from '../types';
import KPISummary from './KPISummary';
import { 
  FieldHealthOverview, NDVITimeSeriesChart, AIRecommendations 
} from './DashboardWidgets';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, Filter, ChevronDown, Bell, User, 
  Droplets, Thermometer, Wind, Activity 
} from 'lucide-react';

interface FarmerDashboardProps {
  fields: AnomalyData[];
  selectedField: AnomalyData;
  onFieldSelect: (field: AnomalyData) => void;
  userRole: 'ADMIN' | 'FARMER';
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ fields, selectedField, onFieldSelect, userRole }) => {
  const { t } = useLanguage();

  const healthyCount = fields.filter(f => f.seq_mse <= 0.035 && !f.is_anomaly).length;
  const warningCount = fields.filter(f => f.seq_mse > 0.035 && f.seq_mse <= 0.15 && !f.is_anomaly).length;
  const riskCount = fields.filter(f => f.seq_mse > 0.15 || f.is_anomaly).length;

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      {/* Header with Field Selector for Admin */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {selectedField.location_name}
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedField.seq_mse > 0.15 ? 'bg-red-100 text-red-600' : 
              selectedField.seq_mse > 0.035 ? 'bg-yellow-100 text-yellow-600' : 
              'bg-green-100 text-green-600'
            }`}>
              {selectedField.seq_mse > 0.15 ? 'RISK' : selectedField.seq_mse > 0.035 ? 'WARNING' : 'HEALTHY'}
            </span>
          </h1>
          <p className="text-gray-500 text-sm">Last satellite update: 2 hours ago</p>
        </div>

        {userRole === 'ADMIN' && (
          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
              value={selectedField.id}
              onChange={(e) => {
                const field = fields.find(f => f.id === e.target.value);
                if (field) onFieldSelect(field);
              }}
            >
              {fields.map(f => (
                <option key={f.id} value={f.id}>{f.location_name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      <KPISummary 
        totalFields={fields.length}
        healthyCount={healthyCount}
        warningCount={warningCount}
        riskCount={riskCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* NDVI Chart */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">NDVI Time Series Chart</h3>
              <div className="flex gap-2">
                <button className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-lg text-gray-600">1W</button>
                <button className="text-xs font-bold px-3 py-1 bg-green-600 rounded-lg text-white">1M</button>
                <button className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-lg text-gray-600">3M</button>
              </div>
            </div>
            <NDVITimeSeriesChart selectedField={selectedField} />
          </div>

          {/* Field Management Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Field Management</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search fields..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(0, 4).map(field => (
                <button 
                  key={field.id}
                  onClick={() => onFieldSelect(field)}
                  className={`p-4 rounded-2xl border transition-all text-left ${
                    selectedField.id === field.id ? 'border-green-500 bg-green-50/30 ring-1 ring-green-500' : 'border-gray-100 bg-white hover:border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">{field.location_name}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      field.seq_mse > 0.15 ? 'bg-red-500' : field.seq_mse > 0.035 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{field.zone || 'Central Zone'}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] font-bold text-gray-600">42%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] font-bold text-gray-600">85%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Health Overview Gauges */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Field Health Overview</h3>
            <FieldHealthOverview selectedField={selectedField} />
          </div>

          {/* AI Recommendations */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">AI Recommendations</h3>
            <AIRecommendations selectedField={selectedField} />
          </div>

          {/* Recent Alerts */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${i === 1 ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-500'}`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{i === 1 ? 'Critical Anomaly' : 'Health Warning'}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{i === 1 ? 'Sudden NDVI drop detected' : 'Moderate stress in sector B'}</p>
                    <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
