import { NavLink } from "react-router-dom";

export default function SideBar() {
    return(
        <div className="side-bar container">
            <NavLink  to='/dashboard/users' className="item-link">
                <i className="fa-solid fa-users move"></i>
                Users
            </NavLink>

            <NavLink  to='/dashboard/user/create' className="item-link">
                <i className="fa-solid fa-user-plus move"></i>
                New User
            </NavLink>

            <NavLink  to='/dashboard/products/' className="item-link">
                <i className="fa-brands fa-product-hunt move"></i>
                Products
            </NavLink>

            <NavLink  to={'/dashboard/products/create'} className="item-link">
                <i className="fa-solid fa-cart-plus move"></i>
                New Products
            </NavLink>
            <NavLink  to={'/dashboard/products/'} className="item-link">
                <i className="fa-solid fa-cart-plus move"></i>
                New Products
            </NavLink>

            <NavLink  to={'/dashboard/user/test'} className="item-link">
                <i className="fa-solid fa-cart-plus move"></i>
                
                test</NavLink>
        </div>
    );
}
