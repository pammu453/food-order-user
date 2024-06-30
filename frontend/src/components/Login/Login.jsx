import React, { useContext, useState } from 'react'
import "./Login.css"
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify'

const Login = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Sign Up");

    const { setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let newURL = ""

        if (currState === "Sign Up") {
            newURL = "/api/user/signUp"
        } else {
            newURL = "/api/user/signIn"
        }

        try {
            const response = await axios.post(newURL, data);
            if (response.data.success) {
                toast.success(response.data.message);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onSubmitHandler} className="login-container">
                <div className="login-title">
                    <h1>{currState}</h1>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-inputs">
                    <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} hidden={currState === "Sign In"} type="text" placeholder="Your name" required={currState === "Sign Up"} />
                    <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" placeholder="Your email" required />
                    <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="Password" required />
                </div>
                <button>{currState === "Sign Up" ? "Sign Up" : "Sign In"}</button>
                <p>{currState === "Sign Up" ? "Already Registered?" : "Don't have an account ?"}
                    <span className='choose-type' onClick={() => setCurrState(prev => prev === "Sign Up" ? "Sign In" : "Sign Up")}>Click here</span>
                </p>
            </form>
        </div>
    )
}

export default Login
