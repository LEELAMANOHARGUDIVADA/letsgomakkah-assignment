import axios from "axios";
import getAccessToken from "../utils/amadeus.config.js";

const citySearch = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
          throw new Error('Invalid City');
        }

        const token = await getAccessToken();
        if (!token) return;

        const response = await axios.get(
            "https://test.api.amadeus.com/v1/reference-data/locations",
            {
              params: {
                subType: "CITY,AIRPORT",
                keyword: city,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if(!response.data.data){
          return res.status(404).json({ success: false, message: "No Airports or Cities Found" });
        }

        return res.status(200).json({ success: true, results: response.data.data });

    } catch (error) {
        console.error("Error:", error?.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const searchFlights = async(req,res) => {
  try {
    const { originLocationCode, destinationLocationCode, departureDate, adults } = req.query;

    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      throw new Error('All Fields Are Required!');
    }

    const token = await getAccessToken();
    if (!token) return;

    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      params: {
        originLocationCode: originLocationCode,
        destinationLocationCode: destinationLocationCode,
        departureDate: departureDate,
        adults: adults,
        currencyCode: 'INR',
        max: 5
      }, 
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(!response.data.data){
      return res.status(404).json({ success: false, message: "No Airports or Cities Found" });
    }

    return res.status(200).json({ success: true, results: response.data.data });

  } catch (error) {
    console.error("Error:", error?.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export { citySearch, searchFlights };