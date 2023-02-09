import { csrfFetch } from './csrf';

const LOGIN_USER = 'session/LOGIN_USER';

export const setUser = (user) => {
  return {
    type: LOGIN_USER,
    user
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data));
}

// -------------- REDUCER -----------------------

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case LOGIN_USER:
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
