import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");

    const { totalPrice, token, setToken } = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        setToken("")
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={assets.logo} alt="" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#food-display' onClick={() => setMenu("top-dishes")} className={menu === "top-dishes" ? "active" : ""}>Top Dishes</a>
                <a href='#contact-us' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to={"/cart"}>
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    {
                        totalPrice === 0 ? "" : <div className="dot"></div>
                    }
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} />
                        <ul className="nav-profile-dropdown">
                            <li className="nav-profile-dropdown-item">
                                <img src={assets.bag_icon} alt="" />
                                <Link to="/myOrders">Orders</Link>
                            </li>
                            <li onClick={logout} className="nav-profile-dropdown-item">
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
