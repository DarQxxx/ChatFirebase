import Chat from "./Chat";
import Chatwithfriends from "./Chatwithfriends";
import Homepage from "./Homepage";
import LogIn from "./LogIn";
import Register from "./Register";


export default [
    {
        "path" : "/",
        "exact" : true,
        "component" : <Homepage/>,
    },
{
    "path" : "/chat",
    "exact" : true,
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
},
{
    "path" : "/chat/:hisuid",
    "exact" : true,
    "component" : <Chatwithfriends/>,
}
]