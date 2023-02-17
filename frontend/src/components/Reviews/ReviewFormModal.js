import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewBySpotId } from '../../store/reviews';
import './ReviewFormModal.css';
import StarRating from './StarRating';

function ReviewFormModal({ spotId }) {
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const newReview = {
      review,
      stars: rating
    }

    return dispatch(createReviewBySpotId(newReview, +spotId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
  }

  return (
    <div className="review-form-modal-container">
      <form onSubmit={onSubmit}>
        <h2>How was your stay?</h2>
        <ul className="errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <textarea 
          cols="60" 
          rows="5"
          placeholder='Leave your review here...'
          className="review-text-input"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        >
        </textarea>
        <StarRating rating={rating} setRating={setRating} />
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
