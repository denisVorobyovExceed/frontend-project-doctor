import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import './InputLogin.scss';

function InputLogin({ setInputParent, isLoginOccupied }) {
  const helperTextBad = 'Не менее 6 символов';
  const helperTextGood = 'Логин корректен';
  const helperTextOccupied = 'Логин уже занят, попробуйте другой';

  const [inputLoginHelper, setInputLoginHelper] = useState(helperTextBad);
  const [isGood, setIsGood] = useState(false); 

  useEffect( () => {
    if (isLoginOccupied) setInputLoginHelper(helperTextOccupied)
  }, [isLoginOccupied]);

  const checkLogin = (login) => {
    let clearLogin = login.trim();
    if (clearLogin.length > 5) {
      return true;
    } else return false;
  }
  
  const changeHelpers = async (e) => {
    if ( checkLogin(e.target.value) ) {
      setIsGood(true);
      setInputLoginHelper(helperTextGood);
    } else {
      setInputLoginHelper(helperTextBad);
      setIsGood(false);
    }
  }

  return (
    <TextField 
      variant="outlined"
      size="small" 
      className={isGood ? 'input correct' : 'input'}
      helperText={inputLoginHelper}
      onChange={ e => {
        setInputParent(e.target.value);
        changeHelpers(e);
      }}
      autoFocus
    />
  )
}

export default InputLogin;