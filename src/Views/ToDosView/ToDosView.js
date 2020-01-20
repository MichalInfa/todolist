import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Button from '../../Components/Button/Button';
import './ToDosView.css';
import TaskList from './TaskList';
import AddNewTask from './AddNewTask';
import TopHeader from '../../Components/TopHeader/TopHeader';

const ToDos = () => {

    const[text, setText] = useState("");

    const[descript, setDescription] = useState("");

    const[donestat, setDoneStatus] = useState(false);

    const[tasklists, setTaskList] = useState([]);
    const[visibleform, setVisible] = useState(false);

    const[taskname,setName] = useState("");

    let {projectid} = useParams()
    let {listid} = useParams()

    console.log(listid)
    const renderTaskList = (tasklists) => {
        return tasklists.map (taskList => {
            return (<TaskList 
                key = {taskList.id} 
                name = {taskList.name} 
                description = {taskList.description}
                done_status = {taskList.done_status}

                onStatusChange = {(event) => {
                    addToDoList(`http://localhost:3000/projects/${projectid}/to_do_lists/${listid}/tasks`,{
                    key: taskList.id,
                    name: taskList.name,
                    description: taskList.description,
                    done_status: event.target.checked
                    }).then((element) => {
                        setTaskList([
                            ...tasklists,
                            element
                        ])})               
                }
                }
                />)
        })
    }

useEffect(() => {
    fetch(`http://localhost:3000/projects/${projectid}/to_do_lists/${listid}/tasks`)
    .then(resp => {
        if(resp.status !== 200){
            return null;
        }else{
            return resp.json();
        }
    })
    .then(resp => {
        if(!null){
            setTaskList(resp)
        }else{
            console.log("Null!");
        }
    })
    .catch(error => {
        if(error.status === 401){ 
            console.log("Blad: Zadany adres nie istnieje")
        }
    }); 

    fetch(`http://localhost:3000/projects/${projectid}/to_do_lists/${listid}`)
        .then(resp => {
            if(resp.status !== 200)
            {
                return null;
            }
            else
            {
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){
                setName(resp.name);
            }
            else{
                console.log("Null!");
            }
        })
        .catch(error => {
            if(error.status === 401){ 
                console.log("Blad: Zadany adres nie istnieje")
            }
        });
},[projectid,listid,setName,setTaskList])

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

    const renderForm = () => {
        return (visibleform ?
            <AddNewTask
                inputText = {text} 
                onInputChange = {(event) => {setText(event.target.value)}}
                
                inputDescription = {descript}
                onDescriptionChange = {(event) => {setDescription(event.target.value)}}
               
                inputDoneStatus = {donestat}
                onDoneStatusChange = {(event) => {setDoneStatus(event.target.checked)}}

                buttonCondition = {text.length}
                onClickAddTaskEvent = {() => {
                    addToDoList(`http://localhost:3000/projects/${projectid}/to_do_lists/${listid}/tasks`,{
                        name: text,
                        description: descript,
                        done_status: donestat
                        }).then((element) => {
                            setTaskList([
                                ...tasklists,
                                element
                            ])})
                    setText("")
                    setDescription("")
                    setDoneStatus(false)
                    }
                }

                onClickCancelButton = {() => {
                    setText("")
                    setDescription("")
                    setDoneStatus(false)
                    setVisible(visibleform => !visibleform);
                } } 
                />: null
        )
    } 

    return(
        <div>
            <TopHeader title = "backtodos" />
            <div className = "Top">
                <div className = "MiddleToDoPart">
                    <div>
                        <p className = "Circle" /> 
                        <p className = "Light">
                            {tasklists.filter(tasklists => tasklists.done_status === true).length}/
                            {(tasklists.length)} complete 
                        </p> 
                        <p className = "BigFontToDoPoint">
                            {taskname}
                        </p>
                    </div>
                    <div>
                        {renderTaskList(tasklists.filter(tasklists => tasklists.done_status === false))} 
                    </div>
                    <div className = {visibleform ? "Hidden" : "Block"}>
                        <Button 
                            buttonText = "Add this to-do"
                            buttonClass = "Proper"
                            onClickFunction = {() => {
                                setVisible(visibleform => !visibleform);
                            }}
                        />
                    </div>
                    <div>
                        {renderForm()}
                        {renderTaskList(tasklists.filter(tasklists => tasklists.done_status === true))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDos