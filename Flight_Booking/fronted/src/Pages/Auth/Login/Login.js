import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setLoginDetails } from "../../../redux/features/flightSlice";

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const currDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY or DD/MM/YYYY depending on locale

    const currTime = new Date(); // Current date and time
    const hours = currTime.getHours().toString().padStart(2, '0'); // Get hours, ensure two digits
    const minutes = currTime.getMinutes().toString().padStart(2, '0'); // Get minutes, ensure two digits
    const seconds = currTime.getSeconds().toString().padStart(2, '0'); // Get seconds, ensure two digits
    const currentTime = `${hours}:${minutes}:${seconds}`; // Format: HH:MM:SS
    const data = JSON.stringify({
      Username: formData.email,
      Password: formData.password,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/login",
      headers: {
        "api-key":
          "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // dispatch()
        if (response.data.token === "" && !response.data.length) {
          toast.error("Error While Login");
        } else {
          const { token, user } = response.data;

          // console.log(token);

          dispatch(
            setLoginDetails({ user, loginDate: currDate, loginTime: currentTime })
          );

          localStorage.setItem("token", token);
          toast.success("Login SuccessFull");
          navigate("/booking", { state: { user: response.data.user } });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Your Copyright component */}
      </Container>
    </ThemeProvider>
  );
};

export default Login;
