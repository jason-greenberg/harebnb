import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { deleteReviewById, getAllReviewsSpot, getAllReviewsUser } from "../../../store/reviews";
import { getSingleSpotData } from "../../../store/spots";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../../Reviews/ReviewFormModal";
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
  }, [spotId, reviewsArray.length]);

  useEffect(() => {
    dispatch(getAllReviewsSpot(spotId));
    dispatch(getAllReviewsUser());
    // Check if user has reviewed spot on re-render
    const hasReviewed = userReviewsArray.some((review) => review.spotId === +spotId);
    setUserHasReviewed(hasReviewed);
  }, [userReviewsArray.length])

  // Return Spot Not Found, if spot does not exist in spots.singleSpot slice of state
  if (!spot || !Object.values(spot).length) {
    return <h3 className="not-found">Unable to retrieve details. Please try again shortly</h3>
  }

  const preview = spot.SpotImages[0]?.url || ''
  const reserveClick = () => {
    alert('Feature Coming Soon...')
  }

  
  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewById(reviewId))
    setUserHasReviewed(false);
  }
  
  const canPostReview = user && spot.ownerId !== user.id && !userHasReviewed;

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
          { spot.numReviews && spot.numReviews === 1 ? spot.numReviews + ' review' : ''  }
          { spot.numReviews && spot.numReviews !== 1 ? spot.numReviews + ' reviews' : '' }
          </div>
        </div>
        {/* Check has not reviewed, or does not own spot */}
        { canPostReview && (
          <button className="post-review-button">
            <OpenModalMenuItem 
              itemText="Post your Review"
              itemTextClassName="review-button-text"
              modalComponent={<ReviewFormModal spotId={spotId} />}
            />
          </button>
        )}
        <div className="reviews">
          { !spot.numReviews && canPostReview ? 'Be the first to post a review!' : ''  }
          { reviewsArray && reviewsArray.slice(0).reverse().map(review => (
            <div key={review.id} className="review-individual">
              <div className="review-first-name review-com">{review.User?.firstName}</div>
              <div className="review-date review-com">{review.createdAt.split('T')[0]}</div> {/* Format date */}
              <div className="review-description review-com">{review.review}</div>
              { review.userId === user?.id && (
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          ))}   
        </div>
      </div>
    </div>
  )
}

export default SpotDetails;
