const signUpReducer = (state = false, action) => {
    switch(action.type){
        case 'signUp' :
            return state = !state;
        default:
            return state
    }
}

export default signUpReducer;