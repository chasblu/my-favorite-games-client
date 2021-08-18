import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';


const EditGameForm = () => {
    const initialGameData = {
        title: '',
        genre: '',
        release_date: '',
        rating: '',
        preview_url: 'http://',
        reviews: [],

    };

    const { id } = useParams();
    const history = useHistory();
    const [ gameData, setGameData ] = useState(initialGameData)

    const getGame = async () => {
        try {
            const res = await fetch(`https://myfavoritegamesapi.herokuapp.com/games/${id}`)
            const data = await res.json()
            setGameData({
                title: data.title,
                genre: data.genre,
                release_date: data.release_date,
                rating: data.rating,
                preview_url: data.preview_url,
                reviews: data.reviews,
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGame();
    }, [])

    const _handleChange = (e) => {
        setGameData((prevState) => {
            return {
                ...prevState, [e.target.id]: e.target.value,
            };
        });
    };

    const _updateGame = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://myfavoritegamesapi.herokuapp.com/games/${id}`, {
                method: 'PUT',
                body: JSON.stringify(gameData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
            });
            if (res.status === 201) {
                getGame();
                history.goBack();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={_updateGame}>
            <Typography variant='h2' color='primary'>Edit Game</Typography>
            <TextField
                id='title'
                label='Title'
                value={gameData.title}
                autoFocus
                variant='outlined'
                helperText='Add a Title'
                required
                onChange={_handleChange}
            />
            <TextField
                id='genre'
                label='Genre'
                value={gameData.genre}
                variant='outlined'
                helperText='Add a genre'
                required
                onChange={_handleChange}

            />
            <TextField
                id='release_date'
                type='date'
                value={gameData.release_date}
                variant='outlined'
                helperText='Add a release date'
                required
                onChange={_handleChange}

            />
            <TextField
                id='rating'
                label='rating'
                type='number'
                value={gameData.rating}
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
                type='text'
                label='Image'
                value={gameData.preview_url}
                variant='outlined'
                helperText='Add a link for an image'
                onChange={_handleChange}
            />
            <Button type='submit'>Edit Game</Button>
        </form>
    );
};

export default EditGameForm;