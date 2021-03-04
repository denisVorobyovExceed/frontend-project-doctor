import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  // useHistory
} from 'react-router-dom';
import './App.scss';
import Header from './common/Header';
import LogInPage from './login/LogInPage'

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [title, setTitle] = useState('Главная'); //check this later

  useEffect( () => checkAuth() );

  const checkAuth = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(user);
      // history.push('/appointment'); //check this later
    } else {
      // history.push('/login'); //check this later
    }
  }

  return (
    <div className="App">
      <Header title={title}/>
      
      <Switch>
        <Route path='/login'>
          <LogInPage setTitle={setTitle}/>
        </Route>
        <Route path='/appointment'>
          {/* nothing here now */}
        </Route>
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  );
}

export default App;