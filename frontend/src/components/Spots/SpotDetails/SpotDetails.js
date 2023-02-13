import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpotData } from "../../../store/spots";
import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  const preview = spot.SpotImages[0].url;

  useEffect(() => {
    dispatch(getSingleSpotData(spotId));
  }, [spotId])

  return (
    <div className="spot-detail-container">
      <h2>{spot.name}</h2>
      <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
      <div className="spot-detail-images-container">
        <div className="spot-detail-preview-image">
          <img src={preview} alt="preview-image" />
        </div>
      </div>
      <p>{spot.address}</p>
    </div>
  )
}

export default SpotDetails;
