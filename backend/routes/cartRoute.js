import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.post("/addToCart/:cartId", verifyToken, addToCart)
router.post("/removeFromCart/:cartId", verifyToken, removeFromCart)
router.get("/getCart", verifyToken, getCart)

export default router