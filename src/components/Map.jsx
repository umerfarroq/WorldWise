import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/UseGeolocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";

import Button from "./Button";
import { useUrlPosition } from "../hooks/Position";

export default function Map() {
  const { cities } = useCities();
  const [mapPositon, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();

  const {
    isLoading: isloadingPosition,
    position: geoloactionPosition,
    getPosition,
  } = useGeolocation();
  const [maplat, maplng] = useUrlPosition();
  useEffect(
    function () {
      if (maplat && maplng) setMapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );

  useEffect(
    function () {
      if (geoloactionPosition)
        setMapPosition([geoloactionPosition.lat, geoloactionPosition.lng]);
    },
    [geoloactionPosition]
  );
  //onClick={() => navigate("form")}
  return (
    <div className={styles.mapContainer}>
      {!geoloactionPosition && (
        <Button type="position" onClick={getPosition}>
          {isloadingPosition ? "Loading..." : "use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPositon}
        // center={[maplat, maplng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji} </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPositon} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
