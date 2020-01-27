import React from 'react'
import {Link} from 'react-router-dom'
import './TopHeader.css'

const TopHeader = (props) => {

    switch(props.title){
        case "backtotasklist":
            return(
                <div className = "TopHeader">
                    <Link className = "Underline" to = "../../../../../">Back to Project</Link>
                    {' '}
                    <div className = "NoUnderline">></div>
                    {' '}
                    <Link className = "Underline" to = "../../../" >Back to To-Dos</Link>
                    {' '}
                    <div className = "NoUnderline">></div>
                    {' '}
                    <Link className = "Underline" to = "../tasks">Back to TaskList</Link>
                </div>
            );
        case "backtodos":
            return(
                <div className = "TopHeader">
                    <Link className = "Underline" to = "../../../../">Back to Project</Link>
                    {' '}
                    <div className = "NoUnderline">></div>
                    {' '}
                    <Link className = "Underline" to = "../../">Back to To-Dos</Link>
                </div>
            );
        default:
            return(
                <div className = "TopHeader">
                    <Link className = "Underline" to = "../../">Back to Project</Link>
                </div>
            );
    }
}
export default TopHeader