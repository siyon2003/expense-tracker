import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TransactionTab.css";

const TransactionTab = ({
  txnId,
  expense,
  category,
  description,
  amount,
  onDelete,
  categoryId,
  onEditClick,
}) => {
  return (
    <div
      className="txn-tab"
      style={{
        backgroundColor: expense
          ? "rgba(211, 47, 47, 0.08)"
          : "rgba(46, 125, 50, 0.08)",
        border: `1px solid ${expense ? "red" : "green"}`,
        color: expense ? "red" : "green",
      }}
    >
      <div className="txn-category-description">
        <h2>{category}</h2>
        <p>{description}</p>
      </div>
      <div className="txn-amount">
        <h2>{"₹ " + amount}</h2>
        <div className="txn-buttons">
          <IconButton
            onClick={() => {
              onEditClick(txnId, expense, categoryId, description, amount);
            }}
          >
            <EditIcon
              sx={{
                color: expense ? "red" : "green",
                margin: 1,
              }}
            ></EditIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              onDelete(txnId);
            }}
          >
            <DeleteIcon
              sx={{
                color: expense ? "red" : "green",
                margin: 1,
              }}
            ></DeleteIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionTab;
