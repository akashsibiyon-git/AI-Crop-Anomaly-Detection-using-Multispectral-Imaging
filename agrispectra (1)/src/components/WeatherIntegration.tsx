import React from 'react';
import { AnomalyData } from '../types';
import { 
  Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, 
  CloudLightning, CloudSnow, Info, AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherIntegrationProps {
  selectedField: AnomalyData;
}

const WeatherIntegration: React.FC<WeatherIntegrationProps> = ({ selectedField }) => {
  const { t } = useLanguage();

  const forecast = [
    { day: 'Today', temp: 32, condition: 'Sunny', icon: Sun, color: 'text-yellow-500' },
    { day: 'Tomorrow', temp: 30, condition: 'Partly Cloudy', icon: Cloud, color: 'text-blue-400' },
    { day: 'Wed', temp: 28, condition: 'Light Rain', icon: CloudRain, color: 'text-blue-600' },
    { day: 'Thu', temp: 31, condition: 'Sunny', icon: Sun, color: 'text-yellow-500' },
    { day: 'Fri', temp: 29, condition: 'Cloudy', icon: Cloud, color: 'text-gray-400' },
  ];

  const weatherImpact = [
    { factor: 'Temperature', impact: 'Optimal', detail: 'Current temperature is ideal for growth.', status: 'positive' },
    { factor: 'Humidity', impact: 'High', detail: 'Increased risk of fungal infection.', status: 'warning' },
    { factor: 'Rainfall', impact: 'Moderate', detail: 'Adequate soil moisture levels maintained.', status: 'positive' },
    { factor: 'Wind', impact: 'Low', detail: 'No risk of crop lodging or physical damage.', status: 'positive' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Weather */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
            <Sun className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-2">32°C</h2>
          <p className="text-lg font-medium text-gray-500 mb-6">Sunny • {selectedField.location_name}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Humidity</p>
                <p className="text-sm font-bold text-gray-900">65%</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Wind className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Wind</p>
                <p className="text-sm font-bold text-gray-900">12 km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex flex-col items-center p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
                  <p className="text-xs font-bold text-gray-400 mb-4">{f.day}</p>
                  <Icon className={`w-8 h-8 mb-4 ${f.color}`} />
                  <p className="text-lg font-bold text-gray-900">{f.temp}°</p>
                  <p className="text-[10px] text-gray-500 text-center mt-1">{f.condition}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weather Impact Analysis */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Weather Impact on Crop Health</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherImpact.map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{item.factor}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  item.status === 'positive' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {item.impact}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.status === 'positive' ? 'bg-green-500' : 'bg-yellow-500'}`} 
                  style={{ width: item.status === 'positive' ? '85%' : '45%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherIntegration;
