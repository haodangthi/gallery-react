import {useAuthContext} from "../context/AuthContext";
import {useContext, useEffect, useMemo} from "react";
import { getImagesById} from "../handlers/firestore";
import {Context} from "../context";
import List from "./List";

export const MyPhotos = () => {
    const { state, dispatch } = useContext(Context)
    const { currentUser } = useAuthContext()

    useEffect(() => {
        if (currentUser) {
            getImagesById(currentUser.uid).then((items) => {
                dispatch({ type: 'setUserItems', payload: { items } })
                console.log('get my photos')
            })
        }
    }, [currentUser, state.items])

    const items = useMemo(() => { return state.userItems; }, [state.userItems])

    return (
        <>
            My photos
            <List items={items}/>
        </>
    )
}