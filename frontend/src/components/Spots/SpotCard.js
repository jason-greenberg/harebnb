function SpotCard({ spot }) {
  return (
    <>
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
            ★{spot.avgRating}
          </div>
        </div>
        <div className="price">
          <span className="bold">${spot.price}</span><span className="light">night</span>
        </div>
      </div>
    </>
  )
}

export default SpotCard;
