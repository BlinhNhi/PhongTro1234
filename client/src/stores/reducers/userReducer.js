import actionTypes from "../actions/actionTypes";

// dùng để lưu thông tin user
const initState = {
    currentUserData: {
    }
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_CURRENT:
            return {
                ...state,
                currentUserData: action.currentUserData || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentUserData: {}
            }
        default:
            return state;
    }
}

export default userReducer;