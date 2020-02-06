const taskListReducer = (state = {tasks: []}, action) => {
    switch(action.type) {
        case 'GET_TASKLIST': {
            state = {
                tasks: [...action.tasks]
            }
            return state;
        }
        case 'ADD_TASK_TO_LIST': {
            state = {
                tasks: [...state.tasks, action.task]
            }
            return state;
        }
        default:
            return state;
    }
}

export default taskListReducer