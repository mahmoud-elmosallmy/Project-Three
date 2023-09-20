import { useContext, useEffect, useState } from "react"
import axios from "axios";
import '../dashboard.css'
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UpdateProducts() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [accept,setAccept] = useState(false)

    const context = useContext(User)
    console.log(context)
    const token = context.auth.token
    console.log(token)
  
    // Navigate
    const nav = useNavigate()

    const id = +window.location.pathname.split('/').slice(-1)[0];
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/showbyid/${id}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((data) => data.json())
        .then((t) => {
            setTitle(t[0].title)
            setDescription(t[0].description)
        })
    },[])

    async function Submit(e) {
        let f = true;
        e.preventDefault();
        setAccept(true);
        if (title === '') {
            f = false;
        } else  f =  true;
        try {
            if (f) {
                const res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
                {
                    title: title,
                    description: description,
                    image: image,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                // if (res.status === 200) {
                    // ( props.hasLocalStorage && window.localStorage.setItem('email',email))
                    // window.location.pathname = `${props.pathname}`;
                // }
                // console.log(res);
                nav('/dashboard/users')
            }
        } catch (err) {
            if (err.response.status === 422 || err.response.status === 401) {
                // setEmailError(true)
            }
            setAccept(true)
        }
    }
    return(
        <>
            <h1>Update Product</h1>
            <div className="createuser">
                <form onSubmit={Submit}>
                    <div>
                        <label htmlFor="title">Title : </label>
                        <input id="title" type="text" placeholder="Title..." required onInput={(e) => setTitle(e.target.value)} value={title}/>
                        {title.length === 2 && accept && <p className="error">Name must be more than 1 char</p>}
                    </div>
                    <div>
                        <label htmlFor="description">Description : </label>
                        <input id="description" type="text" placeholder="Description..." required onInput={(e) => setDescription(e.target.value)} value={description}/>
                        {/* {accept && emailError && <p className="error">Email Is Already Been Taken</p>} */}
                    </div>
                    <div>
                        <label htmlFor="image">Image : </label>
                        <input id="image" type="file" placeholder="Image..." onInput={(e) => setImage(e.target.files.item(0))} value={image}/>
                        {/* {image.length < 8 && accept && <p className="error">Password must be more than 8 char</p>} */}
                    </div>
                    <div style={{textAlign: "center",alignItems: 'center'}}>
                        <button type="submit">Update Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}