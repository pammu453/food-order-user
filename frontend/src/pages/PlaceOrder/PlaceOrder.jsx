import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const { totalPrice, token, updatedFoodList, cartItems } = useContext(StoreContext)

    const navigate = useNavigate()

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    });


    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        const updatedFoodListWithQuantities = updatedFoodList.map((food) => {
            const quantity = cartItems[food._id]
            return {
                ...food,
                quantity
            }
        })
        let orderData = {
            address: data,
            amount: totalPrice,
            items: updatedFoodListWithQuantities
        }
        let response = await axios.post(`/api/order/placeOrder`, orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data
            window.location.replace(session_url)
        } else {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        if (totalPrice == 0 || !token) {
            navigate("/")
        }
    })

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <h1 className="title">Delivery information</h1>
                <div className="multi-fields">
                    <input required onChange={changeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
                    <input required onChange={changeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required onChange={changeHandler} name='email' value={data.email} type="email" placeholder='email' />
                <input required onChange={changeHandler} name='street' value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required onChange={changeHandler} name='city' value={data.city} type="text" placeholder='City' />
                    <input required onChange={changeHandler} name='state' value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required onChange={changeHandler} name='zipCode' value={data.zipCode} type="text" placeholder='Zip code' />
                    <input required onChange={changeHandler} name='country' value={data.country} type="text" placeholder='Country' />
                </div>
                <input required onChange={changeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="place-order-cart-total">
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
                    <button type='submit'>Proceed to Payment</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
