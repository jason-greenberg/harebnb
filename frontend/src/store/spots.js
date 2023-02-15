import { csrfFetch } from "./csrf";

const CREATE = 'spots/CREATE_SPOT';
const DELETE = 'spots/DELETE_SPOT';
const POPULATE = 'spots/POPULATE_SPOTS';
const READ = 'spots/READ_SPOT';
const UPDATE = 'spots/UPDATE_SPOT';

// ---------- Actions --------------

const createSpot = (spot) => {
  return {
    type: CREATE,
    spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE,
    spotId
  }
}

const populateAllSpots = (spots) => {
  return {
    type: POPULATE,
    spots
  }
}

const readSingleSpot = (spot) => {
  return {
    type: READ,
    spot
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE,
    spot
  }
}

// ---------- Thunk Actions --------

export const createSingleSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });
  if (response.ok) {
    const spotData = await response.json();
    await dispatch(createSpot(spotData));
    await dispatch(getSingleSpotData(spotData.id));
    return spotData;
  } else {
    throw new Error('Error creating spot');
  }
}

export const deleteSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(deleteSpot(spotId));
  } else {
    throw new Error('Error deleting spot');
  }
}

export const getAllSpotsData = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spotsData = await response.json();
    const normalizedSpotsData = {};
    spotsData.Spots.forEach(spot => {
      normalizedSpotsData[spot.id] = spot;
    });
    dispatch(populateAllSpots(normalizedSpotsData));
  } else {
    throw new Error('Error retrieving spots');
  }
}

export const getSingleSpotData = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spotData = await response.json();
    dispatch(readSingleSpot(spotData));
  } else {
    throw new Error('Error retrieving single spot data');
  }
}

export const updateSingleSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });
  if (response.ok) {
    const spotData = await response.json();
    dispatch(updateSpot(spotData))
  } else {
    throw new Error('Error updating spot');
  }
}

// ---------- REDUCER --------------


const initialState = {
  allSpots: {},
  singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.allSpots = { ...state.allSpots }
  switch (action.type) {
    case CREATE: 
      newState.allSpots[action.spot.id] = action.spot
      return newState;
    case DELETE:
      delete newState.allSpots[action.spotId];
      return newState;
    case POPULATE:
      newState.allSpots = action.spots;
      return newState;
    case READ:
      newState.singleSpot = action.spot;
      return newState;
    case UPDATE:
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
