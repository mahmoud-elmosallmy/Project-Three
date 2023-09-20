import { useEffect, useState } from "react"
export default function Test() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/30`)
        .then((data) => data.json())
        .then((t) => {
            setName(t[0].name)
            setEmail(t[0].email)
        })
    },[])

    useEffect(() => {
        setName("nameEEEEEEEEE")
        setEmail("emailEEEEEEEEE")
    },[])

    return(
        <>
            <h1>Update User</h1>
            <h1>Update {name}</h1>
            <h1>Update {email}</h1>
        </>
    )
}