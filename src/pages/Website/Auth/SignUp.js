import { useContext, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import "./index.css"
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')         
    const [rpassword,setRpassword] = useState('')
    const [accept,setAccept] = useState(false)
    const [emailError,setEmailError] = useState(false)

    // User
    const showUser = useContext(User)

    // Navigate
    const nav = useNavigate()
    // Cookies
    const cookie = new Cookies()

    async function Submit(e) {
        let f = true;
        e.preventDefault();
        setAccept(true);
        if (name === '' || password.length < 2 || rpassword !== password) {
            f = false;
        } else  f =  true;
        try {
            if (f) {
                const res = await axios.post(`http://127.0.0.1:8000/api/register`,
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: rpassword,
    
                })
                const token = res.data.data.token;
                const userDetails = res.data.data.user;
                cookie.set("Bearer",token)
                showUser.setAuth({token , userDetails})
                nav('/dashboard')
            }
        } catch (err) {
            if (err.response.status === 422 || err.response.status === 401) {
                setEmailError(true)
            }
            setAccept(true)
        }
    }
    return(
        <>
        <Header />
            <div className="register">
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor="name">Name : </label>
                    <input id="name" type="text" placeholder="Name..." required onInput={(e) => setName(e.target.value)} value={name}/>
                    {name.length === 2 && accept && <p className="error">Name must be more than 2 char</p>}
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input id="email" type="email" placeholder="Email..." required onInput={(e) => setEmail(e.target.value)} value={email}/>
                    {accept && emailError && <p className="error">Email Is Already Been Taken</p>}
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input id="password" type="password" placeholder="Password..." onInput={(e) => setPassword(e.target.value)} value={password}/>
                    {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>}
                </div>
                <div>
                    <label htmlFor="repeat">Repeat Password : </label>
                    <input id="repeat" type="password" placeholder="Repeat Password..." onInput={(e) => setRpassword(e.target.value)} value={rpassword}/>
                    {rpassword !== password && accept && <p className="error">Password dose not match</p>}
                </div>
                <div style={{textAlign: "center",alignItems: 'center'}}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
        </>
    )
 }