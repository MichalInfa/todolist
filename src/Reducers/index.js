import projectReducer from './projects'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    project: projectReducer
})

export default allReducers