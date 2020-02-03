import projectReducer from './projects'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    addproject: projectReducer
})

export default allReducers


/*import todos from './todos.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  todos: todos
})

export default rootReducer




/*import projectReducer from './projects';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    projects: projectReducer
})

export default allReducers;*/