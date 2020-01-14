import React from 'react'
import './ListCard.css'
import {Link} from 'react-router-dom'

const ListCard = (props) =>{

    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    0/0 complete   
                </p> 
                
                <Link to = {"/project/" + props.name}>
                    <p className = "BigFont">
                        {props.name} 
                    </p>
                    {console.log(props.name)}
                </Link>
        </div>
    )
}

export default ListCard