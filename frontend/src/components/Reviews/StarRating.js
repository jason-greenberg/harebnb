function StarRating({ rating, setRating }) {

  const handleStarEnter = (index) => {
    setRating(index + 1);
  };

  const handleStarLeave = () => {
    if (rating === 0) {
      return;
    }
    setRating(0);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="stars-container">
    <div className="star-symbols">
      {[...Array(5)].map((el, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onMouseEnter={() => handleStarEnter(index)}
          onMouseLeave={handleStarLeave}
          onClick={() => handleStarClick(index)}
        >
          ★
        </span>
      ))}
    </div>
    <div>{rating} Stars</div>
  </div>
  )
}

export default StarRating;
