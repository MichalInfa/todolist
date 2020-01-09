import React from 'react'
import './ProjectCard.css'

const ProjectCard  = (props) => {
    return(
        <div className = "ProjectCard">
            {props.title}
        </div>
    );
}

export default ProjectCard