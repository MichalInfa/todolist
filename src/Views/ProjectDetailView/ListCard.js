import React from 'react'
import {useState,useEffect} from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'

const ListCard = (props) =>{
    const[tasklists, setTaskList] = useState([]);

    useEffect(() => {
        fetch('http://139.162.159.44:3000/projects/'+ props.projectid + '/to_do_lists/' + props.taskid + '/tasks')
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
            return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });
    },[props.projectid,props.taskid,setTaskList])
 
    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    {tasklists.filter(tasklists => tasklists.done_status === true).length}/
                    {(tasklists.length)} complete
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