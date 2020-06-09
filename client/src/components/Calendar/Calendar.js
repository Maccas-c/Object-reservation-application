import React, { Fragment,useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import SimpleTabs from './Card'
const Calendars = () => {

  const [value,onChange] = useState(new Date())
    return (
      <Fragment>
  <div >
      <Calendar
        onChange={onChange}
        value={console.log(value)}/>
        <SimpleTabs />
      </div>
    </Fragment>
  );
};

export default Calendars;
