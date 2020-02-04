import projectReducer from './projects'
import todoListReducer from './todolist'
import taskListReducer from './tasklist'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    project: projectReducer,
    todolist: todoListReducer,
    task: taskListReducer
})

export default allReducers