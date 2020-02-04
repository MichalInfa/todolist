export const addProject = (list_of_project, meta) => {
    return{
        type: 'ADD_LIST_OF_PROJECTS',
        projects: list_of_project,
        meta
    };
};

export const getToDoList = (list_of_todos, meta) => {
    return{
        type: 'GET_TODO_LISTS',
        lists: list_of_todos,
        meta
    };
};

export const addToDoList = (list_of_todos) => {
    return{
        type: 'ADD_TODO_LIST',
        lists: list_of_todos
    }
}




/*export const Fetch_Projects_Started = 'Fetch_Projects_Started';
export const Received_Projects = 'Received_Projects';
export const Fetch_Projects_Error = 'Fetch_Projects_Error';

export function getDataRequested() {
  return {
    type: 'Fetch_Projects_Started'
  };
}

export function getDataDone(data) {
  return {
    type: 'Received_Projects',
    payload: data
  };
}

export function getDataFailed(error) {
  return {
    type: 'Fetch_Projects_Error',
    payload: error
  };
}

export function fetchProjects() {
  return dispatch => {
    // set state to "loading"
    dispatch(getDataRequested());

    fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => {
        dispatch(getDataDone(data));
      })
      .catch(error => {
        dispatch(getDataFailed(error));
      })
  }
}

export default fetchProjects*/