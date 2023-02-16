import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewBySpotId } from '../../store/reviews';
import './ReviewFormModal.css';
import StarRating from './StarRating';

function ReviewFormModal({ spotId }) {
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitting')
    const newReview = {
      review,
      stars: rating
    }
    dispatch(createReviewBySpotId(newReview, +spotId));
    closeModal();
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
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
