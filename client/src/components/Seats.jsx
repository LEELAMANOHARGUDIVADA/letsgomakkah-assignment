import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cols = [1, 2, 3, 4];

const unavailableSeats = ['A4','B2', 'C1', 'D4','E3',  'F3', 'G4', 'H1'];

const seatStatus = [
    { color: 'bg-white border-neutral-200', label: 'Available' },
    { color: 'bg-neutral-300 border-neutral-200', label: 'Unavailable' },
    { color: 'bg-black border-neutral-400 text-white', label: 'Selected' },
];

export default function Seats({ flightData, selectedSeats, setSelectedSeats, setTicketSelected, setPaymentButtonClicked }) {
    
    const toggleSeat = (seatId) => {
        if (unavailableSeats.includes(seatId)) return;
        if(selectedSeats.length == flightData.adults && !selectedSeats.includes(seatId)){
            alert("Max No of Seats Selected");
            return;
        }

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : [...prev, seatId]
        );
    };

    const getSeatStyle = (seatId) => {
        if (unavailableSeats.includes(seatId)) {
            return 'bg-neutral-300 border-neutral-200 cursor-not-allowed';
        } else if (selectedSeats.includes(seatId)) {
            return 'bg-black border-neutral-400 text-white';
        } else {
            return 'bg-white border-neutral-400 hover:bg-blue-100';
        }
    };

    const handlePayment = () => {
        if(selectedSeats.length < flightData.adults){
            alert(`Select ${flightData.adults} Seats `);
            return;
        }
        setPaymentButtonClicked(true);
    }

    return (
        <div className="w-full">
            <div className="w-full h-40 bg-white fixed top-0 p-5 shadow-sm z-10">
                <div className="space-y-2 flex flex-col items-start gap-3">
                    <div onClick={() => setTicketSelected(false)}>
                        <ArrowLeft />
                    </div>
                    <h4 className="font-semibold text-lg">Book Ticket</h4>
                    <div className="w-full flex items-center justify-between">
                        {['Ticket', 'Select Seat', 'Payment'].map((label, idx) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-neutral-300'}`}>
                                    <Check size={15} className="text-white" />
                                </div>
                                <h4>{label}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-neutral-50 mt-40 h-screen p-5 mb-20 lg:flex items-center justify-center">
                <div className="w-full lg:w-100 bg-white rounded-xl py-5 mt-5 lg:mt-10">
                    <div className="border-b border-neutral-200 px-5">
                        <h4 className="font-medium mb-3">Economy</h4>
                    </div>

                    <div className="mt-5 mb-5">
                        <div className="flex items-center justify-around">
                            {seatStatus.map(({ color, label }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className={`w-7 h-7 border rounded-lg ${color}`} />
                                    <h5 className="text-sm">{label}</h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 px-5 mt-7">
                        {rows.map(row =>
                            cols.map(col => {
                                const seatId = `${row}${col}`;
                                return (
                                    <div
                                        key={seatId}
                                        onClick={() => toggleSeat(seatId)}
                                        className={`w-14 h-14 text-sm font-medium flex items-center justify-center border rounded-2xl ${getSeatStyle(seatId)}`}
                                    >
                                        {seatId}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {selectedSeats.length > 0 && <div className="fixed bottom-0 bg-white h-40 w-full border-t border-neutral-200 p-5">
                <div className="w-full flex items-center justify-around">
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-neutral-400">Seats</h4>
                        <h5 className="font-medium">{selectedSeats.join(', ') || 'None'}</h5>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-neutral-400">Passengers</h4>
                        <h5 className="font-medium">{flightData.adults} Adults</h5>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-neutral-400">Class</h4>
                        <h5 className="font-medium">Economy</h5>
                    </div>
                </div>
                <div className="mt-5">
                    <button onClick={handlePayment} className="w-full bg-gradient-to-r from-blue-300 to-blue-500 px-10 py-3 rounded-lg text-white cursor-pointer">
                        Go to Payment
                    </button>
                </div>
            </div>}
        </div>
    );
}
