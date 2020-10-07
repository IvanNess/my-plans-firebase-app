export const createProject = (project) =>{
    return async(dispatch, getState, {getFirebase, getFirestore})=>{
        try{
            const firestore = getFirestore()
            const profile = getState().firebase.profile
            const authorId = getState().firebase.auth.uid
            await firestore.collection('projects').add({
                ...project,
                authorFirstName: profile.firstname,
                authorLastName: profile.lastname,
                authorId: authorId,
                createdAt: new Date()
            })
            dispatch({type:'CREATE_PROJECT', project})
        } catch (err){
            dispatch({type:'CREATE_PROJECT_ERROR', err})            
        }
    }
}