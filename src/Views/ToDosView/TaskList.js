import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    
/*
    const handleClick = (event) => {      
        console.log(name, event.target.checked)
        onChildClick(name, event.target.checked)
    }
*/
    return (
        <div>
            <div>
                <form>
                    <label className="Box">
                    <p className = "Normal">
                        {props.name}
                    </p>
                    <p className = "Small">
                        {props.description} 
                    </p> 
                        <input type = "checkbox" checked = {props.done_status} onChange = {props.onStatusChange}/> 
                        <span className="WhiteBox"></span> 
                    </label>
                </form> 
            </div>
                
        </div>
    )
}

export default TaskList