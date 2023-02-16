import { useModal } from '../../context/Modal';
import './ReviewFormModal.css';
import StarRating from './StarRating';

function ReviewFormModal({ rating, setRating }) {
  const { modalRef } = useModal();

  return (
    <div className="review-form-modal-container">
      <h2>How was your stay?</h2>
      <textarea 
        cols="60" 
        rows="5"
        placeholder='Leave your review here...'
        className="review-text-input"
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
    </div>
  )
}

export default ReviewFormModal;
