import './ReviewFormModal.css';

function ReviewFormModal() {
  return (
    <div className="review-form-modal-container">
      <h1>How was your stay?</h1>
      <textarea 
        cols="30" 
        rows="10"
        placeholder='Leave your review here...'
      >
      </textarea>
      <div className="starts-container">
        <div className="star-symbols"></div>
        <div>Stars</div>
      </div>
      <div className="submit">
        <button>Submit Your Review</button>
      </div>
    </div>
  )
}

export default ReviewFormModal;
