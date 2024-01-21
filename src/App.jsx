import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import Sidebar from './components/sidebar'
import Map from './components/map'

import { apiSearch, apiRouteSearch } from './api/api'

import './App.css'

function App() {
  const [tilesType, setTilesType] = useState("osm")
  const [searchQuery, setSearchQuery] = useState("")
  const [routeQuery, setRouteQuery] = useState(null)

  const [currentBounds, setCurrentBounds] = useState(null)
  const [clickedPoint, setClickedPoint] = useState(null)

  const [points, setPoints] = useState([])
  const [route, setRoute] = useState(null)

  useEffect(() => {
    if (searchQuery) {
      apiSearch(searchQuery, currentBounds)
      .then((response) => {
        setPoints(response.data.features)
      })
    }
  }, [searchQuery])

  useEffect(() => {
    if (routeQuery) {
      apiRouteSearch(routeQuery)
      .then((response) => {
        setRoute(response.data.routes[0].geometry.coordinates)
      })
    }
  }, [routeQuery])

  return (
    <Container fluid className="full-height">
      <Row className="full-height">
        <Col md={4} className="p-4 d-flex">
          <Sidebar
            tilesType={tilesType}
            setTilesType={setTilesType}
            commitSearchQuery={setSearchQuery}
            selectedPoint={clickedPoint}
            commitRouteQuery={setRouteQuery}
          />
        </Col>
        <Col className="p-4 d-flex">
          <Map
            tilesType={tilesType}
            setCurrentBounds={setCurrentBounds}
            setClickedPoint={setClickedPoint}
            points={points}
            route={route}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
