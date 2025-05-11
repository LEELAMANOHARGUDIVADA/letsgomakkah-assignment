import { ArrowLeft, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import Seats from "../components/Seats";
import Payment from "../components/Payment";

export default function Checkout() {
    const location = useLocation();
    const [flightData, setFlightData] = useState({});
    const [ticketSelected, setTicketSelected] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentButtonClicked, setPaymentButtonClicked] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setFlightData({
            from: queryParams.get('from'),
            to: queryParams.get('to'),
            adults: queryParams.get('adults'),
            fromLocation: queryParams.get('fromLocation'),
            toLocation: queryParams.get('toLocation'),
            duration: queryParams.get('duration'),
            date: queryParams.get('date'),
            departureDate: queryParams.get('departureDate'),
            arrivalDate: queryParams.get('arrivalDate'),
            price: queryParams.get('price'),
        });
    }, [location.search]);

    return (
        <div>
            {paymentButtonClicked ? (
                <Payment
                    flightData={flightData}
                    setPaymentButtonClicked={setPaymentButtonClicked}
                    selectedSeats={selectedSeats}
                />
            ) : ticketSelected ? (
                <Seats
                    flightData={flightData}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    paymentButtonClicked={paymentButtonClicked}
                    setPaymentButtonClicked={setPaymentButtonClicked}
                    setTicketSelected={setTicketSelected}
                />
            ) : (
                (
                    <div className="w-full">
                        <div className="bg-gradient-to-r from-blue-200/75 to-blue-50 w-full py-5 rounded-b-4xl">
                            <div className="w-full p-3 space-y-2 flex items-start justify-center gap-5">
                                <Link to={'/'}>
                                    <ArrowLeft />
                                </Link>
                                <div className="w-full flex flex-col items-center justify-center">
                                    <h4 className="font-semibold">{flightData?.fromLocation?.split(',')[0]} to {flightData.toLocation?.split(',')[0]}</h4>
                                    <ul className="flex items-center justify-start gap-2">
                                        <li className="text-xs text-neutral-400">One way</li>
                                        <li className="text-xs text-neutral-400 before:content-['•']">{flightData.adults} Adults</li>
                                        <li className="text-xs text-neutral-400 before:content-['•']">Economy</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="px-5 mt-5 lg:flex items-center justify-center">
                                <div className="bg-white rounded-3xl p-5 lg:w-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRWdMJRkVX3xT4FCenWUNKX0CQjwCZYyO-w&s" alt="" className="w-14" />
                                            <div>
                                                <h4 className="font-semibold">Air India</h4>
                                                <p className="text-sm mt-1 font-semibold text-neutral-500">A17M8</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-neutral-500 text-sm">Economy</h4>
                                        </div>
                                    </div>
                                    <div className="border-t-2 border-dashed border-neutral-200 ">
                                        <div className="mt-2 flex items-center justify-between gap-5">
                                            <div className="">
                                                <h4 className="text-lg font-semibold">{flightData.from} <span>{flightData?.departureDate?.split(',')[1]}</span></h4>
                                                <h5>{flightData?.departureDate?.split(',')[0]}</h5>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="border-b">{flightData?.duration?.split('PT')[1]}</p>
                                                <span className="text-xs">Non-Stop</span>
                                            </div>
                                            <div className="flex flex-col items-end justify-center">
                                                <h4 className="text-lg font-semibold">{flightData.to} <span>{flightData?.arrivalDate?.split(',')[1]}</span></h4>
                                                <h5>{flightData?.arrivalDate?.split(',')[0]}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={() => setTicketSelected(true)} className="mt-5 w-full lg:flex flex-col items-center justify-center">
                            <h4 className="font-medium px-5">Passenger Details</h4>
                            <div className="px-5 w-full lg:w-100">
                                {flightData.adults && <div className="space-y-5 mt-4 w-full">
                                    {[...Array(Number(flightData?.adults)).keys()].map((i) => (
                                        <div key={i} className="flex flex-col w-full">
                                            <label className="text-sm text-gray-500 mb-1">Passenger {i + 1} Name</label>
                                            <input
                                                type="text"
                                                name={`passenger_${i}`}
                                                placeholder="Enter full name"
                                                required
                                                className="px-4 py-3 w-full border border-neutral-400 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                    ))}
                                </div>}
                            </div>

                        <div className="bg-white fixed bottom-0 p-5 w-full flex items-center justify-between border-t border-neutral-200">
                            <div>
                                <h4 className="text-black text-lg font-semibold">₹{flightData.price}</h4>
                            </div>
                            <button type="submit" className="bg-gradient-to-r from-blue-300 to-blue-500 px-10 py-3 rounded-lg text-white cursor-pointer">
                                CONTINUE
                            </button>
                        </div>
                        </form>
                    </div>
                )
            )}
        </div>
    )
}