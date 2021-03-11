import React, { useEffect, useState } from 'react';
import { 
  Button, 
  TextField,
  Typography,
  MenuItem,
  Dialog, 
  DialogActions, 
  DialogContent,  
  DialogTitle 
} from '@material-ui/core';
import './EditDialog.scss';

export default function EditDialog({ appointment, doctors, open, saveApp, setOpen }) {
  const getDoctorsName = (id) => {
    let fullName = '';
    doctors.forEach(doctor => {
      if (doctor._id === id) fullName = doctor.name;
    });
    return fullName;
  }
  const [patientName, setPatientName] = useState(appointment.patientName);
  const [doctorName, setDoctorName] = useState(
    getDoctorsName(appointment.doctorId)
  );
  const [dateOfAppointment, setDate] = useState(
    (new Date(Date.parse(appointment.date))).toISOString().split('T')[0]
  );
  const [complaints, setComplaints] = useState(appointment.complaints);
  const [isDisabled, setDisabled] = useState(true);

  useEffect( () => {
    setPatientName(appointment.patientName);
    setDoctorName( getDoctorsName(appointment.doctorId) );
    setDate( 
      (new Date(Date.parse(appointment.date))).toISOString().split('T')[0] 
    );
    setComplaints(appointment.complaints);
  }, [open, appointment]);

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

  const handleSave = () => {
    const app = {
      _id: appointment._id,
      patientName: patientName,
      doctorId: getDoctorId(),
      date: Date.parse(dateOfAppointment),
      complaints: complaints
    };
    saveApp(app);
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">
          {"Изменить прием"}
        </DialogTitle>
        <DialogContent id="edit-dialog-content">

          <Typography className='label'>Имя:</Typography>
          <TextField
            id="input-name"
            value={patientName}
            variant="outlined"
            size="small"
            onChange={e => setPatientName(e.target.value)}
          />

          <Typography className='label'>Врач:</Typography>
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

          <Typography className='label'>Дата:</Typography>
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

          <Typography className='label'>Жалобы:</Typography>
          <TextField
            id="input-complaints"
            value={complaints}
            variant="outlined"
            size="small"
            multiline
            rows={3}
            onChange={e => setComplaints(e.target.value)}
          />

        </DialogContent>
        <DialogActions className="edit-actions">
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            autoFocus
            onClick={() => handleSave()}
            disabled={isDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}