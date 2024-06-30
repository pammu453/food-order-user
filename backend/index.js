import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

import path from "path"

//app config
const app = express()
const PORT = 5000

//env config
dotenv.config()

const __dirname = path.resolve()

//middleware
app.use(express.json())
app.use(cors())


//api routes
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/images", express.static(path.join(__dirname, "backend", 'uploads')))


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

//database config
connectDB()

//server config
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`)
})