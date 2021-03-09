import React from 'react';
import './List.scss';
import { Container } from '@material-ui/core';
import Buttons from '../Buttons/Buttons';

function List({ appointments, doctors }) {
  
  const getDoctorsName = (id) => {
    let fullName = '';
    doctors.forEach(doctor => {
      if (doctor._id === id) fullName = doctor.name;
    });
    return fullName;
  }

  return (
    <Container className='table-container' maxWidth="md">
      <table class='table'>
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
        {appointments.map(item => (
          <tr className='app-row'>
            <td className='app-cell'>{item.patientName}</td>
            <td className='app-cell'>{getDoctorsName(item.doctorId)}</td>
            <td className='app-cell'>
              {(new Date( Date.parse(item.date) )).toLocaleDateString('ru-RU')}
            </td>
            <td className='app-cell comp'>{item.complaints}</td>
            <td className='app-cell'><Buttons /></td>
          </tr>
        ))}
        </tbody>
      </table>
    </Container>
  )
}

export default List;