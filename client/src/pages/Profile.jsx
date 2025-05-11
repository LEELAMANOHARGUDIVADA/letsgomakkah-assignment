import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <button onClick={handleLogOut} className="bg-red-100 px-5 py-2.5 rounded-lg border border-red-500 flex items-center justify-center gap-2 cursor-pointer text-red-500">
                <LogOut />
                <span>Log Out</span>
            </button>
        </div>
    )
}