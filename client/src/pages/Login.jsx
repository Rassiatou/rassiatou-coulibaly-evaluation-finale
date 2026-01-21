import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      onLogin(res.data.user);
      navigate("/tasks");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLoginClick}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
