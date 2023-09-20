import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingScreen from "../../../components/Loading";
import { User } from "../Context/UserContext";

export default function PresistLogin() {

    // Get current User
    const context = useContext(User)
    const token = context.auth.token
    console.log(token)
    
    // Loading
    const [loading, setLoading] = useState(true)
    
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer")
    console.log(getToken)


    useEffect(() => {
        async function Refresh() {
            try {
                await axios.post("http://127.0.0.1:8000/api/refresh", null ,
                {
                    headers: {
                        Authorization: "Bearer " + getToken,
                    },
                }) 
                // .then((da) => console.log(da))
                .then((da) => {
                        console.log(da)
                        console.log(da.data.token)
                        cookie.set("Bearer", da.data.token)
                        context.setAuth((prev) => {
                                // return { ...prev, token: da.data.token}
                                return { userDetails: da.data.user , token: da.data.token}
                        })
                    }
                );
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        !token ? Refresh() : setLoading(false)
    },[])

    return loading ? <LoadingScreen /> : <Outlet />;
}