import { useState } from "react";
import images from "../constants/images";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
                email,
                password
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            
                <div className="mt-10 w-full flex flex-col items-center justify-center gap-5">
                    <img src={images.logo_light} alt="logo" className="w-40" />
                    <h2 className="text-2xl font-medium mt-5">Login to your account</h2>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-8 px-10">
                        <input type="email"
                            required placeholder="Email"
                            className="px-5 py-2.5 rounded-lg border border-neutral-200 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password"
                            required placeholder="Password"
                            className="px-5 py-2.5 rounded-lg border border-neutral-200 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="bg-gradient-to-r from-blue-300 to-blue-500 w-full py-2.5 rounded-lg cursor-pointer text-white">
                            Login
                        </button>
                    </form>
                    <div>
                        <h4>Don't have an account? <Link to={'/register'}><span className="text-blue-500 underline cursor-pointer">Sign up</span></Link></h4>
                    </div>
                </div>
        </div>
    )
}