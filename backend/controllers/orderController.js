import User from '../model/UserModel.js'
import Order from '../model/OrderModel.js'
import Stripe from "stripe"
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const frontend_url = "https://food-order-user.onrender.com"

// placing order from frontend
export const placeOrder = async (req, res) => {
    const { items, amount, address } = req.body

    try {
        const newOrder = await Order({
            userId: req.user._id,
            items,
            amount,
            address
        })
        await newOrder.save()

        await User.findByIdAndUpdate(req.user._id, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 10 * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body

    try {
        if (success == "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true })
            res.status(200).json({ success: true, message: "Paid" })
        } else {
            await Order.findByIdAndDelete(orderId)
            res.status(200).json({ success: false, message: "Not paid" })
        }
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//user orders for frontend
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//admin orders for backend
export const adminOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//admin update order status
export const updateOrder = async (req, res) => {
    const { orderId, status } = req.body
    try {
        await Order.findByIdAndUpdate(orderId, { status })
        res.status(200).json({ success: true, message: "Status updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}