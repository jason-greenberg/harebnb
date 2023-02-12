function SpotDetail({ spot }) {
  return (
    <>
      <img 
        src={spot.previewImage} 
        alt="preview-image"
        className="preview-image" 
      />
      <div className="spot-description">
        <div className="location-text-and-stars">
          <div className="location-text bold">{spot.city}, {spot.state}</div>
          <div className="stars">
            ★{spot.avgRating}
          </div>
        </div>
        <div className="price">
          <span className="bold">${spot.price}</span><span>night</span>
        </div>
      </div>
    </>
  )
}

export default SpotDetail;
