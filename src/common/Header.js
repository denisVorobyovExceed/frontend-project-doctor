import React from 'react';
import logo from '../img/logo.svg';
import './Header.scss';

import {
  Typography,
  Container
} from '@material-ui/core';

function Header({title}) {

  return (
    <div className='header'>
      <Container className='header-container' maxWidth="md">
        <img 
          src={logo} 
          className='header-logo'
          alt='Site Logo'
        />
        <Typography 
          className='header-title'
        >{title}</Typography>
      </Container>
    </div>
  )
}

export default Header;