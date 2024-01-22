import './App.css';
import { Layout } from "./components/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { MyPhotos } from "./pages/MyPhotos";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

import Gallery from "./pages/Gallery";
import ImagePage from "./pages/ImagePage";


function App() {
    const { currentUser, authenticate } = useAuthContext()

    useEffect( () => {
        authenticate()
    }, [])

  return (
      <>
          <Layout>
              <Routes>
                  <Route path="/" element={ <Gallery/> } />
                  <Route path="my-photos" element={ currentUser ? <MyPhotos/> : <Navigate to="/"/> }/>
                  <Route path='image/:id' element={<ImagePage/>}/>
              </Routes>
          </Layout>
      </>
  );
}

export default App;
