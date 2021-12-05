import isLoggedReducer from "./isLogged";
import userDataReducer from "./userData";
import {combineReducers} from 'redux';
import signUpReducer from "./singUp";


const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    userData : userDataReducer,
    signUp: signUpReducer
})

export default allReducers;