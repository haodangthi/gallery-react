import { doc, setDoc, serverTimestamp, getDocs, collection, where, query } from "firebase/firestore";

import db from '../lib/firebase.config'
export const addImage  = (inputs, collectionName) => {
    const randomIndex = Math.floor(Math.random() * 1000000000)

    const docRef = doc(db, collectionName, `${randomIndex}`);

    return setDoc(
        docRef ,
        {
            title: inputs.title,
            path: inputs.path ,
            userId: inputs.userId ,
            createdAt: serverTimestamp()
        }
    );
}

export const getImages = () => {
    return getDocs(collection(db, "stocks")).then(snapshots => {
        const docs = []

        snapshots.forEach(doc => {
            const document = {...doc.data(), id: doc.id}
            docs.push(document)
        })

        return docs
    })
}

export const getImagesById = (userId) => {
    const queryName = query(collection(db, "stocks"), where('userId', '==', userId))

    return getDocs(queryName).then(snapshots => {
        const docs = []

        snapshots.forEach(doc => {
            const document = {...doc.data()}
            docs.push(document)
        })

        return docs
    })
}
