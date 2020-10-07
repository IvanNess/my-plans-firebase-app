export const signIn = ({email, password}) =>{
    return async (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase()
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch({type: 'LOGIN_SUCCESS'})
        }catch(err){
            dispatch({type: 'LOGIN_ERROR', err})
        }
    }
}

export const signOut = ()=>{
    return async (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase()
        try{
            await firebase.auth().signOut()
            //await firebase.logout()
            dispatch({type: 'LOGOUT_SUCCESS'})
        }catch(err){
            dispatch({type: 'LOGOUT_ERROR', err})
        }        
    }
}

export const signUp = ({email, password, firstname, lastname})=>{
    return async (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase()
        const firestore = getFirestore()
        try{
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(response.user.uid)
            await firestore.collection('users').doc(response.user.uid).set({
                firstname,
                lastname,
                initials: firstname[0]+lastname[0],
            })
            dispatch({type: 'SIGNUP_SUCCESS'})
        }catch(err){
            dispatch({type: 'SIGNUP_ERROR', err})
        } 
    }
}