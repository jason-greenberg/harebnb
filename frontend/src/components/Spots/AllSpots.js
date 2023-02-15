import { useSelector } from 'react-redux';
import SpotCard from './SpotCard/SpotCard';
import './AllSpots.css'

function AllSpots() {
  const allSpots = useSelector(state => state.spots.allSpots);
  const allSpotsArray = Object.values(allSpots);

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
