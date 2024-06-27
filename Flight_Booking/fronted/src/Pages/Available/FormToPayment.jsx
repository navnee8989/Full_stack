import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LastBookingAPI } from "../../redux/features/flightSlice";
import { formatDate } from "../../helpers/Availbility"; // Corrected import name
import Navbar from "../../component/Navbar";
import { CirclesWithBar } from "react-loader-spinner";

const FormToPayment = () => {
  const location = useLocation();
  const { data, formData } = location.state || {};
  const [paymentData, setPaymentData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    amount: "",
    order_date: "",
    order_id: "",
  });

  const LoginDetails = useSelector((state) => state.flight.loginDetails);
  const lastObject =
    LoginDetails.length > 0 ? LoginDetails[LoginDetails.length - 1] : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (data && lastObject) {
      getTicketDetails();
    }
  }, [data, lastObject]);

  useEffect(() => {
    if (paymentData.order_id) {
      handleSubmit();
    }
  }, [paymentData]);

  const getTicketDetails = async () => {
    try {
      const headers = {
        "api-key":
          "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
        Authorization: `${localStorage.getItem("token")}`,
      };

      const response = await fetch(
        `/api/ticket?booking_id=${data.booking_id}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      const fullName = formData.adults
        .map((adult) => `${adult.firstName} ${adult.lastName}`)
        .join(", ");

      setPaymentData({
        full_name: fullName,
        mobile: lastObject.user.mobile_no,
        email: lastObject.user.email_id,
        amount: parseFloat(result.data.total_amount).toFixed(1),
        order_date: formatDate(new Date()),
        order_id: result.data.booking_id,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching ticket details.");
    }
  };

  const handleSubmit = async (event) => {
    event && event.preventDefault();

    try {
      const postData = JSON.stringify({
        domain: "https://localhost:2000/",
        full_name: paymentData.full_name,
        mobile: paymentData.mobile,
        email: paymentData.email,
        amount: paymentData.amount,
        description: "Add description for API",
        callback_url: "https://localhost:2000",
        order_date: paymentData.order_date,
        order_id: paymentData.order_id,
      });

      const response = await fetch("http://localhost:5000/flight/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const paymentResponse = await response.json();
      const accessKey = paymentResponse.accesskey;

      console.log("AccessKey ", accessKey);

      if (accessKey) {
        const paymentUrl = `https://finanvo.in/payment/?accessKey=${accessKey}`;
        window.location.href = paymentUrl;
        dispatch(LastBookingAPI(accessKey));
      } else {
        toast.error("Payment initiation failed. No access key received.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error initiating payment.");
    }
  };

  return (
    <>
      <div className="loader w-full h-full transition-all d-flex justify-center items-center">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};

export default FormToPayment;
