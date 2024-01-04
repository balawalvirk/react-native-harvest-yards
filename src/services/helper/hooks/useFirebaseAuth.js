import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore'

export default function useFirebaseAuth() {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [loadingDeleteUser, setLoadingDeleteUser] =useState(false);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {

            if (user) {
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    const handleDeleteUser = async () => {
        let response = null
        setLoadingDeleteUser(true);
        const currentUser = auth().currentUser;
        await auth()
          .currentUser.delete()
          .then(async res => {
            console.log("Auth User deleted: ", res);
            await firestore()
              .collection("users")
              .doc(currentUser.uid)
              .delete()
              .then(async res => {
                response = res
                console.log("Firestore User deleted! ", res);
              })
              .catch(err => {
                console.log("delete firestore user error", err);
                // navigate('SignUp');
              });;
          })
          .catch(err => {
            console.log("delete auth user error", err);
            // navigate('SignUp');
          });;
        setLoadingDeleteUser(false);
        return response
      };
    return {
        user: auth().currentUser,
        isUserLoggedIn,
        deleteUser: handleDeleteUser,
        loadingDeleteUser,
        signOut: () => auth().signOut(),
    }
}