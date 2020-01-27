import React from 'react'
import './TaskList.css'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'

const TaskList = (props) =>{

    let {projectid} = useParams()
    let {listid} = useParams()

    return (
            <div className = "BoxContainter">
                <form>
                    <label className="Box">
                        <input type = "checkbox" checked = {props.done_status} onChange = {props.onStatusChange}/> 
                        <span className="WhiteBox"></span> 
                    </label>
                    <div className = "BoxTextContainer">
                        <Link to = {`/projects/${projectid}/to_do_lists/${listid}/tasks/` + props.taskid}>
                            <div className = "Normal">
                                {props.name}
                            </div>
                            <div className = "Small">
                                {props.description} 
                            </div>
                            <div className = "SmallDate">
                                {props.due_date}
                            </div>
                        </Link>
                    </div>
                </form> 
            </div>
    )
}

export default TaskList