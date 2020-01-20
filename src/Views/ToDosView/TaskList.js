import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    return (
            <div className = "BoxContainter">
                <form>
                    <label className="Box">
                    <div className = "Normal">
                        {props.name}
                    </div>
                    <div className = "Small">
                        {props.description} 
                    </div> 
                        <input type = "checkbox" checked = {props.done_status} onChange = {props.onStatusChange}/> 
                        <span className="WhiteBox"></span> 
                    </label>
                </form> 
            </div>
    )
}

export default TaskList