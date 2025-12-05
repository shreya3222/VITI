// src/pages/ListView.jsx
import TaskCard from "../components/TaskCard";

export default function ListView({
  tasks,
  onEdit,
  onDelete,
  statusFilter,
  priorityFilter,
  searchQuery,
  dueFilter, 
}) {

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

const taskDate = task.dueDate ? new Date(task.dueDate) : null;
const filterDate = dueFilter ? new Date(dueFilter) : null;

const matchesDue =
  !dueFilter ||
  (taskDate && filterDate && taskDate.toDateString() === filterDate.toDateString());


    return matchesStatus && matchesPriority && matchesSearch && matchesDue;
  });

  return (
    <div className="list-wrapper"
    style={{
      background: "rgba(0,0,0,0.15)",   
      backdropFilter: "blur(6px)",       
      borderRadius: "10px",
      padding:"10px",
    }}
    >
      <table className="list-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>
                <div style={{ fontWeight: 500 }}>{task.title}</div>
                {task.description && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {task.description}
                  </div>
                )}
              </td>
              <td>{task.priority}</td>
              <td>
                {task.status === "todo"
                  ? "To Do"
                  : task.status === "in-progress"
                  ? "In Progress"
                  : "Done"}
              </td>
              <td>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "—"}
              </td>
              <td style={{ textAlign: "right" }}>
                <div style={{ display: "inline-flex", gap: 6 }}>
                  <button className="btn btn-ghost" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{ color: "#ff7b93" }}
                    onClick={() => onDelete(task)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan="5" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                No tasks match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
