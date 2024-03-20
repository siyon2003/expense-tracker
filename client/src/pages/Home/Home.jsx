import React from "react";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import "./Home.css";
const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1625225233840-695456021cde?w=1600&auto=format&fit=crop&q=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm" className="landing-container">
        <Typography variant="h2" className="landing-title" sx={{fontFamily: "Poppins"}} gutterBottom>
        Expense Tracker
        </Typography>
        <Typography variant="body1" className="landing-description" paragraph sx={{fontFamily: "Poppins",marginBottom:'25px',fontSize:'1.2rem'}}>
          Start managing you expense today!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              sx={{border:'1px solid black',backgroundColor:"black",color:"white",'&:hover':{backgroundColor:'white',color:'black'}}}
              href="/signin"
              className="landing-button"
            >
              SignIn
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{border:'1px solid black',backgroundColor:"black",color:"white",'&:hover':{backgroundColor:'white',color:'black'}}}
              href="/signup"
              className="landing-button"
            >
              SignUp
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
