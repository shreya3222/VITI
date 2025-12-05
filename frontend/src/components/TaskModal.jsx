// src/components/TaskModal.jsx
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  initialTask = null,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || "",
        description: initialTask.description || "",
        priority: initialTask.priority || "medium",
        status: initialTask.status || "todo",
        dueDate: initialTask.dueDate
          ? new Date(initialTask.dueDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });
    }
  }, [initialTask, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };
    onSubmit(payload);
  };

  const mode = initialTask ? "Edit Task" : "Create Task";

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-title">{mode}</div>
          <button className="btn btn-ghost" onClick={onClose}>
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div>
              <div className="field-label">Title</div>
              <input
                className="field-input"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Prepare system demo"
              />
            </div>

            <div>
              <div className="field-label">Description</div>
              <textarea
                className="field-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Optional details"
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="field-label">Priority</div>
                <select
                  className="field-select"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div className="field-label">Status</div>
                <select
                  className="field-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div>
              <div className="field-label">Due Date</div>
              <input
                type="date"
                className="field-input"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialTask ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
