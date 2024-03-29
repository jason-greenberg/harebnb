import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
     <button 
      onClick={openMenu}
      className="user-menu-button"
     >
        <i className="fa-solid fa-bars icon"></i>
        <i className="fa-regular fa-user icon"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="dropdown-details-logged-in">Hello, {user.firstName} {user.lastName}</li>
            <li className="dropdown-details-logged-in">{user.email}</li>
            <div className="el-break"></div>
            { 
              user &&
              <div className="dropdown-details-logged-in">
                <li>
                  <Link 
                    to='/spots/current'
                    className="manage-spots"
                    onClick={closeMenu}
                  >
                    Manage Spots
                  </Link>
                </li>
              </div> 
            }
            <div className="el-break"></div>
            <li>
              <button 
                onClick={logout}
                className="logout-button"
              >Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown-details">
              <OpenModalMenuItem
                itemText="Sign Up"
                itemTextClassName="bold"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li className="dropdown-details">
              <OpenModalMenuItem
                itemText="Log In"
                itemTextClassName="light"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
