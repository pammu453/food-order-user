import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div className='food-display' id="food-display">
            <h2>Top dishes to you</h2>
            <div className="food-display-list">
                {food_list.filter(food => category === "All" || category === food.category).map(food => {
                    return <FoodItem key={food._id} id={food._id} name={food.name} price={food.price} description={food.description} image={food.image} />
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
