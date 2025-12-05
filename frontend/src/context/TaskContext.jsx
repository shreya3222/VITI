// src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasks";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task) => {
    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
  };

  const editTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const updated = await res.json();
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  } catch (err) {
    console.error("Failed to update task status", err);
  }
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        editTask,
        removeTask,
        updateStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
