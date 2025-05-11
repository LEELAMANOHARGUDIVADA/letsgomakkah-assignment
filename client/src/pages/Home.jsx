import { ArrowLeft, ArrowLeftRight, CalendarDays, UserCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import airplane from "../assets/airplane.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import images from "../constants/images";
import nav_items from "../constants/nav_items";
import ActiveComponentContext from "../context/ActiveComponentContext";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const [fromLocationDetails, setFromLocationDetails] = useState({
        airlineCode: "VTZ",
        location: "VISAKHAPATNAM, AP"
    });
    const [toDestinationDetails, setToDestinationDetails] = useState({
        airlineCode: "BLR",
        location: "BENGULURU, KA"
    });
    const [fromLocation, setFromLocation] = useState("");
    const [toDestination, setToDestination] = useState("");
    const [locationBoxClicked, setLocationBoxClicked] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchMode, setSearchMode] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [formatedDate, setFormatedDate] = useState("");
    const [adults, setAdults] = useState(1);
    const token = localStorage.getItem('token');
        const { activeComponent, setActiveComponent } = useContext(ActiveComponentContext);

    const navigate = useNavigate();

    const handleDateChange = (e) => {
      setDepartureDate(e.target.value);
      const date = new Date(e.target.value);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
      }).format(date);
      setFormatedDate(formattedDate);
    };

    const swapLocations = () => {
        const from = fromLocationDetails;
        setFromLocationDetails(toDestinationDetails);
        setToDestinationDetails(from);
    }

    const fetchCities = (city) => {
        const delayDebounce = setTimeout(async () => {
            if (city.length < 2) return;
            try {
                setLoading(true);
                const response = await axios.get(`${SERVER_URL}/api/flight/citySearch`, {
                    params: { city }
                });
                setSearchResults(response.data?.results || []);
            } catch (err) {
                console.error("City search failed:", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    };

    const handleLocationSelect = (result) => {
        const locationDetails = {
            airlineCode: result.iataCode,
            location: `${result.address.cityName}, ${result.address.stateCode || result.address.countryName}`
        };

        if (searchMode === "FROM") {
            setFromLocationDetails(locationDetails);
            setFromLocation(result.address.cityName);
        } else if (searchMode === "TO") {
            setToDestinationDetails(locationDetails);
            setToDestination(result.address.cityName);
        }

        setLocationBoxClicked(false);
        setSearchResults([]);
    };

    const handleFlightsSearch = async(e) => {
        e.preventDefault();
        try {
            navigate(`/flights?from=${fromLocationDetails.airlineCode}&to=${toDestinationDetails.airlineCode}&date=${departureDate}&adults=${adults}&fromLocation=${fromLocationDetails.location}&toLocation=${toDestinationDetails.location}`);
        } catch (error) {
            console.error("Flights Search Failed: ", error);
        }
    }

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
    },[token]);

    return (
        <div className="w-full flex items-center justify-center">
            {locationBoxClicked ? (
                <div className="w-full p-5 lg:w-1/2">
                    <div className="space-y-2 w-full">
                        <div className="w-full border border-neutral-200 rounded-xl p-3 space-y-2 flex items-center justify-start gap-5">
                            <div onClick={() => setLocationBoxClicked(false)}>
                                <ArrowLeft />
                            </div>
                            <div className="w-full">
                                <h4 className="font-semibold">FROM</h4>
                                <input type="text"
                                    placeholder="Enter any City/Airport Name"
                                    className="w-full outline-none text-sm"
                                    value={fromLocation}
                                    onChange={(e) => { setFromLocation(e.target.value), fetchCities(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="w-full border border-neutral-200 rounded-xl p-3 space-y-2 flex items-center justify-start gap-5">
                            <div>
                                <img src={airplane} alt="destination" className="w-7 " />
                            </div>
                            <div className="w-full">
                                <h4 className="font-semibold">TO</h4>
                                <input type="text"
                                    placeholder="Enter Destination City/Airport Name"
                                    className="w-full outline-none text-sm"
                                    value={toDestination}
                                    onChange={(e) => { setToDestination(e.target.value), fetchCities(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>

                    {searchResults.length > 0 && searchResults.filter((result) => result.subType === "AIRPORT").map((result, index) => (
                        <div onClick={() => handleLocationSelect(result)} key={index} className="w-full grid grid-cols-[1fr_2fr_1fr] items-start justify-center space-y-4 mt-10 cursor-pointer">
                            <div>
                                <img src={airplane} alt="destination" className="w-7 " />
                            </div>
                            <div>
                                <h4 className="text-lg">{result.address.cityName}</h4>
                                <h5 className="text-sm">{result.name} AIRPORT</h5>
                            </div>
                            <div className="flex items-center justify-end">
                                <h4 className="font-semibold">{result.iataCode}</h4>
                            </div>
                        </div>
                    ))
                    }
                </div>
            ) : (
                <div className="w-full h-screen flex flex-col items-center justify-start">
                    <div className=" py-2 h-[50%] w-full bg-black/90 flex flex-col items-center justify-start gap-5">
                    <div className="w-full flex items-center justify-between px-5">
                        <img src={images.logo} alt="" className="w-40" />
                        <div className="flex items-center justify-center gap-10">
                            <div className="hidden md:block">
                            <ul className="flex items-center justify-center gap-10 text-white">
                                {nav_items.map((item) => (
                                    <li key={item.id} className="text-sm cursor-pointer" onClick={() => setActiveComponent(item.name)}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                            <UserCircle onClick={() => setActiveComponent("Profile")} size={40} className="text-white cursor-pointer" />
                        </div>
                    </div>
                        <div className="mt-10 text-center">
                            <h2 className="text-4xl font-semibold text-white">Let's Book Your</h2>
                            <h3 className="text-4xl font-semibold text-white mt-3">Next Flight</h3>
                        </div>
                    </div>
                    <div className="px-7 w-full h-[55%] lg:h-[30%] bg-neutral-100 lg:bg-white flex items-center justify-center">
                        <form onSubmit={handleFlightsSearch} className="relative lg:absolute bottom-[35%] lg:bottom-[15%] xl:bottom-[5%] bg-white w-full lg:w-100 lg:h-[52%] xl:h-[60%] 2xl:h-[60%] rounded-2xl border border-neutral-200 p-3 space-y-3">
                            <div className="flex items-center justify-center gap-3">
                                <div onClick={() => { setLocationBoxClicked(true), setSearchMode("FROM") }} className="w-full h-30 bg-white py-3 px-4 border border-neutral-200 rounded-xl space-y-2 overflow-hidden cursor-pointer">
                                    <h4 className="text-neutral-400">From</h4>
                                    <h3 className="text-2xl font-bold">{fromLocationDetails.airlineCode}</h3>
                                    <p className="text-xs">{fromLocationDetails.location}</p>
                                </div>
                                <div onClick={() => swapLocations()} className="absolute bg-white p-2 mr-2 rounded-full border border-neutral-200 cursor-pointer">
                                    <ArrowLeftRight size={23} className="text-sky-950" />
                                </div>
                                <div onClick={() => { setLocationBoxClicked(true), setSearchMode("TO") }} className="w-full h-30 bg-white py-3 px-5 border border-neutral-200 rounded-xl space-y-2 overflow-hidden">
                                    <h4 className="text-neutral-400">To</h4>
                                    <h3 className="text-2xl font-bold">{toDestinationDetails.airlineCode}</h3>
                                    <p className="text-xs">{toDestinationDetails.location}</p>
                                </div>
                            </div>
                            <div
                                className="w-full px-5 py-4 border border-neutral-200 rounded-xl space-y-4 relative"
                            >
                                <h4 className="text-neutral-400">Departure Date</h4>
                                <div
                                    onClick={() => document.getElementById("departure-date").showPicker()}
                                    className="flex items-center justify-start gap-4 cursor-pointer"
                                >
                                    <CalendarDays />
                                    <h5 className="font-medium">{formatedDate || "Select Departure Date"}</h5>
                                </div>
                                <input
                                    type="date"
                                    id="departure-date"
                                    required
                                    onChange={handleDateChange}
                                    className="absolute opacity-0 pointer-events-none"
                                />
                            </div>


                            <div className="flex items-center justify-center gap-3">
                                <div className="w-full bg-white p-3 border border-neutral-200 rounded-xl space-y-2 overflow-hidden">
                                    <h4 className="text-neutral-400">Passengers</h4>
                                    <div className="flex items-center justify-start gap-4 cursor-pointer">
                                        <select required onChange={(e) => setAdults(e.target.value)} className="w-full font-medium outline-none">
                                            <option value="" disabled>Select Option</option>
                                            <option value="1" className="">1 Adult</option>
                                            <option value="2" className="">2 Adults</option>
                                            <option value="3" className="">3 Adults</option>
                                            <option value="4" className="">4 Adults</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full bg-white p-3 border border-neutral-200 rounded-xl space-y-2 overflow-hidden">
                                    <h4 className="text-neutral-400">Class</h4>
                                    <div className="w-full flex items-center justify-start gap-4 cursor-pointer">
                                        <select className="w-full font-medium outline-none">
                                            <option value="" disabled>Select Option</option>
                                            <option value="Economy" className="">Economy</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 text-white">Search Flights</button>
                            </div>
                        </form>
                    </div>
                    <Navbar />
                </div>
            )}
        </div>
    )
}