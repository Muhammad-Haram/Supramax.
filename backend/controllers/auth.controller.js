import { User } from "../models/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

// Sign up
export const signUp = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal Server Error during signup",
      error: error.message,
    });
  }
};

// Log in
export const logIn = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });

    // If user is not found, return with an error
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // Decrypt the stored password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // If password does not match, return with an error
    if (originalPassword !== req.body.password) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // Token data
    const tokenData = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    // Generate JWT token
    const accessToken = jwt.sign(tokenData, process.env.JWT_SEC, {
      expiresIn: "3d",
    });

    // Remove password from the response
    const { password, ...others } = user._doc;

    // Send success response
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    // Log the error and return a 500 response
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error during login",
      error: error.message,
    });
  }
};
