import { csrfFetch } from './csrf';

const LOGIN_USER = 'session/LOGIN_USER';
const LOGOUT_USER = 'session/LOGOUT_USER';

export const setUser = (user) => {
  return {
    type: LOGIN_USER,
    user
  }
}

export const removeUser = () => {
  return {
    type: LOGOUT_USER
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

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removeUser());
  } else {
    throw new Error('Logout failed');
  }
}

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }
}

export const signup = (user) => async (dispatch) => {
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }
}

// -------------- REDUCER -----------------------

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOGIN_USER:
      newState = { ...action.user };
      return newState;
    case LOGOUT_USER:
      newState = { ...initialState };
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
