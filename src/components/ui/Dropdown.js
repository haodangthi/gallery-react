import { useAuthContext } from "../../context/AuthContext";
import { LoginButton } from "./LoginButton";

export function Dropdown() {
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