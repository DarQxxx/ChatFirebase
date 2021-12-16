import Chatwithfriends from "./Chatwithfriends";
import Homepage from "./Homepage";
import LogIn from "./LogIn";
import Register from "./Register";
import Settings from "./Settings";


export default [
    {
        "path" : "/",
        "exact" : true,
        "component" : <Homepage/>,
    },

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
},
{
    "path" : "/settings/:uid",
    "exact" : true,
    "component" : <Settings/>,
}
]