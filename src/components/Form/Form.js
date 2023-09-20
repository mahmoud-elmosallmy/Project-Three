// import axios from "axios"
// import { useContext, useEffect, useState } from "react"
// import "./index.css"
// import { User } from "../../pages/Website/Context/UserContext";

// export default function Form(props) {
//     const [name,setName] = useState('')
//     // console.log(name)
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')
//     const [rpassword,setRpassword] = useState('')
//     const [accept,setAccept] = useState(false)
//     const [emailError,setEmailError] = useState("")

//     const showUser = useContext(User)

//     console.log(showUser)

//     const styleRegister = {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: '40px',
//     }
//     const form = {
//         boxShadow: "0 2px 15px rgb(0 0 0 /10%)",
//         width: "400px",
//     }
//     const button = {
//         width: "100%",
//         boxShadow: "none"
//     }
    
//     useEffect(() => {
//         setName(props.name)
//         console.log(`name${props.name}`)
//         setEmail(props.email)
//     },[props.name,props.email])
    
//     async function submit(e) {
//         let f = true;
//         e.preventDefault();
//         setAccept(true);
//         if (name === '' || password.length < 2 || rpassword !== password) {
//             f = false;
//         } else  f =  true;
//         try {
//             if (f) {
//                 const res = await axios.post(`http://127.0.0.1:8000/api/${props.api}`,
//                 {
//                     name: name,
//                     email: email,
//                     password: password,
//                     password_confirmation: rpassword,
    
//                 })
//                 if (res.status === 200) {
//                     ( props.hasLocalStorage && window.localStorage.setItem('email',email))
//                     // window.location.pathname = `${props.pathname}`;
//                 }
//                 const token = res.data.data.token;
//                 const userDetails = res.data.data.user;
//                 console.log(token);
//                 console.log(userDetails);
//                 showUser.setAuth({token, userDetails})
//             }
//         } catch (err) {
//             setEmailError(err.response.status)
//         }
//     }
//     return(
//         <div className="register" style={props.styleRegister && styleRegister && form }>
//             <form onSubmit={submit} style={props.btu && button}>
//                 <div>
//                     <label htmlFor="name">Name : </label>
//                     <input id="name" type="text" placeholder="Name..." onInput={(e) => setName(e.target.value)} value={name}/>
//                     {name === '' && accept && <p className="error">Username is Required</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="email">Email : </label>
//                     <input id="email" type="email" placeholder="Email..." required onInput={(e) => setEmail(e.target.value)} value={email}/>
//                     {accept && emailError === 422 && <p className="error">Email Is Already Been Taken</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password : </label>
//                     <input id="password" type="password" placeholder="Password..." onInput={(e) => setPassword(e.target.value)} value={password}/>
//                     {password.length < 2 && accept && <p className="error">Password must be more than 8 char</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="repeat">Repeat Password : </label>
//                     <input id="repeat" type="password" placeholder="Repeat Password..." onInput={(e) => setRpassword(e.target.value)} value={rpassword}/>
//                     {rpassword !== password && accept && <p className="error">Password dose not match</p>}
//                 </div>
//                 <div style={{textAlign: "center",alignItems: 'center'}}>
//                     <button type="submit" style={props.btu && button} >{props.button}</button>
//                 </div>
//             </form>
//         </div>
//     )
// }