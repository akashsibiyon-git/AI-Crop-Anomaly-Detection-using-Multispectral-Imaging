import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AnomalyData, FieldStatus } from '../types';
import { classifyField } from '../utils/dataProcessing';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface FieldMapProps {
  fields: AnomalyData[];
  selectedField?: AnomalyData;
  onFieldSelect: (field: AnomalyData) => void;
}

const getMarkerIcon = (status: FieldStatus) => {
  const color = status === 'RISK' ? '#ef4444' : status === 'WARNING' ? '#f59e0b' : '#22c55e';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const FieldMap: React.FC<FieldMapProps> = ({ fields, selectedField, onFieldSelect }) => {
  const defaultCenter: [number, number] = [10.9, 79.2]; // Tamil Nadu region
  const center: [number, number] = selectedField 
    ? [selectedField.latitude, selectedField.longitude] 
    : defaultCenter;

  return (
    <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-gray-200 shadow-lg relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fields.map((field) => (
          <Marker 
            key={field.id} 
            position={[field.latitude, field.longitude]}
            icon={getMarkerIcon(classifyField(field.seq_mse, field.is_anomaly))}
            eventHandlers={{
              click: () => onFieldSelect(field),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-gray-900 mb-1">{field.location_name}</h3>
                <p className="text-xs text-gray-500 mb-2">Status: {classifyField(field.seq_mse, field.is_anomaly)}</p>
                <button 
                  onClick={() => onFieldSelect(field)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {selectedField && <MapUpdater center={[selectedField.latitude, selectedField.longitude]} />}
      </MapContainer>
    </div>
  );
};

export default FieldMap;
