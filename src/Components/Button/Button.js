import React from 'react'
import './Button.css'

const Button = (props) => {

    return(
        <button
            type = "submit"
            className = {'Button ' + props.buttonClass}
            disabled = {props.disabledProperties}
            onClick = {props.onClickFunction}>
                {props.buttonText}
        </button>
        )
}  
export default Button