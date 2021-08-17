import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Navigation = ({ loggedIn, handleLogOut, userInfo }) => {

    return (
        <AppBar position="sticky">
                <Toolbar>
                    
                    <Link to='/' style={{ textDecoration: 'none'}}>
                        <Button color='secondary'>Home</Button>
                    </Link>
                    
                    <Link to='/games' style={{ textDecoration: 'none'}}>
                        <Button color='secondary'>Games</Button>
                    </Link>

                    {userInfo && (
                        <Typography variant='h6'>
                            You are signed in as: { userInfo.username }
                        </Typography>
                    )}
                    
                    {loggedIn ? (
                            <Link to='/' style={{ textDecoration: 'none'}}>
                                <Button color="secondary" onClick={handleLogOut}>
                                    Log Out
                                </Button>
                            </Link>
                    ) : (
                    
                        <>
                        <Link to='/signup' style={{ textDecoration: 'none'}}>
                            <Button color="secondary">Sign Up</Button>
                        </Link>
                        <Link to='/login' style={{ textDecoration: 'none'}}>
                            <Button color="secondary">Log In</Button>
                        </Link> 
                        </>
                        )}
                        
                    
                </Toolbar>
        </AppBar>
    );
};

export default Navigation;