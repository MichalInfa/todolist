import React from 'react'
import {format} from 'date-fns'
import './TopCalendarBar.css'

const TopCalendarBar = (props) => {    
    //'dd-MM-yyyy'
    const dateFormat = 'MMMM yyyy';
    return (
        <div className="TopCalendarBar">
            <div className = "LeftArrow" onClick={props.prevMonth}> 
                <span className = "WhiteArrow">&larr;</span>
            </div>
            <div className = "DateDisplay">
                <span>{format(props.viewDate, dateFormat)}</span>
            </div>
            <div className = "RightArrow" onClick={props.nextMonth}>
                <span className = "WhiteArrow">&rarr;</span>
            </div>
        </div>
    );
};

export default TopCalendarBar