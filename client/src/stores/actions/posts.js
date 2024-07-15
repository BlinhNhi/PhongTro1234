import actionTypes from './actionTypes';
import { apiGetPosts, apiGetPostsLimit, apiGetNewPost, apiGetPostsLimitAdmin } from '../../services/post';

// hàm dùng call api    
//  (dispatch) => {} : dùng để đẩy 1 dispatch lên reducer
export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        // console.log(response);

        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}

export const getPostsLimlit = (query) => async (dispatch) => {
    // console.log(query);
    try {
        const response = await apiGetPostsLimit(query)
        // console.log(response);

        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPost()
        // console.log(response);

        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}

export const getOutStandingPost = () => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit({
            limitPost: 5,
            order: ['star', 'DESC']
        })
        // console.log(response);

        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.GET_NEWS_OUTSTANDING,
                newsOutStanding: response.data.response.rows,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEWS_OUTSTANDING,
                msg: response.data.msg,
                newsOutStanding: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEWS_OUTSTANDING,
            newsOutStanding: null
        })
    }
}

export const getPostsLimlitAdmin = (query) => async (dispatch) => {
    // console.log(query);
    try {
        const response = await apiGetPostsLimitAdmin(query)
        // console.log(response);

        if (response?.data.error === 0) {
            dispatch({
                type: actionTypes.GET_POST_ADMIN,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POST_ADMIN,
                msg: response.data.msg,
                posts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_ADMIN,
            posts: null
        })
    }
}

export const editData = (dataEdit) => ({
    type: actionTypes.EDIT_DATA,
    dataEdit
})

export const resetEditData = () => ({
    type: actionTypes.RESET_EDIT_DATA
})

