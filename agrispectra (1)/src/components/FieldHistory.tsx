import React from 'react';
import { AnomalyData } from '../types';
import { 
  History, Clock, CheckCircle, AlertTriangle, XCircle, 
  Calendar, MapPin, User, FileText 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FieldHistoryProps {
  selectedField: AnomalyData;
}

const FieldHistory: React.FC<FieldHistoryProps> = ({ selectedField }) => {
  const { t } = useLanguage();

  const historyEvents = [
    { 
      date: '2026-03-24', 
      time: '14:30', 
      event: 'Status Change', 
      status: 'RISK', 
      detail: 'Anomaly detected in Southwest sector. Problem: Fungal infection.', 
      icon: XCircle, 
      color: 'text-red-500', 
      bg: 'bg-red-50' 
    },
    { 
      date: '2026-03-20', 
      time: '09:15', 
      event: 'Intervention', 
      status: 'COMPLETED', 
      detail: 'Nitrogen fertilizer applied to Northeast sector.', 
      icon: CheckCircle, 
      color: 'text-green-500', 
      bg: 'bg-green-50' 
    },
    { 
      date: '2026-03-15', 
      time: '16:45', 
      event: 'Status Change', 
      status: 'WARNING', 
      detail: 'Moderate stress detected in Northwest sector. Monitoring required.', 
      icon: AlertTriangle, 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-50' 
    },
    { 
      date: '2026-03-10', 
      time: '11:00', 
      event: 'Satellite Scan', 
      status: 'HEALTHY', 
      detail: 'Full field scan completed. All sectors healthy.', 
      icon: CheckCircle, 
      color: 'text-green-500', 
      bg: 'bg-green-50' 
    },
    { 
      date: '2026-03-05', 
      time: '08:30', 
      event: 'Irrigation', 
      status: 'COMPLETED', 
      detail: 'Scheduled irrigation cycle completed for Central zone.', 
      icon: CheckCircle, 
      color: 'text-green-500', 
      bg: 'bg-green-50' 
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <History className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('nav.history')}</h2>
              <p className="text-sm text-gray-500">Historical records for {selectedField.location_name}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">
            <Calendar className="w-4 h-4" />
            Filter by Date
          </button>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-100" />

          <div className="space-y-8">
            {historyEvents.map((event, i) => {
              const Icon = event.icon;
              return (
                <div key={i} className="relative pl-16 group">
                  {/* Timeline Dot */}
                  <div className={`absolute left-[18px] top-0 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${event.bg}`}>
                    <Icon className={`w-4 h-4 ${event.color}`} />
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">{event.event}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${event.bg} ${event.color}`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {event.date} • {event.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.detail}</p>
                    
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <MapPin className="w-3 h-3" />
                        {selectedField.zone || 'Central Zone'}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <User className="w-3 h-3" />
                        System Admin
                      </div>
                      <button className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:underline ml-auto">
                        <FileText className="w-3 h-3" />
                        View Report
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldHistory;
