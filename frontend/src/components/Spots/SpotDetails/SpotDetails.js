import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpotData } from "../../../store/spots";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);

  useEffect(() => {
    dispatch(getSingleSpotData(spotId));
  }, [spotId])

  return (
    <div className="spot-detail-container">
      <h1>Spot Details</h1>
      <p>{spot.id}</p>
      <p>{spot.address}</p>
    </div>
  )
}

export default SpotDetails;
