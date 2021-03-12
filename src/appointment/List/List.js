import React, { useState, useEffect } from 'react';
import './List.scss';
import { Container } from '@material-ui/core';
import Buttons from '../Buttons/Buttons';

export default function List(props) {
  const [state, setState] = useState(true);
  useEffect( () => setState(!state), [props]); //it was necessary
  
  return (
    <Container className='table-container' maxWidth="lg">
      <table className='table'>
        <thead>
          <tr className='head-row'>
            <th>Имя</th>
            <th>Врач</th>
            <th>Дата</th>
            <th>Жалобы</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <SingleRow {...props}/>
        </tbody>
      </table>
      {props.appointments === [] ? <p>Записи отсутствуют</p> : false}
    </Container>
  );
}
//move it back later:
function SingleRow({ appointments, doctors, getAppointments }) {
  const getDoctorsName = (id) => {
    return doctors.filter(doc => doc._id === id)[0]?.name;
  }

  return (
    <>
    {appointments.map( (item, index) => (
      <tr className='app-row' key={`row-${index}`}>
        <td className='app-cell' key={`row-${index}-name`}>
          {item.patientName}</td>
        <td className='app-cell' key={`row-${index}-doc`}>
          {getDoctorsName(item.doctorId)}</td>
        <td className='app-cell' key={`row-${index}-date`}>
          {(new Date( Date.parse(item.date) )).toLocaleDateString('ru-RU')}</td>
        <td className='app-cell comp' key={`row-${index}-comp`}>
          {item.complaints}</td>
        <td className='app-cell' key={`row-${index}-butt`}>
          <Buttons 
            key={`row-${index}-button`}
            appointment={item} 
            doctors={doctors}
            getAppointments={getAppointments}
          />
        </td>
      </tr>
    ))}
    </>
  );
} 