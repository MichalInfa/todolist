import React from 'react'
import './TaskList.css'

const TaskList = (props) =>{

    
/*
    const handleClick = (event) => {      
        console.log(name, event.target.checked)
        onChildClick(name, event.target.checked)
    }
*/
    return (
        <div>
            <div>
                <form>
                    <label className="Box">
                    <p className = "Normal">
                        {props.name}
                    </p>
                    <p className = "Small">
                        {props.descrip} 
                    </p> 
                        <input type = "checkbox" /*checked = {checked} onChange = {handleClick}*//> 
                        <span className="WhiteBox"></span> 
                    </label>
                </form> 
            </div>
                
        </div>
    )
}

export default TaskList