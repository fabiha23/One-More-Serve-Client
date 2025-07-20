import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result?.user;
        console.log(result.user);
        // update userinfo in the database
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log("user update info", res.data);

        navigate(from);
      })
      .catch((err) => {
        Swal.fire({
          title: "Registration Failed!",
          text: err.message || "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      });
  };

  return (
    <div>
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-neutral/20"></div>
        <span className="px-3 text-neutral/70 text-sm">or continue with</span>
        <div className="flex-1 border-t border-neutral/20"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full py-2.5 bg-neutral/10 hover:bg-neutral/20 border border-neutral/20 text-neutral font-medium rounded-lg flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
      >
        <FcGoogle size={18} />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
