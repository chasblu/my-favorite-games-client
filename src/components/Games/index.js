import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMedia, Container, Typography, IconButton, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Games = ({ loggedIn }) => {
    const [games, setGames] = useState([]);

    const getGamesIndex = async () => {
        try {
            const response = await fetch('http://localhost:8000/games/');
            const data = await response.json();
            console.log(data)
            setGames(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getGamesIndex();
    }, [])

    if (!games.length) {
        return null;
    }
    return (
        <Container>
            {games.map((game, i) => {
                console.log(game)
                return (
                    <Card key={i}>
                        <Link 
                            to={`games/${game.id}`}
                            style={{color: 'black', textDecoration: 'none'}}>
                            <CardContent>
                                <CardHeader title={game.title} />
                                <CardMedia
                                    component='img'
                                    image={game.preview_url}
                                    alt={game.title}
                                />
                                <Typography>Genre:{game.genre}</Typography>
                                <Typography>Release date:{game.release_date}</Typography>
                                <Typography>Rating: {game.rating}</Typography>
                                <Typography>Number of Reviews: {game.reviews.length}</Typography>
                            </CardContent>
                        </Link>
                    </Card>
                )
            })
            }
        </Container>
    );
};

export default Games;