const taskListReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_TASKLIST': {
            state = {
                tasks: [...action.tasks],
                completedTasks: action.completedTasks,
                allTasks: action.allTasks
            }
            return state;
        }
        case 'ADD_TASK_TO_LIST': {
            state = {
                tasks: [...state.tasks, action.task],
                completedTasks: state.completedTasks,
                allTasks: state.allTasks
            }
            return state;
        }
        case 'GET_TASK_STATUS': {
            console.log(state.tasks, state.action.completed_tasks, state.action.all_tasks)
            state = {
                tasks: state.tasks,
                completedTasks: action.completedTasks,
                allTasks: action.allTasks
            }
            return state
        }
        default:
            return state;
    }
}

export default taskListReducer