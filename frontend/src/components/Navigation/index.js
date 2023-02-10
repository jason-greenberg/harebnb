import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import UserMenu from './UserMenu';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);

  const toggleDropDown = () => {
    setHidden(prev => !prev);
    console.log(hidden);
  }
  
  const sessionMenu = (
    <div 
      className="session-menu"
      onClick={toggleDropDown}
    >
      <i 
        class="fa-solid fa-bars"
      ></i>
      <ProfileButton 
        user={sessionUser}
      />
    </div>

  )  

  return (
    <>
      <ul className="navigation-bar">
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionMenu}
      </ul>
      <UserMenu sessionUser={sessionUser} hidden={hidden} />
    </>
  );
}

export default Navigation;
