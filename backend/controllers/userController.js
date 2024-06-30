import User from "../model/UserModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import validator from "validator"

//Sign up
export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password should be atleast 6 characters" })
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })
        const userData = await newUser.save()

        const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({ success: true, message: "User created successfully", token })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//Sign in
export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Incorrect password" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({ success: true, message: "User logged in successfully", token })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}