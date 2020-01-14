import React from 'react';
import './TopHeader.css'
import {Link} from 'react-router-dom';

const TopHeader = (props) => {
 
    console.log(props.title)
    switch(props.title){
        case "backtodos":
            return(
                <div className = "TopHeader">
                    <Link to = "../">back to Project </Link>
                    >
                    <Link to = "/Project"> back to To-Dos</Link>
                </div>
            );
        default:
            return(
                <div className = "TopHeader">
                    <Link to = "../">back to Project </Link>
                </div>
            );
    }
}
export default TopHeader