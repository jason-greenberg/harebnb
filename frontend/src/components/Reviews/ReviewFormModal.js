import { useEffect, useState } from 'react';
import './ReviewFormModal.css';
import StarRating from './StarRating';

function ReviewFormModal() {
  const [rating, setRating] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="review-form-modal-container">
      <form onSubmit={onSubmit}>
        <h2>How was your stay?</h2>
        <textarea 
          cols="60" 
          rows="5"
          placeholder='Leave your review here...'
          className="review-text-input"
        >
        </textarea>
        <StarRating key={rating} rating={rating} setRating={setRating} />
        <div className="submit">
          <button
            className="submit-button"
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewFormModal;
