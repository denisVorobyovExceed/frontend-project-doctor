import React, { useState } from 'react';
import axios from 'axios';
import './Buttons.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import EditDialog from '../EditDialog/EditDialog';

export default function Buttons({ appointment, doctors, getAppointments }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteAppointment = async () => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    await axios.delete('http://localhost:8000/app/deleteAppointment', { 
      'headers': { 'Authorization': authStr },
      'data': {id: appointment._id}
    }).then(res => {
      if (res.status === 200) {
        setDeleteOpen(false);
        getAppointments();
      }
    }).catch(error => {
      //handle later
    });
  }

  const saveAppointment = async (appointment) => {
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    await axios.patch('http://localhost:8000/app/editAppointment', appointment, { 
      'headers': { 'Authorization': authStr }
    }).then(res => {
      if (res.status === 200) {
        setEditOpen(false);
        getAppointments();
      }
    }).catch(error => {
      //handle later
    });
  }

  return (
    <div className='buttons'>
      <EditIcon onClick={() => setEditOpen(true)} />
      <DeleteOutlineIcon onClick={() => setDeleteOpen(true)} />
      <EditDialog 
        open={editOpen}
        saveApp={saveAppointment}
        setOpen={setEditOpen}
        appointment={appointment}
        doctors={doctors}
      />
      <DeleteDialog 
        open={deleteOpen}
        delApp={deleteAppointment}
        setOpen={setDeleteOpen}
      />
    </div>
  )
}