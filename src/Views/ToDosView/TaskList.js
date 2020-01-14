import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    return (
        <div>
            <div>
                <label className = "BoxContainer">
                    <input className = "CheckboxPosition" type = "checkbox"/>
                    <span className = "CheckMark"></span>
                </label>
            </div>
                <p className = "Normal">
                    Task {props.value}
                </p>

                <p className = "Light">
                    {props.name} 
                </p> 
        </div>
    )
}

export default TaskList