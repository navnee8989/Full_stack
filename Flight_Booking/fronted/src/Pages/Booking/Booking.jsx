import { useEffect, useState } from "react";
import "./Booking.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Booking = () => {
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete",
        {
          params: {
            query: "eiffel tower",
            lang: "en_US",
            units: "km",
          },
          headers: {
            "X-RapidAPI-Key": "e23c6309bamsha388f1a2811bf9fp154e3bjsn46aa6d93efb1",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = {
      origin: formData.origin,
      destination: formData.destination,
      departure_date: formData.departure_date,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      airline_code: "UK",
    };

    const headers = {};

    try {
      const response = await axios.post("/search", data, { headers });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };

  return (
    <div className="booking">
      <div className="container">
        <div className="tabs">
          <button className="one">One Way</button>
          <button className="two">Round Trip</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>From</p>
              <select
                className="outline-none px-2 py-2 w-full"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                required
              >
                <option value="" hidden>
                  ORIGIN
                </option>
                <option value="AMD">AMD</option>
                <option value="DEL">DEL</option>
                <option value="LEI">LEI</option>
                <option value="AOO">AOO</option>
              </select>
            </div>

            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>To</p>
              <select
                className="outline-none px-2 py-2 w-full"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
              >
                <option value="" hidden>
                  DESTINATION
                </option>
                <option value="AMD">AMD</option>
                <option value="DEL">DEL</option>
                <option value="LEI">LEI</option>
                <option value="AOO">AOO</option>
              </select>
            </div>

            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>Travel Date</p>
              <input
                type="date"
                className="outline-none px-2 py-2 w-full date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>PAX SIZE</p>
              <div className="pax-dropdown">
                <button type="button" className="outline-none px-2 py-2 w-full">
                  PAX SIZE
                </button>
                <div className="pax-dropdown-content">
                  <div className="py-1.5">
                    <p>Adults</p>
                    <input
                      type="number"
                      className="outline-none px-2 py-2 w-full"
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      min={1}
                      max={5}
                      required
                    />
                  </div>
                  <div className="py-1.5">
                    <p>Children</p>
                    <input
                      type="number"
                      className="outline-none px-2 py-2 w-full"
                      name="children"
                      value={formData.children}
                      onChange={handleInputChange}
                      min={0}
                      max={5}
                      required
                    />
                  </div>
                  <div className="py-1.5">
                    <p>Infants</p>
                    <input
                      type="number"
                      className="outline-none px-2 py-2 w-full"
                      name="infants"
                      value={formData.infants}
                      onChange={handleInputChange}
                      min={0}
                      max={5}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="btn_div">
              <button className="bg-indigo-500 text-white" type="submit">
                <span className="text-sm">
                  Search <FaSearch />
                </span>
              </button>
            </div>
          </div>
        </form>
        <hr />
        <div className="page_move">
          <button className="prev">
            <div className="lefticon">
              <MdKeyboardDoubleArrowLeft />
            </div>
            <strong>PREV DAY</strong>
          </button>
          <button className="next">
            <strong>NEXT DAY</strong>
            <div className="righticon">
              <MdKeyboardDoubleArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
