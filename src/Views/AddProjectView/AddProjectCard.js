import React from 'react'
import './AddProjectCard.css'
import plus from '../../Images/symbol.png'
import {Link} from "react-router-dom";

const AddProjectCard = () => {
    return (
        <Link to = "/projects/new">
            <div className = "AddProjectCard">
                <img className = "SmallAddLogo" src = {plus} alt = "" />   
                <br />
                Add another project
            </div>
        </Link >
    )
}

export default AddProjectCard