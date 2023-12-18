import Navbar from "./NavBar";

export const Layout = ({ children }) => {
    console.log('Layout')

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