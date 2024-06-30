import User from '../model/UserModel.js'

// add items to user cart

export const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const cartData = await user.cartData

        if (!cartData[req.params.cartId]) {
            cartData[req.params.cartId] = 1
        } else {
            cartData[req.params.cartId] += 1
        }

        await User.findByIdAndUpdate(req.user._id, { cartData })
        res.status(200).json({ success: true, message: "Item added to cart successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

// add items to user cart
export const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const cartData = await user.cartData
        if (!cartData[req.params.cartId]) {
            return res.status(400).json({ success: false, message: "Item does not exist in cart" })
        } else if (cartData[req.params.cartId] === 1) {
            cartData[req.params.cartId] -= 1
            delete cartData[req.params.cartId]
        } else {
            cartData[req.params.cartId] -= 1
        }
        await User.findByIdAndUpdate(req.user._id, { cartData })
        res.status(200).json({ success: true, message: "Item removed to cart successfully" })
    } catch {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

// fetch user cart data
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const cartData = await user.cartData
        res.status(200).json({ success: true, cartData })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}
