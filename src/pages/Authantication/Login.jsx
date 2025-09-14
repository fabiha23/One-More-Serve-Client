import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import loginBanner from "../../assets/banner1.jpg"; // Replace with your image path
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import QuickLoginButtons from "./QuickLoginButtons";

const Login = () => {
  const { loginUser } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Added controlled state for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    loginUser(email, password)
      .then(() => {
        setError("");
        Swal.fire({
          title: "Logged In!",
          icon: "success",
          timer: 3000,
          confirmButtonColor: "#10B981",
        });
        navigate(location?.state || "/");
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed!",
          text: err.message || "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      });
  };

  // 🔹 Hardcoded demo credentials
  const demoCredentials = {
    restaurant: { email: "crave@feast.com", password: "Abcdef@" },
    charity: { email: "a@b.com", password: "Abcdef@" },
    admin: { email: "amy@gmail.com", password: "Abcdef@" },
  };

  // 🔹 Function to autofill
  const handleFillCredentials = (role) => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBanner})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

      <title>Login</title>

      {/* Blurred transparent card */}
      <div className="relative z-10 w-full max-w-md bg-neutral/10 backdrop-blur-sm rounded-xl shadow-xl border border-neutral overflow-hidden">
        <div className="p-8">
          <h2 className="text-neutral font-semibold text-2xl mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-neutral text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-neutral/80 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
                placeholder="Enter your password"
                name="password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-neutral/70 hover:text-neutral cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  className="text-neutral/70 hover:text-neutral text-xs"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 hover:bg-secondary bg-primary text-white font-semibold rounded-md transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
          {/* 🔹 Four role buttons to autofill credentials */}
          <QuickLoginButtons
            handleFillCredentials={handleFillCredentials}
          ></QuickLoginButtons>
          <SocialLogin></SocialLogin>

          <p className="text-center mt-6 text-neutral/80 text-sm">
            Don't have an account?
            <Link
              to="/register"
              state={location.state}
              className="text-neutral ml-1 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-neutral/70 hover:text-neutral text-sm inline-flex items-center duration-200"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
