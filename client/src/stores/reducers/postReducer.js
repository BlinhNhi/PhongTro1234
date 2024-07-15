import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: "",
    count: 0,
    newPosts: [],
    postOfCurrentUser: [],
    dataEdit: null,
    newsOutStanding: []
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                count: action.count || 0,
            };
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                msg: action.msg || [],
                newPosts: action.newPosts || [],
            };
        case actionTypes.GET_NEWS_OUTSTANDING:
            return {
                ...state,
                msg: action.msg || [],
                newsOutStanding: action.newsOutStanding || [],
            };
        case actionTypes.GET_POST_ADMIN:
            return {
                ...state,
                msg: action.msg || [],
                postOfCurrentUser: action.posts || [],
            };
        case actionTypes.EDIT_DATA:
            return {
                ...state,
                dataEdit: action.dataEdit || null,
            };
        case actionTypes.RESET_EDIT_DATA:
            return {
                ...state,
                dataEdit: null,
            };
        default:
            return state;
    }
};

export default postReducer;
