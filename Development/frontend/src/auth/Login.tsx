import api from "../api/axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 text-black"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login} className="bg-blue-600 w-full p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
