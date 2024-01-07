import { useAuthContext } from "../context/AuthContext";
import { memo } from "react";
import {Link} from "react-router-dom";

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

function SearchForm() {
    return (
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
}

function Dropdown() {
    const { currentUser } = useAuthContext()
    return (
        <ul className="dropdown-menu login-dropdown-menu">
            { currentUser && <>
                <li><a className="dropdown-item" href="#">{currentUser.displayName}</a></li><li>
                <hr className="dropdown-divider"/>
            </li>
            </> }
            <LoginButton/>
        </ul>
    );
}

function LoginButton() {
    const { currentUser, login, logout } = useAuthContext()

    if (currentUser) {
        return (<button className="btn btn-primary ml-2" onClick={logout}>Log Out</button>)
    }

    return (<button className="btn btn-primary ml-2" onClick={login}>Log In</button>)
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