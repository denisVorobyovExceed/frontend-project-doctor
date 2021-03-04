import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './InputPass.scss';

function InputPass({ setInputParent }) {
  const [inputPasswordHelper, setInputPasswordHelper] = useState('');
  const [isGood, setIsGood] = useState(false); 

  const checkPass = (pass) => {
    if(/^(?=.*\d)(?=.*[a-zA-Z])(?=(.*[0-9]){1}).{6,}$/.test(pass)) {
      return true;
    } else return false;
  }
  
  const helperTextBad = 'От 6 символов, латиница и хотя бы 1 цифра';
  const helperTextGood = 'Пароль корректен';
  
  const changeHelpers = (e) => {
    if ( checkPass(e.target.value) ) {
      setInputPasswordHelper(helperTextGood);
      setIsGood(true);
    } else {
      setInputPasswordHelper(helperTextBad);
      setIsGood(false);
    }
  }

  return (
    <TextField 
      variant="outlined"
      type="password"
      size="small" 
      className={isGood ? 'input correct' : 'input'}
      helperText={inputPasswordHelper}
      onChange={ e => {
        setInputParent(e.target.value);
        changeHelpers(e);
      }}
      onFocus={ e => {
        changeHelpers(e);
      }}
    />
  )
}

export default InputPass;