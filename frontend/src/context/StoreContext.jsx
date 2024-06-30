import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const loggedInToken = localStorage.getItem("token")

    const [token, setToken] = useState(loggedInToken);

    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: cartItems[itemId] + 1 }))
        }
        if (token) {
            await axios.post(`/api/cart/addToCart/${itemId}`, {}, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 1) {
            setCartItems(prev => ({ ...prev, [itemId]: cartItems[itemId] - 1 }))
        } else {
            delete cartItems[itemId]
            setCartItems(prev => ({ ...prev }))
        }
        if (token) {
            await axios.post(`/api/cart/removeFromCart/${itemId}`, {}, { headers: { token } });
        }
    }

    const loadCart = async () => {
        const res = await axios.get(`/api/cart/getCart`, { headers: { token } });
        setCartItems(res.data.cartData)
    }

    useEffect(() => {
        const getFoodList = async () => {
            try {
                const res = await axios.get(`/api/food/getAllFoodItems`);
                const foodItems = res.data.foodItems.map(item => {
                    return {
                        ...item,
                        image: `/api/images/${item.image}`
                    };
                });
                setFoodList(foodItems);
            } catch (error) {
                console.error("Failed to fetch food items", error);
            }
        };

        getFoodList();
        loadCart();
    }, []);

    const updatedFoodList = food_list.filter(food => cartItems[food._id])
    const totalPrice = updatedFoodList.reduce((acc, curr) => acc + curr.price * cartItems[curr._id], 0)

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        totalPrice,
        updatedFoodList,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
