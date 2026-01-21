import { useState, useEffect } from "react";
import { api } from "../api";

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks", { params: { user_id: user.id } });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title, user_id: user.id });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Liste des tâches de {user.email}</h2>
      <input
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
