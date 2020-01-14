import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    return (
        <div>
                <input className = "CheckboxPosition" type = "checkbox"/>
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