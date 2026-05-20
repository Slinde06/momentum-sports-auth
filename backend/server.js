const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const protect = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/register", async (req, res) => {

    try {

        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.json({
            message: "Login successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});