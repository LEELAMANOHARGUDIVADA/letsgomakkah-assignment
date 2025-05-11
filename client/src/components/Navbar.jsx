import { useContext } from "react";
import { ActiveComponentContext } from "../context/ActiveComponentContext";
import nav_items from "../constants/nav_items";

export default function Navbar(){
    const { activeComponent, setActiveComponent } = useContext(ActiveComponentContext);
    return(
        <div className="w-full fixed lg:hidden bottom-0 bg-white rounded-t-3xl h-16 z-50 shadow border-t border-neutral-200 flex items-center justify-center">
            <div className="w-full flex items-center justify-around">
            {nav_items && nav_items.map((item) => {
                const Icon = item.icon;
                return(
                    <div key={item.id} onClick={() => setActiveComponent(item.name)}>
                        <Icon size={25} className={`${activeComponent === item.name ? "text-black": "text-neutral-400"}`} />
                    </div>
                )
            })}
            </div>
        </div>
    )
}