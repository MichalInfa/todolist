import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <Link to = {"/project/" + (props.title).replace(/ /g,"_")}>
            <div className = "ProjectCard">
                {props.title}
            </div>
        </Link>
    )
}

export default ProjectCard