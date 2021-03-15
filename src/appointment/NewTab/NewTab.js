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
  const [hide, setHide] = useState({status: false, text: 'Скрыть'});

  useEffect( () => {
    if (patientName && doctorName && dateOfAppointment && complaints) {
      setDisabled(false);
    } else setDisabled(true);
  }, [patientName, doctorName, dateOfAppointment, complaints]);

  const getDoctorId = () => {
    return doctors.filter(doc => doc.name === doctorName)[0]._id;
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

  const handleHide = () => {
    if(!hide.status) setHide({status: true, text: "Добавить прием"});
    else setHide({status: false, text: "Скрыть"});
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640 && hide.status) {
      setHide({status: false, text: 'Скрыть'});
    }
  });

  return (
    <div className='new-tab'>
      {hide.status 
      ? <div className="hide-button">
        <Button 
          variant="outlined"
          size="large"
          onClick={handleHide}
        >{hide.text}</Button>
      </div>

      : <Container className='new-tab-container' maxWidth="lg">
        <div className='new-tab-left'>
          <div className='new-tab-row'>
            <Typography className='new-label'>Имя</Typography>
            <TextField
              id="input-name"
              value={patientName}
              variant="outlined"
              size="small"
              onChange={e => setPatientName(e.target.value)}
            />
          </div>
          <div className='new-tab-row'>
            <Typography className='new-label'>Врач</Typography>
            <TextField
              id="doctor"
              className='new-doctor-input'
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
          <div className='new-tab-row'>
            <Typography className='new-label'>Дата</Typography>
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
        </div>
        <div className='new-tab-right'>
          <div className='new-tab-row'>
            <Typography className='new-label'>Жалобы</Typography>
            <TextField
              id="input-complaints"
              value={complaints}
              variant="outlined"
              size="small"
              onChange={e => setComplaints(e.target.value)}
            />
          </div>
          <div className='new-tab-row new-tab-buttons'>
            <Typography className='new-label label-buttons'>&nbsp;</Typography>
            <Button 
              variant="outlined"
              disabled={isDisabled}
              size="large"
              onClick={() => addAppointment()}
            >Добавить</Button>

            <div className="hide-button">
              <Button 
              variant="outlined"
              size="large"
              onClick={handleHide}
              >{hide.text}</Button>
            </div>
          </div>
        </div>
      </Container>
    }</div>
  )
}

export default NewTab;