import { useState } from "react";
import "./Booking.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Booking = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    adult: "",
    child: "",
    infant: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      origin: formData.origin,
      destination: formData.destination,
      departure_date: formData.departure_date,
      adult: formData.adult,
      child: formData.child,
      infant: formData.infant,
      airline_code: "UK",
    };


    //Add Headers Into This 
    const headers = {};

    try {
      //I Use React Proxy to API URL Check the package.Json file In the Last
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
          <button className="one">oneway</button>
          <button className="two">round trip</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>From</p>
              <div className="flex flex-row">
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
                  <option>AMD</option>
                  <option>DEL</option>
                  <option>LEI</option>
                  <option>AOO</option>
                </select>
              </div>
            </div>

            <div className="py-1.5 px-2.5 flex-1 border-r-2">
              <p>To</p>
              <div className="flex flex-row">
                <select
                  className="outline-none px-2 py-2 w-full"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Destination
                  </option>
                  <option>AMD</option>
                  <option>DEL</option>
                  <option>LEI</option>
                  <option>AOO</option>
                </select>
              </div>
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
              <div className="flex flex-row select_r">
                <select
                  className="outline-none px-2 py-2 w-full "
                  name="adult"
                  value={formData.adult}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Adult
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <select
                  className="outline-none px-2 py-2 w-full padding"
                  name="child"
                  value={formData.child}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Child
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <select
                  className="outline-none px-2 py-2 w-full padding"
                  name="infant"
                  value={formData.infant}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Infant
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>

            <div className="btn_div">
              <button className=" bg-indigo-500 text-white " type="submit">
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
