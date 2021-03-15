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
 
export default function EditDialog({ 
  appointment, 
  doctors, 
  open, 
  saveApp, 
  setOpen 
}) {
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
    return doctors.filter(doc => doc.name === doctorName)[0]._id;
  }

  function getDoctorsName(id) {
    return doctors.filter(doc => doc._id === id)[0]?.name;
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

          <Typography className='new-label'>Имя:</Typography>
          <TextField
            className="edit-input"
            id="input-name"
            value={patientName}
            variant="outlined"
            size="small"
            onChange={e => setPatientName(e.target.value)}
          />

          <Typography className='new-label'>Врач:</Typography>
          <TextField
            id="input-doctor"
            className="edit-input"
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

          <Typography className='new-label'>Дата:</Typography>
          <TextField
            id="date"
            className="edit-input"
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

          <Typography className='new-label'>Жалобы:</Typography>
          <TextField
            id="input-complaints"
            className="edit-input"
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