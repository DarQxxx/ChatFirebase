const userDataReducer = (state = {name : null, surname : null, uid: null,  profilePic : null }, action) => {
    switch(action.type){
        case 'dataGather' :
            return state = action.payload
        default:
            return state
    }
}

export default userDataReducer;