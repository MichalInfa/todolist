import React from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'

const ListCard = (props) =>{

   console.log(props)
    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    0/0 complete   
                </p> 
                <Link to = {"/projects/" + props.projectid + "/to_do_lists/" + props.taskid + "/tasks"}>
                    <p className = "BigFont">
                        {props.name} 
                    </p>
                </Link>
        </div>
    )
}

export default ListCard