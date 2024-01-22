import {useAuthContext} from "../context/AuthContext";
import {useContext, useEffect, useMemo} from "react";
import { getImagesById} from "../handlers/firestore";
import { Context } from "../context/context";
import List from "../components/List";

export const MyPhotos = () => {
    const { state, dispatch } = useContext(Context)
    const { currentUser } = useAuthContext()

    useEffect(() => {
        if (currentUser) {
            getImagesById(currentUser.uid).then((items) => {
                dispatch({ type: 'setUserItems', payload: { items } })
            })
        }
    }, [currentUser, state.items])

    const items = useMemo(() => { return state.shownItems; }, [state.userItems, state.searchFilter])

    return (
        <>
            My photos
            <List items={items}/>
        </>
    )
}