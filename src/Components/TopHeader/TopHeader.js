import React from 'react';
import './TopHeader.css'
import {Link} from 'react-router-dom';

const TopHeader = (props) => {

    switch(props.title){
        case "backtodos":
            return(
                <div className = "TopHeader">
                    <Link to = "../../../../">back to Project </Link>
                    >
                    <Link to = "../../"> back to To-Dos</Link>
                </div>
            );
        default:
            return(
                <div className = "TopHeader">
                    <Link to = "../../">back to Project </Link>
                </div>
            );
    }
}
export default TopHeader