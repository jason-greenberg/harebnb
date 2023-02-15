import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSingleSpot } from "../../../store/spots";

function DeleteSpotModal({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSingleSpot(spot.id));
    closeModal();
  }

  const handleCancel = () => {
    closeModal();
  }

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings</p>
      <div className="confirm-delete-buttons">
        <button 
          className="yes-delete-button button"
          onClick={handleDelete}
        >
          {`Yes (Delete Spot)`}
        </button>
        <button 
          className="no-keep-spot-button button"
          onClick={handleCancel}
        >
          {`No (Keep Spot)`}
        </button>
      </div>
    </div>
  )
}

export default DeleteSpotModal;
