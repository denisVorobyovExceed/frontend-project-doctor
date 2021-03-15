import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import './Header.scss';

import {
  Typography,
  Container,
  Button
} from '@material-ui/core';

function Header({ title }) {
  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className='header'>
      <Container className='header-container' maxWidth="lg">
        <div className='left-block'>  
          <Link to='/'>
            <img 
              src={logo}
              className='header-logo'
              alt='Site Logo'
            />
          </Link>
          <Typography className='header-title'>{title}</Typography>
        </div>
        {localStorage.getItem('user')
        ? <div className='right-block'>
            <Button 
              variant="outlined"
              size="small" 
              className='button-reg' 
              onClick={signOut}
            >Выйти</Button>
          </div>
        : false
        }
      </Container>
    </div>
  )
}

export default Header;