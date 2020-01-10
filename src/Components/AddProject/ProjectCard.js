import React from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

const ProjectCard  = (props) => {
    return(
        <Link to = {"/project/" + (props.title).replace(/ /g,"_")}>
            <div className = "ProjectCard">
                {props.title}
            </div>
        </Link>
    )
    /*
    let history = useHistory();

    return(
    <div className = "ProjectCard"
        onClick = {() => history.push("/project/" + (props.title).replace(/ /g,"_"))}>
        {props.title}
    </div>
    )
    */
}

export default ProjectCard