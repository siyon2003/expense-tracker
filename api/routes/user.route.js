import express from "express";
import extractUserIdFromToken from "../utils/getValiduser.js";
import {
  getDailytransaction,
  deleteTransaction,
  editTransactionById,
  addTransaction,
  getCategories,
  addCategory,
  getTransactionsForMonth,
} from "../Controllers/user.controller.js";

const router = express.Router();
router.post("/addTransaction", extractUserIdFromToken, addTransaction);
// router.get("/getAllExpense", extractUserIdFromToken, getAllExpenses);
// router.get("/getAllIncome", extractUserIdFromToken, getAllIncome);
router.post("/addcategory", addCategory);
router.post(
  "/getmonthlytransaction",
  extractUserIdFromToken,
  getTransactionsForMonth
);
router.get("/getCategories", getCategories);
router.post(
  "/updatetransaction/:id",
  extractUserIdFromToken,
  editTransactionById
);
router.delete(
  "/deletetransaction/:id",
  extractUserIdFromToken,
  deleteTransaction
);
router.post(
  "/getdailytransactoin",
  extractUserIdFromToken,
  getDailytransaction
);
export default router;
