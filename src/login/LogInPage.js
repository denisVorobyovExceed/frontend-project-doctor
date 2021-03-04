import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';
import './LogInPage.scss';
import logo from '../img/signin-logo.svg';
import SignIn from './SignIn';
import SignUp from './SignUp';

import { Container } from '@material-ui/core';

function LogInPage({ setTitle }) {
  let match = useRouteMatch();

  return (
    <Container maxWidth='md' className='main-container'>
      <img 
        src={logo} 
        className='login-logo' 
        alt='Logo'/>

      <Switch>
        <Route path={`${match.url}/signup`}>
          <SignUp setTitle={setTitle}/>
        </Route>
        <Route path={`${match.url}/signin`}>
          <SignIn setTitle={setTitle}/>
        </Route>
        <Redirect from={`${match.url}`} to={`${match.url}/signup`} />
      </Switch>

    </Container>
  )
}

export default LogInPage;