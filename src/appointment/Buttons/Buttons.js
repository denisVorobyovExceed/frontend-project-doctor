import React from 'react';
import './Buttons.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Buttons() {

  return (
    <div className='buttons'>
      <EditIcon />
      <DeleteOutlineIcon />
    </div>
  )
}

export default Buttons;