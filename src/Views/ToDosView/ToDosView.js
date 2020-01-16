import React from 'react';
import {useState, useEffect} from 'react';
import TopHeader from '../../Components/TopHeader/TopHeader';
import Button from '../../Components/Button/Button';
import './ToDosView.css';
import TaskList from './TaskList';
import AddNewTask from './AddNewTask';

const ToDos = (props) => {

    const[text, setText] = useState("");
    const[descript, setDescription] = useState("");
    const[tasklists, setTaskList] = useState([]);
    const[visibleform, setVisible] = useState(false);

    const[taskname,setName] = useState("");

    const {id} = props.match.params
    const {taskid} = props.match.params;

    const renderTaskList = (tasklists) => {
        return tasklists.map (taskList => {
            return (<TaskList 
                key = {taskList.id} 
                name = {taskList.name} 
                description = {taskList.description}
                //checked = {tasklists.checked}
                //onChildClick = {handleTaskList}

                />)
        })
    }

    const addTaskToList = () => {
        setTaskList([
            ...tasklists, 
            {
                id: tasklists.length, 
                name: text,  
                description: descript,
                /*duedate: date,
                position: pos,
                donestatus: status,
                 /*checked: false*/}])
    }

useEffect(() => {

    fetch('http://localhost:3000/projects/'+ id + '/to_do_lists/' + taskid + '/tasks')
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

    fetch('http://localhost:3000/projects/'+ id + '/to_do_lists/' + taskid)
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
                console.log(resp.name);
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

},[id, taskid])

 /*
    const[donetaskslist, setDoneTask] = useState([]);

    const handleTaskList = (done,chkd) => {
        console.log("-------")
        console.log(done)
        console.log(chkd)
        setTaskList([...tasklists, {id: done.length, name: done, checked: chkd}])
    }
*/



    const renderForm = () => {
        return (visibleform ?
            <AddNewTask
                inputText = {text} 
                onInputChange = {(event) => {setText(event.target.value)}}
                
                inputDescription = {descript}
                onDescriptionChange = {(event) => {setDescription(event.target.value)}}
            
                buttonCondition = {text.length}
                onClickAddTaskEvent = {() => {
                    addTaskToList()
                    setText("")
                    setDescription("")
                }}

                onClickCancelButton = {() => {
                    setVisible(visibleform => !visibleform);
                } } 
                />: null
        )
    } 


    return(
        <div>
            <TopHeader title = "backtodos" />
            <div className = "Top">
                <p />
                <div className = "MiddlePart">
                    <div>
                        <p className = "Circle" />
                        <p className = "Light">
                            0/0 complete   
                        </p> 
                        <p className = "BigFontToDoPoint">
                            {taskname}
                        </p>
                    </div>
                    <div>
                        <div>
                            {renderTaskList(tasklists)}
                        </div>
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
                    {renderForm()}
                </div>
            </div>
        </div>
    )
}

export default ToDos