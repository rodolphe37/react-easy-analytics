import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../leaflet.css";
import {
  popupContent,
  popupHead,
  popupText,
} from "../dashboardElements/popupStyles";
import { defaultMarker } from "../dashboardElements/defaultMarker";
import { Fragment } from "react";

const GeolocationComponent = ({ GEO, usersIdList }) => {
  return GEO ? (
    <div className="mapContainer">
      <MapContainer center={[46.6594564, 1.7343329]} zoom={6}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {usersIdList.map((res, index) => {
          const lat = res.latitude;
          const long = res.longitude;
          const center = [lat, long];
          return (
            <Fragment key={index}>
              <Marker position={center} icon={defaultMarker}>
                <Popup className="request-popup">
                  <div style={popupContent}>
                    {/* <img
                    loading="lazy"
                    src={`${PicturesAddress}${logo_popup}`}
                    width="100"
                    height="80"
                    alt="no img"
                  /> */}
                    <div className="m-2" style={popupHead}>
                      {res.country}
                    </div>
                    <br />
                    <div className="popupMap-container">
                      <span style={popupText}>
                        <span>
                          <strong>Isp:</strong>
                          {res.isp}
                        </span>
                        <br />
                        <span>
                          <strong>UserId:</strong>
                          {res.userId}
                        </span>
                        <br />
                        <span>
                          <strong>Latitude:</strong>
                          {res.latitude}
                        </span>
                        <br />
                        <span>
                          <strong>Longitude:</strong>
                          {res.longitude}
                        </span>
                        <br />
                        <span>
                          <strong>Ip:</strong>
                          {res.ip}
                        </span>
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  ) : (
    ""
  );
};

export default GeolocationComponent;
