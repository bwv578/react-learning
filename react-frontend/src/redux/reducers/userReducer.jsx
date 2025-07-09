export const initialState = {
    username: null,
    isLoggedIn: false
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'USER_UPDATE':
            return action.payload;
        default: return state;
    }
}