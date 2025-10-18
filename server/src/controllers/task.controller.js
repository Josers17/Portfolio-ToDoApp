import { Task } from "../models/Task.js";

export async function getTasks(req, res) {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req, res) {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title, completed }, { new: true });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
}
