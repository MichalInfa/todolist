const todolistReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_TODO_LISTS': {
          state = {
                lists: [...action.lists],
                meta: action.meta
          }
          return state;
      }
      default:
          return state;
    }
  }
  export default todolistReducer