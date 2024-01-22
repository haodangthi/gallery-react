import UploadForm from "../components/Upload";
import { useContext, useEffect } from "react";
import { Context } from "../context";
import { getImages } from "../handlers/firestore";
import { useAuthContext } from "../context/AuthContext";
import List from "../components/List";

function Gallery() {
    const { state, dispatch } = useContext(Context)
    const { currentUser } = useAuthContext()

    useEffect(() => {
        getImages().then((items) => {
            dispatch({ type: 'setItems', payload: { items } })
        })
    }, [])

    return (<>
        { currentUser && currentUser.uid ? <UploadForm userId={ currentUser?.uid }/> : ''}
        <h1 className="mt-5">Gallery</h1>
        <List items={state.shownItems}/>
    </>)
}

export default Gallery;