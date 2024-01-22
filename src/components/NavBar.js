import { useAuthContext } from "../context/AuthContext";
import { memo } from "react";
import { Link } from "react-router-dom";
import { SearchForm } from "./SearchForm";
import { Dropdown } from "./ui/Dropdown";

function Navigation() {
    const { currentUser } = useAuthContext()

    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                { currentUser && <li className="nav-item">
                    <Link className="nav-link" to="my-photos">My photos</Link>
                </li>}
            </ul>
            <SearchForm/>
            <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        Dropdown
                    </a>
                    <Dropdown/>
                </li>
            </ul>
        </div>
    )
}

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Navigation/>
            </div>
        </nav>
    );
}

const MemoizedNavbar = memo(Navbar, (prevProps, nextProps) => {
    if (prevProps) {
        return true; // props are equal
    }
    return false; // props are not equal -> update the component
})
export default MemoizedNavbar;