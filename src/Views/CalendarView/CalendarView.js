import React from 'react'
import {useState} from 'react'
import {
    addMonths,
    subMonths
 } from 'date-fns'

import TopCalendarBar from './TopCalendarBar'
import DaysBar from './DaysBar'
import CalendarCells from './CalendarCells'
import './CalendarView.css'

const CalendarView = (props) => {
    
    const [viewedDate, setViewedDate] = useState(new Date());
    
return (
   <div className="Calendar">
      <TopCalendarBar 
        nextMonth = {() => setViewedDate(addMonths(viewedDate, 1))}
        prevMonth = {() => setViewedDate(subMonths(viewedDate, 1))}
        viewDate = {viewedDate} />
      
      <DaysBar viewDate = {viewedDate} />
      
      <CalendarCells 
        viewDate = {viewedDate}
        onDateClick = {props.onDateRespond}
      />
   </div>
  )
}

export default CalendarView