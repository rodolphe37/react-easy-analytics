import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultMarker } from "./defaultMarker";
import { popupContent, popupHead, popupText } from "./popupStyles";
import "./Map.css";

const MapViewComponent = ({ usersIdList }) => {
  const [latitude] = usersIdList.map((res) => res.latitude);
  const [longitude] = usersIdList.map((res) => res.longitude);
  const defaultPosition = [16.4588402, -6.7031661];

  console.log(usersIdList);
  console.log(defaultPosition);
  return (
    usersIdList && (
      <MapContainer
        style={{ width: "100%", height: "50vh", zIndex: 1 }}
        center={defaultPosition}
        zoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={[latitude, longitude]} icon={defaultMarker}>
          <Popup className="request-popup">
            <div style={popupContent}>
              <div className="m-2" style={popupHead}>
                title_popup
              </div>
              <br />
              <span style={popupText}>Content</span>
            </div>
          </Popup>
        </Marker> */}
      </MapContainer>
    )
  );
};

export default MapViewComponent;
// position={center}
