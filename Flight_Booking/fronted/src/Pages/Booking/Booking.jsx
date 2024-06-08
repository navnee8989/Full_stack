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
    adults: 0,
    children: 0,
    infants: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   try {
    let data = JSON.stringify({
      "origin": "AMD",
      "destination": "DEL",
      "departure_date": "2024/06/12",
      "adult": "1",
      "child": "1",
      "infant": "1",
      "airline_code": "UK"
    });
    const response = await axios.post('/search',data,{
      headers:{
        'api-key': 'NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJqdGkiOiJlOTU2Mjc0OC1hYjQwLTQwNWUtYjQxMS1jY2NlODQxNTE4YzkiLCJ1c2VyTmFtZSI6Ijk1NTUyMDIyMDIiLCJhcGlrZXkiOiJOVE16TkRVd01EcEJTVkpKVVNCVVJWTlVJRUZRU1RveE9Ea3hPVE13TURNMU9UazJPbEZSWWpoTFZqTkZNVzlVVjA1UlkxTldMMFZ0Y205VVlYRktUU3M1ZGtadmFIbzBSek00V1dod1REaHNhbU5xUjNwUE4xZEpTSGhWUTJwQ1N6TlJjVzA9IiwiZXhwIjoxNzE3ODUxMjU4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU2MTczLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTYxNzMvIn0.X8ijqeT_uQEJdcMiM-HRcNZIYqKa0T9OXDVRrFsuuQU', 
        'Content-Type': 'application/json',
      }
    })
    if (!response.data) {
      console.log("error while fatching");
    }else{
      console.log(response.data);
    }
   } catch (error) {
    
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
