import React from 'react';
import { AnomalyData } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, TrendingDown, Target, Info } from 'lucide-react';

interface CropYieldForecastProps {
  selectedField: AnomalyData;
}

const CropYieldForecast: React.FC<CropYieldForecastProps> = ({ selectedField }) => {
  const { t } = useLanguage();

  // Mock yield calculation based on anomaly score
  const baseYield = 4.5; // tons per hectare
  const yieldImpact = (1 - selectedField.seq_mse) * baseYield;
  const projectedYield = Math.max(0.5, yieldImpact + (Math.random() * 0.5 - 0.25));
  const historicalYield = baseYield + (Math.random() * 0.4 - 0.2);

  const forecastData = [
    { name: 'Historical Avg', yield: historicalYield },
    { name: 'Current Projection', yield: projectedYield },
  ];

  const seasonalTrend = [
    { month: 'Jan', yield: 3.2 },
    { month: 'Feb', yield: 3.5 },
    { month: 'Mar', yield: 4.1 },
    { month: 'Apr', yield: 4.8 },
    { month: 'May', yield: 4.5 },
    { month: 'Jun', yield: 3.8 },
    { month: 'Jul', yield: 3.2 },
    { month: 'Aug', yield: 3.4 },
    { month: 'Sep', yield: 3.9 },
    { month: 'Oct', yield: 4.2 },
    { month: 'Nov', yield: 4.0 },
    { month: 'Dec', yield: 3.6 },
  ];

  const yieldChange = ((projectedYield - historicalYield) / historicalYield) * 100;

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projected Yield</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{projectedYield.toFixed(2)} <span className="text-sm font-normal text-gray-500">t/ha</span></div>
            <div className={`flex items-center gap-1 mt-2 text-sm font-bold ${yieldChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yieldChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(yieldChange).toFixed(1)}% vs Historical
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-blue-500" />
              <h4 className="text-sm font-bold text-gray-900">Forecast Insight</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Based on current NDVI trends and anomaly detection, your yield is projected to be 
              <span className="font-bold text-gray-900"> {projectedYield.toFixed(2)} tons per hectare</span>. 
              {yieldChange < 0 ? ' Stress detected in recent weeks has slightly lowered the forecast.' : ' Optimal growth conditions are maintaining a strong forecast.'}
            </p>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Yield Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="yield" fill="#10b981" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seasonal Trend */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Regional Seasonal Yield Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={seasonalTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="yield" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CropYieldForecast;
