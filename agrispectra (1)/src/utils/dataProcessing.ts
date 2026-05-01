import Papa from 'papaparse';
import { AnomalyData, FieldStatus } from '../types';

const PROBLEM_TYPES = [
  'Nitrogen deficiency', 'Fungal infection', 'Soil compaction', 'Drainage issues', 'Pest damage',
  'Fertilizer distribution', 'Salt accumulation', 'Wind damage', 'Equipment damage', 'Weed pressure',
  'Iron chlorosis', 'Phosphorus deficiency', 'Potassium shortage', 'pH imbalance', 'Bacterial blight',
  'Aphid infestation', 'Root rot', 'Herbicide drift', 'Hail damage', 'Late blight',
  'Thrips damage', 'Cutworm damage', 'Magnesium deficiency', 'Soil erosion', 'Machinery compaction'
];

const ZONES = [
  'Northwest', 'Northeast', 'Southwest', 'Southeast', 'North border', 'South border', 'East border', 'West border',
  'Central', 'Irrigation zone A', 'Irrigation zone B', 'Irrigation zone C', 'Hill', 'Valley', 'Road edge', 'Far corner'
];

export const classifyField = (seq_mse: number, is_anomaly: boolean): FieldStatus => {
  if (seq_mse > 0.15 || is_anomaly) return 'RISK';
  if (seq_mse > 0.035) return 'WARNING';
  return 'HEALTHY';
};

export const processCSVData = async (url: string): Promise<AnomalyData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const processed = results.data.map((row: any, index: number) => {
          if (!row.latitude || !row.longitude) return null;
          
          const status = classifyField(row.seq_mse, row.is_anomaly === true || row.is_anomaly === 'true');
          
          // Generate mock history
          const history = Array.from({ length: 12 }, (_, i) => ({
            day: `Week ${i + 1}`,
            health: Math.max(0, Math.min(100, 80 - (row.seq_mse * 100) + (Math.random() * 10 - 5)))
          }));

          return {
            id: `field-${index}`,
            latitude: row.latitude,
            longitude: row.longitude,
            seq_mse: row.seq_mse,
            is_anomaly: row.is_anomaly === true || row.is_anomaly === 'true',
            affected_weeks: row.affected_weeks || 0,
            recommendation: row.recommendation || 'No specific recommendation',
            location_name: row.location_name || `Field ${index + 1}`,
            assigned_email: row.assigned_email,
            problem_type: status !== 'HEALTHY' ? PROBLEM_TYPES[index % PROBLEM_TYPES.length] : undefined,
            zone: status !== 'HEALTHY' ? ZONES[index % ZONES.length] : undefined,
            history
          };
        }).filter(Boolean) as AnomalyData[];
        
        resolve(processed);
      },
      error: (error) => reject(error)
    });
  });
};
