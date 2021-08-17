import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMedia, Container, Typography, IconButton, } from '@material-ui/core';
import  EditIcon   from '@material-ui/icons/Edit';
import  DeleteIcon   from '@material-ui/icons/Delete';

const Games = ( { loggedIn } ) => {
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
                           <CardContent>
                               <CardHeader title={game.title}/>
                               <CardMedia 
                                component='img'
                                image={game.preview_url}
                                alt={game.title}                               
                               />
                               <Typography>Release date:{game.genre}</Typography>
                               <Typography>Release date:{game.release_date}</Typography>
                               <Typography>Rating: {game.rating}</Typography>
                               <IconButton>
                                   <EditIcon />
                               </IconButton>
                               <IconButton>
                                   <DeleteIcon />
                               </IconButton>
                               {game.reviews && game.reviews.map((review) => {
                                   return (
                                    <Card key={review.id}>
                                        <CardHeader title='Reviews:'/>
                                        <Typography variant='h5'>Title: {review.title}</Typography>
                                        <Typography variant='body1'>User: {review.owner}</Typography>
                                        <Typography variant='body2'>{review.body}</Typography>
                                    </Card>
                                   )
                               })}
                           </CardContent>
                       </Card>
                   )
               })
           }
       </Container>
    );
};

export default Games;