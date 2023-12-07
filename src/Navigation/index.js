import { Link, useLocation } from "react-router-dom";
import Search from "../Search";

function Navigation() {
    const links = ["Home", "Login", "Profile", "Signup", "Search"]
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
                        {links.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className={`nav-link ${pathname.includes(link) && "active fw-bold"}`} to={`/${link}`}>
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Navigation;