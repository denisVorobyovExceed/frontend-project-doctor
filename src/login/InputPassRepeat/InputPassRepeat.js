import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './InputPassRepeat.scss';

function InputPassRepeat({ setInputParent, firstPass }) {
  const [isGood, setIsGood] = useState(false); 

  const comparePass = (e) => {
    setIsGood(firstPass && e.target.value === firstPass);
  }

  return (
    <TextField 
      variant="outlined"
      type="password"
      size="small" 
      className={isGood ? 'input correct' : 'input'}
      onChange={ e => {
        setInputParent(e.target.value);
        comparePass(e);
      }}
      onFocus={ e => comparePass(e)}
    />
  )
}

export default InputPassRepeat;