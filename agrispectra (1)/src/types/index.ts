export type FieldStatus = 'HEALTHY' | 'WARNING' | 'RISK';

export interface AnomalyData {
  id: string;
  latitude: number;
  longitude: number;
  seq_mse: number;
  is_anomaly: boolean;
  affected_weeks: number;
  recommendation: string;
  location_name: string;
  problem_type?: string;
  zone?: string;
  history: { day: string; health: number }[];
  assigned_email: string;
}

export type Language = 'en' | 'ta' | 'hi';

export interface Translation {
  [key: string]: {
    [lang in Language]: string;
  };
}
