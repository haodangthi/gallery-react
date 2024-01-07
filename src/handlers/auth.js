import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../lib/firebase.config'

const provider = new GoogleAuthProvider();

const Auth = {
    signIn: () => signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            return result.user;

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage, errorCode)
        }),
    signOut: () => signOut(auth).then(() => {
        console.log(' Sign-out successful.')
    }).catch((error) => {
        // An error happened.
    }),
    getCurrentUser: () => new Promise(resolve => {
        return auth.onAuthStateChanged((user) => {
            resolve(user)
        })
    })
}

export default Auth