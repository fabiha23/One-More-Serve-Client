import React, { useEffect, useState } from 'react';
import { AuthDataContext } from './AuthDataContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import axios from 'axios';
// import axios from 'axios';

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthDataProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = (email, password, photo, name) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password, photo, name)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

     const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            // if (currentUser?.email) {
            //     const userData = { email: currentUser.email }
            //     axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userData, {
            //         withCredentials: true
            //     })
            //         .then(res => {
            //             console.log('token after jwt', res.data);
            //             // const token = res.data.token;
            //             // localStorage.setItem('token', token) 
            //         })
            //         .catch(err => console.log(err))
            // }
            console.log('user in onAuth', currentUser);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authData = {
        registerUser,
        loginUser,
        signInWithGoogle,
        user,
        auth,
        signOutUser,
        loading,
        setUser,
        setLoading,
        updateUserProfile
    }

    return (
        <AuthDataContext value={authData}>{children}</AuthDataContext>
    );
};

export default AuthDataProvider;