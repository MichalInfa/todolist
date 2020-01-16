import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <div className = "ProjectCard">
            <Link to = {"/projects/" + props.id}>
                {props.name}
                <div className = "ProjectCardDescription">
                    {props.description}
                </div>
            </Link>
        </div>
        
    )
}

export default ProjectCard