import React from 'react';
import TopHeader from '../../../Components/TopHeader/TopHeader'
import './ToDos.css';
import Button from '../../../Components/Button/Button'
import {useState} from 'react'
import TaskList from './TaskList'

const ToDos = (props) => {

    const[text, setText] = useState("");
    const[tasklists, setTaskList] = useState([]);

    const {id} = props.match.params

    const renderTaskList = (tasklists) => {
        return tasklists.map (taskList => {
            return (<TaskList key = {taskList.id} name = {taskList.name} value = {taskList.id + 1}/>)
        })
    }

    const addTaskToList = () => {
        setTaskList([...tasklists, {id: tasklists.length, name: text}])
        console.log(tasklists);
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
                        </div>
                    </div>
                    <br />
                    <div className = "ButtonWrapper">
                        <form onSubmit = {(event) => event.preventDefault()}>
                            <label>
                                <input className = "CheckboxPosition" type = "checkbox"/>
                                <input className = "TextPosition" type = "text" placeholder = "Describe this to-do..."
                                value = {text} onChange = {(event) => setText(event.target.value)}/>
                            </label>
                            <Button type = "submit" 
                                disabledProperties = {text.trim().length  < 6}
                                buttonClass = {text.trim().length  > 5 ? "Proper" : "NotProper"}
                                buttonText = {"Add a to-do"}
                                onClickFunction = {() => {
                                    addTaskToList()
                                    setText("")
                                }
                            }/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDos