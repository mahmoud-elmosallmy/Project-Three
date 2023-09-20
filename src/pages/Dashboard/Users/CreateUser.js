import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../dashboard.css';
import {User} from "../../Website/Context/UserContext";


export default function CreateUser() {
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')         
    const [rpassword,setRpassword] = useState('')
    const [accept,setAccept] = useState(false)
    const [emailError,setEmailError] = useState(false)

    const context = useContext(User)
    const token = context.auth.token
    // Navigate
    const nav = useNavigate()

    async function Submit(e) {
        let f = true;
        e.preventDefault();
        setAccept(true);
        if (name === '' || password.length < 2 || rpassword !== password) {
            f = false;
        } else  f =  true;
        try {
            if (f) {
                const res = await axios.post(`http://127.0.0.1:8000/api/user/create`,
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: rpassword,
    
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                nav('/dashboard/users')
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
            <h1>Create User</h1>
            <div className="createuser">
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
                        <button type="submit">Create User</button>
                    </div>
                </form>
            </div>
        </>
    )
}