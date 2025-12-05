// src/components/TaskCard.jsx
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const priorityClass = (priority) => {
  switch (priority) {
    case "low": return "badge badge-priority-low";
    case "medium": return "badge badge-priority-medium";
    case "high": return "badge badge-priority-high";
    case "critical": return "badge badge-priority-critical";
    default: return "badge badge-priority-medium";
  }
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TaskCard({ task, onEdit, onDelete }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  return (
    <div className="task-card" style={{
      background: "rgba(0,0,0,0.15)",   
      backdropFilter: "blur(6px)",       
      borderRadius: "10px",
      padding:"10px",
    }}
    draggable onDragStart={handleDragStart}>

      <div className="task-card-header" 
        style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        
        <div className="task-title">{task.title}</div>

        {task.dueDate && (
          <div className="task-due" style={{ fontSize:"12px", opacity:0.8 }}>
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      {task.description && <div className="task-desc">{task.description}</div>}

      <div className="task-meta">
        <span className={priorityClass(task.priority)}>{task.priority}</span>
        <span className="badge badge-status">
          {task.status === "todo" ? "To Do" :
          task.status === "in-progress" ? "In Progress" : "Done"}
        </span>
      </div>

      <div className="task-actions">
        <button className="btn btn-ghost" onClick={() => onEdit(task)}>
          <FiEdit2 size={13}/> Edit
        </button>

        <button className="btn btn-ghost" style={{ color:"#ff7b93" }} onClick={() => onDelete(task)}>
          <FiTrash2 size={13}/> Delete
        </button>
      </div>

    </div>
  );
}
