import React from "react";
import "./modal.css";

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Do you want to Logout?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm} id="yes-no" >
            Yes
          </button>
          <button onClick={onClose}  id = "yes-no">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
