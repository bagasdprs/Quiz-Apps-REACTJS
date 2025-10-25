import React from "react";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-blue-100 to-blue-200">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "Player"} 🎉</h1>
          <p className="text-gray-600 mb-6">Ready to test your knowledge?</p>

          <div className="flex flex-col items-center space-y-2">
            <Button variant="primary" className="w-2/3" onClick={() => navigate("/setup")}>
              Start a New Quiz
            </Button>
            <Button variant="secondary" className="w-2/3" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
