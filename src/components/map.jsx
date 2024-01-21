import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { Icon as LeafletIcon } from 'leaflet'

import poiIconURL from '../img/icon.png'
import beginIconURL from '../img/begin.png'
import endIconURL from '../img/end.png'

import { API_KEY } from '../api/api_key'

import '../scss/map.scss';

const Map = (props) => {
  const {
    tilesType,
    setCurrentBounds,
    setClickedPoint,
    points,
    route
  } = props;

  const [map, setMap] = useState(null);

  const tilesUrl = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    mapbox: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${API_KEY}`,
  }

  useEffect(() => {
    if (map) {
      setCurrentBounds(map.getBounds())
      map.on("moveend", () => {
        setCurrentBounds(map.getBounds())
      })
      map.on('click', (e) => {
        setClickedPoint(e.latlng)
      })
    }
  }, [map, setCurrentBounds])

  const getIcon = (iconURL) => {
    return new LeafletIcon({
      iconUrl: iconURL,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    })
  }

  const renderPopup = (point) => {
    const { name, place_formatted, metadata } = point.properties
    return (
      <Popup className="map-popup">
        <h5> { name } </h5>
        <p> { place_formatted } </p>
        { metadata && (
          <p> { metadata.phone } </p>
        )}
      </Popup>
    )
  }

  return (
    <MapContainer
      center={[52.3676, 4.9041]}
      zoom={13}
      scrollWheelZoom={false}
      className="map"
      ref={setMap}
    >
      <TileLayer url={tilesUrl[tilesType]} />
      {points && points.map((point) => (
        <Marker
          key={point.properties.mapbox_id}
          position={[
            point.geometry.coordinates[1],
            point.geometry.coordinates[0]
          ]}
          icon={getIcon(poiIconURL)}
          eventHandlers={{
            click: () => {
              console.log(point)
            },
          }}
        >
          {renderPopup(point)}
        </Marker>
      ))}
      {route && (
        <>
          <Polyline
            pathOptions={{
              color: '#c0392b',
              weight: 7,
              lineCap: 'round',
            }}
            positions={route.map((point) => [
              point[1],
              point[0]
            ])}
          />
          <Marker
            position={[route[0][1], route[0][0]]}
            icon={getIcon(beginIconURL)}
          />
          <Marker
            position={[route[route.length - 1][1], route[route.length - 1][0]]}
            icon={getIcon(endIconURL)}
          />
        </>
      )}
    </MapContainer>
  );
}

export default Map;