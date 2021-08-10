import './App.css';
import React from 'react'
import Button from '@material-ui/core/Button';
import Navigation from './components/Navigation';
import { Container } from '@material-ui/core';

function App() {
  
  return (
    <>
      <Navigation/>
      <Container component="main" maxWidth="lg">
        <div >
          Hello World
          <Button variant="contained" color="primary">
            Test Button
          </Button>
        </div>
      </Container>
      </>
  );
}

export default App;
