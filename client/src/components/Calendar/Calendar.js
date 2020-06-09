import React, { Fragment,useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import Court from './Court'
import InteractiveList from './Hours'
const Calendars = () => {

  const [value,onChange] = useState(new Date())
    return (
      <Fragment>
  <div >
      <Calendar
        onChange={onChange}
        value={console.log(value)}/>
        <Court />
        <InteractiveList/>
      </div>
    </Fragment>
  );
};

export default Calendars;
