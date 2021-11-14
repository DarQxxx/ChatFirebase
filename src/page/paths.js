import Chat from "./Chat";
import Chatwithfriends from "./Chatwithfriends";
import LogIn from "./LogIn";
import Register from "./Register";


export default [
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
    "path" : "/chat/:myuid/:hisuid",
    "exact" : true,
    "component" : <Chatwithfriends/>,
}
]