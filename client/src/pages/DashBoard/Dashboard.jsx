import { useEffect, useState } from "react";
import TransactionTab from "../TransactionTab/TransactionTab";
import Stack from "@mui/material/Stack";
import Calendar from "../Calendar/Calendar";
import ShowDate from "../ShowDate/ShowDate";
import Totals from "../Totals/Totals";
import DialogBox from "../DialogBox/DialogBox";
import "./Dashboard.css";
import NavBar from "../Navbar/NavBar";

const Dashboard = () => {
  const [date, setSelectedDate] = useState(new Date());
  const [txnList, setTxnList] = useState([]);

  const [totalIncomeToday, setTotalIncomeToday] = useState(0);
  const [totalExpenseToday, setTotalExpenseToday] = useState(0);

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  const [expense, setIncomeOrExpense] = useState(true);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updateTxns, triggerUpdateTxns] = useState(false);
  const [addOrEdit, setAddorEdit] = useState(true);
  const [txnId, setTxnId] = useState("");

  function triggerUpdate() {
    console.log("update triggered");
    triggerUpdateTxns(!updateTxns);
  }

  function handleDelete(itemId) {
    fetch(`/api/user/deletetransaction/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("access_token"),
      },
    })
      .then((res) => {
        console.log(res);
        triggerUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onEditClick(txnId, expense, categoryId, description, amount) {
    setAddorEdit(false);
    setTxnId(txnId);
    setIncomeOrExpense(expense);
    setSelectedCategory(categoryId);
    setAmount(amount);
    setDescription(description);
    setOpen(true);
  }

  useEffect(() => {
    const txns = fetch("/api/user/getdailytransactoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        date: date.getDate(),
        month: date.getMonth(),

        year: date.getFullYear(),
      }),
    });
    txns
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTxnList(res.allTransactions);
        setTotalExpenseToday(res.totalExpense);
        setTotalIncomeToday(res.totalIncome);
      })
      .catch((err) => {
        console.log(err);
      });

    if (incomeCategories.length == 0 && expenseCategories.length == 0) {
      const categoryData = fetch("/api/user/getCategories", { method: "GET" });

      categoryData
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setIncomeCategories(
            res.categories.filter((item) => {
              return item.expense == false;
            })
          );
          setExpenseCategories(
            res.categories.filter((item) => {
              return item.expense == true;
            })
          );
        });
    }
  }, [date, updateTxns]);

  function handleDateChange(newDate) {
    setSelectedDate(newDate);
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = (indication) => {
    setAddorEdit(indication);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    setIncomeOrExpense(!expense);
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <div className="banner-stack-container">
          <div className="banner">
            <ShowDate date={date}></ShowDate>
            <button
              onClick={() => {
                handleClickOpen(true);
              }}
              className="addButton"
            >
              +
            </button>
          </div>

          <DialogBox
            open={open}
            addOrEdit={addOrEdit}
            expense={expense}
            selectedCategory={selectedCategory}
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
            amount={amount}
            description={description}
            date={date}
            txnId={txnId}
            handleClose={handleClose}
            handleChange={handleChange}
            triggerUpdate={triggerUpdate}
          ></DialogBox>

          <div>
            {txnList.length != 0 ? (
              <div className="stack-container">
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="stretch"
                  sx={{
                    paddingLeft: 0.5,
                    paddingRight: 0.5,
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                  spacing={1.5}
                >
                  {txnList.map((item) => {
                    return (
                      <>
                        <TransactionTab
                          key={item._id}
                          onEditClick={onEditClick}
                          txnId={item._id}
                          category={item.categoryName}
                          categoryId={item.category._id}
                          description={item.description}
                          expense={item.expense}
                          amount={item.amount}
                          onDelete={handleDelete}
                        />
                      </>
                    );
                  })}
                </Stack>
              </div>
            ) : (
              <div className="no-transaction">
                <h2>NO TRANSACTION HISTORY</h2>
              </div>
            )}
          </div>
        </div>

        <div className="calendar-income-expense">
          <Totals
            income={totalIncomeToday}
            expense={totalExpenseToday}
          ></Totals>

          <Calendar handleDateChange={handleDateChange}></Calendar>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
