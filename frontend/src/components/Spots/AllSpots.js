import { useDispatch, useSelector } from 'react-redux';
import SpotCard from './SpotCard/SpotCard';
import { getAllSpotsData } from '../../store/spots';
import './AllSpots.css'
import { useEffect } from 'react';

function AllSpots() {
  const allSpots = useSelector(state => state.spots.allSpots);
  const singleSpot = useSelector(state => state.spots.singleSpot);
  const userReviews = useSelector(state => state.spots.user);
  const allSpotsArray = Object.values(allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsData());
  }, [allSpotsArray.length, singleSpot]);

  if (!allSpotsArray.length) {
    return (
      <h2>Unable to retrieve spots. Please try again shortly</h2>
    )
  }

  return (
    <>
      <ul className="spots-list">
        {
          allSpotsArray.length > 0
          && allSpotsArray.map(spot => (
            <li 
              className="spot-card"
              key={spot.id}
            >
              <SpotCard spot={spot} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default AllSpots;
