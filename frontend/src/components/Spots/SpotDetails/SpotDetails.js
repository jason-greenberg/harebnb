import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllReviewsSpot, getAllReviewsUser } from "../../../store/reviews";
import { getSingleSpotData } from "../../../store/spots";
import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userReviews = useSelector(state => state.reviews.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const spotReviews = useSelector(state => state.reviews.spot);
  const reviewsArray = Object.values(spotReviews);
  const userReviewsArray = Object.values(userReviews);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  // Populate store with focused spot and user data
  useEffect(() => {
    dispatch(getSingleSpotData(spotId));
    dispatch(getAllReviewsSpot(spotId));
    dispatch(getAllReviewsUser())
      .then(checkIfUserHasReviewedSpot)
  }, [spotId])

  const checkIfUserHasReviewedSpot = () => {
    for (let i = 0; i < userReviewsArray.length; i += 1) {
      const review = userReviewsArray[i];
      if (review.spotId === +spotId) {
        return setUserHasReviewed(true);
      }
    }
  }

  // Return Spot Not Found, if spot does not exist in spots.singleSpot slice of state
  if (!spot || !Object.values(spot).length) {
    return <h1 className="not-found">Unable to retrieve details. Please try again shortly</h1>
  }

  const preview = spot.SpotImages[0]?.url || ''
  const reserveClick = () => {
    alert('Feature Coming Soon...')
  }

  return (
    <div className="spot-details-container">
      <div className="name-location">
        <h2>{spot.name}</h2>
        <div className="location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
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
        <div className="host-name-description">
          <h3 className="host-name">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
          <p className="description">{spot.description}</p>
        </div>
        <div className="price-reviews-reserve">
          <div className="price-review-stats">
            <div className="price">
              <span className="bold price-component">${Math.trunc(spot.price)}</span>
              <span className="light price-component">night</span>
            </div>
            <div className="review-stats">
              <div className="star-stats">
                { spot.avgStarRating ? '★' + Number(spot.avgStarRating).toFixed(1) : '★New' }
              </div>
              { spot.avgStarRating ? '·' : '' }
              <div className="num-reviews">
                { spot.numReviews && spot.numReviews === 1 ? spot.numReviews + ' review' : ''  }
                { spot.numReviews && spot.numReviews !== 1 ? spot.numReviews + ' reviews' : '' }
              </div>
            </div>
          </div>
          <div className="reserve-button-container">
            <button 
              className="reserve-button"
              onClick={reserveClick}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="break"></div>
      <div className="reviews-container">
        <div className="reviews-headline">
          <div className="headline-stars">
            { spot.avgStarRating ? '★' + Number(spot.avgStarRating).toFixed(1) : '★New' }
          </div>
          { spot.avgStarRating ? '·' : '' }
          <div className="headline-num-reviews">
          { spot.numReviews ? spot.numReviews + ' reviews' : '' }
          </div>
        </div>
        {/* Check has not reviewed, or does not own spot */}
        { (user && spot.ownerId !== user.id && !userHasReviewed) && (
          <button className="post-review-button">Post Your Review</button>
        )}
        <div className="reviews">
          { reviewsArray && reviewsArray.map(review => (
            <div key={review.id} className="review-individual">
              <div className="review-first-name review-com">{review.User.firstName}</div>
              <div className="review-date review-com">{review.createdAt.split('T')[0]}</div> {/* Format date */}
              <div className="review-description review-com">{review.review}</div>
            </div>
          ))}   
        </div>
      </div>

    </div>
  )
}

export default SpotDetails;
