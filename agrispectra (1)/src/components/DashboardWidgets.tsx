import React from 'react';
import { AnomalyData } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

interface DashboardWidgetsProps {
  selectedField: AnomalyData;
}

export const FieldHealthOverview: React.FC<DashboardWidgetsProps> = ({ selectedField }) => {
  const stats = [
    { label: 'Crop Health', value: '85%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Soil Moisture', value: '42%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Temperature', value: '28°C', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Wind Speed', value: '12 km/h', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-white/50 shadow-sm`}>
          <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-tight">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export const NDVITimeSeriesChart: React.FC<DashboardWidgetsProps> = ({ selectedField }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={selectedField.history}>
          <defs>
            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="health" 
            stroke="#16a34a" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorHealth)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AIRecommendations: React.FC<DashboardWidgetsProps> = ({ selectedField }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
        <h4 className="text-sm font-bold text-green-800 mb-1">Optimal Action</h4>
        <p className="text-sm text-green-700">{selectedField.recommendation}</p>
      </div>
      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <h4 className="text-sm font-bold text-blue-800 mb-1">Resource Tip</h4>
        <p className="text-sm text-blue-700">Increase irrigation by 15% in the {selectedField.zone || 'central'} zone to maintain health index.</p>
      </div>
    </div>
  );
};
