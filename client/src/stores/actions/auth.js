import { apiRegister , apiLogin} from '../../services/auth'
import actionTypes from './actionTypes';

// hàm dùng call api    
//  (dispatch) => {} : dùng để đẩy 1 dispatch lên reducer
export const register =  (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const login =  (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }
        console.log(response);

    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = ()=>({
    type : actionTypes.LOGOUT
});
