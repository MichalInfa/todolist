import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <Link to = "/project">
            <div className = "ProjectCard">
                {props.title}
            </div>
        </Link>
    )
}

export default ProjectCard