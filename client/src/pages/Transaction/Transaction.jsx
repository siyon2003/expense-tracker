import {
  Button,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Carousel from "react-material-ui-carousel";
import "./Transaction.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventIcon from "@mui/icons-material/Event";
import NoteIcon from "@mui/icons-material/Note";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SendIcon from "@mui/icons-material/Send";
import NavBar from "../Navbar/NavBar";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
const options1 = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: `Monthly Expense Comparison`,
      fontSize: 25,
    },
  },
};
const options2 = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: `Monthly Income Comparison`,
      fontSize: 18,
    },
  },
};



const Transaction = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChangeIndex = (index) => {
    setActiveIndex(index);
  };
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dataFetched, setDataFetched] = useState(null);
  console.log(month)
  const handleRestart=()=>{
    setMonth("")
    setYear("")
    setDataFetched(null)
  }
  const data1 = {
    labels:
      dataFetched &&
      dataFetched.response2.expense &&
      dataFetched.response2.expense.map((item) => item.category),
    datasets: [
      {
        label: "MonthlyExpense",
        data:
          dataFetched &&
          dataFetched.response2.expense &&
          dataFetched.response2.expense.map((item) => item.total),
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
  const data2 = {
    labels:
      dataFetched && dataFetched.response2.income.map((item) => item.category),
    datasets: [
      {
        label: "MonthlyIncome",
        data:
          dataFetched && dataFetched.response2.income.map((item) => item.total),
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const handleFetchData = async (e) => {
    e.preventDefault();
    console.log(month);
    if(month !=="" && month >= 0 && year){
      console.log({ month, year });
      const res = await fetch("/api/user/getmonthlytransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization":sessionStorage.getItem('access_token')
        },
        body: JSON.stringify({ month, year }),
      });
      const data = await res.json();
      console.log(data);
      setDataFetched(data);
    }else{
      alert('Select the Month and Year for analytics purpose')
    }
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={3} sx={{ backgroundColor: "#f7f8f8" }}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            className="left-panel"
            sx={{ backgroundColor: "#f7f8f8" }}
          >
            <div className="selectComponents">
              <FormControl
                variant="outlined"
                className="form-control"
                required
                size="small"
              >
                <InputLabel>Month</InputLabel>
                <Select
                  value={month}
                  required
                  onChange={(e) => setMonth(e.target.value)}
                  label="Month"
                >
                  {months &&
                    months.map((item, index) => (
                      <MenuItem value={index} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                className="form-control"
                required
                size="small"
              >
                <InputLabel>Year</InputLabel>
                <Select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  label="Year"
                >
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                 
                </Select>
              </FormControl>
              <SendIcon
                onClick={handleFetchData}
                sx={{ fontSize: "2rem", cursor: "pointer" }}
              />
              <RestartAltIcon onClick={handleRestart} sx={{fontSize: "2rem", cursor: "pointer"}}/>
            </div>
            <div className="IncomeExpenseCard">
              <Paper
                elevation={0}
                sx={{ padding: "20px", boxShadow: "0 0 5px green" }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center", marginBottom: "5px" }}
                >
                  Monthly Total Income
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", marginBottom: "5px" }}
                  className="incomeLabel"
                >
                  <CurrencyRupeeIcon />
                  <p>{dataFetched && dataFetched.totalIncome}</p>
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{ padding: "20px", boxShadow: "0 0 5px red" }}
                square={false}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center", marginBottom: "5px" }}
                >
                  Monthly Total Expense
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", marginBottom: "5px" }}
                  className="expenseLabel "
                >
                  <CurrencyRupeeIcon />
                  <p>{dataFetched && dataFetched.totalExpense}</p>
                </Typography>
              </Paper>
            </div>
            {dataFetched && (
              <div className="data-container">
                {dataFetched.incomeTransactions &&
                  dataFetched.incomeTransactions.map((dataItem, index) => (
                    <Paper elevation={4} className="data-paper" key={index}>
                      <Typography variant="h6" className="income" gutterBottom>
                        {dataItem.categoryName}
                        <ShowChartIcon color="green" />
                      </Typography>
                      <div className="transaction-list">
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <CurrencyRupeeIcon className="iconDetail" />{" "}
                          <p>{dataItem.amount}</p>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <EventIcon />
                          <p>
                            {dataItem.date +
                              "," +
                              months[dataItem.month] +
                              "," +
                              dataItem.year}{" "}
                          </p>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <NoteIcon />
                          <p>{dataItem.description}</p>
                        </Typography>
                      </div>
                    </Paper>
                  ))}
                {dataFetched.expenseTransactions &&
                  dataFetched.expenseTransactions.map((dataItem, index) => (
                    <Paper elevation={4} className="data-paper" key={index}>
                      <Typography variant="h6" className="expense" gutterBottom>
                        {dataItem.categoryName}
                        <ShowChartIcon color="red" />
                      </Typography>
                      <div className="transaction-list">
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <CurrencyRupeeIcon className="iconDetail" />{" "}
                          <p>{dataItem.amount}</p>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <EventIcon />
                          <p>
                            {dataItem.date +
                              "," +
                              months[dataItem.month] +
                              "," +
                              dataItem.year}
                          </p>
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          className="monthLabel"
                        >
                          <NoteIcon />
                          <p>{dataItem.description}</p>
                        </Typography>
                      </div>
                    </Paper>
                  ))}
                {/* <Paper elevation={4} className="data-paper">
                  <Typography variant="h6" className="income" gutterBottom>
                    Salary
                    <ShowChartIcon color="green" />
                  </Typography>
                  <div className="transaction-list">
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <CurrencyRupeeIcon className="iconDetail" /> <p>500</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <EventIcon />
                      <p>January</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <NoteIcon />
                      <p>Salary description</p>
                    </Typography>
                  </div>
                </Paper>
                <Paper elevation={4} className="data-paper">
                  <Typography variant="h6" className="income" gutterBottom>
                    Salary
                    <ShowChartIcon />
                  </Typography>
                  <div className="transaction-list">
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <CurrencyRupeeIcon className="iconDetail" /> <p>500</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <EventIcon />
                      <p>January</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <NoteIcon />
                      <p>Salary description</p>
                    </Typography>
                  </div>
                </Paper>
                <Paper elevation={4} className="data-paper">
                  <Typography variant="h6" className="expense" gutterBottom>
                    Education
                    <ShowChartIcon />
                  </Typography>
                  <div className="transaction-list">
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <CurrencyRupeeIcon className="iconDetail" /> <p>500</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <EventIcon />
                      <p>January</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <NoteIcon />
                      <p>Salary description</p>
                    </Typography>
                  </div>
                </Paper>
                <Paper elevation={4} className="data-paper">
                  <Typography variant="h6" className="expense" gutterBottom>
                    Food
                    <ShowChartIcon />
                  </Typography>
                  <div className="transaction-list">
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <CurrencyRupeeIcon className="iconDetail" /> <p>500</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <EventIcon />
                      <p>January</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <NoteIcon />
                      <p>Salary description</p>
                    </Typography>
                  </div>
                </Paper>
                <Paper elevation={4} className="data-paper">
                  <Typography variant="h6" className="income" gutterBottom>
                    Salary
                    <ShowChartIcon />
                  </Typography>
                  <div className="transaction-list">
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <CurrencyRupeeIcon className="iconDetail" /> <p>500</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <EventIcon />
                      <p>January</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="monthLabel"
                    >
                      <NoteIcon />
                      <p>Salary description</p>
                    </Typography>
                  </div>
                </Paper> */}
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            className="right-panel"
            sx={{ backgroundColor: "#f7f8f8" }}
          >
            {(dataFetched === null ||
              (dataFetched.totalExpense === 0 &&
                dataFetched.totalIncome === 0)) && (
              <div className="gifContainer">
                <img
                  src="/Analytics.gif"
                  alt="Analytics"
                  width="100%"
                  height="85%"
                />
              </div>
            )}
            {dataFetched &&
              (dataFetched.response2.expense || dataFetched.response2.income) &&
              (dataFetched.totalIncome !== 0 ||
                dataFetched.totalExpense !== 0) && (
                <Carousel
                  index={activeIndex}
                  autoPlay={false}
                  animation="slide"
                  timeout={500}
                  navButtonsProps={{
                    style: {
                      backgroundColor: "#3f51b5",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    },
                  }}
                  PrevIcon={<ArrowBackIcon />}
                  NextIcon={<ArrowForwardIcon />}
                  onChange={(index) => setActiveIndex(index)}
                >
                  {dataFetched.totalExpense > 0 ? (
                    <Doughnut
                      data={data1}
                      options={options1}
                      className="chart1"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO EXPENSE ADDED</h2>
                    </div>
                  )}
                  {dataFetched.totalExpense > 0 ? (
                    <Bar data={data1} options={options1} className="chart1" />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO EXPENSE ADDED</h2>
                    </div>
                  )}
                  {dataFetched.totalExpense > 0 ? (
                    <Line data={data1} className="chart1" options={options1} />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO EXPENSE ADDED</h2>
                    </div>
                  )}

                  {dataFetched.totalIncome > 0 ? (
                    <Doughnut
                      data={data2}
                      options={options2}
                      className="chart1"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO INCOME ADDED</h2>
                    </div>
                  )}
                  {dataFetched.totalIncome > 0 ? (
                    <Bar data={data2} options={options2} className="chart1" />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO INCOME ADDED</h2>
                    </div>
                  )}
                  {dataFetched.totalIncome > 0 ? (
                    <Line data={data2} className="chart1" options={options2} />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                      }}
                    >
                      <h2 style={{ textAlign: "center" }}>NO INCOME ADDED</h2>
                    </div>
                  )}
                </Carousel>
              )}
            {/* <Bar data={data}  options={options1} className="chart"/> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Transaction;
