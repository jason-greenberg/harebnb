import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';


function UserMenu({ sessionUser, hidden }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <button 
      onClick={logout} 
    >
      Log Out
    </button>
    )
  } else {
    sessionLinks = (
      <li className="user-setup-menu">
        <NavLink to="/login" className="nav-link">Log In</NavLink>
        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </li>
    )
  }

  return (
    <div className={`dropdown ${hidden ? 'hidden' : ''}`}>
      {sessionLinks}
    </div>
  );
}

export default UserMenu;
