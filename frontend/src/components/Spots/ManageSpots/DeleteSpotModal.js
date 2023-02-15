import { useModal } from "../../../context/Modal";

function DeleteSpotModal() {
  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings</p>
      <div className="confirm-delete-buttons">
        <button className="yes-delete-button button">{`Yes (Delete Spot)`}</button>
        <button className="no-keep-spot-button button">{`No (Keep Spot)`}</button>
      </div>
    </div>
  )
}

export default DeleteSpotModal;
