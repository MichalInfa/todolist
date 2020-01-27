import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    return (
            <div className = "BoxContainter">
                <form>
                    <label className="Box">
                        <input type = "checkbox" checked = {props.done_status} onChange = {props.onStatusChange}/> 
                        <span className="WhiteBox"></span> 
                    </label>
                    <div className = "Normal">
                        {props.name}
                    </div>
                    <div className = "Small">
                        {props.description} 
                    </div>
                    <div className = "SmallDate">
                        {props.due_date}
                    </div>
                </form> 
            </div>
    )
}

export default TaskList