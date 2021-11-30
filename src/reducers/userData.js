const userDataReducer = (state = {name : null, surname : null, url : null }, action) => {
    switch(action.type){
        case 'dataGather' :
            return state = action.payload
        default:
            return state
    }
}

export default userDataReducer;