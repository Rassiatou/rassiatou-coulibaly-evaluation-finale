import express from "express";
import { db } from "../db.js";
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { title, user_id } = req.body;
  const sql = "INSERT INTO tasks (title, user_id) VALUES (?, ?)";
  db.query(sql, [title, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ id: result.insertId, title });
  });
});

export default router;
