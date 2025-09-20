import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

import { createContext, useContext } from "react";
import { computedTypesResolver } from "@hookform/resolvers/computed-types";

const firebaseConfig = {
    apiKey: "AIzaSyCEIDH7KZEVtbStDYyYDvjFEYFlnNi3mKw",
    authDomain: "app9-1a38c.firebaseapp.com",
    projectId: "app9-1a38c",
    storageBucket: "app9-1a38c.appspot.com",
    messagingSenderId: "1002276411364",
    appId: "1:1002276411364:web:28bfb9b305c4acbace59f1",
    measurementId: "G-LBFCJJ71Y8",
    databaseURL: "https://app9-1a38c-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export const firestorage = getFirestore(app);
const firebaseContext = createContext(null);
export const FirebaseProvider = (props) => {
    const signUpWithpasswordandemail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const google1 = () => {
        return signInWithPopup(auth, new GoogleAuthProvider())
    };
    const s = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };
    const putdata = () => {
        set(ref(db, "grad/fater"), {
            id: "78",
            "name": "kavya"
        })
    }
    const getd = () => {
        get(child(ref(db), "grad/fater")).then((snap) => {
            console.log(snap.val());

        });
    }
    onValue(ref(db, "grad/fater"), (snapshot) => {
        console.log(snapshot.val())
        console.log(snapshot.val().name)
    });

    const writedatainfirestore = async () => {
        try {
            await addDoc(collection(firestorage, 'cities'), {
                id: '1',
                location: "banda"
            });
            console.log("added");
        } catch (error) {
            console.error(error);
        }
    };


    const makesubcollection = async () => {
        try {
            await addDoc(collection(firestorage, "cities/WjEWUxvTwTgkV6i9d0qm/f"), {
                name: 'jjdjjd',
                date: Date.now()
            })
            console.log("added")
        }
        catch (e) {

            console.log(e)

        }
    }
    const getdoc = async () => {
        const ref = doc(firestorage, "cities", "WjEWUxvTwTgkV6i9d0qm");
        const snap = await getDoc(ref);
        console.log(snap.data());

    }
    const getdocbyquery = async () => {
        const ref = collection(firestorage, "cities");
        const q = query(ref, where("price", "==", "2"));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            console.log(doc.data());
        })

    }

    return (
        <firebaseContext.Provider value={{ getdocbyquery, getdoc, makesubcollection, writedatainfirestore, getd, signUpWithpasswordandemail, google1, s, putdata }}>
            {props.children}
        </firebaseContext.Provider>
    );

}

export const usefirebase = () =>
    useContext(firebaseContext);
export { app };