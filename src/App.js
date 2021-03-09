import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';
import Header from './common/Header/Header';
import LogInPage from './login/LoginPage/LogInPage'
import Appointment from './appointment/Appointment/Appointment';

function App() {
  const [title, setTitle] = useState('Главная');

  return (
    <div className="App">
      <Header title={title}/>
      
      <Switch>
        <Route path='/login'>
          <LogInPage setTitle={setTitle} />
        </Route>
        <Route path='/appointment'>
          <Appointment setTitle={setTitle} />
        </Route>
        {localStorage.getItem('user')
          ? <Redirect from='/' to='/appointment' /> 
          : <Redirect from='/' to='/login' />
        }
      </Switch>
    </div>
  );
}

export default App;