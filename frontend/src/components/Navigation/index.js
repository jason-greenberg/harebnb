import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navigation-container">
      <ul className="navigation-bar">
        <li>
          <NavLink exact to="/">
            <div className="logo-and-name">
              <img src="/assets/harebnb-logo.png" alt="logo" />
              <h3 
                id="site-name"
                style={{ textDecoration: 'none' }}
              >
                Harebnb
              </h3>
            </div>
          </NavLink>
        </li>
        <li>
        {isLoaded && (
          <div>
          {sessionUser && (
            <NavLink 
              to="/spots/new"
              className="create-new-spot-link"
            >
              Create a New Spot
            </NavLink>
          )}
            <ProfileButton user={sessionUser} />
          </div>
        )}
          </li>
      </ul>
      <hr className="hr"/>
    </div>
  );
}

export default Navigation;
