import React from 'react';
import './TopHeader.css';
import {Link} from 'react-router-dom';
/*import {useHistory} from 'react-router-dom';*/

const TopHeader = (props) => {

    return(
        <Link to = "../">
             <div className = "TopHeader">
                {props.title}
            </div>
        </Link>
    )

    /*
    let history = useHistory();

    return(
    <div className = "TopHeader"
        onClick = {() => history.push("../")}>
        {props.title}
    </div>
    )
    */
}

export default TopHeader