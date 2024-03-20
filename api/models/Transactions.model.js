import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    expense: {
      type: Boolean,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      
    },
    year: {
      type: Number,
      required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  });

  const Transactions=mongoose.model("Transactions",transactionSchema);
  export default Transactions;