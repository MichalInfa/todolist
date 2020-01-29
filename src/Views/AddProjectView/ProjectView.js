import React from 'react';
import {PROJECT_URL} from '../../constants';
import {useState, useEffect} from 'react'
import ProjectCard from './ProjectCard';
import AddProjectCard from './AddProjectCard';
import './ProjectView.css';
import PaginationBar from './PaginationBar';

const ProjectView = () => {
    document.title = `Your Projects`
    const[projects, setProject] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[projectPerPage] = useState(2)

    const renderProjects = (projects) => {
        return projects.map (projectCard => {
            return (<ProjectCard 
                key = {projectCard.id} 
                name = {projectCard.name} 
                description ={projectCard.description}
                id = {projectCard.id}
                />)
        })
    }

    useEffect (() => {       
        fetch(PROJECT_URL)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){
                setProject(resp)
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {
            return alert("Failed GET request from ProjectView. \nDetailed error: \"" + error + "\"");
        });      
    },[setProject]);

    const indexOfLastProject = currentPage * projectPerPage;
    const indexOfFirstProject = indexOfLastProject - projectPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

    return(
        <div>
            <p className = "Header">                    
                Your Projects                
            </p>
            <div className = "ProjectMiddle">
                {renderProjects(currentProjects)}
                <AddProjectCard />
                <PaginationBar 
                    projectsPerPage = {projectPerPage}
                    amountOfProjects = {10}
                    onClickFunction = {(number) => setCurrentPage(number)}
                    currentPage = {currentPage}
                />
            </div>
        </div> 
    )
}

export default ProjectView