import { ArrowLeft, Check, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

const SERVER_URL = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function Payment({ flightData, setPaymentButtonClicked, selectedSeats }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [walletBalance, setWalletBalance] = useState();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getWalletBalance = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/v1/payment/getWalletBalance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setWalletBalance(response.data.walletBalance);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRazorpayPayment = async (e, amount) => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/v1/payment/createOrder`, {
                amount: amount
            });
            const order = response.data.order;

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: amount,
                currency: "INR",
                name: "Makemytrip",
                description: "Flight Ticket",
                order_id: order.id,
                handler: async function (response) {
                    console.log(response);
                    try {
                        const ticket = await axios.post(`${SERVER_URL}/api/ticket/generateTicket`, {
                            from: flightData.from,
                            to: flightData.to,
                            adults: flightData.adults,
                            price: flightData.price,
                            seats: selectedSeats.join(', '),
                            departureDate: flightData.departureDate,
                            arrivalDate: flightData.arrivalDate,
                            payment_id: response.razorpay_payment_id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const ticketData = ticket.data.ticket;
                        navigate(`/ticket?status=success&from=${ticketData.from}&to=${ticketData.to}&adults=${ticketData.adults}&departureDate=${ticketData.departureDate}&arrivalDate=${ticketData.arrivalDate}&selectedSeats=${ticketData.selectedSeats}`);
                    } catch (error) {
                        console.error(error);
                    }
                },
                callback_url: 'http://localhost:5173/'

            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            e.preventDefault();
        } catch (error) {
            console.error(error);
        }
    }

    const handleWalletPayment = async (e, amount) => {
        e.preventDefault();
        try {
            if (walletBalance < amount) {
                alert('Insufficient Wallet Balance!');
                return;
            }
            const deductWallet = await axios.post(`${SERVER_URL}/api/v1/payment/deductWalletBalance`, {
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const ticket = await axios.post(`${SERVER_URL}/api/ticket/generateTicket`, {
                from: flightData.from,
                to: flightData.to,
                adults: flightData.adults,
                price: flightData.price,
                seats: selectedSeats.join(', '),
                departureDate: flightData.departureDate,
                arrivalDate: flightData.arrivalDate,
                payment_id: `WALLET-${Date.now()}`
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(ticket.data);
            const ticketData = ticket.data.ticket;
            navigate(`/ticket?status=success&from=${ticketData.from}&to=${ticketData.to}&adults=${ticketData.adults}&departureDate=${ticketData.departureDate}&arrivalDate=${ticketData.arrivalDate}&selectedSeats=${ticketData.selectedSeats}`);
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        getWalletBalance();
    }, [])

    return (
        <div className="w-full">
            <div className="w-full h-40 bg-white fixed top-0 p-5 shadow-sm z-10">
                <div className="space-y-2 flex flex-col items-start gap-3">
                    <div onClick={() => setPaymentButtonClicked(false)}>
                        <ArrowLeft />
                    </div>
                    <h4 className="font-semibold text-lg">Book Ticket</h4>
                    <div className="w-full flex items-center justify-between">
                        {['Ticket', 'Select Seat', 'Payment'].map((label, idx) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-full ${idx === 0 || idx === 1 ? 'bg-blue-500' : 'bg-neutral-300'}`}>
                                    <Check size={15} className="text-white" />
                                </div>
                                <h4>{label}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white mt-40 p-5 lg:flex flex-col items-center justify-center">
                <div className="bg-white border lg:w-100 border-neutral-200 rounded-3xl p-5">
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
                <div className="mt-5">
                    <div className="mt-5">
                        <h3 className="font-semibold text-lg">Select Payment Method</h3>
                        <div className="mt-5 space-y-5">
                            <div onClick={() => setSelectedPaymentMethod("Wallet")} className={`bg-white py-3.5 px-5 rounded-lg border ${selectedPaymentMethod === "Wallet" ? "border-black border-2" : "border-neutral-200"} cursor-pointer flex items-center justify-center gap-3`}>
                                <Wallet />
                                <h4 className="font-medium">Wallet Balance: ₹{walletBalance}</h4>
                            </div>
                            <div onClick={() => setSelectedPaymentMethod("Stripe")} className={`bg-white py-2.5 px-5 rounded-lg border ${selectedPaymentMethod === "Stripe" ? "border-black border-2" : "border-neutral-200"} cursor-pointer flex items-center justify-center gap-3`}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOXVBxLnhqCbh9icORWnu4ZW0QjBam341bxg&s" alt="" className="w-32" />
                                <h4 className="font-medium"></h4>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        {/* <h4 className="text-lg font-medium">Grand Total Price: ₹{flightData.price}</h4> */}
                    </div>
                </div>
            </div>
            {selectedPaymentMethod && <div className="bg-white fixed bottom-0 p-5 w-full flex items-center justify-between border-t border-neutral-200">
                <div>
                    <h4 className="text-lg font-semibold">₹{flightData?.price}</h4>
                </div>
                {selectedPaymentMethod === "Stripe" ? (
                    <button onClick={(e) => handleRazorpayPayment(e, flightData.price)} className="bg-blue-600 px-5 py-3 rounded-lg text-sm text-white cursor-pointer flex items-center justify-center gap-2">
                        <h5 className="font-medium">Pay with Razorpay</h5>
                        <span>
                            <img src="https://cdn.prod.website-files.com/62979cdcff90ad6bae40b3ef/62d855876f4add6e152a5567_unnamed.png" alt="" className="w-8" />
                        </span>
                    </button>
                ) : (
                    <button onClick={(e) => handleWalletPayment(e, flightData.price)} className="bg-gradient-to-r from-blue-300 to-blue-500 px-10 py-3 rounded-lg text-white cursor-pointer">
                        Pay with Wallet
                    </button>
                )}
            </div>}

        </div>
    );
}
