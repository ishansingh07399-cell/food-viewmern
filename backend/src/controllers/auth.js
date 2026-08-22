const userModel = require("../models/user");
const foodPartnerModel=require("../models/foodpartner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ fullname, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: { _id: user._id, email: user.email, fullname: user.fullname },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: { _id: user._id, email: user.email, fullname: user.fullname },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

function logoutUser(req,res){
  res.clearCookie("token");
  res.status(200).json({
    message:"User logged out successfully"
  });
}

async function registerFoodPartner(req, res) {
  try {
    const { name, contactName, phone, address, email, password } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });
    if (isAccountAlreadyExists) {
      return res.status(400).json({ message: "food partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name,
      contactName,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
      message: "food partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the food partner exists in the database
        const foodPartner = await foodPartnerModel.findOne({ email });
        if (!foodPartner) {
            // Returning generic error to prevent email enumeration (brute-force/dictionary attacks)
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Generate a JWT Token using the food partner's unique ID
        const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

        // 4. Save the token inside cookies
        res.cookie('token', token);

        // 5. Send successful response
        res.status(200).json({
            message: "Food Partner logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name 
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const logoutFoodPartner=async(req,res) =>{
  try {
        // Clear the token from the cookies
        res.clearCookie('token');

        // Send a successful response
        res.status(200).json({ 
            message: "Food Partner logged out successfully" 
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner,  loginFoodPartner,logoutFoodPartner };
