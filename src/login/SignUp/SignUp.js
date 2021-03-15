import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss';
import InputPass from '../InputPass/InputPass';
import InputPassRepeat from '../InputPassRepeat/InputPassRepeat';
import InputLogin from '../InputLogin/InputLogin';
import {
  Paper,
  FormGroup,
  Button,
  Typography,
} from '@material-ui/core';

export default function SignUp({ setTitle }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordAgain, setInputPasswordAgain] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isLoginOccupied, setLoginOccupied] = useState(false);

  useEffect( () => {
    setTitle('Зарегистрироваться в системе')
  }, [setTitle]);
 
  useEffect( () => {
    const loginClear = inputLogin.trim();
    if (
      loginClear.length > 5 
      && /^(?=.*\d)(?=.*[a-zA-Z])(?=(.*[0-9]){1}).{6,}$/.test(inputPassword) 
      && inputPassword === inputPasswordAgain
    ) {
      setDisabled(false);
    } 
  }, [inputLogin, inputPassword, inputPasswordAgain]);

  const submitForm = async () => {
    await axios.post('http://localhost:8000/reg', {
      login: inputLogin,
      password: inputPassword
    })
    .then(res => {
      if (res.status === 201) {
        setLoginOccupied(false);
        localStorage.setItem('user', res.data.user);
        localStorage.setItem('token', res.data.token);
        window.location.reload();
      } else if (res.status === 208) {
        setInputLogin('');
        setLoginOccupied(true);
      }
    })
    .catch(error => {
      //handle others
    });
  }

  return (
    <Paper variant="outlined" className='signup-window'>
      <Typography className='signup-title'>Регистрация</Typography>

      <FormGroup>
        <Typography className='signup-input-label'>Login:</Typography>
        <InputLogin setInputParent={setInputLogin} isLoginOccupied={isLoginOccupied} />

        <Typography className='signup-input-label'>Password:</Typography>
        <InputPass setInputParent={setInputPassword} />

        <Typography className='signup-input-label'>Repeat password:</Typography>
        <InputPassRepeat 
          setInputParent={setInputPasswordAgain} 
          firstPass={inputPassword}
        />

        <div className='signup-bottom-buttons'>
          <Button 
            variant="outlined"
            className='button-reg'
            disabled={isDisabled}
            onClick={submitForm}
          >Зарегистрироваться</Button>

          <Link to={`/login/signin`}>
            <Button className='signin-link'>Авторизоваться</Button>
          </Link>
        </div>
      </FormGroup>
    </Paper>
  );
}