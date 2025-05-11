import { Plane } from "lucide-react";

export default function TicketCard({ flightData }) {
    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-5 w-full lg:w-100">
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
                <div className="mt-2 flex items-start justify-between">
                    <div className="w-full">
                        <h4 className="text-2xl font-semibold">{flightData.from}</h4>
                        <span>{flightData?.departureDate?.split(',')[1]}</span>
                        <h5>{flightData?.departureDate?.split(',')[0]}</h5>
                    </div>
                    <div className="relative w-full h-[4px] flex items-center mt-3">
                        <div className="w-full border-t-2 border-dashed border-neutral-400"></div>

                        <div className="absolute left-1/2 -translate-x-1/2 bg-white px-1">
                            <Plane className="text-black rotate-45" size={22} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-end justify-center">
                        <h4 className="text-2xl font-semibold">{flightData.to}</h4>
                        <span>{flightData?.arrivalDate?.split(',')[1]}</span>
                        <h5>{flightData?.arrivalDate?.split(',')[0]}</h5>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center justify-center">
                    <h4 className="font-medium">Seats: {flightData.seats}</h4>
                </div>
                <div className="flex items-center justify-center">
                    <h4 className="font-medium">{flightData.adults} {flightData.adults == 1 ? "Adult" : "Adults"}</h4>
                </div>
                <div className="flex items-center justify-center">
                    <h4 className="font-semibold">₹{flightData.price}</h4>
                </div>
            </div>
        </div>
    )
}