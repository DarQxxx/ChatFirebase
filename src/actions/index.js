export const loginAction = () => {
    return {
        type: "login"
    }
}

export const logoutAction = () => {
    return {
        type: "logout"
    }
}

export const dataAction = (payload) => {
    return {
        type: "dataGather",
        payload
    }
}

export const signUpAction = () => {
    return {
        type: "signUp"
    }
}