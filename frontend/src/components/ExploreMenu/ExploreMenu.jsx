import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">Discover a wide variety of delicious dishes from local restaurants, tailored to satisfy every craving. Whether you're in the mood for something new or a favorite classic, our menu has something for everyone!</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className="explore-menu-list-item" key={index}>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    ))
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
