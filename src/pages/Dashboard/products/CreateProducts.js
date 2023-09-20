import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../dashboard.css';
import {User} from "../../Website/Context/UserContext";


export default function CreateProducts() {
    
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    // console.log(image)
    const [accept,setAccept] = useState(false)

    const context = useContext(User)
    console.log(context)
    const token = context.auth.token
    console.log(token)
    // Navigate
    const nav = useNavigate()

    async function Submit(e) {
        let f = true;
        e.preventDefault();
        setAccept(true);
        if (title === '') {
            f = false;
        } else  f =  true;
        try {
            const formData = new FormData();
            formData.append("title",title)
            formData.append("description",description)
            formData.append("image",image)
            console.log(formData)
            if (f) {
                const res = await axios.post(`http://127.0.0.1:8000/api/product/create`,formData,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                console.log(res)
                nav('/dashboard/products')
            }
        } catch (err) {
            console.log(err)
            setAccept(true)
        }
    }
    return(
        <>
            <h1>Create User</h1>
            <div className="createuser">
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor="title">Title : </label>
                    <input id="title" type="text" placeholder="Title..." required onInput={(e) => setTitle(e.target.value)} value={title}/>
                    {title.length < 1 && accept && <p className="error">Title must be more than 1 char</p>}
                </div>
                <div>
                    <label htmlFor="description">Description : </label>
                    <input id="description" type="text" placeholder="Description..." required onInput={(e) => setDescription(e.target.value)} value={description}/>
                    {/* {accept && emailError && <p className="error">Email Is Already Been Taken</p>} */}
                </div>
                <div>
                    <label htmlFor="image">Image : </label>
                    <input id="image" type="file" placeholder="Image..." onInput={(e) => setImage(e.target.files.item(0))}/>
                    {/* {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>} */}
                </div>
                <div style={{textAlign: "center",alignItems: 'center'}}>
                    <button type="submit">Create Products</button>
                </div>
            </form>
        </div>
        </>
    )
}