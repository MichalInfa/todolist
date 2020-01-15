import React from 'react';
import {useState} from 'react';
import TopHeader from '../../Components/TopHeader/TopHeader';
import Button from '../../Components/Button/Button';
import './ToDos.css';
import TaskList from './TaskList';
import AddNewTask from './AddNewTask';

const ToDos = (props) => {

    const[text, setText] = useState("");
    const[description, setDescription] = useState("");
    const[tasklists, setTaskList] = useState([]);
    const[visibleform, setVisible] = useState(false);

    const {id} = props.match.params

    const renderTaskList = (tasklists) => {
        return tasklists.map (taskList => {
            return (<TaskList 
                key = {taskList.id} 
                name = {taskList.name} 
                descrip = {taskList.descrip}
                checked = {tasklists.checked}
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
                descrip: description /* checked: false*/}])
    }
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
                
                inputDescription = {description}
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
                            {id} 
                        </p>
                    </div>
                    <div>
                        <div>
                            {renderTaskList(tasklists)}
                            {console.log(tasklists)}
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