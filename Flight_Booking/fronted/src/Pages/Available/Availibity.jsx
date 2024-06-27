import React, { useState } from "react";
import { MdOutlineFlight } from "react-icons/md";
import { FaIoxhost } from "react-icons/fa";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../component/Navbar";
import { FetchAPI } from "../../redux/features/flightSlice";

const Availability = ({ setBKID }) => {
  const [infantShow, setInfantShow] = useState(false);
  const [formData, setFormData] = useState({
    adults: [],
    children: [],
    infants: [],
    agreeToTerms: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const AllFlightData = location.state?.ticket;
  const [name, setName] = useState();
  const dispatch = useDispatch();

  const adultCountData = useSelector((state) => state.flight.adultCountData);
  const childCountData = useSelector((state) => state.flight.childCountData);
  const infantCountData = useSelector((state) => state.flight.infantCountData);

  const [incount, setincout] = useState(infantCountData);

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState };
      updatedData[type][index] = {
        ...updatedData[type][index],
        [name]: value,
        ...(name === "title" && {
          title: e.target.options[e.target.selectedIndex].text,
        }),
      };
      return updatedData;
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      agreeToTerms: e.target.checked,
    }));
  };

  const handleInfant = () => {
    setincout(incount + 1);
    setInfantShow(true);
  };

  //  formData.adults.forEach((names) => {
  //     if (names === "") {
  //       setName(null);
  //     } else {
  //       setName(`${names.first_name} ${names.last_name}`);
  //     }
  //   });

  // console.log(FullName);
  const handleConfirmBooking = async () => {
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const adultCount = Number(adultCountData);
    const childCount = Number(childCountData);
    const infantCount = Number(incount);
    const totalPax = adultCount + childCount + infantCount;

    const data = JSON.stringify({
      ticket_id: AllFlightData?.ticket_id,
      total_pax: totalPax,
      adult: adultCount,
      child: childCount,
      infant: infantCount,
      adult_info: formData.adults.map((adult) => ({
        title: adult.title,
        first_name: adult.firstName,
        last_name: adult.lastName,
      })),
      child_info: formData.children.map((child) => ({
        title: child.title,
        first_name: child.firstName,
        last_name: child.lastName,
      })),
      infant_info: formData.infants.map((infant) => ({
        title: infant.title,
        first_name: infant.firstName,
        last_name: infant.lastName,
      })),
    });

    try {
      const response = await axios.post("/api/book", data, {
        headers: {
          "api-key":
            "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data) {
        toast.success("Booking confirmed!");

        navigate("/formpayment", {
          state: { data: response.data, AllFlightData, formData },
        });

        console.log(response.data);
        const { booking_id } = response.data;
        try {
          const data = {
            bookingId: booking_id,
          };
          const response = await axios.post(
            "http://localhost:5000/flight/ticket_details",
            data,
            {
              headers: {
                "api-key":
                  "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
                Authorization: `${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.log(error);
          toast.error("Error While Storing Data into the Db");
        }
        dispatch(FetchAPI(booking_id));
      } else {
        toast.error("Error while booking the ticket.");
      }
    } catch (error) {
      toast.error("Error while booking the ticket.");
    }
  };

  // const BookignRedux = useSelector((state)=> state.flight.BookingDetails)
  // console.log(BookignRedux);
  return (
    <>
      <Navbar />
      <div className="tickets pt-16">
        <div className="container">
          <div className="origin_destination d-flex justify-start items-center">
            <strong>
              <MdOutlineFlight />
            </strong>
            <div className="flightRoutes">
              <b>{AllFlightData.origin}</b>
              <span>---</span>
              <b>{AllFlightData.destination}</b>
            </div>
          </div>
          <div className="ticketDetails border shadow-lg border-sm w-full d-flex justify-between items-center mt-5 p-4">
            <div className="iconsF d-flex flex-col">
              <FaIoxhost />
              <span>{AllFlightData.airline}</span>
            </div>
            <div className="flight_route">{AllFlightData.flight_route}</div>
            <div className="flight_number">{AllFlightData.flight_number}</div>
            <div className="time">
              <span>{AllFlightData.departure_time}</span>--
              <span>{AllFlightData.arrival_time}</span>
            </div>
            <div className="seat">Seats-{AllFlightData.pax}</div>
            <div className="code d-flex justify-between items-center gap-10">
              <div className="tourCode d-flex flex-col">
                <span>Tour Code</span>
                <strong>AQP{AllFlightData.price}</strong>
              </div>
              <div className="tourCodetwo d-flex flex-col">
                <span>Tour Code</span>
                <strong>AQP{AllFlightData.price}</strong>
              </div>
            </div>
          </div>

          <h1 className="w-full text-center text-2xl pt-10">Adult Booking</h1>
          {Array.from({ length: adultCountData }).map((_, index) => (
            <div
              key={index}
              className="bookingForm mt-10 shadow-md w-full d-flex justify-between items-center pl-8 pr-8 pt-3 pb-3 border"
            >
              <div className="dropdown d-flex justify-between items-center w-25 gap-5">
                <div className="people w-full">
                  <MDBDropdown className="">
                    <MDBDropdownToggle className="bg-dark w-full">
                      Adult
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>Adult</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
              </div>
              <div className="form w-full d-flex justify-evenly">
                <form className="d-flex justify-between items-center gap-12">
                  <div className="mb-3 w-50">
                    <label
                      htmlFor={`titleInputAdult${index}`}
                      className="form-label"
                    >
                      Title
                    </label>
                    <select
                      className="form-select"
                      id={`titleInputAdult${index}`}
                      name="title"
                      onChange={(e) => handleInputChange(e, index, "adults")}
                    >
                      <option value="">Select</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`firstNameInputAdult${index}`}
                      className="form-label"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`firstNameInputAdult${index}`}
                      name="firstName"
                      onChange={(e) => handleInputChange(e, index, "adults")}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`lastNameInputAdult${index}`}
                      className="form-label"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`lastNameInputAdult${index}`}
                      name="lastName"
                      onChange={(e) => handleInputChange(e, index, "adults")}
                    />
                  </div>
                </form>
              </div>
            </div>
          ))}

          {childCountData > 0 && (
            <>
              <h1 className="w-full text-center text-2xl pt-10">
                Child Booking
              </h1>
              {Array.from({ length: childCountData }).map((_, index) => (
                <div
                  key={index}
                  className="bookingForm mt-10 shadow-md w-full d-flex justify-evenly items-center pl-8 pr-8 pt-3 pb-3 border"
                >
                  <div className="dropdown d-flex justify-between items-center w-25 gap-5">
                    <div className="people w-full">
                      <MDBDropdown className="">
                        <MDBDropdownToggle className="bg-dark w-full">
                          Child
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem link>Child</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </div>
                  </div>
                  <div className="form w-full d-flex justify-evenly">
                    <form className="d-flex justify-between items-center gap-12">
                      <div className="mb-3 w-50">
                        <label
                          htmlFor={`titleInputChild${index}`}
                          className="form-label"
                        >
                          Title
                        </label>
                        <select
                          className="form-select"
                          id={`titleInputChild${index}`}
                          name="title"
                          onChange={(e) =>
                            handleInputChange(e, index, "children")
                          }
                        >
                          <option value="">Select</option>
                          <option value="Mstr.">Mstr.</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor={`firstNameInputChild${index}`}
                          className="form-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`firstNameInputChild${index}`}
                          name="firstName"
                          onChange={(e) =>
                            handleInputChange(e, index, "children")
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor={`lastNameInputChild${index}`}
                          className="form-label"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`lastNameInputChild${index}`}
                          name="lastName"
                          onChange={(e) =>
                            handleInputChange(e, index, "children")
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </>
          )}

          {incount > 0 && (
            <>
              <h1 className="w-full text-center text-2xl pt-10">
                Infant Booking
              </h1>
              {Array.from({ length: incount }).map((_, index) => (
                <div
                  key={index}
                  className="bookingForm mt-10 shadow-md w-full d-flex justify-evenly items-center pl-8 pr-8 pt-3 pb-3 border"
                >
                  <div className="dropdown d-flex justify-between items-center w-25 gap-5">
                    <div className="people w-full">
                      <MDBDropdown className="">
                        <MDBDropdownToggle className="bg-dark w-full">
                          Infant
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem link>Infant</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </div>
                  </div>
                  <div className="form w-full d-flex justify-evenly">
                    <form className="d-flex justify-between items-center gap-12">
                      <div className="mb-3 w-50">
                        <label
                          htmlFor={`titleInputInfant${index}`}
                          className="form-label"
                        >
                          Title
                        </label>
                        <select
                          className="form-select"
                          id={`titleInputInfant${index}`}
                          name="title"
                          onChange={(e) =>
                            handleInputChange(e, index, "infants")
                          }
                        >
                          <option value="">Select</option>
                          <option value="Mstr.">Mstr.</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor={`firstNameInputInfant${index}`}
                          className="form-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`firstNameInputInfant${index}`}
                          name="firstName"
                          onChange={(e) =>
                            handleInputChange(e, index, "infants")
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor={`lastNameInputInfant${index}`}
                          className="form-label"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`lastNameInputInfant${index}`}
                          name="lastName"
                          onChange={(e) =>
                            handleInputChange(e, index, "infants")
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="infant pt-10">
            <button
              className="btn btn-outline-primary uppercase w-72 text-lg text-blue-500 font-bold hover:text-black hover:border-black"
              onClick={handleInfant}
            >
              add infant - AQP1750
            </button>
          </div>

          <div className="checkBox mt-10 bg-success d-flex justify-center items-center">
            <div className="checkboxes">
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    id="checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="checkbox">
                    I have READ and AGREE to the Terms & Conditions
                  </label>
                </li>
              </ul>
            </div>
            <div className="confirmButton w-25 p-4">
              <button
                className="btn btn-primary uppercase"
                onClick={handleConfirmBooking}
              >
                confirm booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
