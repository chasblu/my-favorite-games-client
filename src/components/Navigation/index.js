import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Navigation = () => {

    return (
        <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                    <Link to='/'>Home</Link>
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Link to='/favorites'>Favorites</Link>
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Link to='/signup'>Signup</Link>
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Link to='/login'>Login</Link>
                    </IconButton>
                </Toolbar>
        </AppBar>
    );
};

export default Navigation;