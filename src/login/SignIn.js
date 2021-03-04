import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.scss';
import {
  Paper, 
  FormGroup,
  TextField, 
  Button,
  Typography 
} from '@material-ui/core';

function SignIn({ setTitle }) {
  
  useEffect( () => {
    setTitle('Войти в систему')
  }, [])

  return (
    <Paper variant="outlined" className='signup-window'>
      <Typography 
        className='signup-title'
      >Войти в систему</Typography>

      <FormGroup>
        <Typography className='input-label'>Login:</Typography>
        <TextField 
          id="login" 
          variant="outlined"
          size="small" 
          className='input'
          autoFocus
        />

        <Typography className='input-label'>Password:</Typography>
        <TextField 
          id="password" 
          variant="outlined"
          type="password"
          size="small" 
          className='input'
        />

        <div className='bottom-buttons'>
          <Button 
            variant="outlined"
            className='button-reg'
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