import AllSpots from "../components/Spots/AllSpots";
import { csrfFetch } from "./csrf";

const POPULATE = 'spots/POPULATE_SPOTS';
const READ = 'spots/READ_SPOT';

// ---------- Actions --------------

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

// ---------- Thunk Actions --------

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

// ---------- REDUCER --------------


const initialState = {
  allSpots: {},
  singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE:
      newState.allSpots = action.spots;
      return newState;
    case READ:
      newState.singleSpot = action.spot;
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
