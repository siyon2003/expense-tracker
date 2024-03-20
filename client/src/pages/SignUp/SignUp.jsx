import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setLoading(false);
      seterror(data.message);
      return;
    }
    setLoading(false);
    setopen(true);
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1681582863624-24337f436b78?w=1600&auto=format&fit=crop&q=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGN1cnJlbmN5fGVufDB8fDB8fHww')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sign-in-container">
        <div className="sign-in-form">
          <Typography variant="h4" className="sign-in-title" gutterBottom>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className="login-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="username"
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
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
                  sx={{
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": { backgroundColor: "white", color: "black" },
                  }}
                  className="login-button"
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
            {error && (
              <Typography
                variant="body2"
                color="error"
                className="error-message"
              >
                {error}
              </Typography>
            )}
          </form>
          <div className="sign-up-link">
            <p>You already have an account ? </p>
            <Link to={"/signin"} className="signupbutton">
              <span>Sign in</span>
            </Link>
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
          User registered
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
