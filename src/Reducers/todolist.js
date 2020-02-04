const todoListReducer = (state = [], action) => {
    switch(action.type) {
      case 'GET_TODO_LISTS': {
          state = {
                lists: [...action.lists],
                meta: action.meta
          }
          return state;
      }
      case 'ADD_TODO_LIST': {
          state = {
              lists: [...state.lists, action.lists],
              meta: {...state.meta}
          }
          return state;
      }
     
      default:
          return state;
    }
  }
  export default todoListReducer