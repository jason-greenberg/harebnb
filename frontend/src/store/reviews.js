import { csrfFetch } from "./csrf";

const CREATE = 'reviews/CREATE_REVIEW';
const DELETE = 'reviews/DELETE_REVIEW';
const POPULATE_REVIEWS_SPOT = 'reviews/POPULATE_ALL_REVIEWS_SPOT';
const POPULATE_REVIEWS_USER = 'reviews/POPULATE_ALL_REVIEWS_USER';

// ------------ Actions -------------

const createReview = (review) => {
  return {
    type: CREATE,
    review
  }
}

const deleteReview = (reviewId) => {
  return {
    type: DELETE,
    reviewId
  }
}

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

export const createReviewBySpotId = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });
  if (response.ok) {
    const reviewData = await response.json();
    await dispatch(createReview(reviewData));
  } else {
    throw new Error('Error creating review');
  }
}

export const deleteReviewById = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    throw new Error('Error deleting review');
  }
}

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
    return normalizedReviewsData;
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
  newState.user = { ...state.user }
  switch (action.type) {
    case CREATE:
      newState.spot[action.review.id] = action.review;
      newState.user[action.review.id] = action.review;
      return newState;
    case DELETE:
      delete newState.spot[action.reviewId]
      delete newState.user[action.reviewId]
      return newState;
    case POPULATE_REVIEWS_SPOT:
      newState.spot = action.reviews;
      return newState;
    case POPULATE_REVIEWS_USER:
      newState.user = action.reviews;
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
