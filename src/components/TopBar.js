import { Link } from "react-router-dom";
export default function TopBar() {
    return(
        <div className="top-bar d-flex container shadow">
            <h1>Store</h1>
            <Link to='/' className="register-nav">
                Go To Web Site
            </Link>
        </div>
    );
}