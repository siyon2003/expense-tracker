import { MenuItem, TextField, Button, InputAdornment } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const DialogBox = ({
  open,
  addOrEdit,
  expense,
  selectedCategory,
  expenseCategories,
  incomeCategories,
  amount,
  description,
  date,
  txnId,
  handleClose,
  handleChange,
  triggerUpdate,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // console.log(formJson);
          // console.log(date);
          // console.log(expense);
          // console.log(txnId)

          addOrEdit
            ? fetch("/api/user/addTransaction", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "authorization":sessionStorage.getItem('access_token')
                },
                body: JSON.stringify({
                  expense: expense,
                  amount: formJson.amount,
                  category: formJson.categoryId,
                  description: formJson.description,
                  month: date.getMonth(),
                  date: date.getDate(),
                  year: date.getFullYear(),
                }),
              })
                .then((res) => {
                  console.log(res.message);
                  console.log(res.transaction);
                  triggerUpdate();
                })
                .catch((err) => {
                  console.log(err);
                })
            : fetch(`/api/user/updatetransaction/${txnId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "authorization":sessionStorage.getItem('access_token')
                },
                body: JSON.stringify({
                  expense: expense,
                  amount: formJson.amount,
                  category: formJson.categoryId,
                  description: formJson.description,
                  month: date.getMonth(),
                  date: date.getDate(),
                  year: date.getFullYear(),
                }),
              })
                .then((res) => {
                  console.log(res.message);
                  console.log(res.transaction);
                  triggerUpdate();
                })
                .catch((err) => {
                  console.log(err);
                });

          handleClose();
        },
      }}
    >
      <DialogTitle fontSize={40}>{addOrEdit ? "Add" : "Edit"}</DialogTitle>
      <DialogContent>
        {
          <DialogContentText>
            {addOrEdit ? "Add" : "Edit"} your{" "}
            {addOrEdit ? (expense ? "expenses" : "income") : "transaction"}{" "}
            {addOrEdit ? "for the day" : ""}
          </DialogContentText>
        }

        {addOrEdit ? (
          <ToggleButtonGroup
            value={expense.toString()}
            exclusive
            aria-label="Platform"
            fullWidth
            onChange={handleChange}
          >
            <ToggleButton color="success" value="false" size="large">
              Income
            </ToggleButton>
            <ToggleButton color="error" value="true">
              Expense
            </ToggleButton>
          </ToggleButtonGroup>
        ) : expense ? (
          <ToggleButtonGroup
            value={expense.toString()}
            exclusive
            aria-label="Platform"
            fullWidth
          >
            <ToggleButton disabled color="success" value="false" size="large">
              Income
            </ToggleButton>
            <ToggleButton color="error" value="true">
              Expense
            </ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <ToggleButtonGroup
            value={expense.toString()}
            exclusive
            aria-label="Platform"
            fullWidth
          >
            <ToggleButton color="success" value="false" size="large">
              Income
            </ToggleButton>
            <ToggleButton disabled color="error" value="true">
              Expense
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="categoryId"
          label="Select Category"
          fullWidth
          select
          variant="standard"
          defaultValue={selectedCategory}
        >
          {expense
            ? expenseCategories.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })
            : incomeCategories.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
        </TextField>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="amount"
          label="Enter Amount"
          type="number"
          fullWidth
          variant="standard"
          placeholder="Rs."
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          defaultValue={addOrEdit ? null : amount}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={addOrEdit ? null : description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} htmlColor="black">
          Cancel
        </Button>
        <Button type="submit">{addOrEdit ? "Add" : "Submit Changes"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
