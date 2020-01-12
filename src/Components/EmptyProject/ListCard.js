import React from 'react'
import './ListCard.css'

const ListCard = (props) =>{
    return (
        <div>
                <p className = "Circle" />
                <p className = "Light">
                    0/0 complete   
                </p> 
                <p className = "BigFont">
                    {props.name} 
                </p>
        </div>
    )
}

export default ListCard