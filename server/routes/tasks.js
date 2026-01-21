import express from "express";
import { db } from "../db.js";
const router = express.Router();

// Récupérer les tâches de l'utilisateur
router.get("/", (req, res) => {
  const user_id = req.query.user_id;
  if (!user_id) return res.status(400).json({ message: "user_id manquant" });

  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(results);
  });
});

// Ajouter une tâche pour l'utilisateur
router.post("/", (req, res) => {
  const { title, user_id } = req.body;
  if (!title || !user_id)
    return res.status(400).json({ message: "Données manquantes" });

  const sql = "INSERT INTO tasks (title, user_id) VALUES (?, ?)";
  db.query(sql, [title, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ id: result.insertId, title });
  });
});

export default router;
