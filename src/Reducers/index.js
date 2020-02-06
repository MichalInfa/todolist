import projectReducer from './projects'
import todoListReducer from './todolist'
import taskListReducer from './tasklist'
import commentListReducer from './comments'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    projects: projectReducer,
    todolists: todoListReducer,
    tasks: taskListReducer,
    comments: commentListReducer
})

export default allReducers