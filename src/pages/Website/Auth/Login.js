import { useContext, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import "./index.css"
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [accept,setAccept] = useState(false)
    const [error,setError] = useState("")

    const showUser = useContext(User)
    console.log(showUser)
    
    const nav = useNavigate()
  
    const cookie = new Cookies();

    async function Submit(e) {
        let f = true;
        e.preventDefault();
        setAccept(true);
        if ( password.length < 8) {
            f = false;
        } else  f =  true;
        try {
            if (f) {
                let res = await axios.post('http://127.0.0.1:8000/api/login',
                {
                    email: email,
                    password: password,
                })
                const token = res.data.data.token;
                cookie.set("Bearer",token);
                const userDetails = res.data.data.user;
                showUser.setAuth({token, userDetails})
                nav('/dashboard')
            }
        } catch (err) {
            if (err.response.status === 422 || err.response.status === 401) {
                setError(true)
            }
            setAccept(true)
        }
    }
    
    return(
        <>
            <Header />
            {/* <button onClick={name}>name</button> */}
        <div className="parent-login d-flex">
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input id="email" type="email" placeholder="Email..." required onInput={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input id="password" type="password" placeholder="Password..." onInput={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <div style={{textAlign: "center",alignItems: 'center'}}>
                    <button type="Submit">Log In</button>
                </div>
                    {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>}
                    {accept && error && <p className="error">Wrong Email Or Password</p>}
            </form>
        </div>
        </>
    )
}