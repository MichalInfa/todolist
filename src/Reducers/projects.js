const projectReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_LIST_OF_PROJECTS': {
        state = [...action.projects];
        return ([...state, action.meta.current_page, action.meta.total_count, action.meta.total_pages]);
    }
    default:
        return state;
  }
}

export default projectReducer