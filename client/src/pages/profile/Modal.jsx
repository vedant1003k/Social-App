import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, onUpload, onRemove, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <button className="modalButton uploadButton" onClick={onUpload}>
          Upload Photo
        </button>
        <button className="modalButton removeButton" onClick={onRemove}>
          Remove Current Photo
        </button>
        <button className="modalButton cancelButton" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
