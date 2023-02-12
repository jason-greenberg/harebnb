import AllSpots from "../components/Spots/AllSpots";
import { csrfFetch } from "./csrf";

const POPULATE = 'spots/POPULATE_SPOTS';

// ---------- Actions --------------

const populateAllSpots = (spots) => {
  return {
    type: POPULATE,
    spots
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

// ---------- REDUCER --------------


const initialState = {
  allSpots: {},
  singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case POPULATE:
      newState.allSpots = action.spots;
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
