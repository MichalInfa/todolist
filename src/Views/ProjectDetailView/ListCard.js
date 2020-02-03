import React from 'react'
import {useState,useEffect} from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'
import {PROJECT_URL} from '../../constants'

const ListCard = (props) =>{
    const[doneTasks, setDoneTasks] = useState(0);
    const[allTasks, setAllTasks] = useState(0);

    useEffect(() => {
        fetch(PROJECT_URL + '/' + props.projectid + '/to_do_lists/' + props.taskid + '/tasks')
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){

                setDoneTasks(resp.meta_true.total_count)
                setAllTasks(resp.meta_true.total_count + resp.meta_false.total_count)
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {
            return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });
    },[props.projectid, props.taskid, setDoneTasks, setAllTasks])
    
    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    
                    {doneTasks}/
                    {allTasks} complete
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