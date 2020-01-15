import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <Link to = "/projects">
            <div className = "ProjectCard">
                {props.title}
            </div>
        </Link>
    )
}

export default ProjectCard