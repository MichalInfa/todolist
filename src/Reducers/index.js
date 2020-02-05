import projectReducer from './projects'
import todoListReducer from './todolist'
import taskListReducer from './tasklist'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    projects: projectReducer,
    todolists: todoListReducer,
    tasks: taskListReducer
})

export default allReducers