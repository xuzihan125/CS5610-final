import { Link, useLocation } from "react-router-dom";
import Search from "../Search";

function Navigation() {
    const links = ["Home", "Signin", "Profile", "Signup", "Search"]
    const { pathname } = useLocation();
    return (
        <div className="navbar navbar-expand-lg fixed-top bg-success-subtle">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/Home"}>CookWhat</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerTarget" aria-controls="navbarTogglerTarget" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerTarget">
                    <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                        <li className="nav-item" key={0}>
                            <Link className={`nav-link ${pathname.includes("home") && "active fw-bold"}`} to={"/home"}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item" key={1}>
                            <Link className={`nav-link ${pathname.includes("search") && "active fw-bold"}`} to={"/search"}>
                                Search Recipes
                            </Link>
                        </li>
                        <li className="nav-item" key={2}>
                            <Link className={`nav-link ${pathname.includes("signin") && "active fw-bold"}`} to={"/users/signin"}>
                                Signin
                            </Link>
                        </li>
                        <li className="nav-item" key={3}>
                            <Link className={`nav-link ${pathname.includes("signup") && "active fw-bold"}`} to={"/users/signup"}>
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item" key={4}>
                            <Link className={`nav-link ${pathname.includes("account") && "active fw-bold"}`} to={"/users/account"}>
                                Account
                            </Link>
                        </li>
                        <li className="nav-item" key={5}>
                            <Link className={`nav-link ${pathname.includes("userSearch") && "active fw-bold"}`} to={"/userSearch"}>
                                Search User
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Navigation;