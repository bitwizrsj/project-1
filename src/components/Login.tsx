import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Define the shape of the response data, including the token and error message
interface LoginResponse {
  token?: string;
  error?: string;
}

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for show/hide password
  const navigate = useNavigate(); // Use navigate hook for redirection

  // Check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [navigate]);

  // Define the handleLogin function with proper types for async operations
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true when login starts
    
    try {
      const response = await fetch("http://localhost:5002/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await response.json();
      if (response.ok) {
        login(data.token!); // Store the token in AuthContext
        navigate("/dashboard"); // Redirect to dashboard upon successful login
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Admin Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle the visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m3 4.5c-3 0-5.5-2.5-5.5-5.5S9 5.5 12 5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m3 4.5c-3 0-5.5-2.5-5.5-5.5S9 5.5 12 5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5z" />
              </svg>
            )}
          </button>
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="spinner-border animate-spin border-4 border-t-4 border-blue-700 rounded-full w-5 h-5 mx-auto"></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
