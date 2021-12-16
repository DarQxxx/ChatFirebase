import React from "react";

  const AppContext = React.createContext({loggedIn: false, user: {}, uid: null});

  export default AppContext
