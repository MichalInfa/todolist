const commentListReducer = (state = {comments: [], meta: {}}, action) => {
    switch(action.type){
        case 'GET_COMMENTS': {
            state = {
                comments: [...state.comments],
                meta: state.meta,
                url: action.url
            }
            return state;
        }
        
       case 'COMMENTS_RECEIVED': {
            state = {
                comments: [...action.comments],
                meta: action.meta
            }
            return state;
       }

       case 'DELETE_COMMENT': {
           state = {
                comments: [...state.comments],
                meta: state.meta,
                deleteurl: action.delteurl,
                element: action.element,
                url: action.url
           }
           return state;
       }

        default:
            return state
    }
}

export default commentListReducer