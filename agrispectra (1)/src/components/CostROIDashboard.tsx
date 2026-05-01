import React from 'react';
import { AnomalyData } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { DollarSign, TrendingUp, TrendingDown, PieChart as PieIcon, Info, Target } from 'lucide-react';

interface CostROIDashboardProps {
  selectedField: AnomalyData;
}

const CostROIDashboard: React.FC<CostROIDashboardProps> = ({ selectedField }) => {
  const { t } = useLanguage();

  // Mock financial data
  const totalCost = 12500; // USD
  const revenue = 18750; // USD
  const roi = ((revenue - totalCost) / totalCost) * 100;

  const costBreakdown = [
    { name: 'Seeds', value: 3500, color: '#3b82f6' },
    { name: 'Fertilizer', value: 4200, color: '#10b981' },
    { name: 'Irrigation', value: 2100, color: '#6366f1' },
    { name: 'Labor', value: 1800, color: '#f59e0b' },
    { name: 'Pest Control', value: 900, color: '#ef4444' },
  ];

  const financialTrend = [
    { month: 'Jan', cost: 1200, revenue: 1500 },
    { month: 'Feb', cost: 1500, revenue: 1800 },
    { month: 'Mar', cost: 1800, revenue: 2200 },
    { month: 'Apr', cost: 2200, revenue: 2800 },
    { month: 'May', cost: 2500, revenue: 3200 },
    { month: 'Jun', cost: 2800, revenue: 3800 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cost Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Cost</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">${totalCost.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-2 text-sm font-bold text-red-600">
            <TrendingUp className="w-4 h-4" />
            +5.2% vs Last Season
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projected Revenue</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">${revenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-2 text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4" />
            +12.8% vs Last Season
          </div>
        </div>

        {/* ROI Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ROI</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{roi.toFixed(1)}%</div>
          <div className="flex items-center gap-1 mt-2 text-sm font-bold text-green-600">
            <TrendingUp className="w-4 h-4" />
            +2.4% Efficiency Gain
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost Breakdown */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Cost Breakdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Trend */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Financial Performance Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialTrend}>
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
                <Legend />
                <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostROIDashboard;
