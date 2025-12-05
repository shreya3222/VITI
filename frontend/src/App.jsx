import { useState } from "react";
import { FiMic, FiPlus } from "react-icons/fi";
import { TaskProvider, useTasks } from "./context/TaskContext.jsx";
import BoardView from "./pages/BoardView";
import ListView from "./pages/ListView";
import TaskModal from "./components/TaskModal";
import DeleteModal from "./components/DeleteModal";
import VoiceModal from "./components/VoiceModal";
import FloatingLines from "./components/FloatingLines";  

function AppInner() {
  const { tasks, loading, addTask, editTask, removeTask } = useTasks();

  const [view, setView] = useState("board");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dueFilter, setDueFilter] = useState("");

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleCreateClick = () => {
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleDelete = (task) => {
    setDeletingTask(task);
    setDeleteModalOpen(true);
  };

  const handleSubmitTask = async (payload) => {
    editingTask ? await editTask(editingTask._id, payload) : await addTask(payload);
    setTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleConfirmDelete = async () => {
    if (deletingTask) await removeTask(deletingTask._id);
    setDeletingTask(null);
    setDeleteModalOpen(false);
  };

  const handleCreateFromParsed = async (parsed) => {
    await addTask({
      title: parsed.title,
      description: "",
      priority: parsed.priority || "medium",
      status: parsed.status || "todo",
      dueDate: parsed.dueDate || null,
    });
    setVoiceModalOpen(false);
  };

  return (
    <div style={{ position:"relative", width:"100%", minHeight:"100vh" }}>

      <div style={{ position:"absolute", inset:0, zIndex:0, opacity:0.9 }}>
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={[12,16,18]}
          lineDistance={[6,5,4]}
          interactive={true}
          parallax={true}
          animationSpeed={1}
          bendStrength={-0.4}
        />
      </div>

      <div className="app-root" style={{ position:"relative", zIndex:10 }}>
        <div className="glass-shell"
        style={{
      background: "rgba(0, 0, 0, 0)",   
      backdropFilter: "blur(6px)",       
      borderRadius: "10px",
      padding:"10px",
    }}>

          <header className="app-header">
            <div className="app-title-block">
              <div className="app-title">VETI</div>
              <div className="app-subtitle">Voice Enabled Task Interface — Just speak, prioritize, set due dates, and watch tasks appear automatically using voice commands.</div>
            </div>

            <div className="view-tabs">
              <button className={`view-tab ${view==="board"?"active":""}`} onClick={()=>setView("board")}>Board</button>
              <button className={`view-tab ${view==="list"?"active":""}`} onClick={()=>setView("list")}>List</button>
            </div>
          </header>

          <div className="app-body">
            <div className="filter-bar">

              <div className="filter-group">
                {["all","todo","in-progress","done"].map(s=>(
                  <button key={s} className={`chip-filter ${statusFilter===s?"active":""}`}
                    onClick={()=>setStatusFilter(s)}>
                    {s==="all"?"Status: All":s.replace("-"," ")}
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <div className="chip-filter">
                  <span>Priority:</span>
                  <select value={priorityFilter} onChange={(e)=>setPriorityFilter(e.target.value)} className="field-select">
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="input-pill">
                  <input placeholder="Search tasks..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
                </div>

                <div className="input-pill">
                  <input type="date" value={dueFilter} onChange={(e)=>setDueFilter(e.target.value)} />
                </div>

                <button className="chip-filter" style={{ marginLeft:10, opacity:0.9 }}
                  onClick={()=>{ setStatusFilter("all"); setPriorityFilter("all"); setSearchQuery(""); setDueFilter(""); }}>
                  Clear Filters
                </button>
              </div>
              <div className="actions">
              <button className="btn btn-primary" onClick={()=>setVoiceModalOpen(true)}><FiMic size={15}/> Voice Task</button>
              <button className="btn btn-primary" onClick={handleCreateClick}><FiPlus size={15}/> New Task</button>
            </div>
            </div>

            {loading ? <div style={{marginTop:24,fontSize:"0.9rem"}}>Loading tasks...</div> 
            : view==="board" ? (
              <BoardView {...{tasks,onEdit:handleEdit,onDelete:handleDelete,statusFilter,priorityFilter,searchQuery,dueFilter}}/>
            ) : (
              <ListView  {...{tasks,onEdit:handleEdit,onDelete:handleDelete,statusFilter,priorityFilter,searchQuery,dueFilter}}/>
            )}            
          </div>
        </div>

        <TaskModal open={taskModalOpen} onClose={()=>{setTaskModalOpen(false);setEditingTask(null);}} onSubmit={handleSubmitTask} initialTask={editingTask}/>
        <DeleteModal open={deleteModalOpen} task={deletingTask} onClose={()=>{setDeleteModalOpen(false);setDeletingTask(null);}} onConfirm={handleConfirmDelete}/>
        <VoiceModal open={voiceModalOpen} onClose={()=>setVoiceModalOpen(false)} onCreateFromParsed={handleCreateFromParsed}/>
      </div>
    </div>
  );
}

export default function App() {
  return <TaskProvider><AppInner/></TaskProvider>;
}
