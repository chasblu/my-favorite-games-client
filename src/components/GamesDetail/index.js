import { Card, Container, CardContent, Typography, CardHeader,CardMedia, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const GameDetail = ({ userInfo, loggedIn }) => {

    const [game, setGame] = useState(null)
    const { id } = useParams();

    const getGameDetail = async () => {
        try {
            const res = await fetch(`http://localhost:8000/games/${id}`)
            console.log(res)
            const data = await res.json();
            console.log(data)
            if (res.status === 200) {
				setGame(data);
			}
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGameDetail();
    }, []);

    if (!game) {
        return null;
    }

    return (
            <Container>
                <Card>
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
                        <IconButton>
                           <EditIcon />
                        </IconButton>
                         <IconButton>
                            <DeleteIcon />
                        </IconButton>
                        {game.reviews && game.reviews.map((review) => {
                                    return (
                                        <Card key={review.id}>
                                            <CardHeader title='Reviews:' />
                                            <Typography variant='h5'>Title: {review.title}</Typography>
                                            <Typography variant='body1'>User: {review.owner}</Typography>
                                            <Typography variant='body2'>{review.body}</Typography>
                                        </Card>
                                    )
                                })}
                    </CardContent>
                </Card>
            </Container>
    );
};

export default GameDetail;