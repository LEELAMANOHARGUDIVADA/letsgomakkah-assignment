import { useContext } from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";
import ActiveComponentContext from "../context/ActiveComponentContext";
import Tickets from "./Tickets";
import Profile from "./Profile";

export default function Dashboard(){
    const { activeComponent } = useContext(ActiveComponentContext);
    return(
        <div>
            {activeComponent === "Home" && <Home />}
            {activeComponent === "Tickets" && <Tickets />}
            {activeComponent === "Profile" && <Profile />}
            <Navbar />
        </div>
    )
}