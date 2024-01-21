import axios from 'axios';

import { API_KEY } from './api_key';

const SEARCH_ENDPOINT = 'https://api.mapbox.com/search/searchbox/v1/forward';
const DIRECTIONS_ENDPOINT = 'https://api.mapbox.com/directions/v5/';

export const apiSearch = (query, currentBounds) => {
  const bounds = currentBounds ? currentBounds : null;
  const bbox = bounds ? `${bounds._southWest.lng},${bounds._southWest.lat},${bounds._northEast.lng},${bounds._northEast.lat}` : null;

  return axios.get(SEARCH_ENDPOINT, {
    params: {
      access_token: API_KEY,
      q: query,
      limit: 10,
      bbox: bbox
    },
  });
};

export const apiRouteSearch = (query) => {
  const coordinates = `${query.start.lng},${query.start.lat};${query.end.lng},${query.end.lat}`;
  return axios.get(`${DIRECTIONS_ENDPOINT}${query.type}/${coordinates}`, {
    params: {
      access_token: API_KEY,
      alternatives: false,
      geometries: 'geojson',
    },
  });
}