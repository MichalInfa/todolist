import React from 'react'
import {Link} from 'react-router-dom'
import './TopHeader.css'
import { useSelector } from 'react-redux';

const TopHeader = (props) => {

    const todolists = useSelector(state => state.todolists)    

    const renderBack = () => {
        if(todolists && todolists.meta)
            return(`?page=${todolists.meta.current_page}`)
        return "";
    }

    switch(props.title){
        case "backtotasklist":
            return(
                <div className = "TopHeader">
                    <Link className = "Underline" to = "../../../../../projects">Back to Project</Link>
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
                    <Link className = "Underline" to = "../../../../projects">Back to Project</Link>
                    {' '}
                    <div className = "NoUnderline">></div>
                    {' '}
                    <Link className = "Underline" to = {"../../to_do_lists" + renderBack()}>Back to To-Dos</Link>
                </div>
            );
        default:
            return(
                <div className = "TopHeader">
                    <Link className = "Underline" to = "../../projects">Back to Project</Link>
                </div>
            );
    }
}
export default TopHeader