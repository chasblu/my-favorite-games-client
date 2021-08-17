import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Signup from './components/SIgnup';
import Login from './components/Login';
import Games from './components/Games'
import { Container, Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom'
import AddGameForm from './components/AddGameForm';

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [userInfo, setUserInfo] = useState(null);
  const [games, setGames] = useState([]);

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:8000/token/logout', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 204) {
        alert('You have been logged out!');
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserInfo(null);
      } else {
        alert('Something wet wrong! Please try again');
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSetLogIn = (authToken) => {
    setLoggedIn(true);
    localStorage.setItem('token', authToken);
    getUserInfo();
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/me/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json()
      console.log(data)
      setUserInfo(data)
    } catch (error) {
      console.log(error)
    }
  };

  const getGamesIndex = async () => {
    try {
        const response = await fetch('http://localhost:8000/games');
        const data = await response.json();
        console.log(data)
        setGames(data);
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Navigation handleSetLogIn={handleSetLogIn} loggedIn={loggedIn} handleLogOut={handleLogOut} userInfo={userInfo} />
      <Container component="main" maxWidth="lg">
        <Switch>
          <Route path='/' exact render={() => <Home loggedIn={loggedIn} userInfo={userInfo} />} />
          <Route path='/games' exact render={() => <Games loggedIn={loggedIn} />}/>
          <Route path='/signup' render={() => <Signup />} />
          <Route path='/login' render={() => <Login handleSetLogIn={handleSetLogIn} />} />
          <Route path='/games/new' render={() => <AddGameForm getGamesIndex={getGamesIndex}/>}/>
        </Switch>
      </Container>
    </>
  );
}

export default App;
