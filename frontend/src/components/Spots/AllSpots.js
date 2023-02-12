import { useSelector } from 'react-redux';
import SpotDetail from './SpotDetailCard';
import './Spots.css'

function AllSpots() {
  const allSpots = useSelector(state => state.spots.allSpots);
  const allSpotsArray = Object.values(allSpots);

  return (
    <>
      <h1>All Spots</h1>
      <ul className="spots-list">
        {
          allSpotsArray.length > 0
          && allSpotsArray.map(spot => (
            <li>
              <SpotDetail spot={spot} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default AllSpots;
