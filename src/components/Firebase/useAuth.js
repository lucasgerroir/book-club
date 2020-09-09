import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribe
        let publicProfileUnsubscribe

        loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)

            unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
                if (userResult) {
                    // get user custom claims
                    publicProfileUnsubscribe = firebaseInstance.getUser({
                        userId: userResult.uid,
                        onSnapshot: (result) => {
                            
                            firebaseInstance.auth.currentUser
                                .getIdTokenResult(true)
                                .then( token => {
                                    setUser({
                                        ...userResult,
                                        isAdmin: token.claims.admin,
                                        username: result.empty ? null : result.docs[0].id
                                    });
                                })

                        }
                    })
                   
                }else{
                    setUser(null);
                }

                setLoading(false);
            })
        })

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }

            if (publicProfileUnsubscribe) {
                publicProfileUnsubscribe()
            }
        }
    }, [])

    return { user, firebase, loading }
}

export default useAuth
