import { Card, Container, CardContent, Typography, CardHeader,CardMedia, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'


const GameDetail = ({ userInfo, loggedIn }) => {

    const [game, setGame] = useState(null)
    const { id } = useParams();
    const history = useHistory();

    const getGameDetail = async () => {
        try {
            const res = await fetch(`https://myfavoritegamesapi.herokuapp.com/games/${id}`)
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

    const _handleDeleteGame = async () => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            try {
                const res = await fetch(`https://myfavoritegamesapi.herokuapp.com/games/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
            })
                
                if (res.status === 204 ) {
                    getGameDetail()
                    history.push('/games')
                } else {
                    alert('Something went wrong, one moment please')
                }
            } catch (error) {
                console.log(error)
            }}
        }

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
                           <Link to={`/games/${game.id}/edit`}>
                               <EditIcon />
                           </Link>
                        </IconButton>
                         <IconButton onClick={_handleDeleteGame}>
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