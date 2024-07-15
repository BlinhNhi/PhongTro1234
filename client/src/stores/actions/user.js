import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getCurrentUser = () => async (dispatch) => {
    try {
        const response = await apis.apiGetUserCurrent()
        // console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_USER_CURRENT,
                currentUserData: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_USER_CURRENT,
                msg: response.data.msg,
                currentUserData: null
            })
            dispatch({
                type: actionTypes.LOGOUT
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER_CURRENT,
            currentUserData: null,
            msg: error,

        })
        dispatch({
            type: actionTypes.LOGOUT
        })
    }
}