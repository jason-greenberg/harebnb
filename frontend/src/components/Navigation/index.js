import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className="login-signup-nav-links">
        <NavLink 
          to="/login"
          className="login-signup-nav-links"
        >
          Log In</NavLink>
        <NavLink 
          to="/signup"
          className="login-signup-nav-links"
        >
          Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul className="navigation-bar">
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
