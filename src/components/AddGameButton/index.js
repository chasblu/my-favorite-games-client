import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const AddGameButton = () => {
    return (
        <Link to='/games/new' style={{textDecoration: 'none', backgroundColor: 'primary'}}>
            <Button color='primary'> Add a Game</Button>
        </Link>
    );
};

export default AddGameButton;