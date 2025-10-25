import React, { useContext, useState } from "react";
import Button from "./Button";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate("/setup");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-80">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome to Quiz App</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            <div className="flex justify-center">
              <Button type="submit" variant="primary" disabled={!name}>
                Let's Start
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
