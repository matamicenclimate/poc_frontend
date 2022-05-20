import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Point } from 'leaflet';
import { Counter } from '@/componentes/Counter/Counter';

const activeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/twbs/icons/main/icons/geo.svg',
  iconRetinaUrl: 'https://raw.githubusercontent.com/twbs/icons/main/icons/geo.svg',
  iconSize: new Point(32, 32),
  className: 'fill-current stroke-current text-red-100',
});

export function FormMap({ lat = 0, lng = 0 }: { lat: number; lng: number }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={8}
      scrollWheelZoom={false}
      className="h-16 w-full rounded border"
      style={{ height: 200 }}
      key={[lat, lng].toString()}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={activeIcon} key={[lat, lng].toString()}></Marker>
      <Counter />
    </MapContainer>
  );
}
