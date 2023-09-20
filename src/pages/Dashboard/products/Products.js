import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User } from "../../Website/Context/UserContext"

export default function Products() {
    
    const [products , setProducts] = useState([])
    const [pre , setPre] = useState(0)
    // console.log(users)

    const context = useContext(User)
    console.log(context)
    const token = context.auth.token


    console.log(token)

    // Request Users
    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/product/show",
        // ===================== The backend knows that he is logged in ========================
        {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token,
            },
        }
        // =============================================
        )
        // .then((d) => console.log(d))
        .then((d) => setProducts(d.data))
        .catch((err) => console.log(err));
    },[pre])
    // Print Users
    const dataShow = products.map((p ,i) =>
    <>
        <tr key={i}>
            <td>{i + 1}</td>
            <td>{p.title}</td>
            <td>{p.description}</td>
            <td>{p.image}</td>
            <td>
                <Link to={`${p.id}`}><i className="fa-solid fa-pen-to-square update"></i> </Link>/
                <Link><i className="fa-solid fa-trash delete" onClick={() => deleteProduct(p.id)}></i></Link>
            </td>
        </tr>
        <p><image src='20230710124826.jpg' alt="img" />========={p.image}</p>
        </>
    )
    // Delete User
    async function deleteProduct(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            if (res.status === 200) {
                setPre((pre) => pre + 1)
            }
        } catch (err){
            console.log(err)
        }
    }
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{dataShow}</tbody>
            </table>
        </div>
    )
}


















// import axios from "axios"
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"


// export default function Users() {
//     const [users,setUsers] = useState([])
//     const [runUseEffect,setRun] = useState(0)

//     useEffect( () => {
//         fetch("http://127.0.0.1:8000/api/user/show")
//         .then((t) => t.json())
//         .then((data) => setUsers(data))
//     },[runUseEffect])

//     const dataShow = users.map((u,i) => 
//     <tr key={i}>
//         <td>{i + 1}</td>
//         <td>{u.name}</td>
//         <td>{u.email}</td>
//         <td>
//             <Link to={`${u.id}`} >
//                 <i className="fa-solid fa-pen-to-square update"></i>
//             </Link>
//               /  
//             <i className="fa-solid fa-trash delete" onClick={() => delateUser(u.id)}></i></td>
//     </tr>
//     )
//     async function delateUser(id) {
//         try {
//             const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`)
//             if (res.status === 200) {
//                 setRun((pre) => pre + 1)
//             }
//         } catch {
//             console.log('none')
//         }
//     }

//     return (
//         <div className="table">
//             <table>
//             <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>{dataShow}</tbody>
//         </table>
//         </div>
//     )
// }
