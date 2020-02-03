import projectReducer from './projects'
import todolistReducer from './todolist'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    project: projectReducer,
    todolist: todolistReducer
})

export default allReducers