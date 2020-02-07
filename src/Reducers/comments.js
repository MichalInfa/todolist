const commentListReducer = (state = {comments: [], meta: {}}, action) => {
    switch(action.type){
        case 'GET_COMMENT_LIST': {
            state = {
                comments: [...action.commentList],
                meta: action.meta
            }
            return state;
        }
        default:
            return state
    }
}

export default commentListReducer