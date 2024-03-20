import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const sendWelcomeEmail = async (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_NAME,
      pass: process.env.APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_NAME,
    to: userEmail,
    subject: "🎉 Meet Your New Budget BFF: Our Expense Tracker App!!",
    text: "Hey there!Guess what? We've cooked up something juicier than your favorite takeout – introducing our Expense Tracker App! 🚀Ready to make your wallet do a happy dance? Give it a spin! Cheers to savvy spending and fewer financial headaches!",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // 10- number of rounds to create the salt
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    sendWelcomeEmail(email);
    res.status(201).json("User created successfully");
    //await- code is going to stay in this line until the operation finish
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not found"));
    const comparePassword = bcryptjs.compareSync(password, validUser.password);
    if (!comparePassword) return next(errorHandler(404, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    // res.cookie("accessToken", token, {
    //   httpOnly: true,
    // });
    const { password: pass, ...rest } = validUser._doc;
    res.status(201).json({rest,token});
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    // res.clearCookie("accessToken");
    res.status(200).json("User has been logged out !!");
  } catch (error) {
    next(error);
  }
};
