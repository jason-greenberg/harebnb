import { Link } from "react-router-dom";

function SpotCard({ spot }) {
  return (
    <>
      <Link to={`/spots/${spot.id}`}>
        <div className="image-container">
          <img 
            src={spot.previewImage} 
            alt="preview-image"
            className="preview-image" 
          />
        </div>
        <div className="spot-description">
          <div className="location-text-and-stars">
            <div className="location-text bold">{spot.city}, {spot.state}</div>
            <div className="stars">
              {spot.avgRating ? '★' + spot.avgRating : 'New!'}
            </div>
          </div>
          <div className="price">
            <span className="bold price-component">${Math.trunc(spot.price)}</span>
            <span className="light price-component">night</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SpotCard;
