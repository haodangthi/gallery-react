import { doc, setDoc, serverTimestamp, getDocs, collection } from "firebase/firestore";

import db from '../lib/firebase.config'

const Firestore = {
    writeDoc: (inputs, collectionName) => {
        return new Promise(async resolve => {
            const randomIndex = Math.floor(Math.random() * 1000000000)

            const docRef = doc(db, collectionName, `${randomIndex}`);

            await setDoc(docRef , { title: inputs.title, path: inputs.path , createdAt: serverTimestamp() });
            resolve('new doc successfully inserted')
        })
    },
    getDoc: () => {
        return new Promise(async resolve => {
            const docs = []

            const snapshots = await getDocs(collection(db, "stocks"))

            snapshots.forEach(doc => {
                const document = {...doc.data()}
                docs.push(document)
            })
            resolve(docs)
        })
    }
}
export default Firestore
