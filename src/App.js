import { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import { UploadForm } from "./components/Upload"
import './App.css';
import { Layout } from "./components/Layout";
import { Context } from "./context";
import Firestore from "./handlers/firestore";
import Auth from './handlers/auth'

function App() {
    const {state, dispatch} = useContext(Context)

    const [count, setCount] = useState(state.items?.length)

    const collapse = () => dispatch({
        type: 'setIsVisible'
    })

    useEffect(() => {
        Firestore.getDoc().then((items) => {
            dispatch({ type: 'setItems', payload: { items } })
        })
    }, [])

    useEffect(() => {
        setCount(`you have ${state.items.length} image${state.items.length > 1 ? 's': ''}`)
    }, [state.items])

  return (
      <>
          <Layout>
              <button className="btn btn-primary" onClick={Auth.singIn}>'Log In'</button>
              <button className="btn btn-primary" onClick={Auth.signOut}>'Log Out'</button>
              <button className="btn btn-primary" onClick={collapse}>{state.isVisible ? 'Close': 'Upload'}</button>

              <UploadForm collapse={collapse}/>
              <h1 className="mt-5">Gallery</h1>
              {count}
              <div className="row">
                  {
                      state.items.map( (photo, index) => {
                          return (
                              <Card src={photo} key={index}/>
                          );
                      })
                  }
              </div>
          </Layout>
      </>
  );
}

export default App;
