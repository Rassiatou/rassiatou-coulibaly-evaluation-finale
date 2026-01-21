import request from "supertest"; // pour simuler des requêtes HTTP
import express from "express"; // pour créer une instance de ton app
import { db } from "../db.js"; // pour interagir avec ta base MySQL

// ? Création d’une application Express de test
const app = express();
app.use(express.json());

// --- Routes copiées de ton index.js ---
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Express + MySQL !");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Utilisateur ajouté avec succès !" });
  });
});

// ? TESTS AVEC SUPERTEST
describe("Tests de l’API Express + MySQL", () => {
  it("GET / doit renvoyer un message de bienvenue", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Bienvenue sur l’API Express + MySQL !");
  });

  it("GET /users doit renvoyer un tableau d’utilisateurs", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users doit ajouter un utilisateur", async () => {
    const newUser = { name: "Supertest User", email: "test@exemple.com" };
    const res = await request(app).post("/users").send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/succès/i);
  });

  afterAll(() => {
    // ? Ferme la connexion MySQL après les tests
    db.end();
  });
});
