import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOwnedSpotsData } from '../../../store/spots';
import SpotCard from '../SpotCard';
import './ManageSpots.css'

function ManageSpots() {
  const userSpots = useSelector(state => state.spots.userSpots);
  const userSpotsArray = Object.values(userSpots);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllUserOwnedSpotsData())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  if (!userSpotsArray.length) {
    return (
      <h2>No Spots yet.</h2>
    )
  }

  return (
    <div className="manage-spots-container">
      <div>
        <h1 className="header">Manage Your Spots</h1>
        <button className="create-new-spot-button">
          Create A New Spot
        </button>
      </div>
      {
        isLoaded && 
        <div className="user-spots-container">
          <ul className="spots-list">
        {
          userSpotsArray.length > 0
          && userSpotsArray.map(spot => (
            <li 
              className="spot-card"
              key={spot.id}
            >
              <SpotCard spot={spot} />
            </li>
          ))
        }
      </ul>
        </div>
      }
    </div>
  )
}

export default ManageSpots;
