import React from "react";

const Modal = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal">
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default Modal;