/*--------------------projects.js--------------------*/
export const addProject = (list_of_project, meta) => {
    return{
        type: 'ADD_LIST_OF_PROJECTS',
        projects: list_of_project,
        meta
    };
};

/*--------------------todolist.js--------------------*/
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

export const addTasksProperties = (single_list, completed_tasks, all_tasks) => {
    return{
        type: 'ADD_TASK_PROPERTIES',
        list: single_list,
        completedTasks: completed_tasks,
        allTasks: all_tasks
    }
}

/*--------------------tasklist.js--------------------*/
export const getTaskList = (list_of_tasks) => {
    return{
        type: 'GET_TASKLIST',
        tasks: list_of_tasks
    }
}

export const addTaskToList = (task) => {
    return{
        type: 'ADD_TASK_TO_LIST',
        task: task
    }
}

export const getTasksStatus = (completed_tasks, all_tasks) => {
    console.log(completed_tasks,all_tasks)
    return{
        type: 'GET_TASK_STATUS',
        completedTasks: completed_tasks,
        allTasks: all_tasks
    }
}