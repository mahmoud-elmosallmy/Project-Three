import { createContext, useState } from "react";

export const User = createContext({})

export default function UserProvider({children}) {
    const [auth , setAuth] = useState({})
    console.log(auth)
    return <User.Provider value={{ auth, setAuth}}>{children}</User.Provider>;
}