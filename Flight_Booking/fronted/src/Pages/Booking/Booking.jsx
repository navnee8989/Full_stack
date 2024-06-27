import React, { useEffect, useState } from "react";
import "./Booking.css";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import axios from "axios";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Slide, toast, Bounce, Flip } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setadultCountData,
  setallData,
  setallFlightData,
  setchildCountData,
  setinfantCountData,
} from "../../redux/features/flightSlice";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays, format } from "date-fns";
import Navbar from "../../component/Navbar";

const Booking = () => {
  const [paxDropdownOpen, setPaxDropdownOpen] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showTickets, setShowTickets] = useState([]);
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [noTicket, setnoTickets] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const [formData, setFormData] = useState({
    origin: "",
    originName: "",
    destination: "",
    destinationName: "",
    departure_date: new Date(),
    adults: 1,
    children: 0,
    infants: 0,
    airline_code: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.flight.allData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === "originName") {
      const uniqueOrigins = new Set(
        sectors
          .filter((sector) =>
            sector.origin.toLowerCase().startsWith(value.toLowerCase())
          )
          .map((sector) => sector.origin)
      );
      setOriginSuggestions(Array.from(uniqueOrigins).sort());
    } else if (name === "destinationName") {
      const uniqueDestinations = new Set(
        sectors
          .filter((sector) =>
            sector.destination.toLowerCase().startsWith(value.toLowerCase())
          )
          .map((sector) => sector.destination)
      );
      setDestinationSuggestions(Array.from(uniqueDestinations).sort());
    }
    setFormData(updatedFormData);
  };

  const handleOrigin = (suggestion) => {
    for (const sectorObj of allData) {
      const sectorParts = sectorObj.Sector.split(" // ").map((part) =>
        part.trim()
      );
      if (sectorParts[0].toLowerCase().startsWith(suggestion.toLowerCase())) {
        setFormData({
          ...formData,
          origin: sectorObj.Origin,
          originName: suggestion,
        });
      }
    }
  };

  const handleDestination = (dstsuggestion) => {
    for (const sectorObj of allData) {
      const sectorParts = sectorObj.Sector.split(" // ").map((part) =>
        part.trim()
      );
      if (
        sectorParts[1].toLowerCase().startsWith(dstsuggestion.toLowerCase())
      ) {
        setFormData({
          ...formData,
          destination: sectorObj.Destination,
          destinationName: dstsuggestion,
        });
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const getSectors = async () => {
        try {
          const response = await axios.get("/api/sectors", {
            headers: {
              "api-key":
                "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
              Authorization: `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          if (response.data && response.data.data) {
            dispatch(setallData(response.data.data));
            const SectorData = response.data.data.map((element, index) => {
              const sector = element.Sector;
              return {
                origin: sector.split(" ")[0],
                destination: sector.split(" ")[2],
                id: index,
              };
            });
            setSectors(SectorData);
            // toast.success("Data Are Stored in GetFlightData Usestate");
          } else {
            console.error("Error Getting Data");
            toast.error("Error While Getting Data in Flight Sectors");
          }
        } catch (error) {
          console.error("Error while getting data", error);
          toast.error("Error While Fetching Data");
        }
      };

      getSectors();
    }
  }, []);

  useEffect(() => {
    if (formData.origin && formData.destination) {
      fetchAvailability();
    }
  }, [formData.origin, formData.destination]);

  const fetchAvailability = async () => {
    try {
      const { origin, destination } = formData;
      const data = JSON.stringify({
        origin: origin,
        destination: destination,
      });

      const response = await axios.post("/api/availability", data, {
        headers: {
          "api-key":
            "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.data.data) {
        toast.error("No tickets available for this route", {
          position: "top-center",
          transition: Bounce,
        });
        setAvailabilityDates([]);
        setDisabledDates([]);
      } else {
        setnoTickets(true);
        const dates = response.data.data;

        // Format dates to YYYY/MM/DD
        const formattedDates = dates.map((date) =>
          format(new Date(date), "yyyy/MM/dd")
        );

        setAvailabilityDates(formattedDates);

        // Calculate disabled dates
        const allDates = formattedDates.map((date) => new Date(date));
        const validDates = allDates.filter((date) => !isNaN(date.getTime())); // Filter out invalid dates
        const formattedDisabledDates = validDates.filter(
          (date) => !formattedDates.includes(format(date, "yyyy/MM/dd"))
        );
        setDisabledDates(formattedDisabledDates);
      }
    } catch (error) {
      console.error("Error while fetching availability data", error);
      toast.error("Error while fetching availability data");
      setAvailabilityDates([]);
      setDisabledDates([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setadultCountData(formData.adults));
    dispatch(setchildCountData(formData.children));
    dispatch(setinfantCountData(formData.infants));
    let data = JSON.stringify({
      origin: formData.origin,
      destination: formData.destination,
      departure_date: format(formData.departure_date, "yyyy/MM/dd"),
      adult: formData.adults,
      child: formData.children,
      infant: formData.infants,
      airline_code: formData.airline_code,
    });
    // console.log(formData);
    if (noTicket === false) {
      toast.info(
        `Thare is NO Routes Find in Your Location ${formData.origin} TO  ${formData.destination}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        }
      );
    } else {
      try {
        const response = await axios.post("/api/search", data, {
          headers: {
            "api-key":
              "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data && response.data.data) {
          console.log(response.data.data);
          setShowTickets(response.data.data);
          toast.success(
            `Found ${response.data.data.length} results for your flight search`,
            {
              position: "top-center",
            }
          );
        } else {
          setShowTickets([]);
          toast.error("No tickets found for the selected criteria");
        }
      } catch (error) {
        console.error("Error while searching for tickets", error);
        toast.error("Error while searching for tickets");
      }
    }
  };

  const handleBooking = (index) => {
    return () => {
      const ticket = showTickets[index];
      if (ticket) {
        navigate(`/availability/${ticket.ticket_id}`, { state: { ticket } });
      } else {
        console.error("Ticket not found for index:", index);
      }
    };
  };

  const CustomDatePicker = ({ selectedDate, handleChange, disabledDates }) => {
    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
        maxDate={disabledDates.length > 0 ? disabledDates[0] : undefined}
        filterDate={(date) =>
          !disabledDates.some((disabledDate) =>
            date.toISOString().includes(disabledDate)
          )
        }
        placeholderText="Select a date"
      />
    );
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      departure_date: date,
    });
  };

  return (
    <>
      <Navbar />
      <div className="booking">
        <div className="container">
          <div className="tabs">
            <button className="one">One Way</button>
            <button className="two">Round Trip</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex md:flex-row">
              <div className="py-1.5 px-2.5 flex border-r-2 justify-center  item-start gap-2">
                <div className="input-group mb-3  ">
                  <div className="input">
                    <h1 className="text-center ">Origin</h1>
                    <input
                      type="text"
                      className="form-control w-full"
                      placeholder="Enter Origin"
                      name="originName"
                      value={formData.originName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="showBar">
                    {originSuggestions.length > 0 && (
                      <ul className="dropdown-menu show origin-dropdown">
                        {originSuggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  origin: suggestion,
                                });
                                setOriginSuggestions([]);
                                handleOrigin(suggestion);
                              }}
                            >
                              {suggestion}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="input-group mb-3">
                  <div className="input">
                    <h1 className="text-center ">Destination</h1>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Destination"
                      name="destinationName"
                      value={formData.destinationName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="showBar">
                    {destinationSuggestions.length > 0 && (
                      <ul className="dropdown-menu show origin-dropdown">
                        {destinationSuggestions.map((dstsuggestion, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  destination: dstsuggestion,
                                });
                                setDestinationSuggestions([]);
                                handleDestination(dstsuggestion);
                              }}
                            >
                              {dstsuggestion}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-1.5 px-2.5 flex-1 border-r-2">
                <p>Travel Date</p>
                <CustomDatePicker
                  selectedDate={formData.departure_date}
                  handleChange={handleDateChange}
                  disabledDates={disabledDates}
                />
                {disabledDates.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    Unavailable for selected route
                  </p>
                )}
              </div>

              <div className="py-1.5 px-2.5 flex-1 border-r-2">
                <p>PAX SIZE</p>
                <div className="pax-dropdown">
                  <button
                    type="button"
                    className="outline-none w-full"
                    onClick={() => setPaxDropdownOpen(!paxDropdownOpen)}
                  >
                    <strong>PAX SIZE</strong>{" "}
                    <strong>
                      <FaArrowDown />
                    </strong>
                  </button>
                  {paxDropdownOpen && (
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
                  )}
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

        <div className="ShowALlTickits pt-20  ">
          <table className="table ">
            <thead className="bg-success font-bold">
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Airline</th>
                <th>Departure Date</th>
                <th>Departure Time</th>
                <th>Arrival Date</th>
                <th>Arrival Time</th>
                <th>Flight Number</th>
                <th>Flight Route</th>
                <th>Pax</th>
                <th>Price</th>
                <th>Booking</th>
              </tr>
            </thead>
            <tbody>
              {showTickets.length > 0 ? (
                showTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.origin}</td>
                    <td>{ticket.destination}</td>
                    <td>{ticket.airline}</td>
                    <td>{ticket.departure_date}</td>
                    <td>{ticket.departure_time}</td>
                    <td>{ticket.arival_date}</td>
                    <td>{ticket.arival_time}</td>
                    <td>{ticket.flight_number}</td>
                    <td>{ticket.flight_route}</td>
                    <td>{ticket.pax}</td>
                    <td>{ticket.price}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={handleBooking(index)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13">No tickets available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Booking;
