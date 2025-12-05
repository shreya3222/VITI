// src/components/DeleteModal.jsx
import { FiX } from "react-icons/fi";

export default function DeleteModal({ open, task, onClose, onConfirm }) {
  if (!open || !task) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-title" style={{ color: "#ff7b93" }}>
            Delete Task
          </div>
          <button className="btn btn-ghost" onClick={onClose}>
            <FiX size={16} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Are you sure you want to delete{" "}
            <span style={{ color: "#fff" }}>"{task.title}"</span>?
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn"
            style={{
              background: "var(--danger-soft)",
              color: "#ff7b93",
            }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
