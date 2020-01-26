import React from 'react'
import {
    format,
    startOfWeek,
    addDays
} from 'date-fns'
import './DaysBar.css'

const DaysBar = (props) => {
    const dateFormat = 'eeeeee';
    const days = [];
    let startDate = startOfWeek(props.viewDate);
    
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="DaysColumn" key={i}>
                {format(addDays(startDate, i), dateFormat)}
            </div>
        );
    }
    return (
        <div className = "DaysContainer">
            {days}
        </div>
    )
};

export default DaysBar