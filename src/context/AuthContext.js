import {createContext, useCallback, useContext, useMemo, useState} from "react"
import Auth from "../handlers/auth";


const { signIn, signOut, getCurrentUser }= Auth
const Context = createContext()


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const login = () => signIn().then(setCurrentUser)
    const logout = () => signOut().then(() => setCurrentUser(null))
    const authenticate = useCallback(() => getCurrentUser().then(user => {
        setCurrentUser(user)
    }), [currentUser])

    const value = useMemo(() => {
        return {
            login,
            logout,
            authenticate,
            currentUser
        }
    }, [login, logout, currentUser], authenticate)

    return <Context.Provider value={value}>{children}</Context.Provider>
}


export const useAuthContext = () => {
    return useContext(Context)
}
export default AuthProvider