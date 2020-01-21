import React from 'react'
import {PROJECT_URL} from '../../constants';
import {useState, useEffect} from 'react'
import ProjectCard from './ProjectCard';
import AddProjectCard from './AddProjectCard';
import './ProjectView.css'

const ProjectView = () => {
    const[projects, setProject] = useState([]);

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
            if(error.status === 401){ 
                console.log("Blad: Zadany adres nie istnieje")
            }
        });      
    },[]);

    return(
        <div>
            <p className = "Header">
                Your Projects
            </p>
            <ProjectCard name = "Acme Inc. Landing Page Design" />
            <ProjectCard name = "Office Renovation" />
            {renderProjects(projects)}
            <AddProjectCard />
        </div> 
    )
}

export default ProjectView