import { Route, Routes } from "react-router-dom";
// Dashboard
import Dashborad from "./pages/Dashboard/Dashboard";
// Users
import Users from "./pages/Dashboard/Users/Users";
import UpdateUser from "./pages/Dashboard/Users/Updateuser";
import CreateUser from "./pages/Dashboard/Users/CreateUser";
import Test from "./pages/Dashboard/Users/test";
// Products
import Products from "./pages/Dashboard/products/Products";
import CreateProducts from "./pages/Dashboard/products/CreateProducts";
import UpdateProduct from "./pages/Dashboard/products/UpdateProduct";
// Website
import Home from "./pages/Website/Home";
import About from "./pages/Website/About";
// Auth
import SignUp from "./pages/Website/Auth/SignUp";
import Login from "./pages/Website/Auth/Login";
import RequireAuth from "./pages/Website/Auth/RequireAuth";
import PersistLogin from "./pages/Website/Auth/PersistLogin";

export default function App() {

    return (
        <>
            <Routes>
                <Route path="/register" element={<SignUp />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                {/* Protected Routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/dashboard" element={<Dashborad />}>
                            <Route path="users" element={<Users />} />
                            <Route path="users/:id" element={<UpdateUser />} />
                            <Route path="user/create" element={<CreateUser />} />
                            <Route path="products" element={<Products />} />
                            <Route path="products/create" element={<CreateProducts />} />
                            <Route path="products/:id" element={<UpdateProduct />} />
                            <Route path="user/test" element={<Test />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
            </>
)}
















// import { Route, Routes } from "react-router-dom";
// import SignUp from "./SignUp";
// import Login from "./Login";
// import Home from "./Home";
// import About from "./About";
// import Dashborad from "./Dashboard";
// import Users from "./Users";
// import UpdateUser from "./Updateuser";

// export default function App() {

//     return (<>
//                 <Routes>
//                     <Route path="/register" element={<SignUp />}/>
//                     <Route path="/login" element={<Login />}/>
//                     <Route path="/" element={<Home />}/>
//                     <Route path="/about" element={<About />}/>
//                     <Route path="/dashboard" element={<Dashborad />}>
//                         <Route path="users" element={<Users />} />
//                         <Route path="users/:id" element={<UpdateUser />} />
//                     </Route>
//                 </Routes>
//             </>); 
// }