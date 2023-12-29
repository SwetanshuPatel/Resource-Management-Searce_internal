import React from "react";
import Modal from "react-modal";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="delete-modal"
      overlayClassName="delete-modal-overlay"
      ariaHideApp={false}
    >
      <h1>Confirm Action</h1>
      <h2>Are you sure you want to delete?</h2>
      <div className="modal-buttons">
        <button className="confirm-button" onClick={onConfirmDelete}>
          Delete
        </button>
        <button className="cancel-button" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
