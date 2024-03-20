import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  expense: {
    type: Boolean,
    required: true,
  }
});
const Category = mongoose.model('Category', categorySchema);
export default Category;