import React, { useState, useEffect } from 'react';

import { Form } from "react-bootstrap";

import '../scss/sidebar.scss';

const Sidebar = (props) => {
  const {
    tilesType,
    setTilesType,
    commitSearchQuery,
    selectedPoint,
    commitRouteQuery
  } = props;

  const [searchQuery, setSearchQuery] = useState("");

  const [startPoint, setStartPoint] = useState("");
  const [selectStartPoint, setSelectStartPoint] = useState(false);

  const [endPoint, setEndPoint] = useState("");
  const [selectEndPoint, setSelectEndPoint] = useState(false);

  const [routeType, setRouteType] = useState("mapbox/driving");

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      commitSearchQuery(searchQuery)
    }
  }

  useEffect(() => {
    if (selectStartPoint) {
      setStartPoint(selectedPoint)
      setSelectStartPoint(false)
    }
    if (selectEndPoint) {
      setEndPoint(selectedPoint)
      setSelectEndPoint(false)
    }
  }, [selectedPoint])

  const setRouteQuery = () => {
    commitRouteQuery({
      start: startPoint,
      end: endPoint,
      type: routeType
    })
  }

  const formatPoint = (point) => {
    return `${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`
  }

  return (
    <div className="sidebar">
      <h5 className="mb-4">Tiles</h5>
      <Form.Group className="mb-4 route-settings">
        <Form.Select
          value={tilesType}
          onChange={(e) => setTilesType(e.target.value)}
        >
          <option value="osm">OSM</option>
          <option value="mapbox">MapBox</option>
        </Form.Select>
      </Form.Group>
      <h5>Search</h5>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onSearchKeyDown}
        />
      </Form.Group>
      <h5 className="my-4">Navigation</h5>
      <Form.Select
        value={routeType}
        onChange={(e) => setRouteType(e.target.value)}
      >
        <option value="mapbox/driving">Driving</option>
        <option value="mapbox/walking">Walking</option>
        <option value="mapbox/cycling">Cycling</option>
      </Form.Select>
      <Form.Control
        type="button"
        value={startPoint ? formatPoint(startPoint) : "Set start point"}
        onClick={() => setSelectStartPoint(true)}
        className="mt-3"
      />
      <Form.Control
        type="button"
        value={endPoint ? formatPoint(endPoint) : "Set end point"}
        onClick={() => setSelectEndPoint(true)}
        className="mt-3"
      />
      <Form.Control
        type="button"
        value="Create route"
        onClick={() => setRouteQuery()}
        className="mt-3"
      />
    </div>
  );
}

export default Sidebar;