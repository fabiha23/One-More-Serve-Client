import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation, Link } from 'react-router';
import Swal from 'sweetalert2';
import loginBanner from '../../assets/banner1.jpg'; // Replace with your image path
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { loginUser } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            setError('All fields are required');
            return;
        }

        loginUser(email, password)
            .then((result) => {
                setError('');
                Swal.fire({
                    title: 'Logged In!',
                    icon: 'success',
                    timer: 3000,
                    confirmButtonColor: '#10B981'
                });
                navigate(location?.state || '/');
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                    setError('Invalid email or password');
                }
            });
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
                    <h2 className="text-neutral font-semibold text-2xl mb-6 text-center">Welcome Back</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-neutral text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter your email"
                                name="email"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-neutral/80 text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 bg-neutral/10 border border-neutral/20 rounded-lg text-neutral placeholder-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Enter your password"
                                name="password"
                                required
                            />
                            <div className="flex justify-end mt-1">
                                <button type="button" className="text-neutral/70 hover:text-neutral text-xs">
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                        
                        {error && <p className="text-error text-sm">{error}</p>}
                        
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-secondary hover:bg-primary text-primary font-semibold rounded-md transition duration-200 cursor-pointer hover:text-neutral"
                        >
                            Login
                        </button>
                    </form>
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