import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    const { token } = useContext(StoreContext);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`/api/order/userOrders`, { headers: { token } });
            setOrders(response.data.orders);
        };
        fetchOrders();
    }, [token]);

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            <div className="orders-grid">
                {orders.length !== 0 ? <>
                    {
                        orders.map(order => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <h3>Order ID: {order._id}</h3>
                                    <p>{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="order-body">
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Total Amount:</strong> ₹{order.amount}</p>
                                    <p><strong>Payment:</strong> {order.payment ? 'Paid' : 'Pending'}</p>
                                    <div className="order-items">
                                        {order.items.map(item => (
                                            <div key={item._id} className="order-item">
                                                <img src={"/api/images/" + item.image} alt={item.name} />
                                                <div>
                                                    <h4>{item.name}</h4>
                                                    <p>₹{item.price}</p>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}</p>
                                </div>
                            </div>
                        ))
                    }
                </> : <>
                    <h3>No orders found</h3>
                </>}

            </div >
        </div >
    );
};

export default MyOrders;
