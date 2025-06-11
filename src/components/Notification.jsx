import React, { useEffect } from "react";

const Notification = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // trigger parent to hide it
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`toast align-items-center text-white border-0 show`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ background: type === 'error' ? '#ffcccc' : 'red' }}
      >
        <div className="d-flex">
          <div className="toast-body" style={{color:"white", fontSize:"2em"}}>{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
