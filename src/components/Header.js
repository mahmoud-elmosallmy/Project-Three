import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
    const cookie = new Cookies()
    const token = cookie.get("Bearer")
    console.log(token)
    
    async function handleLogOut() {
        await axios.post(`http://127.0.0.1:8000/api/logout`,null,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove("Bearer");
        window.location.pathname = "/";
    }
    return(
        <div className="header d-flex container shadow">
            <div className="links">
                <h3><Link to={"/home"}>Home</Link></h3>
                <h3><Link to={"/about"}>About</Link></h3>
            </div>
            <div>

                {!token ? 
                    (<>
                        <Link to={"/register"} style={{textAlign: "center",alignItems: 'center'}} className="register-nav">
                            Register
                        </Link>
                        <Link to={"/login"} style={{textAlign: "center",alignItems: 'center'}} className="register-nav">
                            Login
                        </Link>
                    </>
                    ) :(
                    <>
                        <Link to={"/dashboard"} style={{textAlign: "center",alignItems: 'center'}} className="register-nav">
                            Dashboard
                        </Link>
                         <Link to={"/login"} style={{textAlign: "center",alignItems: 'center'}} className="register-nav" onClick={handleLogOut}>
                            Log Out
                        </Link>
                    </>)
                }
            </div>
        </div>
    );
}