import Chat from "./Chat";
import LogIn from "./LogIn";
import Register from "./Register";


export default [
{
    "path" : "/chat",
    "exact" : false,
    "component" : <Chat/>,
} ,
{
    "path" : "/login",
    "exact" : true,
    "component" : <LogIn/>,
},
{
    "path" : "/register",
    "exact" : true,
    "component" : <Register/>,
}
]