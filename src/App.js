import './App.css';
import { Layout } from "./components/Layout";
import Gallery from "./components/Gallery";
import {Route, Routes, Navigate} from "react-router-dom";
import {MyPhotos} from "./components/MyPhotos";
import {useAuthContext} from "./context/AuthContext";
import {useEffect} from "react";
import ImagePage from "./components/ImagePage";

//render={(props) => <ImagePage {...props} userData={props.userData}/>


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
