import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"
import L from "leaflet"
import { useEffect } from "react"

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = defaultIcon

interface MapWithNoSSRProps {
  lat: number
  lng: number
  setLat: (lat: number) => void
  setLng: (lng: number) => void
  onMapClick: (lat: number, lng: number) => void
}

const MapViewUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap()

  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [lat, lng, map])

  return null
}

export default function MapWithNoSSR({
  lat,
  lng,
  onMapClick,
}: MapWithNoSSRProps) {
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng)
      },
    })
    return null
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={18}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          Ubicación seleccionada: [{lat}, {lng}]
        </Popup>
      </Marker>
      <MapClickHandler />
      <MapViewUpdater lat={lat} lng={lng} />
    </MapContainer>
  )
}
