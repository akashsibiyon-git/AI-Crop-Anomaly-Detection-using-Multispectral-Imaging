import React, { useState } from 'react';
import { AnomalyData } from '../types';
import { 
  FileText, Download, Eye, Calendar, Filter, 
  CheckCircle, AlertTriangle, XCircle, Search 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface FarmerReportsProps {
  selectedField: AnomalyData;
}

const FarmerReports: React.FC<FarmerReportsProps> = ({ selectedField }) => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const reports = [
    { id: 'R-001', name: 'Weekly Health Summary', date: '2026-03-24', type: 'Health', status: 'READY', size: '1.2 MB' },
    { id: 'R-002', name: 'Soil Moisture Analysis', date: '2026-03-22', type: 'Soil', status: 'READY', size: '0.8 MB' },
    { id: 'R-003', name: 'Pest Risk Assessment', date: '2026-03-20', type: 'Pest', status: 'READY', size: '1.5 MB' },
    { id: 'R-004', name: 'Yield Projection Report', date: '2026-03-18', type: 'Yield', status: 'READY', size: '2.1 MB' },
    { id: 'R-005', name: 'Irrigation Efficiency', date: '2026-03-15', type: 'Irrigation', status: 'READY', size: '0.9 MB' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('nav.reports')}</h2>
              <p className="text-sm text-gray-500">Manage and export field reports for {selectedField.location_name}</p>
            </div>
          </div>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate New Report'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <Calendar className="w-3 h-3" />
            Showing last 30 days
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Report Name</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Size</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-500">{report.date}</td>
                  <td className="py-4">
                    <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-500">{report.size}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3" />
                      {report.status}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerReports;
