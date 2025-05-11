import { useRef, useState } from "react";
import images from "../constants/images";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/register`, {
                name,
                email,
                password
            });
            if (response.status === 201) {
                setOtpSent(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleOtpChange = ({ digit, index }) => {
        if (!/^[0-9]*$/.test(digit)) return;
    
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
    
        if (digit && index < inputs.current.length - 1) {
          inputs.current[index + 1].focus();
        }
      };
    
      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputs.current[index - 1].focus();
        }
      };
    
      const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const Otp = otp.join("");
        try {
          const response = await axios.post(`${SERVER_URL}/api/auth/verifyOtp`, {
            email: email,
            otp: Otp,
          });
          if(response.status === 200){
            localStorage.setItem("token", response.data.token);
            navigate('/');
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="absolute top-5 left-5">
                
            </div>
            {otpSent ? (
                <div className="mt-10 w-full flex flex-col items-center justify-center gap-5">
                    <img src={images.logo_light} alt="logo" className="w-40" />
                    <h2 className="text-2xl font-medium mt-5">Verify your account</h2>
                    <form onSubmit={handleOtpSubmit} className="w-full flex flex-col items-center justify-center gap-8 px-10">
                        <div className="flex items-center justify-center gap-3">
                            {otp.map((num, index) => (
                                <div key={index} className="w-12 h-14 flex items-center justify-center rounded-lg border border-neutral-200">
                                    <input type="text"
                                        required
                                        placeholder="0"
                                        className="w-4 h-full outline-none"
                                        value={num}
                                        ref={(ref) => (inputs.current[index] = ref)}
                                        maxLength={1}
                                        onChange={(e) =>
                                            handleOtpChange({ digit: e.target.value, index })
                                          }
                                          onKeyDown={(e) => handleKeyDown(e, index)}

                                    />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-blue-300 to-blue-500 w-full py-2.5 rounded-lg cursor-pointer text-white">
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mt-10 w-full lg:w-100 flex flex-col items-center justify-center gap-5">
                    <img src={images.logo_light} alt="logo" className="w-40" />
                    <h2 className="text-2xl font-medium mt-5">Create an account</h2>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-8 px-10">
                        <input type="text"
                            required
                            placeholder="Name"
                            className="px-5 py-2.5 rounded-lg border border-neutral-200 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            Create account
                        </button>
                    </form>
                    <div>
                        <h4>Already have an account? <Link to={'/login'}><span className="text-blue-500 underline cursor-pointer">Sign In</span></Link></h4>
                    </div>
                </div>
            )}
        </div>
    )
}