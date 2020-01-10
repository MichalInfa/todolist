import React from 'react'
import './ListCard.css'

const ListCard = (props) =>{
    return (
        <div className = "Wrapper">
            <div className = "Circle">
                <br />
            </div> 
            <div>
                <p className = "Light">
                    0/0 complete   
                </p> 
                <p className = "BigFont">
                    {props.name} 
                </p>
                
            </div>
        </div>
    )
}

export default ListCard