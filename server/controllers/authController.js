import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Existing User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("--- Login Attempt ---");
  console.log("Request Body:", req.body);

  if (!email || !password) {
    console.log("Login failed: Email or password missing from request.");
    return res
      .status(400)
      .json({ message: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user){ 
        console.log(`Login failed: No user found with email ${email}.`);
        return res.status(400).json({ message: "User not found" });
    }

            console.log("User found in DB:", user.email);
        console.log("Password from login form:", password);
        console.log("Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

            console.log("Result of password comparison (isMatch):", isMatch);
        console.log("----------------------");

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
