import { csrfFetch } from "./csrf";

const POPULATE_REVIEWS_SPOT = 'reviews/POPULATE_ALL_REVIEWS_SPOT';
const POPULATE_REVIEWS_USER = 'reviews/POPULATE_ALL_REVIEWS_USER';

// ------------ Actions -------------

const populateAllSpotReviews = (reviews) => {
  return {
    type: POPULATE_REVIEWS_SPOT,
    reviews
  }
}

const populateAllUserReviews = (reviews) => {
  return {
    type: POPULATE_REVIEWS_USER,
    reviews
  }
}

// -------- Thunk Actions -----------

export const getAllReviewsSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviewsData = await response.json();
    const normalizedReviewsData = {};
    reviewsData.Reviews.forEach(review => {
      normalizedReviewsData[review.id] = review;
    });
    dispatch(populateAllSpotReviews(normalizedReviewsData));
  } else {
    throw new Error('Error retrieving spot reviews');
  }
}

export const getAllReviewsUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current');
  if (response.ok) {
    const reviewsData = await response.json();
    const normalizedReviewsData = {};
    reviewsData.Reviews.forEach(review => {
      normalizedReviewsData[review.id] = review;
    });
    dispatch(populateAllUserReviews(normalizedReviewsData));
  } else {
    throw new Error('Error retrieving user reviews');
  }
}

// ---------- REDUCER --------------

const initialState = {
  spot: {},
  user: {}
}

const reviewsReducer = (state = initialState, action) => {
  const newState = { ...state }
  newState.spot = { ...state.spot }
  switch (action.type) {
    case POPULATE_REVIEWS_SPOT:
      newState.spot = action.reviews;
      return newState;
    case POPULATE_REVIEWS_USER:
      newState.user = { ...state.user }
      newState.user = action.reviews;
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
