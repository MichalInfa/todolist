import React from 'react'
import './AddProjectCard.css'
import plus from '../../Images/symbol.png'
import {Link} from "react-router-dom";

const AddProjectCard = () => {
    return (
        <div className = "AddProjectCard">
            <Link to = "/add-project">
                <img src = {plus} alt = "" />   
            </Link >
            <br />
            Add another project
        </div>
    )
}

export default AddProjectCard