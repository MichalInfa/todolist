import React from 'react';
import './TopHeader.css';
import {Link} from 'react-router-dom';

const TopHeader = (props) => {

    return(
        <Link to = "../">
             <div className = "TopHeader">
                {props.title}
            </div>
        </Link>
    )
}
export default TopHeader