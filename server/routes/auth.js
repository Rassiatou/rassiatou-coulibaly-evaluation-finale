import express from "express";
import { db } from "../db.js";
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (results.length === 0)
      return res.status(401).json({ message: "Identifiants invalides" });
    
    // renvoyer uniquement id et email
    const user = { id: results[0].id, email: results[0].email };
    res.json({ message: "Connexion réussie", user });
  });
});

export default router;
