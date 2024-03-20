import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = ({ handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        orientation="portrait"
        sx={{
          height: "389px",
          width: "500px",
          maxHeight: "450px",
          borderTop: "14px solid black",
          boxShadow: "0px 5px 10px rgb(170, 170, 170)",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          "& .MuiPickersDay-root": {
            minWidth: "37px",
            minHeight: "37px",
            backgroundColor: "transparent",
          },
          "& .Mui-selected": {
            backgroundColor: "black !important",
            color: "white !important",
          },
        }}
        onChange={(newDate) => {
          handleDateChange(newDate.$d);
        }}
        onMonthChange={(newDate) => {
          console.log(newDate);
          handleDateChange(newDate.$d);
        }}
        disableFuture={true}
      ></DateCalendar>
    </LocalizationProvider>
  );
};

export default Calendar;
