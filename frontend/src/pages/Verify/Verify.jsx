import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const navigate = useNavigate()

    const verifyPayment = async () => {
        const res = await axios.post(`/api/order/verifyOrder`, { success: status, orderId })
        if (res.data.success) {
            navigate("/myOrders")
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <div className="spinner">
            </div>
        </div>
    )
}

export default Verify
