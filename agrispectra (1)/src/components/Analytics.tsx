import React from 'react';
import { AnomalyData } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface AnalyticsProps {
  fields: AnomalyData[];
  selectedField: AnomalyData;
}

const Analytics: React.FC<AnalyticsProps> = ({ fields, selectedField }) => {
  const { t } = useLanguage();

  const healthDistribution = [
    { name: 'Healthy', value: fields.filter(f => f.seq_mse <= 0.035).length, color: '#22c55e' },
    { name: 'Warning', value: fields.filter(f => f.seq_mse > 0.035 && f.seq_mse <= 0.15).length, color: '#f59e0b' },
    { name: 'Risk', value: fields.filter(f => f.seq_mse > 0.15).length, color: '#ef4444' },
  ];

  const problemData = fields
    .filter(f => f.problem_type)
    .reduce((acc: any[], field) => {
      const existing = acc.find(a => a.name === field.problem_type);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: field.problem_type, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('nav.analytics')}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Distribution */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Health Distribution (All Fields)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Issues */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Top Detected Issues</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={problemData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={150} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Field Comparison */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Anomaly Score Comparison (Top 10 Fields)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fields.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="location_name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b' }}
              />
              <Tooltip />
              <Bar dataKey="seq_mse" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
