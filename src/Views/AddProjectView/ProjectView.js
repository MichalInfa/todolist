import React from 'react'
import {Link} from 'react-router-dom';
import {PROJECT_URL} from '../../constants';
import {useState, useEffect} from 'react'
import ProjectCard from './ProjectCard';
import AddProjectCard from './AddProjectCard';
import styled, {css} from 'styled-components';
import './ProjectView.css'

const ProjectView = () => {

    // Here we create a component that will rotate everything we pass in over two seconds
    const Przycisk = styled.button`background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${props => props.primary &&  css`
        background: palevioletred;
        color: white;
        `};
    `
    const[project, setProject] = useState([]);


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
                console.log(resp);
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
            <ProjectCard title = "Acme Inc. Landing Page Design" />
            <ProjectCard title = "Office Renovation" />
            <AddProjectCard />
            <Link to = "/userfetch">
                <Przycisk>
                    Go to UserFetch section
                </Przycisk>
            </Link>
        </div> 
    )
}

export default ProjectView