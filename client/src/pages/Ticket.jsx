import { ArrowLeft, Check, Download, Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

export default function Ticket() {
    const location = useLocation();
    const [flightData, setFlightData] = useState({});
    const ticketRef = useRef();

    const handleTicketDownload = async() => {
            const node = ticketRef.current;

    try {
      const dataUrl = await domtoimage.toPng(node);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [node.offsetWidth, node.offsetHeight],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0);
      pdf.save('ticket.pdf');
    } catch (error) {
      console.error('PDF Download Failed:', error);
    }
    }

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
            selectedSeats: queryParams.get('selectedSeats')
        });
    }, [location.search]);
    return (
        <div className="w-full">
            <div className="w-full h-40 bg-white fixed top-0 p-5 shadow-sm z-10">
                <div className="space-y-2 flex flex-col items-start gap-3">
                    <h4 className="font-semibold text-lg mt-5">Book Ticket</h4>
                    <div className="w-full flex items-center justify-between">
                        {['Ticket', 'Select Seat', 'Payment'].map((label, idx) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-full bg-blue-500`}>
                                    <Check size={15} className="text-white" />
                                </div>
                                <h4>{label}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-5 mt-40 w-full flex items-center justify-center">
                <div ref={ticketRef} className="w-full bg-neutral-100 p-5 rounded-xl">
                    <div className="max-w-sm mx-auto bg-white rounded-3xl p-6 relative shadow-md border border-gray-200">
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-100 rounded-full z-10"></div>
                        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-100 rounded-full z-10"></div>

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
                        <div className="flex justify-between gap-3 text-center my-6">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">{flightData?.departureDate}</p>
                                <h3 className="text-2xl font-bold">{flightData?.from}</h3>
                                <p className="text-gray-500">Terminal 1</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="h-[2px] w-12 bg-gray-300 mr-2"></div>
                                <Plane size={22} className="rotate-45" />
                                <div className="h-[2px] w-12 bg-gray-300 ml-2"></div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">{flightData?.arrivalDate}</p>
                                <h3 className="text-2xl font-bold">{flightData?.to}</h3>
                                <p className="text-gray-500">Terminal 5</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center justify-center text-gray-600 gap-3 px-3">
                            <div>
                                <p className="text-gray-400">Passenger</p>
                                <p>{flightData?.adults} Adults</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Gate</p>
                                <p>05</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Airline</p>
                                <p>Air India</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Baggage</p>
                                <p>7.5Kg</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Class</p>
                                <p>Economy</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Seat</p>
                                <p>{flightData?.selectedSeats}</p>
                            </div>
                        </div>

                        <div className=" pt-4 flex items-center justify-center">
                            <img src="https://static.vecteezy.com/system/resources/previews/022/722/101/non_2x/barcode-qr-code-transparent-free-free-png.png" alt="" className="w-full h-16 object-cover object-center" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center p-5">
                <button onClick={handleTicketDownload} className="flex items-center justify-center gap-3 w-full lg:w-100 outline-none bg-blue-500 text-white py-2.5 rounded-lg cursor-pointer">
                    <Download />
                    <h5>Download Ticket</h5>
                </button>
                <Link to={'/'}>
                    <button className="mt-2 underline">
                        Return Home
                    </button>
                </Link>
            </div>
        </div>
    )
}