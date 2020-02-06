import React from 'react'
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    addDays
} from 'date-fns'
import './CalendarCells.css'

const CalendarCells = (props) => {
    const monthStart = startOfMonth(props.viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = 'd';
    const rows = [];
    const currentDate = new Date();

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
            
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const constDay = day;
            days.push(
                <div className = {
                    `DayCell 
                        ${!isSameMonth(day, monthStart) ? "Disabled" :
                           isSameDay(day, currentDate) ? "RedDay" : ""}
                    `} 
                    key = {day}
                    onClick = {() => props.onDateClick(constDay)}>
                    <span>
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className = "SevenDaysRow" key = {day}>
                 {days}
            </div>
        );
    days = [];
    }

    return (
        <div className="CellsBackground">
            {rows}
        </div>
    )
}

export default CalendarCells