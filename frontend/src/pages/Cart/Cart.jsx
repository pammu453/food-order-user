import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { removeFromCart, cartItems, totalPrice, updatedFoodList, token } = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {updatedFoodList.length == 0 && <h3 style={{ marginTop: "10px" }}>You Don't have items in Cart</h3>}
        {
          updatedFoodList.map(food => (
            <>
              <div className="cart-items-list" key={food._id}>
                <img className='cart-item-img' src={food.image} alt="" />
                <p>{food.name}</p>
                <p>₹{food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>₹{cartItems[food._id] * food.price}</p>
                <img className='remove-icon' onClick={() => removeFromCart(food._id)} src={assets.cross_icon} alt="" />
              </div>
              <hr />
            </>
          )
          )
        }
      </div>
      <div className="cart-total">
        <h1>Cart Total</h1>
        <div className='cart-total-items'>
          <p>SubTotal</p>
          <p>₹{totalPrice}</p>
        </div>
        <br />
        <hr />
        <div className='cart-total-items'>
          <p>Delivery Fee</p>
          <p>₹{updatedFoodList.length === 0 ? "0" : 10}</p>
        </div>
        <br />
        <hr />
        <div className='cart-total-items'>
          <p>Total</p>
          <p>₹{totalPrice + (updatedFoodList.length === 0 ? 0 : 10)}</p>
        </div>
        <br />
        <hr />
        <button onClick={() => navigate("/order")} disabled={updatedFoodList.length === 0 || !token}>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default Cart
