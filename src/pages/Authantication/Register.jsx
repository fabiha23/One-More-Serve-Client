import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Swal from "sweetalert2";
import registerBanner from "../../assets/banner1.jpg";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const from = location?.state?.from?.pathname || "/";

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    try {
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password || !profilePic) {
      setError("All fields including profile picture are required");
      return;
    }

    try {
      const result = await registerUser(email, password, name);

      const userInfo = {
        name,
        email,
        photoURL: profilePic,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      await updateUserProfile({
        displayName: name,
        photoURL: profilePic,
      });

      Swal.fire({
        title: "Registered Successfully!",
        icon: "success",
        timer: 3000,
        confirmButtonColor: "#10B981",
      });

      navigate(from);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Registration Failed!",
        text: err.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setError("Password must contain at least one special character");
      return;
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${registerBanner})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      <div className="relative z-10 w-full max-w-md bg-neutral/10 backdrop-blur-sm rounded-xl shadow-xl border border-neutral overflow-hidden">
        <div className="p-8">
          <h2 className="text-neutral font-semibold text-2xl mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-neutral text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-neutral text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-neutral/80 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-neutral/80 text-sm font-medium mb-1">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {profilePic ? (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-neutral/20 relative">
                    <img
                      src={profilePic}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setProfilePic("")}
                      className="absolute top-1 right-1 bg-primary text-white rounded-full font-bold w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full border-2 border-neutral/20 border-dashed rounded-lg cursor-pointer bg-neutral/10 hover:bg-neutral/20">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-2 text-neutral/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-xs text-neutral/50">PNG, JPG</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {error && <p className="text-error">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-secondary hover:bg-primary text-primary font-semibold rounded-md transition duration-200 cursor-pointer hover:text-neutral"
            >
              Register
            </button>
          </form>

          <SocialLogin />

          <p className="text-center mt-6 text-neutral/80 text-sm">
            Already have an account?
            <Link
              to="/login"
              state={location.state}
              className="text-neutral ml-1 font-medium hover:underline"
            >
              Sign in
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

export default Register;
