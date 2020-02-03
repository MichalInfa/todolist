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


const ProjectView = () => {

    const projects = useSelector(state => state.project)
    const dispatch = useDispatch()

    document.title = `Your Projects`
    //const[projects, setProject] = useState([])
    //const[currentPage, setCurrentPage] = useState(1)
    //const[amountOfPages, setAmountOfPages] = useState(1)

    let history = useHistory();
    if(history.location.pathname === "")
        history.push("/projects")
    if(history.location.pathname === "/")
        history.push("projects")

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
                //setAmountOfPages(resp.meta.total_pages)
                //setCurrentPage(resp.meta.current_page)
                //setProject(resp.projects)
                dispatch(addProject(resp.projects, resp.meta))
                //dispatch(addMeta(resp.meta))
        })
        .catch(error => {
            return alert("Failed GET request from ProjectView. \nDetailed error: \"" + error + "\"");
        });      
    },
    [
        dispatch,
    //setProject,
    //setCurrentPage, 
    //setAmountOfPages,
    history.location.search]);

    return(
        <div>
            <p className = "Header">                    
                Your Projects                
            </p>
            <div className = "ProjectMiddle">
                {renderProjects(projects.slice(0,projects.length - 3))}
                <AddProjectCard />
                <PaginationBar 
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