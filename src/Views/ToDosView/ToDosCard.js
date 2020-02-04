import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Button from '../../Components/Button/Button';
import './ToDosCard.css';
import TaskList from './TaskList';
import AddNewTask from './AddNewTask';
import TopHeader from '../../Components/TopHeader/TopHeader';
import {PROJECT_URL} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {getTaskList, addTaskToList, getTasksStatus} from '../../Actions';

const ToDos = () => {

    document.title = `Task List`

    const tasks = useSelector(state => state.task)
    const dispatch = useDispatch()

    const[text, setText] = useState("");
    const[descript, setDescription] = useState("");
    const[date, setDate] = useState("");
    const[donestat, setDoneStatus] = useState(false);
    //const[tasklists, setTaskList] = useState([]);
    const[visibleform, setVisible] = useState(false);
    const[taskname,setName] = useState("");

    let {projectid} = useParams()
    let {listid} = useParams()

    //const[doneTasks, setDoneTasks] = useState(0);
    //const[allTasks, setAllTasks] = useState(0);
        
    useEffect(() => {
        
    
        fetch(PROJECT_URL + `/${projectid}/to_do_lists/${listid}/tasks`)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }})
        .then(resp => {

                const doneTasks = resp.tasks.filter(resp => (resp.done_status === true)).length
                const allTask = resp.tasks.length
                dispatch(getTaskList(resp.tasks, doneTasks, allTask))
            })
        .catch(error => {
            return alert("Failed GET request from ToDosView. \nDetailed error: \"" + error + "\"");
        });

        fetch(PROJECT_URL + '/' + projectid + '/to_do_lists/' + listid + '/tasks')
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }})
        .then(resp => {
                // const second = resp.tasks.filter(resp => (resp.done_status === false)).length
                // //setDoneTasks(first)
                // //setAllTasks(first + second)
                // console.log(first)
                // console.log(first+second)
                // dispatch(getTasksStatus(first,first+second))
            }
            )
        .catch(error => {
            return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });

        fetch(PROJECT_URL + `/${projectid}/to_do_lists/${listid}`)
        .then(resp => {
            if(resp.status !== 200)
            {
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
                setName(resp.name);
        })
        .catch(error => {
            return alert("Failed GET request from ProjectDetailView. \nDetailed error: \"" + error + "\"");
        });
    },[dispatch, setName, listid, projectid])

    async function addToDoList(url = '', listElement = {}){
        const respond = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        return respond.json();
    } 

    async function updateDoneStatus(url = '', listElement = {}){
        const respond = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        .catch(error => {
            return alert("Failed PATCH request from ToDosView. \nDetailed error: \"" + error + "\"");
        });  
        return respond.json();
    }

    async function deleteTask(url = '', listElement = {}){
       await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(listElement)
        })
        .catch(error => {
            return alert("Failed DELETE request from ToDosView. \nDetailed error: \"" + error + "\"");
        });  
    }

    const indexOfElement = (itemId) => {
        for(let i = 0; i < tasks.tasks.length; i++)
        {
            if(tasks.tasks[i].id === itemId)
                return i;
        }
        return null;
    }

    const renderTaskList = (filtredTasks) => {
        return filtredTasks.map (taskList => {
            return (<TaskList 
                key = {taskList.id} 
                name = {taskList.name} 
                description = {taskList.description}
                due_date = {taskList.due_date}
                done_status = {taskList.done_status}
                taskid = {taskList.id}
                
                onStatusChange = {(event) => {

                    updateDoneStatus(PROJECT_URL + `/${projectid}/to_do_lists/${listid}/tasks/${taskList.id}`,{
                    done_status: event.target.checked
                    })
                    .then((element) => {
                        tasks.tasks.splice(indexOfElement(taskList.id),1)
                        dispatch(addTaskToList(element))
                    })}   
                }

                ondDeleteTask = {() => {
                    deleteTask(PROJECT_URL + `/${projectid}/to_do_lists/${listid}/tasks/${taskList.id}`,{
                        id: taskList.id
                    })
                    .then(() => {
                        tasks.tasks.splice(indexOfElement(taskList.id),1)
                        dispatch(getTaskList(tasks.tasks))
                        }
                    )
                }}

                />)
        })
    }

    const renderForm = () => {
        return (visibleform ?
            <AddNewTask
                inputText = {text} 
                onInputChange = {(event) => {setText(event.target.value)}}
                
                inputDescription = {descript}
                onDescriptionChange = {(event) => {setDescription(event.target.value)}}
               
                dateText = {date}
                onDateChange = {(day) => setDate(day)}

                inputDoneStatus = {donestat}
                onDoneStatusChange = {(event) => {setDoneStatus(event.target.checked)}}
                
                buttonCondition = {text.length}
                onClickAddTaskEvent = {() => {
                    addToDoList(PROJECT_URL + `/${projectid}/to_do_lists/${listid}/tasks`,{
                        name: text,
                        description: descript,
                        due_date: date,
                        done_status: donestat
                        })
                    // .then((element) => {
                    //     setTaskList([
                    //         ...tasklists,
                    //         element
                    //     ])})
                    .catch(error => {
                        return alert("Failed POST request from ToDosView. \nDetailed error: \"" + error + "\"");
                    })

                    setText("")
                    setDescription("")
                    setDate("")
                    setDoneStatus(false)
                    }
                }

                onClickCancelButton = {() => {
                    setText("")
                    setDescription("")
                    setDate("")
                    setDoneStatus(false)
                    setVisible(visibleform => !visibleform);
                } } 
                />: null
        )
    } 

    const compare = (a,b) => {
        if(a.due_date < b.due_date){
            return -1;
        }
        if(a.due_date > b.due_date){
            return 1;
        }
        return 0;
    }

    //tasks.filter(tasklists => tasklists.done_status === false).sort(compare)
    const renderTasks = (tasks, status) => {   
        if(tasks && tasks.tasks){
            return renderTaskList(tasks.tasks.filter( (filtredTasks) =>  filtredTasks.done_status === status).sort(compare))
        }
    }

    return(
        <div>
            <TopHeader title = "backtodos" />
            <div className = "Top">
                <div className = "MiddleToDoPart">
                    <div>
                        <p className = "ToDoCircle" /> 
                        <p className = "Light">
                            {tasks.completedTasks}/
                            {tasks.allTasks} complete 
                        </p> 
                        <p className = "BigFontToDoPoint">
                            {taskname}
                        </p>
                    </div>
                    <div>
                        {renderTasks(tasks, false)} 
                    </div>
                    <div className = {visibleform ? "Hidden" : "Block"}>
                        <Button 
                            buttonText = "Add a to-do"
                            buttonClass = "Proper"
                            onClickFunction = {() => {
                                setVisible(visibleform => !visibleform);
                            }}
                        />
                    </div>
                    <div>
                        {renderForm()}
                        {renderTasks(tasks, true)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDos