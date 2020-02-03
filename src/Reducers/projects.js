let initialState = []

const projectReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_PROJECT':
      return (state = [...action.payload]);
    default:
      return state;
  }
}
export default projectReducer;


/*const initialState = {
    fetching: false,
    fetched: false,
    projects: [],
    error: null
};

const projectReducer = (state = initialState, action) => {
    switch(action.type){
        case 'Fetch_Projects_Started':
            return {
                ...state,
                fetching: true
            }
        case 'Fetch_Projects_Error': 
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case 'Received_Projects':
            return {
                ...state,
                fetching: false,
                fetched: true,
                projects: action.payload
            }
        default:
            return state;
    }
}
export default projectReducer;*/