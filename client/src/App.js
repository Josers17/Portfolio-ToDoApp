import { useEffect, useState } from "react";
import api from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (task) => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    loadTasks();
  };

  const deleteTask = async (task) => {
    await api.delete(`/tasks/${task._id}`);
    setTasks(tasks.filter(t => t._id !== task._id));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">To-Do List</h2>
      <form onSubmit={addTask} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="btn btn-primary">Add</button>
      </form>

      <ul className="list-group">
        {tasks.map((t) => (
          <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={t.completed}
                onChange={() => toggleTask(t)}
              />
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.title}
              </span>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
