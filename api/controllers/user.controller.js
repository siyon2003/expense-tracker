import Transactions from "../models/Transactions.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";


export const addCategory = async (req, res) => {
  try {
    const { name, expense } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, expense });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { expense, amount, category, description, month, date, year } =
      req.body;
    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and category are required" });
    }
    const transaction = new Transactions({
      expense,
      amount,
      category,
      description,
      month,
      date,
      year,
      user: req.userId,
    });
    await transaction.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { transactions: transaction._id },
    });
    res
      .status(201)
      .json({ message: "TRansaction added successfully", transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const expenseCategories = await Category.find();

    res.status(200).json({ categories: expenseCategories });
  } catch (error) {
    console.error("Error fetching  categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTransactionsForMonth = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.body;

    const allTransactions = await Transactions.find({
      user: userId,
      month,
      year,
    }).populate("category");

    const incomeTransactions = allTransactions.filter(
      (transaction) => !transaction.expense
    );
    const expenseTransactions = allTransactions.filter(
      (transaction) => transaction.expense
    );

    const sortByAmountDesc = (a, b) => b.amount - a.amount;
    incomeTransactions.sort(sortByAmountDesc);
    expenseTransactions.sort(sortByAmountDesc);

    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    const totalExpense = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const transactions = await Transactions.find({ user: userId, month, year });

    const transactionsByCategory = transactions.reduce((acc, transaction) => {
      const categoryId = transaction.category.toString();
      const category = acc[categoryId] || {
        category: "",
        income: 0,
        expense: 0,
      };
      if (!category.category) {
        category.category = categoryId;
      }
      if (transaction.expense) {
        category.expense += transaction.amount;
      } else {
        category.income += transaction.amount;
      }

      acc[categoryId] = category;
      return acc;
    }, {});

    for (const categoryId in transactionsByCategory) {
      if (transactionsByCategory.hasOwnProperty(categoryId)) {
        const category = await Category.findById(categoryId);
        transactionsByCategory[categoryId].category = category.name;
      }
    }

    const response2 = {
      income: [],
      expense: [],
    };

    for (const categoryId in transactionsByCategory) {
      if (transactionsByCategory.hasOwnProperty(categoryId)) {
        const categoryData = transactionsByCategory[categoryId];
        if (categoryData.income > 0) {
          response2.income.push({
            category: categoryData.category,
            total: categoryData.income,
          });
        }
        if (categoryData.expense > 0) {
          response2.expense.push({
            category: categoryData.category,
            total: categoryData.expense,
          });
        }
      }
    }

    res.status(200).json({
      totalIncome,
      totalExpense,
      incomeTransactions: incomeTransactions.map((transaction) => ({
        ...transaction.toObject(),
        categoryName: transaction.category.name,
      })),
      expenseTransactions: expenseTransactions.map((transaction) => ({
        ...transaction.toObject(),
        categoryName: transaction.category.name,
      })),
      response2,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const editTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, description, amount, month, date, year, expense } =
      req.body;

    const transaction = await Transactions.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.category = category;
    transaction.description = description;
    transaction.amount = amount;
    transaction.month = month;
    transaction.date = date;
    transaction.year = year;
    transaction.expense = expense;

    await transaction.save();

    res.json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    console.error("Error editing transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transactions.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await User.findByIdAndUpdate(deletedTransaction.user, {
      $pull: { transactions: id },
    });

    res.json({
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDailytransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const { date, month, year } = req.body;
    const allTransactions = await Transactions.find({
      user: userId,
      date,
      month,
      year,
    }).populate("category");
    const incomeTransactions = allTransactions.filter(
      (transaction) => !transaction.expense
    );
    const expenseTransactions = allTransactions.filter(
      (transaction) => transaction.expense
    );

    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    const totalExpense = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    res.status(200).json({
      totalIncome,
      totalExpense,
      allTransactions: allTransactions.map((transaction) => ({
        ...transaction.toObject(),
        categoryName: transaction.category.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
