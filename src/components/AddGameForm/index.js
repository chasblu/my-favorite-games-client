import React from 'react';
import { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const AddGameForm = ({ loggedIn }) => {
    const initialGameData = {
        title: '',
        genre: '',
        release_date: '',
        rating: '',
        preview_url: 'http://',
        reviews: [],

    };
    const [gameData, setGameData] = useState(initialGameData);
    const history = useHistory();

    const _handleChange = (event) => {
        setGameData((prevState) => {
            return { ...prevState, [event.target.id]: event.target.value };
        });
    };

    const _addGame = async (e) => {
        try {
            const res = await fetch('https://myfavoritegamesapi.herokuapp.com/games/', {
                method: 'POST',
                body: JSON.stringify(gameData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
            });
            if (res.status === 201) {
                history.push('/games');
            } else {
                alert('Error game was not added')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (

        <form onSubmit={_addGame}>
            <Typography variant='h2' color='primary'>Add A Game</Typography>
            <TextField
                id='title'
                label='Title'
                autoFocus
                variant='outlined'
                helperText='Add a Title'
                required
                onChange={_handleChange}
            />
            <TextField
                id='genre'
                label='Genre'
                variant='outlined'
                helperText='Add a genre'
                required
                onChange={_handleChange}

            />
            <TextField
                id='release_date'
                type='date'
                variant='outlined'
                helperText='Add a release date'
                required
                onChange={_handleChange}

            />
            <TextField
                id='rating'
                label='rating'
                type='number'
                InputProps={{ 
                    inputProps: {min: 0, max: 5 }
                }}
                
                variant='outlined'
                helperText='Add a rating from 0 - 5'
                required
                onChange={_handleChange}

            />
            <TextField
                id='preview_url'
                type='url'
                label='Image'
                variant='outlined'
                defaultValue='http://'
                helperText='Add a link for an image'
                required
                onChange={_handleChange}
            />
            <Button type='submit'>Add Game</Button>
        </form>
    );
};

export default AddGameForm;