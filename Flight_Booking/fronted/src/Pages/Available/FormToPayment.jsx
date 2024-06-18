import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../component/Navbar";
import "./css.css"; // Import your custom CSS file for styling
import { useSelector } from "react-redux";

const formatDate = (date) => {
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};



const FormToPayment = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [paymentData, setPaymentData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    amount: "",
    order_date: formatDate(new Date()), 
    order_id: "",
  });
  const navigate = useNavigate();
  const adultCountData = useSelector((state) => state.flight.adultCountData);
  const childCountData = useSelector((state) => state.flight.childCountData);
  const infantCountData = useSelector((state) => state.flight.infantCountData);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getTicketDetails();
    }
  }, [navigate]);

  const getTicketDetails = async () => {
    try {
      const headers = {
        "api-key":
          "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
        Authorization: `${localStorage.getItem("token")}`,
      };
      const response = await fetch(
        `/api/ticket?booking_id=${data?.booking_id}`,
        {
          headers,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ticket details");
      }
      const responseData = await response.json();

      const ticketData = responseData.data;

      const amount = (
        parseFloat(ticketData.total_amount) *
        (parseInt(adultCountData) +
          parseInt(childCountData) +
          parseInt(infantCountData))
      ).toString();

      setPaymentData({
        full_name: ticketData.full_name || "",
        mobile: ticketData.mobile || "",
        email: ticketData.email || "",
        amount: amount || "",
        order_date: formatDate(new Date()), // Ensure order_date is formatted
        order_id: ticketData.booking_id || "",
      });
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast.error("Error fetching ticket details.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      domain: "https://localhost:2000/",
      full_name: paymentData.full_name.trim(),
      mobile: paymentData.mobile.trim(),
      email: paymentData.email.trim(),
      amount: paymentData.amount,
      description: "Flight booking payment",
      callback_url: "https://localhost:2000",
      order_date: paymentData.order_date,
      order_id: paymentData.order_id,
    };

    try {
      const response = await fetch("https://payment.finanvo.in/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1zEmcFLBqm",
          "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
          "app-origin": "http://localhost:2000",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const paymentResponse = await response.json();
        const accessKey = paymentResponse.accesskey;
        if (accessKey) {
          const paymentUrl = `https://finanvo.in/payment/?accessKey=${accessKey}`;
          window.location.href = paymentUrl; 
        } else {
          toast.error("Payment initiation failed. No access key received.");
        }
      } else {
        toast.error("Error initiating payment.");
      }
    } catch (error) {
      console.error("Error in payment request:", error);
      toast.error("Error initiating payment.");
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      [id]: value.trim(), 
    }));
  };



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="full_name"
                  name="full_name"
                  value={paymentData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={paymentData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={paymentData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={paymentData.amount}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="order_date">Order Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="order_date"
                  name="order_date"
                  value={paymentData.order_date}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="order_id">Order ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="order_id"
                  name="order_id"
                  value={paymentData.order_id}
                  disabled
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={
                  !paymentData.full_name || !paymentData.mobile || !paymentData.email
                }
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormToPayment;
