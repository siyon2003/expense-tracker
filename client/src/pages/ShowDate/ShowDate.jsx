const ShowDate = ({ date }) => {
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dates = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];
  const abbreviatedDaysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return (
    <div className="show-date">
      {today.getDay() == date.getDay() &&
      today.getMonth() == date.getMonth() &&
      today.getFullYear() == date.getFullYear() ? (
        <h1>{"Today"}</h1>
      ) : (
        <h1>
          {months[date.getMonth()] +
            " " +
            dates[date.getDate() - 1] +
            ", " +
            abbreviatedDaysOfWeek[date.getDay()]}
        </h1>
      )}
    </div>
  );
};

export default ShowDate;
