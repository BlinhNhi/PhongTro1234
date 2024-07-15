import actionTypes from './actionTypes';
import * as apis from '../../services';


// hàm dùng call api    
//  (dispatch) => {} : dùng để đẩy 1 dispatch lên reducer
export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        // console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATAGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATAGORIES,
                msg: response.data.msg,
                categories: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATAGORIES,
            categories: null
        })
    }
}

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices()
        // console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a, b) => {
                    return +a.order - +b.order
                })
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg,
                prices: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null
        })
    }
}

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAreas()
        // console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.response.sort((a, b) => {
                    return +a.order - +b.order
                }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                msg: response.data.msg,
                areas: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null,
            msg: error
        })
    }
}

export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        // console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data.response,
                msg: ""
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                msg: response.data.msg,
                provinces: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            msg: error
        })
    }
}