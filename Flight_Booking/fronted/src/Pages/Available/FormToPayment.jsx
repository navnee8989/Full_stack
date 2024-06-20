import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/Availbility"; // Corrected import name
import Navbar from "../../component/Navbar";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

const FormToPayment = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [paymentData, setPaymentData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    amount: "",
    order_date: "",
    order_id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTicketDetails();
    } else {
      navigate("/login");
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
        `/api/ticket?booking_id=${data.booking_id}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setPaymentData({
        full_name: "",
        mobile: "",
        email: "",
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
    event.preventDefault();
    try {
      const postData = JSON.stringify({
        domain: "https://localhost:2000/",
        full_name: paymentData.full_name,
        mobile: paymentData.mobile,
        email: paymentData.email,
        amount: paymentData.amount,
        description: "add description for api",
        callback_url: "https://localhost:2000",
        order_date: paymentData.order_date,
        order_id: paymentData.order_id,
      });
      const response = await fetch(
        "http://localhost:5000/api/payment/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const paymentResponse = await response.json();
      const accessKey = paymentResponse.accesskey;
      if (accessKey) {
        const paymentUrl = `https://finanvo.in/payment/?accessKey=${accessKey}`;
        window.location.href = paymentUrl;
      } else {
        toast.error("Payment initiation failed. No access key received.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error initiating payment.");
    }
  };

  const handleChange = (event) => {
    setPaymentData({ ...paymentData, [event.target.id]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Payment
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="full_name"
                label="Full Name"
                name="full_name"
                autoComplete="full_name"
                autoFocus
                value={paymentData.full_name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                value={paymentData.mobile}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={paymentData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                autoComplete="amount"
                value={paymentData.amount}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="order_date"
                label="Order Date"
                name="order_date"
                autoComplete="order_date"
                value={paymentData.order_date}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="order_id"
                label="Order ID"
                name="order_id"
                autoComplete="order_id"
                value={paymentData.order_id}
                disabled
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Proceed to Payment
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default FormToPayment;
