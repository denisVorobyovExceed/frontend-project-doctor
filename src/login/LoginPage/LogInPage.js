import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom';
import './LogInPage.scss';
import logo from '../../img/signin-logo.svg';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import { Container } from '@material-ui/core';

export default function LogInPage({ setTitle }) {
  let match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if ( localStorage.getItem('user') ) {
      history.push('/');
    }
  }, [history]);

  return (
    <Container maxWidth='md' className='main-container'>
      <div className="loginpage-left">
        <img 
        src={logo} 
        className='login-logo' 
        alt='Logo'
        />
      </div>
      <div className="loginpage-right">
        <Switch>
          <Route path={`${match.url}/signup`}>
            <SignUp setTitle={setTitle}/>
          </Route>
          <Route path={`${match.url}/signin`}>
            <SignIn setTitle={setTitle}/>
          </Route>
          <Redirect from={`${match.url}`} to={`${match.url}/signup`} />
        </Switch>
      </div>
    </Container>
  );
}