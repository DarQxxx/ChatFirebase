export const loginAction = () => {
    return {
        type: "login"
    }
}

export const dataAction = (payload) => {
    return {
        type: "dataGather",
        payload
    }
}