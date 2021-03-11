import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewTab.scss';
import {
  Typography,
  Container,
  Button,
  TextField,
  MenuItem
} from '@material-ui/core';

function NewTab({ doctors, getAppointments }) {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [dateOfAppointment, setDate] = useState(
    `${(new Date()).toISOString().split('T')[0]}`
  );
  const [complaints, setComplaints] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  useEffect( () => {
    if (patientName && doctorName && dateOfAppointment && complaints) {
      setDisabled(false);
    } else setDisabled(true);
  }, [patientName, doctorName, dateOfAppointment, complaints]);

  const getDoctorId = () => {
    let id = 0;
    doctors.forEach(doctor => {
      if (doctor.name === doctorName) {
        id = doctor._id;
      }
    });
    return id;
  }

  const addAppointment = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    const appointment = {
      patientName: patientName,
      doctorId: getDoctorId(),
      date: Date.parse(dateOfAppointment),
      complaints: complaints
    };

    await axios.post('http://localhost:8000/app/addAppointment', appointment, {
      'headers': { 'Authorization': authStr }
    }).then(res => {
      if (res.status === 201) {
        setPatientName('');
        setDoctorName('');
        setComplaints('');
        //добавить шастливое сообшение
      }
    }).catch(error => {
      //handle later
    })

    getAppointments();
  }

  return (
    <div className='filter-tab'>
      <Container className='filter-tab-container' maxWidth="lg">
        <div className='filter-tab-row'>
          <Typography className='label'>Имя</Typography>
          <TextField
            id="input-name"
            value={patientName}
            variant="outlined"
            size="small"
            onChange={e => setPatientName(e.target.value)}
          />
        </div>
        <div className='filter-tab-row'>
          <Typography className='label'>Врач</Typography>
          <TextField
            id="input-doctor"
            select
            value={doctorName}
            onChange={e => setDoctorName(e.target.value)}
            variant="outlined"
            size="small"
          >
            {doctors.map(doctor => (
              <MenuItem key={doctor._id} value={doctor.name}>
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className='filter-tab-row'>
          <Typography className='label'>Дата</Typography>
          <TextField
            id="date"
            type="date"
            placeholder='false'
            defaultValue={dateOfAppointment}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className='filter-tab-row'>
          <Typography className='label'>Жалобы</Typography>
          <TextField
            id="input-complaints"
            value={complaints}
            variant="outlined"
            size="small"
            onChange={e => setComplaints(e.target.value)}
          />
        </div>
        <div className='filter-tab-row'>
          <Typography className='label'>&nbsp;</Typography>
          <Button 
            variant="outlined"
            disabled={isDisabled}
            size="large"
            onClick={() => addAppointment()}
          >Добавить</Button>
        </div>
      </Container>
    </div>
  )
}

export default NewTab;