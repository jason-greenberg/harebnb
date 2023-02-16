function StarRating({ rating, setRating }) {

  const handleStarEnter = (index) => {
    setRating(index + 1);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="stars-container">
    <div className="star-symbols">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onMouseEnter={() => handleStarEnter(index)}
          onClick={() => handleStarClick(index)}
        >
          ★
        </span>
      ))}
    </div>
    <div className="stars-label">Stars</div>
  </div>
  )
}

export default StarRating;
