import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sha1 from 'js-sha1'; 
import './SignIn.scss';
import {
  Paper, 
  FormGroup,
  TextField, 
  Button,
  Typography 
} from '@material-ui/core';

function SignIn({ setTitle }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isFailed, setIsFailed] = useState(false);

  useEffect( () => {
    setTitle('Войти в систему')
  }, [setTitle]);

  const submitForm = async () => {
    const passHash = sha1(inputPassword);
    await axios.post('http://localhost:8000/auth', {
      login: inputLogin,
      passwordHash: passHash
    })
    .then(res => {
      if (res.status === 202) {
        setIsFailed(false);
        localStorage.setItem('user', res.data.user);
        localStorage.setItem('token', res.data.token);
        window.location.reload();
      }
    }) 
    .catch(error => {
      const errorCode = +/\d+/.exec(error);
      if (errorCode === 403) {
        setInputLogin('');
        setInputPassword('');
        setIsFailed(true);
      } else {
        //handle others
      }
    });
  }

  return (
    <Paper variant="outlined" className='signup-window'>
      <Typography 
        className='signin-title'
      >Войти в систему</Typography>

      <FormGroup>
        <Typography className='signin-input-label'>Login:</Typography>
        <TextField 
          id="login" 
          variant="outlined"
          size="small" 
          className='signin-input'
          onChange={e => {
            setInputLogin(e.target.value);
          }}
          autoFocus
        />

        <Typography className='signin-input-label'>Password:</Typography>
        <TextField 
          id="password" 
          variant="outlined"
          type="password"
          size="small" 
          className='signin-input'
          onChange={e => {
            setInputPassword(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') submitForm()
          }}
        />

        {isFailed
          ? <Typography className='login-error'>
            Авторизация не удалась, проверьте правильность логина и пароля
            </Typography>
          : false
        }

        <div className='signin-bottom-buttons'>
          <Button 
            variant="outlined"
            className='button-log'
            onClick={submitForm}
          >Войти</Button>
          <Link to={`/login/signup`}>
            <Button className='signin-link'>Зарегистрироваться</Button>
          </Link>
        </div>
      </FormGroup>
    </Paper>
  )
}

export default SignIn;