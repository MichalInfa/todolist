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
    const[projectPerPage,setProjectPerPage] = useState(1)
    const[amountOfProjects, setAmountOfProjects] = useState(1)

    const[url, setUrl] = useState(PROJECT_URL)

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
        fetch(url)
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
                console.log(resp.meta)
                console.log(resp.projects)
                setProject(resp.projects)
                
            }else{
                console.log("Null!");
            }
        })
        .catch(error => {
            return alert("Failed GET request from ProjectView. \nDetailed error: \"" + error + "\"");
        });      
    },[setProject,setProjectPerPage,setAmountOfProjects,setCurrentPage,url]);

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
                    onClickFunction = {(number) => setUrl(`${PROJECT_URL}?page=${number}`)}
                    currentPage = {currentPage}
                />
            </div>
        </div> 
    )
}

export default ProjectView