import React from 'react';
import {PROJECT_URL} from '../../constants';
import {useEffect} from 'react'
import ProjectCard from './ProjectCard';
import AddProjectCard from './AddProjectCard';
import './Projects.css';
import PaginationBar from '../../Components/PaginationBar/PaginationBar';
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addProject} from '../../Actions'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const ProjectView = () => {

    const projects = useSelector(state => state.projects)
    const dispatch = useDispatch()

    document.title = `Your Projects`

    let history = useHistory();
    if(history.location.pathname === "")
        history.push("/projects")
    if(history.location.pathname === "/")
        history.push("projects")

    const renderProjects = (projects) => {
        if(projects && projects.projects && projects.meta) {
            return projects.projects.map (projectCard => {
                return (<ProjectCard 
                    key = {projectCard.id} 
                    name = {projectCard.name} 
                    description ={projectCard.description}
                    id = {projectCard.id}
                    />)
                })
        }
        else {
            return <Loader
                type = "ThreeDots"
                color = 'rgb(82, 167, 82)'
                height = {100}
                width = {100}
                timeout = {3000}
                />        
        }
    }

    useEffect (() => {    
        fetch(PROJECT_URL + history.location.search)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
                dispatch(addProject(resp.projects, resp.meta))
        })
        .catch(error => {
            return alert("Failed GET request from ProjectView. \nDetailed error: \"" + error + "\"");
        });      
    },
    [
    dispatch,
    history.location.search]);

    return(
        <div>
            <p className = "Header">                    
                Your Projects                
            </p>
            <div className = "ProjectMiddle">
                
                {renderProjects(projects)}
                <AddProjectCard />
                <PaginationBar 
                    position = {"ProjectView"}
                    onClickFunction = {(number) => {
                        history.push(`?page=${number}`)
                    }
                    }
                />
            </div>
        </div> 
    )
}

export default ProjectView