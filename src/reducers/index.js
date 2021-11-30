import isLoggedReducer from "./isLogged";
import userDataReducer from "./userData";
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    userData : userDataReducer
})

export default allReducers;