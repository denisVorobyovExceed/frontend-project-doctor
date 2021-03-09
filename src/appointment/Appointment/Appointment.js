import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Appointment.scss';
import NewTab from '../NewTab/NewTab';
import List from '../List/List';

function Appointment({ setTitle }) {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();

  useEffect(() => setTitle('Приемы'), [setTitle]);
  useEffect(() => {
    if ( !localStorage.getItem('user') ) {
      history.push('/');
    }
  }, [history]);
  useEffect( () => {
    getDoctors();
    getAppointments();
  }, []);

  const getDoctors = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    await axios.get('http://localhost:8000/app/getDoctors', { 
      'headers': { 'Authorization': authStr }
    }).then(res => {
      if (res.status === 200) {
        setDoctors(res.data);
      }
    }).catch(error => {
      //handle later
    });
  }

  const getAppointments = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    await axios.get('http://localhost:8000/app/getAppointments', { 
      'headers': { 'Authorization': authStr }
    }).then(res => {
      if (res.status === 200) {
        setAppointments(res.data);
      }
    }).catch(error => {
      //handle later
    });
  }

  return (
    <div>
      <NewTab doctors={doctors} getAppointments={getAppointments} />
      <List appointments={appointments} doctors={doctors} />
    </div>
  )
}

export default Appointment;