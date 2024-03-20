import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data.token);
    sessionStorage.setItem('access_token',data.token);
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    setopen(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
    //debug snackbar
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=1600&auto=format&fit=crop&q=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMGN1cnJlbmN5fGVufDB8fDB8fHww')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sign-in-container">
        <div className="sign-in-form">
          <Typography variant="h4" className="sign-in-title" gutterBottom>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className="login-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  name="password"
                  label="password"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{border:'1px solid black',backgroundColor:"black",color:"white",'&:hover':{backgroundColor:'white',color:'black'}}}
                  className="login-button"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
            {error && (
              <Typography
                variant="body2"
                color="error"
                className="error-message"
                sx={{marginTop:"20px",fontSize:"1rem"}}
              >
                {error}
              </Typography>
            )}
          </form>
          <div className="sign-up-link">
            <p>Dont have an account ? </p>
            <Link to={"/signup"} className="signupbutton">
              <span>Sign up</span></Link>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Login Successful
        </Alert>
      </Snackbar>
    </Box>
   
  );
};

export default SignIn;
