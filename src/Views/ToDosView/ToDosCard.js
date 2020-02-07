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
import {getTaskList, addTaskToList} from '../../Actions';
import CommentsList from './CommentsList';

const ToDos = () => {

    document.title = `Task List`

    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const[text, setText] = useState("");
    const[descript, setDescription] = useState("");

    const[date, setDate] = useState("");
    const[donestat, setDoneStatus] = useState(false);

    const[visibleform, setVisible] = useState(false);
    const[taskname,setName] = useState("");

    const[visibleComments, setVisibleComments] = useState(false);

    let {projectid} = useParams()
    let {listid} = useParams()

    useEffect(() => {
        fetch(PROJECT_URL + `/${projectid}/to_do_lists/${listid}/tasks`)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }})
        .then(resp => {
                dispatch(getTaskList(resp.tasks))
            })
        .catch(error => {
            return alert("Failed GET request from ToDosView. \nDetailed error: \"" + error + "\"");
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
            return alert("Failed GET request from ToDosView. \nDetailed error: \"" + error + "\"");
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
                        .then(element => {
                            dispatch(addTaskToList(element))
                        })
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

    const renderTasks = (tasks, status) => {   
        if(tasks && tasks.tasks){
            return renderTaskList(tasks.tasks.filter( (filtredTasks) =>  filtredTasks.done_status === status).sort(compare))
        }
    }

    const renderCompletedTasks = (tasks) => {
        if(tasks && tasks.tasks){
            return (tasks.tasks.filter(filtredTasks => filtredTasks.done_status === true).length)
        }
    }
    const renderAllTasks = (tasks) => {
        if(tasks && tasks.tasks){
            return (tasks.tasks.length)
        }
    }


    const renderCommentsButton = () => {
        return(
            !visibleComments ? (
                <div className = "CommentsButton">
                    <Button 
                        buttonText = {"Show Comments"}
                        buttonClass = {"CommentButton"}
                        onClickFunction = {() => {
                            setVisibleComments(true);
                        }}
                    />
                </div>
            )
            : 
            (
                <div className = "CommentsButton">
                    <Button 
                        buttonText = {"Hide Comments"}
                        buttonClass = {"CommentButton"}
                        onClickFunction = {() => {
                            setVisibleComments(false);
                        }}
                    />
                </div>
            )
            )
    }

    return(
        <div>
            <TopHeader title = "backtodos" />
            <div className = "Top">
                <div className = "MiddleToDoPart">
                    <div>
                        <p className = "ToDoCircle" /> 
                        <p className = "Light">
                            {renderCompletedTasks(tasks)}/
                            {renderAllTasks(tasks)} complete 
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
                {renderCommentsButton()}
            </div>    
            <CommentsList visible = {visibleComments}/> 
        </div>
    )
}

export default ToDos