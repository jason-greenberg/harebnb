import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewById } from "../../store/reviews";

function DeleteReviewModal({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewById(review.id));
    closeModal();
  }

  const handleCancel = () => {
    closeModal();
  }

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <div className="confirm-delete-buttons">
        <button 
          className="yes-delete-button button"
          onClick={handleDelete}
        >
          {`Yes (Delete Review)`}
        </button>
        <button 
          className="no-keep-spot-button button"
          onClick={handleCancel}
        >
          {`No (Keep Review)`}
        </button>
      </div>
    </div>
  )
}

export default DeleteReviewModal;
