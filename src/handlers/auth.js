import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../lib/firebase.config'

const provider = new GoogleAuthProvider();

const Auth = {
    singIn: () => signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;

            console.log('user', user)

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }),
    signOut: () => signOut(auth).then(() => {
        console.log(' Sign-out successful.')
    }).catch((error) => {
        // An error happened.
    })
}

export default Auth