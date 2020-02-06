const projectReducer = (state = {projects: [], meta: {}}, action) => {
  switch(action.type) {
    case 'ADD_LIST_OF_PROJECTS': {
        state = {
            projects: [...action.projects],
            meta: action.meta
        }
        return state;
    }
    default:
        return state;
  }
}
export default projectReducer