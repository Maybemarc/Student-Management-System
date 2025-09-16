import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import passwordResetTemplate from "../utils/ResetPAsswordTemplate.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, isAdmin } =
      req.body;

    if (!fullName || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({ message: "All fiels are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      isAdmin: isAdmin || false,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid Crenditials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined!");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfull",
      user: {
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log(`Error in login: `, error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out Successfully" });
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const emailHtml = passwordResetTemplate(
      `http://localhost:5173/reset-password/${resetToken}`
    );

    await sendMail(
      email,
      "password Reset Request",
      emailHtml

      // `<a href="http://localhost:5173/reset-password/${resetToken}">here</a>`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({
        message: "Token and new password is required",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await User.findById(decoded.id);
    if (!response)
      return res.status(404).json({ message: "User doesn't exist" });

    response.password = await bcrypt.hash(newPassword, 10);

    await response.save();

    res.status(200).json({ message: "Password reset Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
