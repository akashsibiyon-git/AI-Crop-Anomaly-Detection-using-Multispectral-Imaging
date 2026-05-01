import React, { useState } from 'react';
import { AnomalyData } from '../types';
import { 
  Satellite, Layers, Maximize2, Download, Calendar, 
  ChevronLeft, ChevronRight, Info, Eye, EyeOff 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SatelliteImageryProps {
  selectedField: AnomalyData;
}

const SatelliteImagery: React.FC<SatelliteImageryProps> = ({ selectedField }) => {
  const { t } = useLanguage();
  const [showNDVI, setShowNDVI] = useState(true);
  const [currentLayer, setCurrentLayer] = useState<'RGB' | 'NDVI' | 'EVI'>('NDVI');

  const layers = [
    { id: 'RGB', name: 'True Color (RGB)', description: 'Standard visual representation of the field.' },
    { id: 'NDVI', name: 'NDVI Index', description: 'Normalized Difference Vegetation Index for health monitoring.' },
    { id: 'EVI', name: 'Enhanced Vegetation Index', description: 'Improved sensitivity in high biomass regions.' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Satellite className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('nav.satellite')}</h2>
              <p className="text-sm text-gray-500">High-resolution satellite monitoring for {selectedField.location_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 bg-gray-50 text-gray-900 rounded-xl text-sm font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              March 24, 2026
            </div>
            <button className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Layer Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Imagery Layers</h3>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <button 
                    key={layer.id}
                    onClick={() => setCurrentLayer(layer.id as any)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      currentLayer === layer.id ? 'border-purple-500 bg-purple-50/30 ring-1 ring-purple-500' : 'border-gray-100 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-gray-900">{layer.name}</span>
                      {currentLayer === layer.id && <Layers className="w-4 h-4 text-purple-600" />}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{layer.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold text-blue-800">NDVI Legend</h4>
              </div>
              <div className="h-3 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-600 rounded-full mb-2" />
              <div className="flex justify-between text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                <span>Stressed</span>
                <span>Healthy</span>
              </div>
            </div>
          </div>

          {/* Main Viewport */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-inner group">
              {/* Mock Satellite Image */}
              <img 
                src="https://picsum.photos/seed/farm-satellite/1200/800" 
                alt="Satellite View" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              
              {/* NDVI Overlay */}
              {currentLayer === 'NDVI' && (
                <div className="absolute inset-0 bg-green-600/30 mix-blend-overlay backdrop-blur-[1px]">
                  {/* Mock Anomaly Spots */}
                  <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500/40 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-yellow-500/30 rounded-full blur-3xl animate-pulse" />
                </div>
              )}

              {/* Viewport Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setShowNDVI(!showNDVI)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    {showNDVI ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all">
                    <Layers className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Coordinates Overlay */}
              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-[10px] font-mono">
                {selectedField.latitude.toFixed(4)}° N, {selectedField.longitude.toFixed(4)}° E
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Satellite className="w-3 h-3" />
                Sentinel-2 Satellite Data
              </div>
              <div>Resolution: 10m/pixel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteImagery;
