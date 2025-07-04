export const initialState = {
    username: null,
    isLoggedIn: false
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isLoggedIn: true,
                username: action.payload.username
            }
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                username: ''
            }
        default: return state;
    }
}