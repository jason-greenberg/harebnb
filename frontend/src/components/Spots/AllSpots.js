import { useSelector } from 'react-redux';
import SpotCard from './SpotCard';
import './Spots.css'

function AllSpots() {
  const allSpots = useSelector(state => state.spots.allSpots);
  const allSpotsArray = Object.values(allSpots);

  return (
    <>
      <ul className="spots-list">
        {
          allSpotsArray.length > 0
          && allSpotsArray.map(spot => (
            <li className="spot-card">
              <SpotCard spot={spot} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default AllSpots;
