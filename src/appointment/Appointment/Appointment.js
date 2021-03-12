import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Appointment.scss';
import NewTab from '../NewTab/NewTab';
import List from '../List/List';
import SnackbarMessage from '../../common/SnackbarMessage/SnackbarMessage';
import SortBar from '../SortBar/SortBar';

export default function Appointment({ setTitle }) {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [howSort, setHowSort] = useState('none');
  const [sortDirection, setSortDirection] = useState(true);
  const history = useHistory();

  useEffect(() => { 
    if ( !localStorage.getItem('user') ) {
      history.push('/');
    }
  }, [history]);
  useEffect( () => setTitle('Приемы'), [setTitle]);
  useEffect( () => getAppointments(), []);
  useEffect( () => {
    setAppointments( sortAppointments(appointments, sortDirection) );
  }, [howSort, sortDirection]);
  useEffect( () => {
    const getDoctors = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      await axios.get('http://localhost:8000/app/getDoctors', { 
        'headers': { 'Authorization': authStr }
      }).then(res => {
        if (res.status === 200) setDoctors(res.data);
      }).catch(error => handleError(error));
    }
    getDoctors();
  }, []);

  const getDoctorsName = (id) => doctors.filter(doc => doc._id === id)[0]?.name;

  const sortAppointments = (apps, asc) => {
    let sortedAppointments = apps;
    switch(howSort) {
      case 'name':
        sortedAppointments.sort( (a, b) => {
          if (a.patientName > b.patientName) return asc ? 1 : -1;
          else return asc ? -1 : 1;
        });
        break;
      case 'doctor':
        sortedAppointments.sort( (a, b) => {
          if (getDoctorsName(a.doctorId) > getDoctorsName(b.doctorId)) {
            return asc ? 1 : -1;
          } else return asc ? -1 : 1;
        });
        break;
      case 'date':
        sortedAppointments.sort( (a, b) => {
          if (a.date > b.date) return asc ? 1 : -1;
          else return asc ? -1 : 1;
        });
        break;
      case 'none':
        sortedAppointments.sort( (a, b) => {
          if (a._id > b._id) return asc ? 1 : -1;
          else return asc ? -1 : 1;
        });
        break;
    }
    return sortedAppointments;
  }

  const getAppointments = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    await axios.get('http://localhost:8000/app/getAppointments', { 
      'headers': { 'Authorization': authStr }
    }).then(res => {
      if (res.status === 200) {
        if (howSort !== 'none') {
          setAppointments( sortAppointments(res.data, sortDirection) ) 
        } else setAppointments(res.data);
      }
    }).catch(error => handleError(error));
  }

  const handleError = (error) => {
    if (String(error) === 'Error: Network Error') {
      setErrorText('Не удается получить данные, попробуйте позже');
    } else {
      setErrorText('Что-то пошло не так...');
    }
  }

  return (
    <div>
      <NewTab 
        doctors={doctors} 
        getAppointments={getAppointments} 
      />
      <SortBar
        howSort={howSort}
        setHowSort={setHowSort}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <List 
        appointments={appointments} 
        doctors={doctors} 
        getAppointments={getAppointments}
      />
      <SnackbarMessage 
        text={errorText}
        type='error'
        off={setErrorText}
      />
    </div>
  );
}