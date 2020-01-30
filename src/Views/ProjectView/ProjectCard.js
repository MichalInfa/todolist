import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <Link to = {"/projects/" + props.id}>
            <div className = "ProjectCardContainer">
                <div className = "ProjectCard">
                    {props.name}
                    <div className = "ProjectCardDescription">
                        {props.description}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard