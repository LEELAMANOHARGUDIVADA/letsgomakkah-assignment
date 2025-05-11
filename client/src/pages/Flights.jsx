import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plane } from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Flights() {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');
    const to = queryParams.get('to');
    const date = queryParams.get('date');
    const adults = queryParams.get('adults');
    const fromLocation = queryParams.get('fromLocation');
    const toLocation = queryParams.get('toLocation');
    const navigate = useNavigate();

    const searchFlights = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/flight/searchFlights`, {
                params: {
                    originLocationCode: from,
                    destinationLocationCode: to,
                    adults: adults,
                    departureDate: date
                }
            });
            console.log(response.data);
            setSearchResults(response.data.results);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (rawDate) => {
        const formattedDate = new Date(rawDate).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return formattedDate;
    }

    const handleCheckout = (price, duration, departureDate, arrivalDate) => {
        navigate(`/checkout?from=${from}&to=${to}&adults=${adults}&price=${price}&date=${date}&departureDate=${departureDate}&arrivalDate=${arrivalDate}&duration=${duration}&fromLocation=${fromLocation}&toLocation=${toLocation}`)
    }

    useEffect(() => {
        searchFlights();
    }, []);
    return (
        <div>
            {loading ? (
                <div className="w-full h-screen bg-neutral-100 py-5">
                    <div className="w-full space-y-2 flex items-center justify-start gap-5 px-5">
                        <Link to={'/'}>
                            <ArrowLeft />
                        </Link>
                        <div className="w-full">
                            <h4 className="font-semibold">{fromLocation.split(',')[0]} to {toLocation.split(',')[0]}</h4>
                            <ul className="flex items-center justify-start gap-2">
                                <li className="text-xs text-neutral-400">One way</li>
                                <li className="text-xs text-neutral-400 before:content-['•']">{adults} Adults</li>
                                <li className="text-xs text-neutral-400 before:content-['•']">Economy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5 w-full flex items-center justify-center">
                        <img src="https://cdn.dribbble.com/userupload/26187051/file/original-d89e089fb9d6cae8cb9fc79e27e0c7c7.gif" alt="" className="lg:w-1/2" />
                    </div>
                </div>
            ) : (
                <div className="w-full p-5 bg-neutral-50">
                    <div className="w-full p-3 space-y-2 flex items-center justify-start gap-5">
                        <Link to={'/'}>
                            <ArrowLeft />
                        </Link>
                        <div className="w-full">
                            <h4 className="font-semibold">{fromLocation.split(',')[0]} to {toLocation.split(',')[0]}</h4>
                            <ul className="flex items-center justify-start gap-2">
                                <li className="text-xs text-neutral-400">One way</li>
                                <li className="text-xs text-neutral-400 before:content-['•']">{adults} Adults</li>
                                <li className="text-xs text-neutral-400 before:content-['•']">Economy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-5 mt-5">
                        {searchResults.length > 0 && searchResults.map((flight) => {
                            const arrivalDate = formatDate(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1]?.arrival.at);
                            const departureDate = formatDate(flight.itineraries[0].segments[0]?.departure.at);
                            
                            return (
                                <div key={flight.id} className="w-full md:w-100">
                                    <div className="bg-white w-full py-5 rounded-xl border border-neutral-200">
                                        <div className="w-full flex items-center justify-between px-5">
                                            <div className="flex items-center justify-center gap-5">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRWdMJRkVX3xT4FCenWUNKX0CQjwCZYyO-w&s" alt="" className="w-14" />
                                                <h4 className="font-bold text-lg">Air India</h4>
                                            </div>
                                            <span className="text-neutral-400">#AI{flight.itineraries[0].segments[0].aircraft.code}</span>
                                        </div>
                                        <div className="border-t mt-3 border-gray-200 px-5">
                                            <div className="mt-3">

                                                <div className="flex items-center justify-between gap-5 relative">
                                                    <h4 className="font-bold text-xl">{flight.itineraries[0].segments[0]?.departure.iataCode}</h4>

                                                    <div className="relative w-full h-[4px] flex items-center">
                                                        <div className="w-full border-t-2 border-dashed border-neutral-400"></div>

                                                        <div className="absolute left-1/2 -translate-x-1/2 bg-white px-1">
                                                            <Plane className="text-sky-900 rotate-45" size={22} />
                                                        </div>
                                                    </div>

                                                    <h4 className="font-bold text-xl">{flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1]?.arrival.iataCode}</h4>
                                                </div>
                                                <div className="flex items-center justify-between gap-5 relative">
                                                    <div className="mt-2">
                                                        <h4 className="font-semibold text-sm">{fromLocation}</h4>
                                                        <h5 className="text-xs font-medium text-gray-500">{departureDate}</h5>
                                                    </div>
                                                    <div className="mt-2 flex flex-col items-end justify-center">
                                                        <h4 className="font-semibold text-sm">{toLocation}</h4>
                                                        <h5 className="text-xs font-medium text-gray-500">{arrivalDate}</h5>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl py-3 px-5 border-x border-b border-neutral-200">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">₹{flight.price.total}</h4>
                                            <div>
                                                <button onClick={() => handleCheckout(flight.price.total, flight.itineraries[0].duration, departureDate, arrivalDate)} className="bg-gradient-to-r from-blue-300 to-blue-600 px-5 py-1.5 rounded-lg text-white text-sm">Book Ticket</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}