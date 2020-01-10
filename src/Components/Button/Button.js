import React from 'react'
import {useHistory} from 'react-router-dom'
import './Button.css'

const Button = (props) => {

    const history = useHistory();

    return(
        <button
        type = "submit"
        className = {'Button ' + props.buttonClass}
        disabled = {props.disabledProperties}
        onClick = {props.onClickFunction}>{props.buttonText}
        </button>
        )

}  
export default Button