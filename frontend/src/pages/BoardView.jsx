// src/pages/BoardView.jsx
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

export default function BoardView({
  tasks,
  onEdit,
  onDelete,
  statusFilter,
  priorityFilter,
  searchQuery,
  dueFilter,
}) {

  const { updateStatus } = useTasks();

const handleDrop = (e, newStatus) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("taskId");
  console.log("Dropped on:", newStatus, "ID:", id);

  if (!id) {
    console.log("No taskId received");
    return;
  }

  updateStatus(id, newStatus);
};

  const allowDrop = (e) => e.preventDefault();

  const filterTasks = (status) =>
    tasks.filter(task => {
      const matchStatus = statusFilter === "all" || task.status === statusFilter;
      const matchPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchDue =
        !dueFilter ||
        (task.dueDate && new Date(task.dueDate).toDateString() === new Date(dueFilter).toDateString());

      return task.status === status && matchStatus && matchPriority && matchSearch && matchDue;
    });

  const columns = [
    { key: "todo", label:"To Do" },
    { key: "in-progress", label:"In Progress" },
    { key: "done", label:"Done" }
  ];

  return (
    <div className="board-grid"
    style={{
      background: "rgba(0,0,0,0.15)",   
      backdropFilter: "blur(6px)",       
      borderRadius: "10px",
      padding:"10px",
    }}
    >
      {columns.map(col => (
        <div key={col.key}
          className="board-column"
          style={{
      background: "rgba(0,0,0,0.15)",   
      backdropFilter: "blur(6px)",       
      borderRadius: "10px",
      padding:"10px",
    }}
          onDragOver={allowDrop}
          onDrop={(e)=>handleDrop(e,col.key)}
        >
          <h3 className="board-column-title">{col.label}</h3>

          {filterTasks(col.key).map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {filterTasks(col.key).length === 0 && (
            <div style={{ fontSize:"0.75rem", opacity:0.6 }}>No tasks here</div>
          )}
        </div>
      ))}
    </div>
  );
}
