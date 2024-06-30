import express from 'express'
import { placeOrder, verifyOrder, userOrders, adminOrders, updateOrder } from '../controllers/orderController.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.post("/placeOrder", verifyToken, placeOrder)
router.post("/verifyOrder", verifyOrder)
router.get("/userOrders", verifyToken, userOrders)
router.get("/adminOrders", adminOrders)
router.post("/updateOrder", updateOrder)

export default router