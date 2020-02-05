import React from 'react'
import {useState,useEffect} from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'
import {PROJECT_URL} from '../../constants'
//import {getTasksStatus} from '../../Actions'
//import {useSelector, useDispatch} from 'react-redux';

const ListCard = (props) =>{

    // const tasks = useSelector(state => state.task)
    // const dispatch = useDispatch();

    const[doneTasks, setDoneTasks] = useState(0);
    const[allTasks, setAllTasks] = useState(0);

    useEffect(() => {
        //props.reloadDoneTasks(false)
        //props.reloadTasks(false)
        fetch(PROJECT_URL + '/' + props.projectid + '/to_do_lists/' + props.taskid + '/tasks')
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
                const doneTasks = resp.tasks.filter(resp => (resp.done_status === true)).length
                const allTask = resp.tasks.length
                setDoneTasks(doneTasks)
                setAllTasks(allTask)
                //dispatch(getTasksStatus(doneTasks, allTask))
        })
        .catch(error => {
            return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });

    },[props.projectid, props.taskid, setDoneTasks, setAllTasks /*dispatch*/ ])
    
    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    {
                    //tasks.completedTasks
                    doneTasks
                    }/
                    {
                    //tasks.allTasks
                    allTasks} complete 
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

/* 
import React from 'react'
import {useState,useEffect} from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'
import {PROJECT_URL} from '../../constants'
import {getTaskList, addTasksProperties} from '../../Actions'
import {useSelector, useDispatch} from 'react-redux';

const ListCard = (props) =>{

    const projects = useSelector(state => state.project)
    const tasks = useSelector(state => state.task)
    const dispatch = useDispatch();

    let aTask = 0;
    let cTask =0;

    useEffect(() => {
        fetch(PROJECT_URL + `/${props.projectid}/to_do_lists/${props.taskid}/tasks`)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }})
        .then(resp => {
                dispatch(getTaskList(resp.tasks))
                console.log(resp.tasks)
            })
        .catch(error => {
            return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });
    },[props.projectid, props.taskid, dispatch])
    
    const renderCompletedTasks = (tasks) => {
        if(tasks && tasks.tasks){
            cTask = tasks.tasks.filter(filtredTasks => filtredTasks.done_status === true).length
            return (cTask)
        }
    }
    const renderAllTasks = (tasks) => {
        if(tasks && tasks.tasks){
            aTask = tasks.tasks.length
            return (aTask)
        }
    }

    return (
        <div>
            <p className = "Circle" />
            <p className = "Light">
                {renderCompletedTasks(tasks)}/
                {renderAllTasks(tasks)} complete 
             </p> 
            <Link to = {"/projects/" + props.projectid + "/to_do_lists/" + props.taskid + "/tasks"}>
                <p className = "BigFont">
                    {props.name} 
                </p>
            </Link>
            {
                console.log( props.taskid , aTask, cTask )  
            }
        </div>
    )
}

export default ListCard
*/