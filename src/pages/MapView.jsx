import { Path, icon } from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../redux/Slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const dispatch = useDispatch();
  const { flights, path } = useSelector((store) => store.flight);
  // console.log(flights);
  console.log(path);

  const planeIcon = icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  });

  return (
    <MapContainer
      center={[38, 35]}
      zoom={6}
      scrollWheelZoom={false}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {flights.map((flight) => (
        <Marker
          icon={planeIcon}
          key={flight.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2 ">
              <span className="fs-6">Kod :{flight.code}</span>
              <button
                onClick={() => setDetailId(flight.id)}
                className="rounded-3"
              >
                Detay
              </button>
              <button
                onClick={() => dispatch(setPath([]))}
                className="rounded-3 text-nowrap"
              >
                Rotayı Temizle
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={path} />
    </MapContainer>
  );
};

export default MapView;
