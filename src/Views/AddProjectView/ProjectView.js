import React from 'react';
import {PROJECT_URL} from '../../constants';
import {useState, useEffect} from 'react'
import ProjectCard from './ProjectCard';
import AddProjectCard from './AddProjectCard';
import './ProjectView.css';
import PaginationBar from './PaginationBar';
import {useHistory} from 'react-router-dom'

const ProjectView = () => {
    document.title = `Your Projects`
    const[projects, setProject] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[projectPerPage,setProjectPerPage] = useState(1)
    const[amountOfProjects, setAmountOfProjects] = useState(1)

    let history = useHistory();

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
        fetch(PROJECT_URL + history.location.search)
        .then(resp => {
            if(resp.status !== 200){
                return null;
            }else{
                return resp.json();
            }
        })
        .then(resp => {
            if(!null){
                setProjectPerPage(resp.meta.per_page)
                setAmountOfProjects(resp.meta.total_count)
                setCurrentPage(resp.meta.current_page)
                setProject(resp.projects)
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {
            return alert("Failed GET request from ProjectView. \nDetailed error: \"" + error + "\"");
        });      
    },[setProject,setProjectPerPage,setAmountOfProjects,setCurrentPage, history.location.search]);

    return(
        <div>
            <p className = "Header">                    
                Your Projects                
            </p>
            <div className = "ProjectMiddle">
                {renderProjects(projects)}
                
                <AddProjectCard />
                <PaginationBar 
                    projectsPerPage = {projectPerPage}
                    amountOfProjects = {amountOfProjects}
                    onClickFunction = {(number) => {
                        history.push(`?page=${number}`)
                    }
                    }
                    currentPage = {currentPage}
                />
            </div>
        </div> 
    )
}

export default ProjectView