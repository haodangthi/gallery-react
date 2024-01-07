import Navbar from "./NavBar";

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar/>
            <div className="container text-center">
                {
                    children
                }
            </div>
        </>
    )
}