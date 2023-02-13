import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpotData } from "../../../store/spots";
import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot);
  
  useEffect(() => {
    dispatch(getSingleSpotData(spotId));
  }, [spotId])

  // Return Spot Not Found, if spot does not exist in spots.singleSpot slice of state
  if (!spot || !Object.values(spot).length) {
    return <h1 className="not-found">Spot Not Found</h1>
  }

  const preview = spot.SpotImages[0].url;


  return (
    <div className="spot-details-container">
      <div className="name-location">
        <h2>{spot.name}</h2>
        <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
      </div>
      <div className="spot-details-images-container">
        <div className="large-preview-image-contanier">
          <img 
            src={preview && preview} 
            alt="preview-image"
            className="large-preview-image"
          />
        </div>
        <div className="small-preview-images-container">
          {/* {Maps the second through fifth SpotImages to the page} */}
          {spot.SpotImages && spot.SpotImages.slice(1, 5).map(image => (
            <img 
              key={image.id} 
              className="small-preview-image"
              src={image.url}
              alt="preview-image"
            >
            </img>
          ))}
        </div>
      </div>
      <div className="description-container">
        <div className="host-name-description"></div>
        <div className="price-reviews-reserve"></div>
      </div>
      <hr className="hr"/>

    </div>
  )
}

export default SpotDetails;
