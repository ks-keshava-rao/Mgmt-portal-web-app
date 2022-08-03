import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin,{DateClickArg} from '@fullcalendar/interaction'
import { useState } from 'react';
const AttendanceView = () => {
  const [CalEvent , setEvent] = useState([]);
  const handleDateClick = (currDate)=>{
   if(currDate.jsEvent.altKey) {
   console.log(currDate.dateStr);
   setEvent([
    { title: 'Present', date: currDate.date }
  ])
  console.log(CalEvent)
   }

  }
  return (
    <div className="container-sm">
    <FullCalendar 
     events={CalEvent}
    plugins={[dayGridPlugin,interactionPlugin]}
    dateClick={(e)=>{handleDateClick(e)}}
    />
    
    </div>
  )
}

export default AttendanceView