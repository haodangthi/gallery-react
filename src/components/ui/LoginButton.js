import { useAuthContext } from "../../context/AuthContext";

export function LoginButton() {
    const { currentUser, login, logout } = useAuthContext()

    if (currentUser) {
        return (<button className="btn btn-primary ml-2" onClick={logout}>Log Out</button>)
    }

    return (<button className="btn btn-primary ml-2" onClick={login}>Log In</button>)
}